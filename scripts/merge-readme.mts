import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

if (process.env['CI']) {
  // We do not update the readmes in CI, as they cannot be committed back to the repository.
  process.exit(0);
}

const headers: Record<string, string> = {};
try {
  // TODO: Add another way to provide a token for environments where the GitHub CLI is not available.
  const token = execSync('gh auth token', { encoding: 'utf-8' }).trim();
  headers['Authorization'] = `Bearer ${token}`;
} catch {
  /* empty */
}

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const elementsPackage: Package = JSON.parse(
  readFileSync(join(projectRoot, 'node_modules/@sbb-esta/lyne-elements/package.json'), 'utf-8'),
);
const originUrl = elementsPackage.keywords.find((keyword) =>
  keyword.startsWith('https://github.com/'),
)!;
const gitSha = originUrl.match(/\/commit\/(\w+)$/)![1];
const repoSlug = originUrl.split('/').slice(3, 5).join('/');
const cachePath = join(projectRoot, 'node_modules/.cache/lyne-elements-readmes/readmes.json');
const readmeStorage: Record<string, ReadmeEntry> = existsSync(cachePath)
  ? JSON.parse(readFileSync(cachePath, 'utf-8'))
  : {};
const immutableAttributes = [
  'align-self',
  'sbb-badge',
  'sbb-dialog-close',
  'sbb-focus-initial',
  'sbb-overlay-close',
  'sbb-toast-close',
  'sbb-tooltip',
  'sbb-tooltip-open-delay',
  'sbb-tooltip-close-delay',
];

const treeResponse = await fetch(
  `https://api.github.com/repos/${repoSlug}/git/trees/${gitSha}?recursive=1`,
  { headers },
);
if (!treeResponse.ok) {
  throw new Error(`Failed to fetch git tree: ${treeResponse.status} ${treeResponse.statusText}`);
}
const tree: GitTree = await treeResponse.json();
const readmeEntries = tree.tree.filter(
  (e) => e.path.endsWith('/readme.md') && e.path.match(/src\/(elements|elements-experimental)/),
);
let changed = false;
for (const entry of readmeEntries) {
  const result = await updateReadme(entry);
  mergeReadme(entry);
  changed ||= result;
}
if (changed) {
  mkdirSync(dirname(cachePath), { recursive: true });
  writeFileSync(cachePath, JSON.stringify(readmeStorage, null, 2), 'utf-8');
}

async function updateReadme(entry: GitTreeEntry) {
  if (!readmeStorage[entry.path] || readmeStorage[entry.path].sha !== entry.sha) {
    const content = await fetch(entry.url!, { headers })
      .then((res) => res.json())
      .then(
        (data) =>
          Buffer.from(data.content, 'base64')
            .toString('utf-8')
            .split('<!-- Auto Generated Below -->')[0],
      );
    readmeStorage[entry.path] = {
      sha: entry.sha,
      created: new Date().toISOString(),
      content,
    };
    return true;
  }
  return false;
}

