import { TargetVersion } from '@angular/cdk/schematics';
import { parseTemplate } from '@angular/compiler';

import {
  AddCommentBase,
  AddCommentMigrationConfig,
  ResourceMatch,
  visitElements,
} from './add-comment-base.cjs';

export class CalendarWideMigration extends AddCommentBase {
  protected override readonly config: AddCommentMigrationConfig = {
    targetVersion: TargetVersion.V22,
    rules: [
      {
        kind: 'custom',
        name: 'calendar[wide]',
        templateMatcher(content: string): ResourceMatch[] {
          const ast = parseTemplate(content, '', {
            preserveWhitespaces: true,
            preserveLineEndings: true,
            leadingTriviaChars: [],
          });
          const matches: ResourceMatch[] = [];
          const commentText = `FIXME: The "wide" attribute on \`<sbb-calendar>\` is not allowed anymore. Check: https://github.com/sbb-design-systems/lyne-components/pull/4940`;

          visitElements(ast.nodes, (el) => {
            if (el.name !== 'sbb-calendar') {
              return;
            }

            const hasStaticAttr = el.attributes.some((a) => a.name === 'wide');
            const hasBoundAttr = el.inputs.some((i) => i.name === 'wide');

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
