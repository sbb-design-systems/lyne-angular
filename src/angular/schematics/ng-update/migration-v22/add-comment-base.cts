import { Migration, ResolvedResource, TargetVersion } from '@angular/cdk/schematics';
import * as ts from 'typescript';

/** Used to specify different comment delimiters for different file extensions. */
export interface CommentDelimiters {
  start: string;
  end: string;
}

const TS_DELIMITERS: CommentDelimiters = { start: '//', end: '' };
const HTML_DELIMITERS: CommentDelimiters = { start: '<!--', end: '-->' };
const CSS_DELIMITERS: CommentDelimiters = { start: '/*', end: ' */' };

/** Default SyntaxKind for TS processing. */
const DECLARATION_KINDS = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.VariableDeclaration,
  ts.SyntaxKind.Parameter,
  ts.SyntaxKind.PropertyDeclaration,
  ts.SyntaxKind.PropertySignature,
  ts.SyntaxKind.FunctionDeclaration,
  ts.SyntaxKind.MethodDeclaration,
  ts.SyntaxKind.ClassDeclaration,
  ts.SyntaxKind.InterfaceDeclaration,
  ts.SyntaxKind.TypeAliasDeclaration,
  ts.SyntaxKind.EnumDeclaration,
  ts.SyntaxKind.EnumMember,
]);

export interface ResourceMatch {
  /** The exact string index in the file/template where the match was found. */
  index: number;
  /** The custom comment text to inject (delimiters will be added automatically). */
  commentText: string;
}

export type ReplaceTokenAction = {
  type: 'replace';
  replacement: string;
  prUrl: string;
};

export type DeleteTokenAction = {
  type: 'delete';
  prUrl: string;
};

/** Used to define elements to be replaced or removed. */
export type TokenAction = ReplaceTokenAction | DeleteTokenAction;

/** Rule used for batch modifications. */
export interface TokenRule {
  kind: 'token';
  name: string;
  ts?: Record<string, TokenAction>;
  template?: Record<string, TokenAction>;
  stylesheet?: Record<string, TokenAction>;
  /** Optional list of TS SyntaxKinds to match against the identifier's ancestor nodes. */
  tsKinds?: ts.SyntaxKind[];
  /** How many ancestor levels to walk when evaluating `tsKinds`. Defaults to 4. */
  tsKindsDepth?: number;
}

/** Rule used for specific modifications. */
export interface CustomRule {
  kind: 'custom';
  name: string;
  tsMatcher?: (node: ts.Node) => string | null;
  templateMatcher?: (content: string, filePath: string) => ResourceMatch[];
  stylesheetMatcher?: (content: string, filePath: string) => ResourceMatch[];
}

export type MigrationRule = TokenRule | CustomRule;

export interface AddCommentMigrationConfig {
  targetVersion: TargetVersion;
  rules: MigrationRule[];
}

/** Escapes a string so it can be used verbatim inside a RegExp. */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Module-level cache for compiled token regexes.
 *
 * Regex compilation is expensive and the same token patterns are reused across
 * every file visited during a migration run. A single shared cache means each
 * unique token string is compiled exactly once for the entire schematic
 * lifetime, regardless of how many files are processed.
 *
 * The cache uses the token string as the key and always returns a *new* RegExp
 * instance (same source, reset lastIndex) so concurrent `.exec()` loops across
 * different callers never share mutable state.
 */
const _regexCache = new Map<string, string>();

/**
 * Returns a word-boundary-aware RegExp for a token.
 * Uses `[\w-]` boundaries to correctly handle CSS property/class names that
 * include hyphens (e.g. `sbb-expansion-panel` would not match inside `sbb-expansion-panel-header`).
 *
 * The regex source is cached; a fresh RegExp instance is returned each time so
 * callers get independent `lastIndex` state for their own `.exec()` loops.
 */
function buildTokenRegex(token: string): RegExp {
  let source = _regexCache.get(token);
  if (!source) {
    source = `(?<![\\w-])${escapeRegex(token)}(?![\\w-])`;
    _regexCache.set(token, source);
  }
  return new RegExp(source, 'g');
}

