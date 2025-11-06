import { provideHttpClient } from '@angular/common/http';
import { type ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import hljs from 'highlight.js';
import { marked, type Tokens } from 'marked';
import { markedHighlight } from 'marked-highlight';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};

marked.use(
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

// TODO: Move the renderer to another file
marked.use({
  async: true,
  renderer: {
    table(token: Tokens.Table): string {
      let header = '';

      // header
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
  },
});
