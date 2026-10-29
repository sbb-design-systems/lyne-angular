import type { ParseSourceSpan, TmplAstElement } from '@angular/compiler';
import { BindingType } from '@angular/compiler';
import type { Rule } from '@angular-devkit/schematics';

import type { MigrationScope } from '../../utils.cjs';
import { visitElements } from '../../utils.cjs';
import type {
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
  TypeMigration,
} from '../common.cjs';
import {
  attributeNameVariants,
  createTemplateMigrationRule,
  elementMatches,
  parseSelector,
  queueAttributeRemoval,
} from '../template-migration.cjs';

const USERMENU = 'sbb-usermenu';

/** Identifiers and property paths (`user.name`, `a?.b`) can be used in a condition as they are. */
const SIMPLE_EXPRESSION = /^[\w$]+(?:\??\.[\w$]+)*$/;
const STRING_LITERAL = /^(['"])(?:\\.|(?!\1)[^\\])*\1$/;

/** Wraps anything but a simple path in parentheses, so it can be used as operand of `?:`. */
function asOperand(expression: string): string {
  return SIMPLE_EXPRESSION.test(expression) || STRING_LITERAL.test(expression)
    ? expression
    : `(${expression})`;
}

/**
 * A string literal for an expression. Inside an attribute delimited by `outer` the literal uses
 * the other quote, and a raw `outer` in the value is written as an entity, which Angular decodes.
 */
function stringLiteral(value: string, outer: string, inAttribute: boolean): string {
  const inner = outer === '"' ? "'" : '"';
  const escaped = value.replace(/\\/g, '\\\\').split(inner).join(`\\${inner}`);
  const safe = inAttribute
    ? escaped.split(outer).join(outer === '"' ? '&quot;' : '&#39;')
    : escaped;
  return `${inner}${safe}${inner}`;
}

/**
 * Migrates `<sbb-usermenu>` to a `<sbb-header-button>` with a menu:
 *
 * ```html
 * <sbb-usermenu
 *    [userName]="userName"
 *    [displayName]="displayName"
 *    (loginRequest)="login()"
 *    [menu]="menu">
 * </sbb-usermenu>
 * ```
 *
 * becomes
 *
 * ```html
 * <!-- [userName]="userName" should be included in the sbb-menu -->
 * <sbb-header-button
 *    iconName="user-small"
 *    (click)="displayName ? null : login()"
 *    [sbbMenu]="displayName ? menu : null"
 *  >
 *   @if (displayName) {
 *     {{ displayName }}
 *   } @else {
 *     Login
 *   }
 * </sbb-header-button>
 * ```
 *
 * All other attributes of the element are kept.
 * The default icon is only added when the usermenu has no icon of its own.
 * An `<sbb-icon>` inside the usermenu stays where it is and the label is added after it.
 * An `<img>` stays as well, but is commented, because the header button does not support it.
 * Without a `displayName` there is no way to tell whether the user is logged in,
 * so `(click)` and `[sbbMenu]` are not made conditional.
 */
function createUsermenuMigrationRule(scope?: MigrationScope): Rule {
  return createTemplateMigrationRule((element: TmplAstElement, context) => {
    if (!elementMatches(element, parseSelector(USERMENU))) {
      return;
    }

    const { content, baseOffset, filePath, edits, nextIndex, logger } = context;
    const start = element.startSourceSpan;
    const end = element.endSourceSpan;

    if (!end) {
      return;
    }

    const text = (span: ParseSourceSpan): string =>
      content.slice(span.start.offset, span.end.offset);
    const variants = (name: string): string[] => attributeNameVariants(name);
    const findInput = (name: string) =>
      element.inputs.find(
        (input) => input.type === BindingType.Property && variants(name).includes(input.name),
      );
    const findStatic = (name: string) =>
      element.attributes.find((attribute) => variants(name).includes(attribute.name));
    /** The quote the attribute value is written with. */
    const quoteOf = (valueSpan: ParseSourceSpan | undefined): string => {
      const char = valueSpan ? content[valueSpan.start.offset - 1] : undefined;
      return char === "'" ? "'" : '"';
    };

    const userName = findInput('userName') ?? findStatic('userName');
    const displayNameInput = findInput('displayName');
    const displayNameStatic = findStatic('displayName');
    const displayNameNode = displayNameInput ?? displayNameStatic;
    const menu = findInput('menu');
    const loginRequest = element.outputs.find((output) =>
      variants('loginRequest').includes(output.name),
    );

    // `[displayName]="expr"` is used as is, `displayName="text"` becomes a string literal.
    // The literal must not use the quote of the attribute it ends up in, hence the parameter.
    const boundDisplayName = displayNameInput?.valueSpan
      ? text(displayNameInput.valueSpan).trim()
      : undefined;
    const hasDisplayName = boundDisplayName !== undefined || displayNameStatic !== undefined;
    const displayNameFor = (outerQuote: string, inAttribute: boolean): string =>
      boundDisplayName ?? stringLiteral(displayNameStatic!.value, outerQuote, inAttribute);
    const conditionFor = (outerQuote: string): string =>
      asOperand(displayNameFor(outerQuote, true));

    // Icons of the usermenu itself, also the ones below a structural directive (`<img *sbbIcon />`).
    const descendants: TmplAstElement[] = [];
    visitElements(element.children, (child) => descendants.push(child));
    const images = descendants.filter((child) => child.name === 'img');
    const hasOwnIcon = images.length > 0 || descendants.some((child) => child.name === 'sbb-icon');

    // Layout of the element, so the generated markup follows it.
    const elementStart = start.start.offset;
    const lineStart = content.lastIndexOf('\n', elementStart - 1) + 1;
    const beforeElement = content.slice(lineStart, elementStart);
    // Respect the layout: a template without line breaks stays a one-liner, so inline templates do not get `\n` escapes, and a single-line element does not get broken up.
    const onOwnLine = beforeElement.trim() === '' && content.includes('\n');
    const multiline = content.slice(start.start.offset, end.end.offset).includes('\n');
    const indent = /^[ \t]*/.exec(beforeElement)![0];
    const eol = content.includes('\r\n') ? '\r\n' : '\n';

    const queue = (
      offset: number,
      length: number,
      insertion: string | undefined,
      log?: () => void,
    ): void => {
      edits.push({ offset: baseOffset + offset, index: nextIndex(), length, insertion, log });
    };
    const replaceAttribute = (node: { sourceSpan: ParseSourceSpan }, insertion: string): void =>
      queue(
        node.sourceSpan.start.offset,
        node.sourceSpan.end.offset - node.sourceSpan.start.offset,
        insertion,
      );

    // The username belongs to the menu now, which has to be done by hand.
    if (userName) {
      const comment =
        `<!-- ${text(userName.sourceSpan).replace(/--!?>/g, '-- >')} ` +
        `should be included in the sbb-menu -->`;
      queue(elementStart, 0, onOwnLine ? `${comment}${eol}${indent}` : `${comment} `);
      queueAttributeRemoval(
        content,
        baseOffset,
        userName.sourceSpan.start.offset,
        userName.sourceSpan.end.offset,
        edits,
        nextIndex,
      );
    }

    // Images are not supported as icon.
    for (const image of images) {
      const imageStart = image.startSourceSpan.start.offset;
      const beforeImage = content.slice(content.lastIndexOf('\n', imageStart - 1) + 1, imageStart);
      const imageComment =
        '<!-- FIXME: an <img> is not supported as icon of the `sbb-header-button`. -->';
      queue(
        imageStart,
        0,
        beforeImage.trim() === '' && content.includes('\n')
          ? `${imageComment}${eol}${/^[ \t]*/.exec(beforeImage)![0]}`
          : `${imageComment} `,
      );
    }

    // Tag names and default icon (unless the usermenu brings its own).
    queue(
      start.start.offset + 1,
      element.name.length,
      hasOwnIcon ? 'sbb-header-button' : 'sbb-header-button iconName="user-small"',
      () => logger.info(`  → Migrated <sbb-usermenu> to <sbb-header-button> in '${filePath}'`),
    );
    queue(end.start.offset + 2, element.name.length, 'sbb-header-button');

    // The display name only drives the conditions and the content.
    if (displayNameNode) {
      queueAttributeRemoval(
        content,
        baseOffset,
        displayNameNode.sourceSpan.start.offset,
        displayNameNode.sourceSpan.end.offset,
        edits,
        nextIndex,
      );
    }

    // `(loginRequest)` only makes sense for a user who is not logged in.
    if (loginRequest) {
      const handler = text(loginRequest.handlerSpan).trim();
      const q = quoteOf(loginRequest.handlerSpan);
      if (!hasDisplayName) {
        replaceAttribute(loginRequest, `(click)=${q}${handler}${q}`);
      } else {
        replaceAttribute(loginRequest, `(click)=${q}${conditionFor(q)} ? null : ${handler}${q}`);
      }
    }

    // `[menu]` is only shown for a logged in user.
    if (menu?.valueSpan) {
      const q = quoteOf(menu.valueSpan);
      const value = text(menu.valueSpan).trim();
      replaceAttribute(
        menu,
        hasDisplayName
          ? `[sbbMenu]=${q}${conditionFor(q)} ? ${value} : null${q}`
          : `[sbbMenu]=${q}${value}${q}`,
      );
    }

    // Add label
    const contentStart = start.end.offset;
    const innerContent = content.slice(contentStart, end.start.offset);
    const isBlank = innerContent.trim() === '';

    if (isBlank || hasOwnIcon) {
      // Text, not an attribute: a literal is free to use either quote.
      const displayName = hasDisplayName ? displayNameFor('"', false) : undefined;
      const inline =
        displayName === undefined
          ? 'Login'
          : `@if (${displayName}) { {{ ${displayName} }} } @else { Login }`;
      const lines =
        displayName === undefined
          ? ['Login']
          : [`@if (${displayName}) {`, `  {{ ${displayName} }}`, '} @else {', '  Login', '}'];
      const block = lines.map((line) => `${indent}  ${line}`).join(eol);

      if (isBlank) {
        queue(
          contentStart,
          innerContent.length,
          multiline ? `${eol}${block}${eol}${indent}` : inline,
        );
      } else {
        // The icon stays, the label follows it.
        queue(
          contentStart + innerContent.trimEnd().length,
          0,
          multiline ? `${eol}${block}` : ` ${inline}`,
        );
      }
    } else {
      logger.warn(
        `  ⚠ <sbb-usermenu> in '${filePath}' has content, which was left as it is: ` +
          `add the label by hand.`,
      );
    }
  }, scope);
}

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/usermenu', newImport: '@sbb-esta/lyne-angular/header' },
];

const types: TypeMigration[] = [{ from: 'SbbUsermenuModule', to: 'SbbHeaderModule' }];

const comments: CommentMigration[] = [
  {
    selector: 'sbb-usermenu',
    message: `FIXME: this component can be replaced by 'sbb-header-button' with a connected 'sbb-menu'; please check and possibly adapt the auto-migrated code.`,
  },
];

/**
 * Migrate the usermenu component from `@sbb-esta/angular` to `@sbb-esta/lyne-angular`.
 */
export const USERMENU_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  types,
  customRules: [(scope) => createUsermenuMigrationRule(scope)],
};
