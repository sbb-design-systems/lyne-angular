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

const IMAGE_COMMENT =
  '<!-- FIXME: an <img> is not supported as icon of the `sbb-header-button`. -->';

/** Text for a static `displayName`: nothing in it may be read as markup, entity or control flow. */
function escapeText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/@/g, '&#64;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;');
}

/**
 * Migrates `<sbb-usermenu>` to a `<sbb-header-button>` with a menu;
 * in the most general case, since `[sbbMenu]` and `(click)` cannot be bound to `null`,
 * there are two buttons: one for the logged-in user (menu) and one for the user who is not (login).
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
 * @if (displayName) {
 *   <sbb-header-button iconName="user-small" [sbbMenu]="menu">
 *     {{ displayName }}
 *   </sbb-header-button>
 * } @else {
 *   <sbb-header-button iconName="user-small" (click)="login()">
 *     Login
 *   </sbb-header-button>
 * }
 * ```
 *
 * All other attributes of the element are kept.
 * The default icon is only added when the usermenu has no icon of its own.
 * An `<sbb-icon>` inside the usermenu stays where it is and the label is added after it.
 * An `<img>` stays as well, but is commented, because the header button does not support it.
 * Without a `displayName` there is no way to tell whether the user is logged in,
 * so there is only one button with `(click)` and `[sbbMenu]`.
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

    const displayName = displayNameInput?.valueSpan
      ? text(displayNameInput.valueSpan).trim()
      : undefined;
    const isConditional = displayName !== undefined;
    const hasDisplayName = isConditional || displayNameStatic !== undefined;

    // Icons of the usermenu itself, also the ones below a structural directive (`<img *sbbIcon />`).
    const descendants: TmplAstElement[] = [];
    visitElements(element.children, (child) => descendants.push(child));
    const images = descendants.filter((child) => child.name === 'img');
    const hasOwnIcon = images.length > 0 || descendants.some((child) => child.name === 'sbb-icon');

    // Layout of the element, so the generated markup follows it.
    const elementStart = start.start.offset;
    const lineStart = content.lastIndexOf('\n', elementStart - 1) + 1;
    const beforeElement = content.slice(lineStart, elementStart);
    // A template without line breaks stays a one-liner, so inline templates do not get `\n`
    // escapes, and a single-line element does not get broken up.
    const onOwnLine = beforeElement.trim() === '' && content.includes('\n');
    const multiline = content.slice(start.start.offset, end.end.offset).includes('\n');
    const block = onOwnLine || multiline;
    const indent = /^[ \t]*/.exec(beforeElement)![0];
    const eol = content.includes('\r\n') ? '\r\n' : '\n';
    // With a display name the button is inside of the `@if`, so one level deeper.
    const buttonIndent = isConditional ? `${indent}  ` : indent;

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
    const removeAttribute = (node: { sourceSpan: ParseSourceSpan }): void =>
      queueAttributeRemoval(
        content,
        baseOffset,
        node.sourceSpan.start.offset,
        node.sourceSpan.end.offset,
        edits,
        nextIndex,
      );
    /** What is inserted in front of an `<img>`. */
    const imageInsertion = (imageStart: number): string => {
      const beforeImage = content.slice(content.lastIndexOf('\n', imageStart - 1) + 1, imageStart);
      return beforeImage.trim() === '' && content.includes('\n')
        ? `${IMAGE_COMMENT}${eol}${/^[ \t]*/.exec(beforeImage)![0]}`
        : `${IMAGE_COMMENT} `;
    };

    // The username belongs to the menu now, which has to be done by hand.
    if (userName) {
      const comment =
        `<!-- ${text(userName.sourceSpan).replace(/--!?>/g, '-- >')} ` +
        `should be included in the sbb-menu -->`;
      queue(elementStart, 0, onOwnLine ? `${comment}${eol}${indent}` : `${comment} `);
      removeAttribute(userName);
    }

    // The button for the logged-in user is the element itself, inside an `@if`.
    if (isConditional) {
      queue(
        elementStart,
        0,
        block ? `@if (${displayName}) {${eol}${buttonIndent}` : `@if (${displayName}) { `,
      );
    }

    // Images are not supported as icon.
    for (const image of images) {
      queue(
        image.startSourceSpan.start.offset,
        0,
        imageInsertion(image.startSourceSpan.start.offset),
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

    // The display name only drives the `@if` and the label.
    if (displayNameNode) {
      removeAttribute(displayNameNode);
    }

    // `(loginRequest)` only makes sense for a user who is not logged in.
    // With a displayName it is removed, or it moves to the second button.
    const handler = loginRequest ? text(loginRequest.handlerSpan).trim() : '';
    const handlerQuote = quoteOf(loginRequest?.handlerSpan);
    const click = `(click)=${handlerQuote}${handler}${handlerQuote}`;
    if (loginRequest) {
      if (hasDisplayName) {
        removeAttribute(loginRequest);
      } else {
        replaceAttribute(loginRequest, click);
      }
    }

    // `[menu]` is the menu of the logged-in user.
    if (menu?.valueSpan) {
      const q = quoteOf(menu.valueSpan);
      replaceAttribute(menu, `[sbbMenu]=${q}${text(menu.valueSpan).trim()}${q}`);
    }

    // Add label
    const contentStart = start.end.offset;
    const innerContent = content.slice(contentStart, end.start.offset);
    const isBlank = innerContent.trim() === '';
    const label = isConditional
      ? `{{ ${displayName} }}`
      : displayNameStatic
        ? escapeText(displayNameStatic.value)
        : 'Login';

    if (isBlank) {
      queue(
        contentStart,
        innerContent.length,
        multiline ? `${eol}${buttonIndent}  ${label}${eol}${buttonIndent}` : label,
      );
    } else if (hasOwnIcon) {
      // The icon stays, the label follows it.
      queue(
        contentStart + innerContent.trimEnd().length,
        0,
        multiline ? `${eol}${buttonIndent}  ${label}` : ` ${label}`,
      );
    } else {
      logger.warn(
        `  ⚠ <sbb-usermenu> in '${filePath}' has content, which was left as it is: ` +
          `add the label by hand.`,
      );
    }

    // The button for the user who is not logged in, after the first one.
    if (isConditional) {
      // Everything but the handled attributes is copied (static, bound, outputs, references).
      const handled = new Set(
        [userName, displayNameNode, menu, loginRequest]
          .filter((node) => !!node)
          .map((node) => node!.sourceSpan.start.offset),
      );
      const copied = new Map<number, string>();
      for (const node of [
        ...element.attributes,
        ...element.inputs,
        ...element.outputs,
        ...element.references,
      ]) {
        const offset = node.sourceSpan.start.offset;
        if (!handled.has(offset) && !copied.has(offset)) {
          copied.set(offset, text(node.sourceSpan));
        }
      }
      const open = [
        '<sbb-header-button',
        hasOwnIcon ? undefined : 'iconName="user-small"',
        loginRequest ? click : undefined,
        ...[...copied.entries()].sort(([a], [b]) => a - b).map(([, value]) => value),
      ]
        .filter((part) => !!part)
        .join(' ');

      let inner: string;
      if (isBlank) {
        inner = multiline ? `${eol}${buttonIndent}  Login${eol}${buttonIndent}` : 'Login';
      } else if (hasOwnIcon) {
        // A copy of the icons, also with the comment for the images.
        let icons = innerContent;
        for (const image of [...images].sort(
          (a, b) => b.startSourceSpan.start.offset - a.startSourceSpan.start.offset,
        )) {
          const offset = image.startSourceSpan.start.offset;
          icons =
            icons.slice(0, offset - contentStart) +
            imageInsertion(offset) +
            icons.slice(offset - contentStart);
        }
        inner = multiline
          ? `${icons.trimEnd()}${eol}${buttonIndent}  Login${eol}${buttonIndent}`
          : `${icons.trimEnd()} Login`;
      } else {
        inner = innerContent;
      }
      const loginButton = `${open}>${inner}</sbb-header-button>`;

      queue(
        end.end.offset,
        0,
        block
          ? `${eol}${indent}} @else {${eol}${buttonIndent}${loginButton}${eol}${indent}}`
          : ` } @else { ${loginButton} }`,
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
  customRules: [(scope?) => createUsermenuMigrationRule(scope)],
};
