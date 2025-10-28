import { basename, extname } from 'path';

import GithubSlugger from 'github-slugger';
import type { Tokens } from 'marked';
import { Renderer } from 'marked';

/** Regular expression that matches example comments. */
const exampleCommentRegex = /<!--\s*example\(\s*([^)]+)\)\s*-->/g;

/**
 * Custom renderer for marked that will be used to transform markdown files to HTML
 * files that can be used in the Angular Material docs.
 */
export class DocsMarkdownRenderer extends Renderer {
  /** Set of fragment links discovered in the currently rendered file. */
  private _referencedFragments = new Set<string>();

  /**
   * Slugger provided by the `marked` package. Can be used to create unique
   * ids  for headings.
   */
  private _slugger = new GithubSlugger();

  /**
   * Transforms a markdown heading into the corresponding HTML output. In our case, we
   * want to create a header-link for each H2, H3, and H4 heading. This allows users to jump to
   * specific parts of the docs.
   */
  override heading({ tokens, depth }: Tokens.Heading): string {
    const text = this.parser.parseInline(tokens);

    if (depth !== 1) {
      const headingId = this._slugger.slug(text);
      return `
        <h${depth} id="${headingId}" class="docs-header-link">
          <span header-link="${headingId}"></span>
          ${text}
        </h${depth}>`;
    }

    return `<h${depth}>${text}</h${depth}>`;
  }

  /** Transforms markdown links into the corresponding HTML output. */
  override link({ href, title, tokens }: Tokens.Link) {
    // We only want to fix up markdown links that are relative and do not refer to guides already.
    // Otherwise we always map the link to the "guide/" path.
    // TODO(devversion): remove this logic and just disallow relative paths.
    if (
      !href.startsWith('http') &&
      !href.startsWith('#') &&
      !href.includes('/angular/guides/') &&
      !href.startsWith('/')
    ) {
      return super.link({
        href: `angular/guides/${basename(href, extname(href))}`,
        title,
        tokens,
      } as Tokens.Link);
    }

    // Keep track of all fragments discovered in a file.
    if (href.startsWith('#')) {
      this._referencedFragments.add(href.slice(1));
    }

    return super.link({ href, title, tokens } as Tokens.Link);
  }

  override table(token: Tokens.Table): string {
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

    return (
      '<table class="sbb-table">\n' + '<thead>\n' + header + '</thead>\n' + body + '</table>\n'
    );
  }

  /**
   * Method that will be called whenever inline HTML is processed by marked. In that case,
   * we can easily transform the example comments into real HTML elements.
   * For example:
   * (New API)
   * `<!-- example(
   *   {
   *    "example": "exampleName",
   *    "file": "example-html.html",
   *    "region": "some-region"
   *   }
   *  ) -->`
   *  turns into
   *  `<div material-docs-example="exampleName"
   *        file="example-html.html"
   *        region="some-region"></div>`
   *
   *  (old API)
   *  `<!-- example(name) -->`
   *  turns into
   *  `<div material-docs-example="name"></div>`
   */
  override html(html: Tokens.HTML) {
    html.text = html.text.replace(exampleCommentRegex, (_match: string, content: string) => {
      // using [\s\S]* because .* does not match line breaks
      if (content.match(/\{[\s\S]*\}/g)) {
        const { example, file, region } = JSON.parse(content.trim()) as {
          example: string;
          file: string;
          region: string;
        };
        return `<div material-docs-example="${example}"
                             ${file ? `file="${file}"` : ''}
                             ${region ? `region="${region}"` : ''}></div>`;
      } else {
        return `<div material-docs-example="${content}"></div>`;
      }
    });

    return super.html(html);
  }

  /**
   * Method that will be called after a markdown file has been transformed to HTML. This method
   * can be used to finalize the content (e.g. by adding an additional wrapper HTML element)
   */
  finalizeOutput(output: string, fileName: string): string {
    const failures: string[] = [];

    // Collect any fragment links that do not resolve to existing fragments in the
    // rendered file. We want to error for broken fragment links.
    this._referencedFragments.forEach((id) => {
      if (this._slugger.occurrences[id] === undefined) {
        failures.push(`Found link to "${id}". This heading does not exist.`);
      }
    });

    if (failures.length) {
      console.error(`Could not process file: ${fileName}. Please fix the following errors:`);
      failures.forEach((message) => console.error(`  -  ${message}`));
      process.exit(1);
    }

    this._slugger.reset();
    this._referencedFragments.clear();

    return `<div class="docs-markdown">${output}</div>`;
  }
}
