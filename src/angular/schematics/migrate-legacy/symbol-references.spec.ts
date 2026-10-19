import ts from 'typescript';
import { describe, expect, it } from 'vitest';

import { findSymbolReferences, matchesModule, type SymbolTarget } from './symbol-references.cjs';

describe('sbb-symbol-references', () => {
  const parse = (code: string): ts.SourceFile =>
    ts.createSourceFile('test.ts', code, ts.ScriptTarget.Latest, true);

  it('should match every module when importedFrom is omitted', () => {
    expect(matchesModule('anything')).toBe(true);
    expect(matchesModule('@scope/pkg/deep/path', undefined)).toBe(true);
  });

  it('should match the exact module', () => {
    expect(matchesModule('@sbb/elements', '@sbb/elements')).toBe(true);
  });

  it('should match sub-paths of the module', () => {
    expect(matchesModule('@sbb/elements/button', '@sbb/elements')).toBe(true);
  });

  it('should not match modules which merely share a prefix', () => {
    expect(matchesModule('@sbb/elements-experimental', '@sbb/elements')).toBe(false);
  });

  it('should return the matching target and identifier nodes for imports and usages', () => {
    const sourceFile = parse("import { Foo } from 'lib'; const a = new Foo();");
    const target: SymbolTarget = { name: 'Foo', importedFrom: 'lib' };
    const references = findSymbolReferences(sourceFile, [target]);

    expect(references).toHaveLength(2);
    expect(references[0].target).toBe(target);
    expect(references[0].node.text).toBe('Foo');
    expect(references[1].target).toBe(target);
    expect(references[1].node.text).toBe('Foo');
  });

  it('should ignore modules that do not match importedFrom', () => {
    const targets = [{ name: 'Foo', importedFrom: 'lib' }];
    const references = findSymbolReferences(
      parse("import { Foo } from 'other'; const a = new Foo();"),
      targets,
    );

    expect(references).toHaveLength(0);
  });

  it('should ignore member names and object keys', () => {
    const sourceFile = parse("import { Foo } from 'lib'; const obj = { Foo: 1 }; obj.Foo;");
    const target: SymbolTarget = { name: 'Foo', importedFrom: 'lib' };
    const references = findSymbolReferences(sourceFile, [target]);

    expect(references).toHaveLength(1);
  });
});