/** Formats a comment body without a trailing space when the end delimiter is empty. */
function formatComment(indent: string, delimiters: CommentDelimiters, commentText: string): string {
  const body = delimiters.end
    ? `${delimiters.start} ${commentText} ${delimiters.end}`
    : `${delimiters.start} ${commentText}`;
  return `${indent}${body}`;
}

/**
 * Returns true when the resource is defined inline inside a TypeScript component
 * decorator (i.e. `template: '...'` or `styles: ['...']`).
 */
function isInlineResource(resource: ResolvedResource): boolean {
  return resource.filePath.endsWith('.ts');
}

export abstract class AddCommentBase extends Migration<null> {
  protected abstract readonly config: AddCommentMigrationConfig;

  /**
   * Cache of already-processed (filePath → Set<lineStartOffset>) entries.
   *
   * NOTE: lineStart is always computed from the original, unmodified file content.
   * The CDK recorder batches all insertions and applies them atomically after the visit,
   * so offsets remain stable for the entire duration
   * of a single visitTemplate / visitStylesheet / visitNode call.
   */
  private readonly _processedLinesCache = new Map<string, Set<number>>();

  /**
   * Accumulated TS insertion counts, keyed by filePath → ruleName → {inserted, skipped}.
   * Populated by _addCommentAboveTsNode and flushed to the logger in postAnalysis,
   * so repeated visitNode calls for the same file/rule are collapsed into one line.
   */
  private readonly _tsLog = new Map<string, Map<string, { inserted: number; skipped: number }>>();

  override get enabled(): boolean {
    return this.targetVersion === this.config.targetVersion;
  }

  override visitNode(node: ts.Node): void {
    for (const rule of this.config.rules) {
      if (rule.kind === 'token') {
        this._processTsTokenRule(node, rule);
      }

      if (rule.kind === 'custom' && rule.tsMatcher) {
        const comment = rule.tsMatcher(node);
        if (comment) {
          this._addCommentAboveTsNode(node, comment, rule.name);
        }
      }
    }
  }

  override visitTemplate(template: ResolvedResource): void {
    if (isInlineResource(template)) {
      this._processInlineResource(template, 'template');
      return;
    }
    this._processResource(template, HTML_DELIMITERS, 'template');
  }

  override visitStylesheet(stylesheet: ResolvedResource): void {
    if (isInlineResource(stylesheet)) {
      this._processInlineResource(stylesheet, 'style');
      return;
    }
    this._processResource(stylesheet, CSS_DELIMITERS, 'style');
  }

  /**
   * Handles inline `template: '...'` and `styles: ['...']` resources.
   *
   * Inserting comment lines inside a string literal is not viable, so instead we collect
   * every matched token's comment text and insert a block of `//` comments above the decorator
   * property line (e.g. the `styles: [...]` line) in the host `.ts` file.
   */
  private _processInlineResource(resource: ResolvedResource, type: 'template' | 'style'): void {
    const { content, filePath, start } = resource;

    // Collect unique comment texts for all tokens found in this inline resource.
    const commentTexts = new Set<string>();

    for (const rule of this.config.rules) {
      if (rule.kind === 'token') {
        const tokens = type === 'template' ? rule.template : rule.stylesheet;
        if (tokens) {
          for (const match of this._findTokenMatches(content, tokens)) {
            commentTexts.add(match.commentText);
          }
        }
      }

      if (rule.kind === 'custom') {
        const matcher = type === 'template' ? rule.templateMatcher : rule.stylesheetMatcher;
        if (matcher) {
          for (const match of matcher(content, filePath)) {
            commentTexts.add(match.commentText);
          }
        }
      }
    }

    if (commentTexts.size === 0) {
      return;
    }

    // Locate the start of the decorator property line in the host .ts file.
    // resource.start points just past the opening quote, so stepping back one
    // character puts us inside (or at the boundary of) the `styles:`/`template:` line.
    const hostText = this.fileSystem.read(filePath) ?? '';
    const hostLineStart = Math.max(0, hostText.lastIndexOf('\n', start - 1) + 1);

    if (this._hasBeenProcessed(filePath, hostLineStart)) {
      return;
    }

    const indent = this._getIndent(hostText, hostLineStart);
    const block = [...commentTexts]
      .map((text) => formatComment(indent, TS_DELIMITERS, text))
      .join('\n');

    const recorder = this.fileSystem.edit(filePath);
    recorder.insertLeft(hostLineStart, `${block}\n`);
    this._markAsProcessed(filePath, hostLineStart);

    this.logger.info(
      `  → ${filePath}\n    Added ${commentTexts.size} comment(s) above '${type}' property`,
    );
  }

