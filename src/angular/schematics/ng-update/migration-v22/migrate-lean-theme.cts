import { TargetVersion } from '@angular/cdk/schematics';
import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { addThemeToProject, getProjectName } from '../../utils.cjs';
import { AddCommentBase, AddCommentMigrationConfig, ResourceMatch } from './add-comment-base.cjs';

const DEFAULT_LEAN_THEME_PATH = 'node_modules/@sbb-esta/lyne-elements/lean-theme.css';

/** Matches `sbb-lean` inside a `class="..."` attribute on the `<html>` tag. */
const HTML_TAG_LEAN_PATTERN =
  /(<html\b[^>]*?\bclass=["'])([^"']*?\bsbb-lean\b[^"']*?)(["'][^>]*>)/gi;

/**
 * Searches for `sbb-lean` class in HTML tag; if found,
 * it strips it, add the default lean theme to the `angular.json`
 * and adds a FIXME for consumers.
 */
export function handleLeanThemeConfiguration(): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    let foundOnHtmlTag = false;

    tree.visit((path) => {
      if (path.includes('node_modules') || !path.endsWith('.html')) {
        return;
      }

      const content = tree.read(path)?.toString('utf-8') ?? '';
      HTML_TAG_LEAN_PATTERN.lastIndex = 0;
      if (!HTML_TAG_LEAN_PATTERN.test(content)) {
        return;
      }

      foundOnHtmlTag = true;
      HTML_TAG_LEAN_PATTERN.lastIndex = 0;

      const updated = content.replace(
        HTML_TAG_LEAN_PATTERN,
        (_match, before: string, classValue: string, after: string) => {
          const stripped = classValue
            .replace(/\bsbb-lean\b/g, '')
            .replace(/\s{2,}/g, ' ')
            .trim();

          const comment = `<!--
  FIXME:
   The legacy \`sbb-lean\` class has been found and removed from the <html> tag, and the default lean theme import has been added.
   If you want a different theme or off-brand or safety variant, please check and adapt your \`angular-json\`.
-->`;

          if (stripped.length === 0) {
            const tag = `${before.replace(/\s*class=["']$/, '')}${after.replace(/^["']/, '')}`;
            return `${comment}\n${tag}`;
          }

          return `${comment}\n${before}${stripped}${after}`;
        },
      );

      tree.overwrite(path, updated);
    });

    if (!foundOnHtmlTag) {
      return;
    }

    context.logger.warn(`
   The legacy \`sbb-lean\` class has been found and removed from the <html> tag, and the default lean theme import has been added.
   If you want a different one, or an 'off-brand' or 'safety' variant, please check and adapt your \`angular-json\`.
`);

    const workspace = await getWorkspace(tree);
    const projectName = getProjectName({}, workspace);

    return chain([
      addThemeToProject(projectName, 'build', DEFAULT_LEAN_THEME_PATH, context.logger),
      addThemeToProject(projectName, 'test', DEFAULT_LEAN_THEME_PATH, context.logger),
    ]);
  };
}

/**
 * Searches for `sbb-lean` class in not-HTML tag; if found, adds a FIXME for consumers.
 */
export class LeanClassMigration extends AddCommentBase {
  protected readonly config: AddCommentMigrationConfig = {
    targetVersion: TargetVersion.V22,
    rules: [
      {
        kind: 'custom',
        name: 'sbb-lean-warnings',
        templateMatcher: (content: string) => {
          const matches: ResourceMatch[] = [];
          const regex = /(?<![\w-])sbb-lean(?![\w-])/g;
          let match: RegExpExecArray | null;

          while ((match = regex.exec(content)) !== null) {
            matches.push({
              index: match.index,
              commentText: `FIXME: legacy \`sbb-lean\` class detected on this element. Adapt the element styling if necessary.`,
            });
          }

          return matches;
        },
      },
    ],
  };
}
