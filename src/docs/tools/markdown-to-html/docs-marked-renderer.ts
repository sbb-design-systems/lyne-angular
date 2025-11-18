import GithubSlugger from 'github-slugger';
import type { RendererObject, Tokens } from 'marked';

export const DocsMarkedRenderer: RendererObject<string, string> = {
  heading({ tokens, depth }: Tokens.Heading): string {
    const text = this.parser.parseInline(tokens);
    if (depth < 3) {
      const headingId = new GithubSlugger().slug(text);
      const href = `${window.location.origin}${window.location.pathname}#${headingId}`;
      return `
            <h${depth} id="${headingId}">
              <a href="${href}" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; color: initial;">
                <sbb-icon name="link-small"></sbb-icon>
                ${text}
              </a>
            </h${depth}>`;
    }

    return `<h${depth}>${text}</h${depth}>`;
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
