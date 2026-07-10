import type { SbbHeadingLevel } from '@sbb-esta/lyne-elements/core.js';
import GithubSlugger from 'github-slugger';
import hljs from 'highlight.js';
import type { RendererObject, Tokens } from 'marked';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

// The slugger object used to create unique ids for headings.
const slugger = new GithubSlugger();

// The list of items in the table of contents.
let toc: string[] = [];

// The custom renderer for the .md pages
const DocsMarkedRenderer: RendererObject = {
  heading({ tokens, depth }: Tokens.Heading): string {
    const text = this.parser.parseInline(tokens);
    const headingId = slugger.slug(text);
    const href = `${window.location.origin}${window.location.pathname}#${headingId}`;
    // Create the items for the table of content.

    if (depth <= 2) {
      toc.push(`<sbb-block-link href="${href}">${text}</sbb-block-link>`);
    }

    const titleLevel = depth.toString() as SbbHeadingLevel;
    return `
      <sbb-title level=${titleLevel} id="${headingId}">
        <sbb-link href="${href}" class="docs-link">
          ${text}
        </sbb-link>
      </sbb-title>
    `;
  },
  table(token: Tokens.Table): string {
    let header = '';

    let cell = '';
    token.header.forEach((item) => {
      cell += this.tablecell(item);
    });
    header += this.tablerow({ text: cell });

    let body = '';
    token.rows.forEach((row) => {
      cell = '';
      row.forEach((item) => {
        cell += this.tablecell(item);
      });

      body += this.tablerow({ text: cell });
    });
    if (body) {
      body = `<tbody>${body}</tbody>`;
    }

    return `<table class="sbb-table">\n <thead>\n ${header} </thead>\n ${body} </table>\n`;
  },
};

export function setup(): void {
  marked
    .use({
      async: true,
      renderer: DocsMarkedRenderer,
      hooks: {
        preprocess(markdown: string): string {
          // Empty the toc list before processing the page.
          toc = [];

          /**
           * Generics could spawn on several lines, e.g.:
           *
           * ```ts
           * export class SbbDialogRef<T = unknown, R = unknown> extends SbbOverlayBaseRef<
           *   T,
           *   SbbDialogCloseEvent<R | null>
           * > {}
           * ```
           *
           * This will lead to incorrect title formatting;
           * to fix it, spaces and newlines inside generics are removed.
           */
          markdown = markdown.replace(
            /<\s*([^>]*?)\s*>/g,
            (_, inner) => `<${inner.replace(/\s+/g, ' ')}>`,
          );
          return markdown;
        },
        postprocess(html: string): string {
          // If there's more than one heading, create the table of contents.
          if (toc && toc.length > 1) {
            return `
            <div class="docs-toc-container">
              <div>
                ${html}
              </div>
              <aside class="docs-toc-content">
                <sbb-title level=${6}>Table of contents</sbb-title>
                <sbb-link-list-anchor class="sbb-scrollbar">

                  ${toc.join('')}
                </sbb-link-list-anchor>
              </aside>
            </div>`;
          }
          return html;
        },
      },
    })
    .use(
      markedHighlight({
        async: true,
        emptyLangClass: 'hljs',
        langPrefix: 'hljs language-',
        highlight(code, lang) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        },
      }),
    );
}