  private _processTsTokenRule(node: ts.Node, rule: TokenRule): void {
    if (!rule.ts || !ts.isIdentifier(node)) {
      return;
    }

    if (this._isDeclarationSite(node)) {
      return;
    }

    let matchKey = node.text;
    let targetNode: ts.Node = node;

    if (node.parent && ts.isTypeReferenceNode(node.parent) && node.parent.typeName === node) {
      const sourceFile = node.getSourceFile();
      const rawTypeText = sourceFile.text.slice(node.parent.getStart(), node.parent.getEnd());
      const normalizedTypeText = rawTypeText.replace(/\s+/g, ' ');

      if (rule.ts[normalizedTypeText]) {
        matchKey = normalizedTypeText;
        targetNode = node.parent;
      }
    }

    const action = rule.ts[matchKey];
    if (!action) {
      return;
    }

    if (rule.tsKinds) {
      const depth = rule.tsKindsDepth ?? 4;
      if (!this._ancestorMatchesKind(node, rule.tsKinds, depth)) {
        return;
      }
    }

    this._addCommentAboveTsNode(targetNode, this._generateMessage(matchKey, action), rule.name);
  }

  /**
   * Returns true when the identifier is the *name* being declared or imported, not a reference to it.
   */
  private _isDeclarationSite(node: ts.Identifier): boolean {
    const parent = node.parent;
    if (!parent) {
      return false;
    }
    return (
      !!parent &&
      DECLARATION_KINDS.has(parent.kind) &&
      (parent as ts.NamedDeclaration).name === node
    );
  }

  /**
   * Walks up the AST from `node` for up to `maxDepth` levels and returns
   * `true` if any ancestor's `kind` is included in `kinds`.
   */
  private _ancestorMatchesKind(node: ts.Node, kinds: ts.SyntaxKind[], maxDepth: number): boolean {
    let current: ts.Node | undefined = node.parent;
    for (let depth = 0; depth < maxDepth && current; depth++) {
      if (kinds.includes(current.kind)) {
        return true;
      }
      current = current.parent;
    }
    return false;
  }

  /** Process external templates and stylesheets */
  private _processResource(
    resource: ResolvedResource,
    delimiters: CommentDelimiters,
    type: 'template' | 'style',
  ): void {
    const { content, filePath, start } = resource;
    const recorder = this.fileSystem.edit(filePath);
    const fileLog: string[] = [];

    for (const rule of this.config.rules) {
      const matches: ResourceMatch[] = [];

      if (rule.kind === 'token') {
        const tokens = type === 'template' ? rule.template : rule.stylesheet;
        if (tokens) {
          matches.push(...this._findTokenMatches(content, tokens));
        }
      }

      if (rule.kind === 'custom') {
        const matcher = type === 'template' ? rule.templateMatcher : rule.stylesheetMatcher;
        if (matcher) {
          matches.push(...matcher(content, filePath));
        }
      }
      if (matches.length === 0) {
        continue;
      }

      let inserted = 0;
      let skipped = 0;

      for (const match of matches) {
        const lineStart = Math.max(0, content.lastIndexOf('\n', match.index - 1) + 1);

        if (this._hasBeenProcessed(filePath, lineStart)) {
          skipped++;
          continue;
        }

        const indent = this._getIndent(content, lineStart);
        const comment = formatComment(indent, delimiters, match.commentText);

        recorder.insertLeft(start + lineStart, `${comment}\n`);
        inserted++;
        this._markAsProcessed(filePath, lineStart);
      }
      fileLog.push(this._formatRuleLog(rule.name, inserted, skipped));
    }

    if (fileLog.length > 0) {
      this.logger.info(`  → ${filePath}\n${fileLog.map((l) => `    ${l}`).join('\n')}`);
    }
  }

