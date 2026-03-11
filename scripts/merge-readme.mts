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
  writeFileSync(localPath, newContent.trim() + '\n', 'utf-8');
}

/*
TODO
function convertHtmlExamples(content: string) {
  if (!content.includes('```html')) {
    return content;
  }

  return content.replace(/```html\n([\s\S]*?)```/g, (_, html) => {

  });
}
*/

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
