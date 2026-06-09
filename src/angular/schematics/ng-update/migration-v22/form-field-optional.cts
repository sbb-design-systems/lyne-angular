import { TargetVersion } from '@angular/cdk/schematics';
import { parseTemplate } from '@angular/compiler';

import { AddCommentBase, AddCommentMigrationConfig, ResourceMatch } from './add-comment-base.cjs';
import { visitElements } from '../../utils.cjs';

export class FormFieldOptionalMigration extends AddCommentBase {
  protected override readonly config: AddCommentMigrationConfig = {
    targetVersion: TargetVersion.V22,
    rules: [
      {
        kind: 'custom',
        name: 'sbb-form-field[optional]',
        templateMatcher(content: string): ResourceMatch[] {
          const ast = parseTemplate(content, '', {
            preserveWhitespaces: true,
            preserveLineEndings: true,
            leadingTriviaChars: [],
          });
          const matches: ResourceMatch[] = [];
          const commentText = `
            FIXME: The "optional" attribute on \`<sbb-form-field>\` is not allowed anymore.
            Check: https://lyne-angular.app.sbb.ch/angular/components/form-field/overview#visualization-of-coderequiredcode--optional-state and https://github.com/sbb-design-systems/lyne-components/pull/4931
          `;

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
