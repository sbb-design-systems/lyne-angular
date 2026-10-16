# AGENTS.md

Angular wrapper for the Lyne Web Components (`@sbb-esta/lyne-elements`, Lit-based). Yarn + Angular CLI monorepo (see `.nvmrc`).

## Architecture

- `src/angular` → `@sbb-esta/lyne-angular`; `src/angular-experimental` → `@sbb-esta/lyne-angular-experimental`; `src/docs` → docs app (Angular app, examples + generated API docs).
- Each component is a **secondary entry point**: `src/angular/<name>/{index.ts,ng-package.json,<name>.module.ts,readme.md}` plus one folder per element (`<name>/<name>/<name>.ts` + `.spec.ts`). Imports use `@sbb-esta/lyne-angular/<name>`.
- Wrappers are **attribute-less `@Directive`s** with the element's tag as selector (e.g. `sbb-button`), not components. They call `XElement.define()` in a `static {}` block, import from `@sbb-esta/lyne-elements/<x>.pure.js`, and expose each element property as `@Input` setter/getter writing to `nativeElement` inside `ngZone.runOutsideAngular` (see `src/angular/button/button/button.ts`). Boolean inputs use `booleanAttribute` from `@sbb-esta/lyne-angular/core`.
- `src/angular/core` holds shared helpers: forms value accessors (`forms/`), `overlay/`, `datetime/`, `trigger-base.ts`, `testing/`.
- Each `*.module.ts` lists wrappers in `SBB_<NAME>_EXPORTED_DECLARATIONS` and imports/exports them.

## Wrapper code is generated, don't hand-write

The custom ESLint rules in `tools/eslint/` (e.g. `angular-generator-rule.ts`) read `node_modules/@sbb-esta/lyne-elements/custom-elements.json` and create/update wrappers, specs, `index.ts`, `ng-package.json`, modules, outputs, and JSDoc. **Run `yarn lint:fix` after any change** (or after bumping lyne-elements via `yarn update-lyne`) to regenerate. Events with camelCase output names are mapped in `CAMEL_CASE_EVENTS_MAP`; `input`/`change`/`validity` get no `@Output`. Use `@excludeJSDocOverride` to keep hand-written JSDoc. Other rules enforce example structure/ids, module exports, and spec `describe` titles.

## Upstream: `lyne-components` (sibling repo, `../lyne-components`)

- Source of the elements (`src/elements`, `src/elements-experimental`, Lit `SbbElement` subclasses) and of `custom-elements.json`, generated there by `yarn docs:manifest:elements[-experimental]` (`tools/manifest/`). This repo consumes the published `-dev` npm build, not the local checkout.
- Element entry points: `x.pure.ts` (no side effects, what wrappers import) vs `x.ts` (calls `define()`).
- Upstream boolean props default to `false` (hence `booleanAttribute`); events are lowercase DOM names, which the generator maps to camelCase outputs.
- To check a missing/changed property, read `../lyne-components/src/elements/<x>/<x>/<x>.component.ts`; to test unreleased upstream changes, `yarn update-lyne` or link the built `dist`. Upstream rules: don't run state-modifying commands or git unless asked.

## Workflows

- `yarn start` – compodoc + docs dev server. `yarn build` – all packages, schematics, docs.
- Tests (Vitest browser/Playwright, `postinstall` installs browsers): `yarn test:angular`, `test:angular-experimental`, `test:docs`, `test:angular-schematics`, `test:tsc`. Single package: `yarn ng test angular`.
- `yarn generate-example <component>/<component>-<example-name> [--scss]` scaffolds a docs example from `tools/generate-example/boilerplate` (then runs `lint:fix`). Examples live in `src/docs/app/angular/examples/` and must be prefixed with the component name.
- `yarn readme` merges per-component `readme.md` into docs (skipped when `CI` is set); `yarn integrity` = format + readme. Run before committing.
- Schematics (`ng-add`, `ng-update`, migrations) in `src/angular/schematics`, built via `build:angular:schematics`.

## Conventions

- Conventional Commits (commitlint + husky), lines ≤100 chars; releases via release-please. See `docs/CONTRIBUTING.md`.
- Prettier formatting (`yarn format`); ESLint flat configs per project (`eslint.config.ts`, `src/angular/eslint.config.ts`).
- `@sbb-esta/lyne-elements` is pinned to the `v5-dev` npm alias; the wrapper API must track the upstream manifest.
- Cross-entry-point imports use package names (`@sbb-esta/lyne-angular/core`), never relative paths.
