import { provideHttpClient } from '@angular/common/http';
import { type ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import GithubSlugger from 'github-slugger';
import hljs from 'highlight.js';
import { marked } from 'marked';
import type { RendererObject, Tokens } from 'marked';
import { markedHighlight } from 'marked-highlight';

import { routes } from './app.routes';

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
    toc.push(`<li class='docs-heading docs-heading-${depth}'><a href="${href}">${text}</a></li>`);
    return `
      <h${depth} id="${headingId}">
        <a href="${href}" class="docs-link">
          <sbb-icon name="link-small" class="docs-link-icon"></sbb-icon>
          ${text}
        </a>
      </h${depth}>
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
    if (body) body = `<tbody>${body}</tbody>`;

    return `<table class="sbb-table">\n <thead>\n ${header} </thead>\n ${body} </table>\n`;
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};

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
                <h3>Table of contents</h3>
                <ul>
                  ${toc.join('')}
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
