import { execSync, type ExecSyncOptions } from 'node:child_process';
import {
  existsSync,
  globSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { format, resolveConfig } from 'prettier';

if (process.env['CI']) {
  // We do not update the readmes in CI, as they cannot be committed back to the repository.
  process.exit(0);
}

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const gitHubDomain = 'https://github.com/';
const elementsPackage: Package = JSON.parse(
  readFileSync(join(projectRoot, 'node_modules/@sbb-esta/lyne-elements/package.json'), 'utf-8'),
);
const originUrl = elementsPackage.keywords.find((keyword) => keyword.startsWith(gitHubDomain))!;
const gitSha = originUrl.match(/\/commit\/(\w+)$/)![1];
const repoSlug = originUrl.split('/').slice(3, 5).join('/');
const cachePath = join(projectRoot, 'node_modules/.cache/lyne-elements-readmes', gitSha);
if (!existsSync(cachePath) || !existsSync(join(cachePath, 'package.json'))) {
  mkdirSync(cachePath, { recursive: true });
  const options: ExecSyncOptions = { cwd: cachePath, stdio: 'inherit' };
  execSync('git init', options);
  execSync(`git remote add origin ${gitHubDomain}${repoSlug}.git`, options);
  execSync(`git fetch --depth 1 origin ${gitSha}`, options);
  execSync('git checkout FETCH_HEAD', options);
}

const aWeekAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
for (const dir of readdirSync(dirname(cachePath), { withFileTypes: true })
  .filter(
    (d) =>
      d.isDirectory() && d.name !== gitSha && statSync(join(d.parentPath, d.name)).ctime < aWeekAgo,
  )
  .map((d) => join(d.parentPath, d.name))) {
  console.log(`Removing old cache directory ${relative(projectRoot, dir)}`);
  rmSync(dir, { force: true });
}

const readmeMap = globSync(join(cachePath, '**/readme.md'))
  .filter((path) => path.includes('src/elements/') || path.includes('src/elements-experimental/'))
  .reduce(
    (map, path) =>
      map.set(
        relative(cachePath, path),
        readFileSync(path, 'utf-8').split('<!-- Auto Generated Below -->')[0],
      ),
    new Map<string, string>(),
  );
const immutableAttributes = [
  'align-self',
  'sbb-badge',
  'sbb-badge-position',
  'sbb-dialog-close',
  'sbb-focus-initial',
  'sbb-navigation-close',
  'sbb-navigation-section-close',
  'sbb-overlay-close',
  'sbb-popover-close',
  'sbb-toast-close',
  'sbb-stepper-next',
  'sbb-stepper-previous',
  'sbb-tooltip',
  'sbb-tooltip-open-delay',
  'sbb-tooltip-close-delay',
  'sbb-tooltip-position',
];

for (const [path, content] of Array.from(readmeMap)) {
  await mergeReadme(path, content);
}

async function mergeReadme(path: string, newContent: string) {
  const localPath = join(
    projectRoot,
    path
      .replace('src/elements/', 'src/angular/')
      .replace('src/elements-experimental/', 'src/angular-experimental/'),
  );
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
        if (!newContent.match(new RegExp(`<!--\\s*#region\\s+${region}\\s*-->`))) {
          throw new Error(`Missing region ${region} in ${relative(projectRoot, localPath)}`);
        }

        const [before, after] = newContent.split(new RegExp(`<!--\\s*#region\\s+${region}\\s*-->`));
        const endregion = after.match(/<!--\s*#endregion\s*-->/)!;
        newContent = `${before}<!-- #region override ${region} -->${content}${after.substring(endregion.index!)}`;
      }
    }
  }
  newContent = convertHtmlExamples(newContent);
  const options = await resolveConfig(localPath);
  writeFileSync(
    localPath,
    await format(newContent.trim() + '\n', { ...options, filepath: localPath }),
    'utf8',
  );
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

interface ParsedAttribute {
  name: string;
  value: string | null;
  start: number;
  end: number;
}
