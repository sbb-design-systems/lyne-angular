import type { TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';

/**
 * Converts a PascalCase class name to kebab-case.
 * e.g. 'TagFilterExample' -> 'tag-filter-example'
 */
function toKebabCase(name: string): string {
  return name.replace(/([A-Z])/g, (_m, c: string, offset: number) =>
    offset === 0 ? c.toLowerCase() : `-${c.toLowerCase()}`,
  );
}

/**
 * Finds a named string-valued property in an ObjectExpression and returns its
 * Literal value node and string value, or null when the property is absent or
 * not a plain string literal.
 */
function getStringProperty(
  obj: TSESTree.ObjectExpression,
  key: string,
): { node: TSESTree.Literal; value: string } | null {
  const prop = obj.properties.find(
    (p): p is TSESTree.Property =>
      p.type === 'Property' &&
      !p.computed &&
      p.key.type === 'Identifier' &&
      (p.key as TSESTree.Identifier).name === key &&
      p.value.type === 'Literal' &&
      typeof (p.value as TSESTree.Literal).value === 'string',
  );
  if (!prop) {
    return null;
  }
  const literal = prop.value as TSESTree.Literal;
  return { node: literal, value: literal.value as string };
}

export default ESLintUtils.RuleCreator.withoutDocs({
  defaultOptions: [],
  meta: {
    fixable: 'code',
    type: 'problem',
    schema: [],
    hasSuggestions: false,
    docs: {
      description:
        'Ensures that example components inside the docs examples directories have only ' +
        'private/protected members (no public), that the @Component selector, templateUrl and ' +
        'styleUrl are consistent with the class name, and that every Sbb* entry in imports ends ' +
        'with "Module".',
    },
    messages: {
      noPublicMember: 'Members of example components must be "private" or "protected", not public.',
      selectorMismatch:
        'The selector "{{actual}}" does not match the expected "{{expected}}" derived from the class name "{{className}}".',
      templateUrlMismatch:
        'The templateUrl "{{actual}}" does not match the expected "{{expected}}" derived from the class name "{{className}}".',
      styleUrlMismatch:
        'The styleUrl "{{actual}}" does not match the expected "{{expected}}" derived from the class name "{{className}}".',
      importNotModule:
        'The import "{{name}}" starts with "Sbb" but does not end with "Module". Only NgModule-style imports (e.g. SbbTagModule) are allowed for Sbb* identifiers.',
    },
  },

  create(context) {
    return {
      ClassDeclaration(node: TSESTree.ClassDeclaration) {
        const className = node.id?.name;
        if (!className) {
          return;
        }

        // ── 1. Selector / templateUrl / styleUrl consistency ──────────────
        const kebab = toKebabCase(className);
        const expectedSelector = `sbb-${kebab}`;
        const expectedTemplateUrl = `${kebab}.html`;
        const expectedStyleUrl = `${kebab}.scss`;

        const componentDecorator = node.decorators?.find(
          (d): d is TSESTree.Decorator =>
            d.expression.type === 'CallExpression' &&
            (d.expression as TSESTree.CallExpression).callee.type === 'Identifier' &&
            ((d.expression as TSESTree.CallExpression).callee as TSESTree.Identifier).name ===
              'Component',
        );

        if (componentDecorator) {
          const callExpr = componentDecorator.expression as TSESTree.CallExpression;
          const optionsArg = callExpr.arguments[0];

          if (optionsArg?.type === 'ObjectExpression') {
            // selector
            const selectorProp = getStringProperty(optionsArg, 'selector');
            if (selectorProp && selectorProp.value !== expectedSelector) {
              context.report({
                node: selectorProp.node,
                messageId: 'selectorMismatch',
                data: { actual: selectorProp.value, expected: expectedSelector, className },
                fix: (fixer) => fixer.replaceText(selectorProp.node, `'${expectedSelector}'`),
              });
            }

            // templateUrl
            const templateUrlProp = getStringProperty(optionsArg, 'templateUrl');
            if (templateUrlProp) {
              const actualBasename = templateUrlProp.value.replace(/^\.\//, '');
              if (actualBasename !== expectedTemplateUrl) {
                context.report({
                  node: templateUrlProp.node,
                  messageId: 'templateUrlMismatch',
                  data: { actual: templateUrlProp.value, expected: expectedTemplateUrl, className },
                  fix: (fixer) =>
                    fixer.replaceText(templateUrlProp.node, `'${expectedTemplateUrl}'`),
                });
              }
            }

            // styleUrl (Angular 17+ single-file variant)
            const styleUrlProp = getStringProperty(optionsArg, 'styleUrl');
            if (styleUrlProp) {
              const actualBasename = styleUrlProp.value.replace(/^\.\//, '');
              if (actualBasename !== expectedStyleUrl) {
                context.report({
                  node: styleUrlProp.node,
                  messageId: 'styleUrlMismatch',
                  data: { actual: styleUrlProp.value, expected: expectedStyleUrl, className },
                  fix: (fixer) => fixer.replaceText(styleUrlProp.node, `'${expectedStyleUrl}'`),
                });
              }
            }

            // ── 2. imports: every Sbb* identifier must end with "Module" ──
            const importsProp = optionsArg.properties.find(
              (p): p is TSESTree.Property =>
                p.type === 'Property' &&
                !p.computed &&
                p.key.type === 'Identifier' &&
                (p.key as TSESTree.Identifier).name === 'imports' &&
                p.value.type === 'ArrayExpression',
            );

            if (importsProp) {
              const arrayExpr = importsProp.value as TSESTree.ArrayExpression;
              for (const element of arrayExpr.elements) {
                if (element?.type === 'Identifier') {
                  const name = (element as TSESTree.Identifier).name;
                  if (name.startsWith('Sbb') && !name.endsWith('Module')) {
                    context.report({
                      node: element,
                      messageId: 'importNotModule',
                      data: { name },
                    });
                  }
                }
              }
            }
          }
        }

        // ── 3. No public class members ────────────────────────────────────
        for (const member of node.body.body) {
          // Constructor: check only parameter properties, skip the method itself.
          if (member.type === 'MethodDefinition' && member.kind === 'constructor') {
            for (const param of member.value.params) {
              if (
                param.type === 'TSParameterProperty' &&
                param.accessibility !== 'private' &&
                param.accessibility !== 'protected'
              ) {
                context.report({ node: param, messageId: 'noPublicMember' });
              }
            }
            continue;
          }

          if (
            (member.type === 'MethodDefinition' || member.type === 'PropertyDefinition') &&
            member.accessibility !== 'private' &&
            member.accessibility !== 'protected'
          ) {
            context.report({ node: member, messageId: 'noPublicMember' });
          }
        }
      },
    };
  },
});
