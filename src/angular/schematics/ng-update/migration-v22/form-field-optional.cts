import { TargetVersion } from '@angular/cdk/schematics';
import { parseTemplate, TmplAstElement, TmplAstNode, TmplAstTemplate } from '@angular/compiler';

import { AddCommentBase, AddCommentMigrationConfig, ResourceMatch } from './add-comment-base.cjs';

export class FormFieldOptionalMigration extends AddCommentBase {
  protected override readonly config: AddCommentMigrationConfig = {
    targetVersion: TargetVersion.V22,
    rules: [
      {
        kind: 'custom',
        name: 'sbb-form-field[optional]',
        templateMatcher(content: string): ResourceMatch[] {
          function visitElements(nodes: TmplAstNode[], cb: (el: TmplAstElement) => void): void {
            for (const node of nodes) {
              if (node instanceof TmplAstElement) {
                cb(node);
                visitElements(node.children, cb);
              } else if (node instanceof TmplAstTemplate) {
                // Descend into *ngIf / *ngFor structural directive hosts too.
                visitElements(node.children, cb);
              }
            }
          }

          const ast = parseTemplate(content, '', {
            preserveWhitespaces: true,
            preserveLineEndings: true,
            leadingTriviaChars: [],
          });

          const matches: ResourceMatch[] = [];
          const commentText = `FIXME: The "optional" attribute on \`<sbb-form-field>\` has been removed. Check: https://github.com/sbb-design-systems/lyne-components/pull/4931`;

          visitElements(ast.nodes, (el) => {
            if (el.name !== 'sbb-form-field') {
              return;
            }

            const hasStaticAttr = el.attributes.some((a) => a.name === 'optional');
            const hasBoundAttr = el.inputs.some((i) => i.name === 'optional');

            if (hasStaticAttr || hasBoundAttr) {
              matches.push({ index: el.sourceSpan.start.offset, commentText });
            }
          });

          return matches;
        },
      },
    ],
  };
}
