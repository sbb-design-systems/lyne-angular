/**
 * This scripts starts the angular, angular-experimental and showcase
 * build/watches in sequence. This is necessary, as angular-experimental
 * might fail, if angular is in the process of being built and the showcase
 * might fail if any of the other are in the process of being built.
 */

import { type ChildProcess, spawn } from 'node:child_process';

const cwd = new URL('../', import.meta.url);

try {
  const kill = serve();
  process.on('SIGINT', () => {
    kill();
    process.exit();
  });
} catch (e) {}

function serve() {
  const children: ChildProcess[] = [];
  const [angularBuild, angularReady] = startBuild('angular');
  children.push(angularBuild);
  angularReady.then(() => {
    const [angularExperimentalBuild, angularExperimentalReady] = startBuild('angular-experimental');
    children.push(angularExperimentalBuild);

    angularExperimentalReady.then(() => {
      const [showcase] = startBuild('showcase');
      children.push(showcase);
    });
  });

  return () => {
    for (const child of children) {
      child.kill();
    }
  };
}

function startBuild(project: string) {
  const readyMarker = 'Compilation complete. Watching for file changes';
  const build = spawn('yarn', [`watch:${project}`], {
    cwd,
    stdio: ['inherit', 'pipe', 'inherit'],
  }).on('error', (e) => console.error(e));
  build.stdout!.pipe(process.stdout);
  const ready = new Promise<void>((resolve, reject) => {
    build.stdout.on('data', (chunk) => {
      if (chunk.toString().includes(readyMarker)) {
        resolve();
      }
    });
    build
      .on('close', () => reject('Build closed'))
      .on('error', (e) => reject(`Build failed: ${e}`));
  });
  return [build, ready] as const;
}