function mergeReadme(entry: GitTreeEntry) {
  const localPath = join(
    projectRoot,
    entry.path
      .replace('src/elements/', 'src/angular/')
      .replace('src/elements-experimental/', 'src/angular-experimental/'),
  );
  let newContent = readmeStorage[entry.path].content;
  if (existsSync(localPath)) {
    const content = readFileSync(localPath, 'utf-8');
    if (content.match(/<!--\s*#region\s+override\s+/)) {
      const overrideRegions = content
        .split(/<!--\s*#region\s+override\s+/)
        .slice(1)
        .map((part) => part.split(/<!--\s*#endregion/)[0])
        .map((part) => {
          return {
            region: part.split('-->')[0].trim(),
            content: part.substring(part.indexOf('\n')),
          };
        });
      for (const { region, content } of overrideRegions) {
        const [before, after] = newContent.split(new RegExp(`<!--\\s*#region\\s+${region}\\s*-->`));
        const endregion = after.match(/<!--\s*#endregion\s*-->/)!;
        newContent = `${before}<!-- #region override ${region} -->${content}${after.substring(endregion.index!)}`;
      }
    }
  }
  newContent = convertHtmlExamples(newContent);
  writeFileSync(localPath, newContent.trim() + '\n', 'utf-8');
}

function convertHtmlExamples(content: string) {
  if (!content.includes('```html')) {
    return content;
  }

  // This is a simplified DOM parser implementation. It WILL break
  // if any complex HTML usage is encountered (e.g. example="test\"").
  return content.replace(/(```html\n)([\s\S]*?)(\n```)/g, (html) =>
    html.replace(/<\w[\w\W]+?[^=]>/g, (tag) => {
      const firstWhitespace = tag.match(/\s+/);
      if (!firstWhitespace) {
        return tag;
      }
      const attributes: ParsedAttribute[] = [];
      let index = firstWhitespace.index! + firstWhitespace[0].length;
      let name = '',
        value: string | null = null;
      while (index < tag.length) {
        if (tag[index] === '/' || tag[index] === '>') {
          if (name) {
            attributes.push({ name, value, start: index - name.length, end: index });
          }
          index = Infinity;
        } else if (!name) {
          const substring = tag.substring(index);
          name = substring.substring(0, substring.search(/[\s=\/>]/));
          index += name.length;
        } else if (tag.substring(index, index + 1).match(/\s/)) {
          attributes.push({ name, value, start: index - name.length, end: index });
          name = '';
          index += tag.substring(index).search(/\S/);
        } else if (tag.substring(index, index + 1) === '=') {
          const substring = tag.substring(index + 1);
          if (substring[0] === '"' || substring[0] === "'") {
            value = substring.substring(1, substring.indexOf(substring[0], 1));
            const end = index + 2 + value.length + 1;
            attributes.push({ name, value, start: index - name.length, end });
            name = '';
            value = null;
            index = end + tag.substring(end).search(/\S/);
          } else if (substring[0] === '{' || substring.substring(0, 2) === '${') {
            let innerIndex = substring[0] === '$' ? 2 : 1;
            let counter = 1;
            while (counter > 0 && innerIndex <= substring.length) {
              if (substring[innerIndex] === '{') {
                counter++;
              } else if (substring[innerIndex] === '}') {
                counter--;
              }
              innerIndex++;
            }
            value = substring.substring(0, innerIndex);
            const end = index + 1 + value.length;
            attributes.push({ name, value, start: index - name.length, end });
            name = '';
            value = null;
            index = end + tag.substring(end).search(/\S/);
          } else {
            throw new Error(`Could not parse attributes: ${tag}`);
          }
        }
      }

      if (!attributes.length) {
        return tag;
      }

      for (const attribute of attributes.sort((a, b) => b.start - a.start)) {
        if (attribute.name === '...') {
          continue;
        }
        const beginning = tag.substring(0, attribute.start);
        const ending = tag.substring(attribute.end);
        if (attribute.name.startsWith('.') || attribute.name.startsWith('?')) {
          tag = `${beginning}[${convertAttributeName(attribute.name.substring(1))}]="${convertAttributeValue(attribute.value!)}"${ending}`;
        } else if (attribute.name.startsWith('@')) {
          tag = `${beginning}(${convertAttributeName(attribute.name.substring(1))})="${convertAttributeValue(attribute.value!)}"${ending}`;
        } else if (
          attribute.name.includes('-') &&
          !attribute.name.startsWith('aria-') &&
          !immutableAttributes.includes(attribute.name)
        ) {
          if (attribute.value) {
            tag = `${beginning}${convertAttributeName(attribute.name)}="${convertAttributeValue(attribute.value!)}"${ending}`;
          } else {
            tag = `${beginning}${convertAttributeName(attribute.name)}${ending}`;
          }
        }
      }

      return tag;
    }),
  );
}

function convertAttributeName(name: string): string {
  return name.replace(/-./g, (m) => m[1].toUpperCase());
}

function convertAttributeValue(value: string): string {
  if (value.startsWith('${')) {
    return value.substring(2, value.length - 1);
  } else if (value.startsWith('{')) {
    return value.substring(2, value.length - 1);
  }
  return value;
}

interface Package {
  name: string;
  keywords: string[];
  exports: Record<string, unknown>;
}

interface GitTreeEntry {
  path: string;
  mode: string;
  type: string;
  sha: string;
  size?: number;
  url?: string;
  [k: string]: unknown;
}

interface GitTree {
  sha: string;
  url?: string;
  truncated: boolean;
  /**
   * Objects specifying a tree structure
   */
  tree: GitTreeEntry[];
  [k: string]: unknown;
}

interface ReadmeEntry {
  sha: string;
  created: string;
  content: string;
}

interface ParsedAttribute {
  name: string;
  value: string | null;
  start: number;
  end: number;
}