  /**
   * Finds all non-overlapping occurrences of each token in `content` using
   * word-boundary-aware regular expressions, so partial substring matches
   * (e.g. "color" inside "backgroundColor") are not flagged.
   */
  private _findTokenMatches(content: string, tokens: Record<string, TokenAction>): ResourceMatch[] {
    const matches: ResourceMatch[] = [];

    for (const [token, action] of Object.entries(tokens)) {
      const commentText = this._generateMessage(token, action);
      const regex = buildTokenRegex(token);
      let m: RegExpExecArray | null;

      while ((m = regex.exec(content)) !== null) {
        matches.push({ index: m.index, commentText });
      }
    }

    return matches;
  }

  private _addCommentAboveTsNode(node: ts.Node, commentText: string, ruleLabel: string): void {
    const sourceFile = node.getSourceFile();
    const fileName = sourceFile.fileName;
    const fileText = sourceFile.text;
    const lineStart = Math.max(0, fileText.lastIndexOf('\n', node.getStart() - 1) + 1);

    const counts = this._tsLogEntry(fileName, ruleLabel);

    if (this._hasBeenProcessed(fileName, lineStart)) {
      counts.skipped++;
      return;
    }

    const indent = this._getIndent(fileText, lineStart);
    const comment = formatComment(indent, TS_DELIMITERS, commentText);
    const recorder = this.fileSystem.edit(this.fileSystem.resolve(fileName));

    recorder.insertLeft(lineStart, `${comment}\n`);
    this._markAsProcessed(fileName, lineStart);
    counts.inserted++;
  }

  /** Returns (creating if absent) the log-count entry for a given file + rule pair. */
  private _tsLogEntry(fileName: string, ruleLabel: string): { inserted: number; skipped: number } {
    let fileMap = this._tsLog.get(fileName);
    if (!fileMap) {
      fileMap = new Map();
      this._tsLog.set(fileName, fileMap);
    }
    let entry = fileMap.get(ruleLabel);
    if (!entry) {
      entry = { inserted: 0, skipped: 0 };
      fileMap.set(ruleLabel, entry);
    }
    return entry;
  }

  override postAnalysis(): void {
    for (const [filePath, ruleMap] of this._tsLog) {
      const lines: string[] = [];
      for (const [ruleName, { inserted, skipped }] of ruleMap) {
        lines.push(this._formatRuleLog(ruleName, inserted, skipped));
      }
      if (lines.length > 0) {
        this.logger.info(`  → ${filePath}\n${lines.map((l) => `    ${l}`).join('\n')}`);
      }
    }
  }

  /** Formats a single per-rule log line. */
  private _formatRuleLog(ruleName: string, inserted: number, skipped: number): string {
    const parts = [`Added ${inserted} comment(s) for rule '${ruleName}'`];
    if (skipped > 0) {
      parts.push(`${skipped} skipped`);
    }
    return parts.join(' ');
  }

  private _generateMessage(token: string, action: TokenAction): string {
    if (action.type === 'replace') {
      return `FIXME: "${token}" has been replaced by "${action.replacement}". Check: ${action.prUrl}`;
    }
    return `FIXME: "${token}" has been removed. Check: ${action.prUrl}`;
  }

  private _getIndent(text: string, lineStart: number): string {
    const lineEnd = text.indexOf('\n', lineStart);
    const line = text.slice(lineStart, lineEnd === -1 ? text.length : lineEnd);
    return line.match(/^\s*/)?.[0] ?? '';
  }

  private _hasBeenProcessed(fileName: string, lineStart: number): boolean {
    return !!this._processedLinesCache.get(fileName)?.has(lineStart);
  }

  private _markAsProcessed(fileName: string, lineStart: number): void {
    let set = this._processedLinesCache.get(fileName);
    if (!set) {
      set = new Set<number>();
      this._processedLinesCache.set(fileName, set);
    }
    set.add(lineStart);
  }
}
