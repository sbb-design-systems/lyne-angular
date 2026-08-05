import type { TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';

// ── Angular template AST helpers ──────────────────────────────────────────────
// The angular-eslint v22 template parser exposes nodes with types like 'Element',
// 'BoundAttribute' and 'BoundEvent'. We use `any` to stay decoupled from the
// internal @angular/compiler types and keep the import footprint minimal.

/** Returns true when the node carries the given attribute as a static value. */
function hasStaticAttr(node: AngularElement, attrName: string): boolean {
  return node.attributes.some((a) => a.name === attrName);
}

/** Returns true when the node carries the given attribute as a bound input. */
function hasBoundAttr(node: AngularElement, attrName: string): boolean {
  return node.inputs.some((a) => a.name === attrName || a.name === `attr.${attrName}`);
}

/** Returns true when the node carries the given attribute in any form. */
function hasAttr(node: AngularElement, attrName: string): boolean {
  return hasStaticAttr(node, attrName) || hasBoundAttr(node, attrName);
}

/** Returns true when the node's static class list contains `className`. */
function hasClass(node: AngularElement, className: string): boolean {
  const classAttr = node.attributes.find((a) => a.name === 'class');
  return classAttr ? classAttr.value.split(/\s+/).includes(className) : false;
}

/** Minimal shape of an angular-eslint template element node. */
interface AngularAttr {
  name: string;
  value: string;
}
interface AngularElement {
  type: string;
  name: string;
  attributes: AngularAttr[];
  inputs: AngularAttr[];
  children: unknown[];
  // ESLint-compatible location supplied by the template parser
  loc: TSESTree.SourceLocation;
  range: [number, number];
}

/** Casts an unknown child node to AngularElement if it is one, otherwise null. */
function asElement(node: unknown): AngularElement | null {
  const n = node as Record<string, unknown>;
  return n && n['type'] === 'Element' ? (n as unknown as AngularElement) : null;
}

// ── Rule ──────────────────────────────────────────────────────────────────────

export default ESLintUtils.RuleCreator.withoutDocs({
  defaultOptions: [],
  meta: {
    type: 'problem',
    schema: [],
    fixable: undefined,
    hasSuggestions: false,
    docs: {
      description:
        'Inside elements with class "sbb-controls-table", every <label> must either have a ' +
        '"for" attribute or be immediately followed by a control with an "aria-label" attribute.',
    },
    messages: {
      labelMissingAssociation:
        'This <label> inside "sbb-controls-table" has no "for" attribute, and the immediately ' +
        'following sibling control has no "aria-label". ' +
        'Add "for" to the label (matching the control\'s "id") or add "aria-label" to the control.',
    },
  },

  create(context) {
    // Return a visitor map. TypeScript sees this as `{ [key: string]: fn }` which
    // is compatible with RuleListener. The `any` type is intentional: the template
    // parser provides Angular AST nodes, not TypeScript ESTree nodes.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const visitors: Record<string, (node: any) => void> = {
      // Angular-eslint v22 uses 'Element' (not 'Element$1') as the node type for HTML elements.
      Element(rawNode: unknown): void {
        const node = asElement(rawNode);
        if (!node) {
          return;
        }

        // Only process elements that carry the sbb-controls-table class.
        if (!hasClass(node, 'sbb-controls-table')) {
          return;
        }

        // Collect direct child *elements* (skip text, comment and other nodes).
        const childElements = node.children
          .map(asElement)
          .filter((c): c is AngularElement => c !== null);

        for (let i = 0; i < childElements.length; i++) {
          const child = childElements[i];
          if (child.name !== 'label') {
            continue;
          }

          // A label with a 'for' (or bound '[for]') attribute is correctly associated.
          if (hasAttr(child, 'for')) {
            continue;
          }

          // Without 'for', the immediately following sibling must provide aria-label.
          const next = childElements[i + 1];
          if (next && hasAttr(next, 'aria-label')) {
            continue;
          }

          // Report the error on the opening tag of the offending label.
          context.report({
            // Cast to TSESTree.Node – the angular-eslint AST node is ESLint-compatible
            // (has loc/range), so ESLint accepts it for error location purposes.
            node: child as unknown as TSESTree.Node,
            messageId: 'labelMissingAssociation',
          });
        }
      },
    };

    // Cast to RuleListener – necessary because TSESTree-typed RuleListener doesn't
    // know about angular-eslint specific visitor names like 'Element$1'.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return visitors as any;
  },
});
