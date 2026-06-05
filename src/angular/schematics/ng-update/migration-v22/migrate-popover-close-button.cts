import { ResolvedResource } from '@angular/cdk/schematics';
import { parseTemplate, TmplAstBoundAttribute, TmplAstElement } from '@angular/compiler';

import {
  AttributeMigrationBase,
  MigrationEdit,
  queueFixmeComment,
} from './attribute-migration-base.cjs';
import { visitElements } from '../../utils.cjs';

const PR_URL = 'https://github.com/sbb-design-systems/lyne-components/pull/4937';

/**
 * Migration for `<sbb-popover>` following the removal of `hideCloseButton`.
 *
 * The close button is no longer part of the popover host; it must be slotted
 * explicitly via `<sbb-popover-close-button>`. The migration handles three
 * cases:
 *
 * 1. `hideCloseButton` present as a static attribute (boolean or `="true"`):
 *    → remove the attribute. The popover will have no close button, which
 *    matches the original intent.
 *
 * 2. `[hideCloseButton]="true"` (bound input with literal `true`):
 *    → same as above; remove the binding.
 *
 * 3. `[hideCloseButton]="expression"` (dynamic value):
 *    → cannot auto-migrate; insert a FIXME comment above the element.
 *
 * 4. No `hideCloseButton` attribute at all:
 *    → the original popover was showing a close button by default; insert
 *    `<sbb-popover-close-button>` as the last child to preserve behaviour.
 *    → also, transfer the 'accessibilityCloseLabel' from the `popover` to the `<sbb-popover-close-button>`
 */
export class MigratePopoverCloseButton extends AttributeMigrationBase {
  protected override collectEdits(
    template: ResolvedResource,
    edits: MigrationEdit[],
    nextIndex: () => number,
    fullSource: string,
  ): void {
    const content = template.content;

    const ast = parseTemplate(content, '', {
      preserveWhitespaces: true,
      preserveLineEndings: true,
      leadingTriviaChars: [],
    });

    visitElements(ast.nodes, (el) => {
      if (el.name !== 'sbb-popover') {
        return;
      }

      const staticHide = el.attributes.find(
        (a) => a.name === 'hideCloseButton' || a.name === 'hide-close-button',
      );
      const boundHide = el.inputs.find((i) => i.name === 'hideCloseButton') as
        | TmplAstBoundAttribute
        | undefined;

      if (staticHide) {
        // Case 1: static boolean attr or `hideCloseButton="true"` → remove it.
        this._queueAttrRemoval(
          content,
          template,
          staticHide.sourceSpan.start.offset,
          staticHide.sourceSpan.end.offset,
          edits,
          nextIndex,
        );
      } else if (boundHide) {
        const rawValue = boundHide.valueSpan
          ? content.slice(boundHide.valueSpan.start.offset, boundHide.valueSpan.end.offset).trim()
          : '';

        if (rawValue === 'true') {
          // Case 2: `[hideCloseButton]="true"` → remove the binding.
          this._queueAttrRemoval(
            content,
            template,
            boundHide.sourceSpan.start.offset,
            boundHide.sourceSpan.end.offset,
            edits,
            nextIndex,
          );
        } else {
          // Case 3: dynamic expression — cannot safely auto-migrate.
          queueFixmeComment(
            fullSource,
            edits,
            nextIndex(),
            template,
            template.start + el.sourceSpan.start.offset,
            `FIXME: '[hideCloseButton]' on <sbb-popover> has been removed. ` +
              `Conditionally render <sbb-popover-close-button> instead. Check: ${PR_URL}`,
          );
        }
      } else {
        // Case 4: no hideCloseButton → the close button was shown by default;
        // insert <sbb-popover-close-button> to preserve that behavior.
        if (!el.endSourceSpan) {
          return;
        }

        // Idempotency: skip if the child was already added by a previous run.
        const hasCloseButton = el.children.some(
          (child) => child instanceof TmplAstElement && child.name === 'sbb-popover-close-button',
        );
        if (hasCloseButton) {
          return;
        }

        // Transfer the a11y label from the old input to the `sbb-popover-close-button`
        const a11yLabelAttr = el.attributes.find(
          (attr) =>
            attr.name === 'accessibility-close-label' || attr.name === 'accessibilityCloseLabel',
        );
        const a11yLabelInput = el.inputs.find((attr) => attr.name === 'accessibilityCloseLabel');
        const staticA11yLabel = a11yLabelAttr?.value;
        const boundA11Label = a11yLabelInput?.valueSpan
          ? content
              .slice(a11yLabelInput.valueSpan.start.offset, a11yLabelInput.valueSpan.end.offset)
              .trim()
          : '';

        const a11yAriaLabel = staticA11yLabel
          ? `aria-label="${staticA11yLabel}"`
          : boundA11Label
            ? `[aria-label]="${boundA11Label}"`
            : '';

        // Remove the 'accessibilityCloseLabel' property
        if (a11yLabelAttr || a11yLabelInput) {
          this._queueAttrRemoval(
            content,
            template,
            (a11yLabelAttr || a11yLabelInput)!.sourceSpan.start.offset,
            (a11yLabelAttr || a11yLabelInput)!.sourceSpan.end.offset,
            edits,
            nextIndex,
          );
        }

        const endTagOffset = el.endSourceSpan.start.offset;
        // Start of the line that contains `</sbb-popover>`.
        const lineStart = Math.max(0, content.lastIndexOf('\n', endTagOffset - 1) + 1);
        // Indentation of the closing tag → used to derive child indentation.
        const closingTagIndent = content.slice(lineStart, endTagOffset).match(/^\s*/)?.[0] ?? '';
        const contentIndent = `${closingTagIndent}  `;

        edits.push({
          // Insert before the closing-tag line so indentation is preserved.
          offset: template.start + lineStart,
          index: nextIndex(),
          length: 0,
          insertion: `${contentIndent}<sbb-popover-close-button ${a11yAriaLabel}></sbb-popover-close-button>\n`,
          log: () =>
            this.logger.info(
              `  → Added <sbb-popover-close-button> to <sbb-popover> in ${template.filePath}`,
            ),
        });
      }
    });
  }

  /**
   * Queues removal of an attribute span, extending the range leftward to also
   * consume the whitespace that separates it from the preceding attribute or
   * the tag name.
   */
  private _queueAttrRemoval(
    content: string,
    template: ResolvedResource,
    attrStart: number,
    attrEnd: number,
    edits: MigrationEdit[],
    nextIndex: () => number,
  ): void {
    // Walk backwards past spaces/tabs to include the leading whitespace.
    let wsStart = attrStart - 1;
    while (wsStart >= 0 && (content[wsStart] === ' ' || content[wsStart] === '\t')) {
      wsStart--;
    }
    const removeFrom = wsStart + 1;

    edits.push({
      offset: template.start + removeFrom,
      index: nextIndex(),
      length: attrEnd - removeFrom,
      log: () =>
        this.logger.info(
          `  → Removed 'hideCloseButton' from <sbb-popover> in ${template.filePath}`,
        ),
    });
  }
}
