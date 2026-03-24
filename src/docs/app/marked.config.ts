import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import GithubSlugger from 'github-slugger';
import hljs from 'highlight.js';
import { marked } from 'marked';
import type { RendererObject, Tokens } from 'marked';
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
    toc.push(
      `<li class='docs-heading docs-heading-${depth}'><sbb-link href="${href}">${text}</sbb-link></li>`,
    );

    const titleLevel = depth.toString() as SbbTitleLevel;
    return `
      <sbb-title level=${titleLevel} id="${headingId}">
        <sbb-link href="${href}" class="docs-link">
          <sbb-icon name="link-small" class="docs-link-icon"></sbb-icon>
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
                <ul class="sbb-scrollbar">

                  ${toc.join('').replace(/<a /g, '<sbb-link ').replace(/<\/a>/g, '</sbb-link>')}
                </ul>
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
