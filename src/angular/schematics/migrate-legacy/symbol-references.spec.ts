import ts from 'typescript';
import { describe, expect, it } from 'vitest';

import {
  findSymbolReferences,
  matchesModule,
  type SymbolReferenceKind,
  type SymbolTarget,
} from './symbol-references.cjs';

interface ExpectedReference {
  kind: SymbolReferenceKind;
  text: string;
  start: number;
}

describe('sbb-symbol-references', () => {
  /**
   * Test sources are annotated with markers around every identifier that is expected to be
   * reported, `«Foo»` (usage), `«import:Foo»` (import) and `«shorthand:Foo»` (shorthand).
   * Identifiers without a marker must not be reported.
   */
  const marker = /«(?:(import|usage|shorthand):)?([^»]+)»/g;

  /** Prelude for sources which exercise an imported `Foo`. */
  const importFoo = "import { «import:Foo» } from 'lib';\n";

  /** Prelude for sources which exercise members of a namespace import. */
  const importNamespace = "import * as ns from 'lib';\n";

  /** Strips the markers from an annotated source and returns the references they stand for. */
  const parseMarkers = (annotated: string): { code: string; expected: ExpectedReference[] } => {
    const expected: ExpectedReference[] = [];
    let code = '';
    let last = 0;

    for (const match of annotated.matchAll(marker)) {
      code += annotated.slice(last, match.index);
      expected.push({
        kind: (match[1] ?? 'usage') as SymbolReferenceKind,
        text: match[2],
        start: code.length,
      });
      code += match[2];
      last = match.index! + match[0].length;
    }

    return { code: code + annotated.slice(last), expected };
  };

  /** Parses a source file with parent nodes, which the implementation relies on. */
  const parse = (code: string): ts.SourceFile =>
    ts.createSourceFile('test.ts', code, ts.ScriptTarget.Latest, true);

  /** Formats references as `kind text @line:column`, ordered by their position. */
  const format = (sourceFile: ts.SourceFile, references: ExpectedReference[]): string[] =>
    [...references]
      .sort((a, b) => a.start - b.start)
      .map(({ kind, text, start }) => {
        const { line, character } = sourceFile.getLineAndCharacterOfPosition(start);
        return `${kind} ${text} @${line + 1}:${character + 1}`;
      });

  /** Asserts that exactly the marked identifiers are reported, and nothing else. */
  const expectRefs = (annotated: string, targets: SymbolTarget[] = [{ name: 'Foo' }]): void => {
    const { code, expected } = parseMarkers(annotated);
    const sourceFile = parse(code);
    const actual = findSymbolReferences(sourceFile, targets).map((reference) => ({
      kind: reference.kind,
      text: reference.node.text,
      start: reference.node.getStart(sourceFile),
    }));

    expect(format(sourceFile, actual)).toEqual(format(sourceFile, expected));
  };

  /** Same as `expectRefs`, with `import { Foo } from 'lib'` prepended. */
  const check = (body: string, targets?: SymbolTarget[]): void =>
    expectRefs(importFoo + body, targets);

  /** Same as `expectRefs`, with `import * as ns from 'lib'` prepended. */
  const checkNamespace = (body: string, targets?: SymbolTarget[]): void =>
    expectRefs(importNamespace + body, targets);

  it('should match every module when importedFrom is omitted', () => {
    expect(matchesModule('anything')).toBe(true);
    expect(matchesModule('@scope/pkg/deep/path', undefined)).toBe(true);
  });

  it('should match the exact module', () => {
    expect(matchesModule('@sbb/elements', '@sbb/elements')).toBe(true);
  });

  it('should match sub-paths of the module', () => {
    expect(matchesModule('@sbb/elements/button', '@sbb/elements')).toBe(true);
    expect(matchesModule('@sbb/elements/a/b/c', '@sbb/elements')).toBe(true);
  });

  it('should not match modules which merely share a prefix', () => {
    expect(matchesModule('@sbb/elements-experimental', '@sbb/elements')).toBe(false);
    expect(matchesModule('@sbb/elementsX/button', '@sbb/elements')).toBe(false);
  });

  it('should not match parents or unrelated modules', () => {
    expect(matchesModule('@sbb', '@sbb/elements')).toBe(false);
    expect(matchesModule('other', '@sbb/elements')).toBe(false);
  });

  it('should match when any entry of an array matches', () => {
    expect(matchesModule('b/sub', ['a', 'b'])).toBe(true);
    expect(matchesModule('a', ['a', 'b'])).toBe(true);
  });

  it('should not match when no entry of an array matches', () => {
    expect(matchesModule('c', ['a', 'b'])).toBe(false);
  });

  it('should not match anything for an empty array', () => {
    expect(matchesModule('a', [])).toBe(false);
  });

  it('should return nothing without targets', () => {
    expect(findSymbolReferences(parse("import { Foo } from 'lib'; Foo;"), [])).toEqual([]);
  });

  it('should return the matching target and the identifier nodes of the source file', () => {
    const sourceFile = parse("import { Foo } from 'lib'; Foo;");
    const target = { name: 'Foo', extra: 42 };
    const references = findSymbolReferences(sourceFile, [target]);

    expect(references.map((reference) => reference.kind)).toEqual(['import', 'usage']);
    for (const reference of references) {
      expect(reference.target).toBe(target);
      expect(reference.target.extra).toBe(42);
      expect(reference.node.text).toBe('Foo');
      expect(reference.node.getSourceFile()).toBe(sourceFile);
    }
  });

  it('should assign references to the target whose module matches', () => {
    const targets = [
      { name: 'Foo', importedFrom: 'a', id: 'a' },
      { name: 'Foo', importedFrom: 'b', id: 'b' },
    ];
    const references = findSymbolReferences(parse("import { Foo } from 'b'; Foo;"), targets);

    expect(references.map((reference) => reference.target.id)).toEqual(['b', 'b']);
    expect(references[0].target).toBe(targets[1]);
  });

  it('should report several targets independently', () => {
    const references = findSymbolReferences(parse("import { Foo, Bar } from 'lib'; Bar; Foo;"), [
      { name: 'Foo' },
      { name: 'Bar' },
    ]);

    expect(references.map((reference) => `${reference.kind}:${reference.node.text}`)).toEqual([
      'import:Foo',
      'import:Bar',
      'usage:Bar',
      'usage:Foo',
    ]);
  });

  it('should report a named import', () => {
    expectRefs("import { «import:Foo» } from 'lib';");
  });

  it('should report a type-only import and its usages', () => {
    expectRefs("import type { «import:Foo» } from 'lib'; let a: «Foo»;");
  });

  it('should report an inline type import and its usages', () => {
    expectRefs("import { type «import:Foo» } from 'lib'; let a: «Foo»;");
  });

  it('should report a named import next to a default import', () => {
    expectRefs("import Def, { «import:Foo» } from 'lib'; «Foo»;");
  });

  it('should report the same name imported by several statements', () => {
    expectRefs("import { «import:Foo» } from 'a'; import { «import:Foo» } from 'b'; «Foo»;");
  });

  it('should ignore names which are not targets', () => {
    expectRefs("import { Bar } from 'lib'; Bar;");
  });

  it('should ignore default imports named like the target', () => {
    expectRefs("import Foo from 'lib'; Foo;");
  });

  it('should ignore side-effect imports', () => {
    expectRefs("import 'lib'; Foo;");
  });

  it('should ignore files without imports', () => {
    expectRefs('const a = Foo; let b: Foo;');
  });

  it('should ignore same-named symbols which are not imported from the target module', () => {
    expectRefs("import { Foo } from 'other'; Foo;", [{ name: 'Foo', importedFrom: 'lib' }]);
  });

  it('should ignore locally declared symbols with the same name', () => {
    expectRefs('const Foo = 1; Foo; class Bar extends Foo {}');
  });

  it('should accept the exact module and sub-paths of importedFrom', () => {
    const targets = [{ name: 'Foo', importedFrom: 'lib' }];

    expectRefs("import { «import:Foo» } from 'lib'; «Foo»;", targets);
    expectRefs("import { «import:Foo» } from 'lib/button'; «Foo»;", targets);
  });

  it('should reject other modules than importedFrom', () => {
    const targets = [{ name: 'Foo', importedFrom: 'lib' }];

    expectRefs("import { Foo } from 'lib-other'; Foo;", targets);
    expectRefs("import { Foo } from 'other'; Foo;", targets);
  });

  it('should accept any entry of an importedFrom array', () => {
    const targets = [{ name: 'Foo', importedFrom: ['one', 'two'] }];

    expectRefs("import { «import:Foo» } from 'two/sub'; «Foo»;", targets);
    expectRefs("import { Foo } from 'three'; Foo;", targets);
  });

  it('should accept any module when importedFrom is omitted', () => {
    expectRefs("import { «import:Foo» } from 'whatever'; «Foo»;");
  });

  it('should report the imported name of an alias but not the alias or its usages', () => {
    expectRefs("import { «import:Foo» as Bar } from 'lib'; Bar; Foo; let a: Bar;");
  });

  it('should not treat a same-named local as the import when aliased', () => {
    expectRefs("import { «import:Foo» as Bar } from 'lib'; const Foo = 1; Foo;");
  });

  it('should ignore string-literal import names', () => {
    expectRefs("import { 'Foo' as Bar } from 'lib'; Bar; Foo;");
  });

  it('should keep tracking non-aliased imports next to aliased ones', () => {
    expectRefs("import { «import:Foo» as Bar, «import:Baz» } from 'lib'; Bar; «Baz»;", [
      { name: 'Foo' },
      { name: 'Baz' },
    ]);
  });

  it('should report a re-export without binding the name locally', () => {
    expectRefs("export { «import:Foo» } from 'lib'; const a = Foo;");
  });

  it('should report the original name of an aliased re-export', () => {
    expectRefs("export { «import:Foo» as Bar } from 'lib';");
  });

  it('should report the original name of a type re-export', () => {
    expectRefs("export type { «import:Foo» } from 'lib';");
  });

  it('should respect importedFrom for re-exports', () => {
    expectRefs("export { Foo } from 'other';", [{ name: 'Foo', importedFrom: 'lib' }]);
  });

  it('should ignore star re-exports', () => {
    expectRefs("export * from 'lib'; export * as Foo from 'lib'; Foo;");
  });

  it('should report a re-export next to a regular import', () => {
    expectRefs("import { «import:Foo» } from 'lib'; export { «import:Foo» } from 'lib'; «Foo»;");
  });

  it('should not report re-export names', () => {
    expectRefs("import { «import:Foo» } from 'lib'; export * as Foo from './other'");
  });

  it('should report an import which is exported through a local export', () => {
    check('export { «Foo» };');
  });

  it('should report the local side of an aliased local export', () => {
    check('export { «Foo» as Bar };');
  });

  it('should not report the exported alias of a local export', () => {
    check('const Local = 1; export { Local as Foo };');
  });

  it('should report `export default` of the import', () => {
    check('export default «Foo»;');
  });

  it.each([
    ['calls', '«Foo»();'],
    ['constructor calls', 'new «Foo»();'],
    ['member access', '«Foo».bar;'],
    ['optional chaining', '«Foo»?.bar;'],
    ['element access', '«Foo»["bar"];'],
    ['non-null assertions', '«Foo»!;'],
    ['arguments', 'use(«Foo»);'],
    ['array elements', '[«Foo»];'],
    ['spread elements', '[...«Foo»];'],
    ['object property values', '({ key: «Foo» });'],
    ['computed property keys', '({ [«Foo»]: 1 });'],
    ['template expressions', '`${«Foo»}`;'],
    ['default parameter values', 'function f(a = «Foo») {}'],
    ['return values', 'function f() { return «Foo»; }'],
    ['binary expressions', 'x instanceof «Foo»;'],
    ['conditional expressions', 'a ? «Foo» : «Foo»;'],
    ['assignments', 'a = «Foo»;'],
    ['variable initializers', 'const a = «Foo»;'],
    ['arrow function bodies', 'const f = () => «Foo»;'],
    ['class property initializers', 'class A { prop = «Foo»; }'],
    ['destructuring defaults', 'const { a = «Foo» } = obj;'],
    ['renamed destructuring defaults', 'const { Foo: local = «Foo» } = obj;'],
    ['decorators', '@«Foo»() class A {}'],
    ['class extends clauses', 'class A extends «Foo» {}'],
    ['class extends clauses with type arguments', 'class A extends «Foo»<string> {}'],
    ['class implements clauses', 'class A implements «Foo» {}'],
    ['interface extends clauses', 'interface I extends «Foo» {}'],
    ['type annotations', 'let a: «Foo»;'],
    ['type arguments', 'let a: Array<«Foo»>;'],
    ['generic type references', 'let a: «Foo»<string>;'],
    ['union types', 'let a: «Foo» | undefined;'],
    ['type queries', 'let a: typeof «Foo»;'],
    ['qualified type names', 'let a: «Foo».Inner;'],
    ['type assertions', 'x as «Foo»;'],
    ['satisfies expressions', 'x satisfies «Foo»;'],
    ['type predicates', 'function is(x: unknown): x is «Foo» { return true; }'],
  ])('should report %s', (_name, body) => {
    check(body);
  });

  it('should report every occurrence', () => {
    check('«Foo»(«Foo»); let a: «Foo» = new «Foo»();');
  });

  it('should report usages across multiple lines', () => {
    check('\nfunction a() {\n  return «Foo»;\n}\n\nconst b = «Foo»;\n');
  });

  it('should report a shorthand property with the kind shorthand', () => {
    check('({ «shorthand:Foo» });');
  });

  it('should report a shorthand property next to other properties', () => {
    check('const o = { a: 1, «shorthand:Foo», b: «Foo» };');
  });

  it('should report a shorthand property only once', () => {
    const references = findSymbolReferences(parse("import { Foo } from 'lib'; ({ Foo });"), [
      { name: 'Foo' },
    ]);

    expect(references.map((reference) => reference.kind)).toEqual(['import', 'shorthand']);
  });

  it('should not report a shorthand property of another name', () => {
    check('({ Bar });');
  });

  it('should report the initializer of a shorthand destructuring assignment as usage', () => {
    check('({ x = «Foo» } = obj);');
    check('({ «shorthand:Foo», x = «Foo» } = obj);');
    check('let x; for ({ x = «Foo» } of list) {}');
  });

  it('should respect shadowing in the initializer of a shorthand destructuring assignment', () => {
    check('function f(Foo) { ({ x = Foo } = obj); }');
  });

  it.each([
    ['string literals', '\'Foo\'; "Foo";'],
    ['comments', '// Foo\n/* Foo */'],
    ['template text', '`Foo`;'],
    ['member names', 'obj.Foo;'],
    ['optional member names', 'obj?.Foo;'],
    ['nested member names', 'a.b.Foo;'],
    ['qualified type members', 'let a: Other.Foo;'],
    ['object literal keys', '({ Foo: 1 });'],
    ['object literal methods', '({ Foo() {} });'],
    ['object literal getters', '({ get Foo() { return 1; } });'],
    ['class properties', 'class A { Foo = 1; }'],
    ['class methods', 'class A { Foo() {} }'],
    ['class getters', 'class A { get Foo() { return 1; } }'],
    ['class setters', 'class A { set Foo(value: number) {} }'],
    ['interface properties', 'interface I { Foo: string; }'],
    ['interface methods', 'interface I { Foo(): void; }'],
    ['type literal properties', 'let a: { Foo: string };'],
    ['enum members', 'enum E { Foo, Bar }'],
    ['destructuring property names', 'const { Foo: local } = obj;'],
  ])('should ignore %s', (_name, body) => {
    check(body);
  });

  it('should report members of a namespace import which are targets', () => {
    checkNamespace('ns.«Foo»; ns.Bar; ns;');
  });

  it('should not report the namespace import itself', () => {
    expectRefs(importNamespace);
  });

  it.each([
    ['calls', 'ns.«Foo»();'],
    ['constructor calls', 'new ns.«Foo»();'],
    ['chained accesses', 'ns.«Foo».bar;'],
    ['type references', 'let a: ns.«Foo»;'],
    ['generic type references', 'let a: ns.«Foo»<string>;'],
    ['type queries', 'let a: typeof ns.«Foo»;'],
    ['class extends clauses', 'class A extends ns.«Foo» {}'],
    ['class implements clauses', 'class A implements ns.«Foo» {}'],
    ['optional chaining', 'ns?.«Foo»;'],
  ])('should report namespace members in %s', (_name, body) => {
    checkNamespace(body);
  });

  it('should not treat a bare name as a namespace member', () => {
    checkNamespace('Foo; let a: Foo;');
  });

  it('should ignore members of other objects than the namespace', () => {
    checkNamespace('other.Foo; a.ns.Foo; ns["Foo"];');
  });

  it('should respect importedFrom for namespace imports', () => {
    checkNamespace('ns.Foo;', [{ name: 'Foo', importedFrom: 'other' }]);
    checkNamespace('ns.«Foo»;', [{ name: 'Foo', importedFrom: 'lib' }]);
  });

  it('should assign namespace members to the applicable target', () => {
    const targets = [
      { name: 'Foo', importedFrom: 'a', id: 'a' },
      { name: 'Foo', importedFrom: 'b', id: 'b' },
    ];
    const references = findSymbolReferences(parse("import * as ns from 'b'; ns.Foo;"), targets);

    expect(references).toHaveLength(1);
    expect(references[0].target).toBe(targets[1]);
    expect(references[0].kind).toBe('usage');
  });

  it('should report namespace members next to named imports', () => {
    expectRefs("import * as ns from 'a'; import { «import:Foo» } from 'b'; ns.«Foo»; «Foo»;");
  });

  it('should not hide namespace members behind unrelated declarations', () => {
    checkNamespace('function f(other) { return ns.«Foo»; }');
  });

  it.each([
    ['parameters', 'function f(ns: any) { return ns.Foo; }'],
    ['variables', '{ const ns: any = {}; ns.Foo; }'],
    ['destructured variables', '{ const { ns } = obj; ns.Foo; }'],
    ['catch variables', 'try {} catch (ns) { ns.Foo; }'],
    ['classes', '{ class ns {} ns.Foo; }'],
    ['hoisted var', 'function f() { if (x) { var ns: any = {}; } return ns.Foo; }'],
    ['variables used in type queries', '{ const ns: any = {}; let a: typeof ns.Foo; }'],
  ])('should ignore namespace members behind shadowing %s', (_name, body) => {
    checkNamespace(body);
  });

  it('should still report the type qualifier of a parameter named like the namespace', () => {
    checkNamespace('function f(ns: ns.«Foo») { return ns.Foo; }');
  });

  it('should resolve the qualifier of a qualified type name in the namespace space', () => {
    check('function f(Foo: unknown) { let x: «Foo».Inner; }');
    check('function f(Foo: unknown) { let x: «Foo».A.B; }');
    check('{ const Foo = 1; let x: «Foo».Inner; }');
    check('function f() { var Foo = 1; let x: «Foo».Inner; }');
  });

  it('should hide the qualifier of a qualified type name behind namespaces and enums', () => {
    check('namespace N { namespace Foo {} let x: Foo.Inner; }');
    check('{ enum Foo { A } let x: Foo.A; }');
  });

  it('should keep resolving the qualifier of a typeof query as a value', () => {
    check('function f(Foo: unknown) { let x: typeof Foo.Inner; }');
    check('function f(Foo: unknown) { let x: typeof Foo.A.B; }');
    check('function f() { let x: typeof «Foo».Inner; }');
  });

  it('should resolve namespace import qualifiers in the namespace space', () => {
    checkNamespace('function f(ns: any) { let a: ns.«Foo»; }');
    checkNamespace('namespace N { namespace ns {} let a: ns.Foo; }');
    checkNamespace('function f(ns: any) { let a: typeof ns.Foo.Bar; }');
  });

  it('should not hide namespace members behind type-only declarations', () => {
    checkNamespace('function f() { interface ns {} return ns.«Foo»; }');
    checkNamespace('function f() { type ns = {}; return ns.«Foo»; }');
  });

  it('should report namespace members again after the shadowing scope ended', () => {
    checkNamespace('{ const ns: any = {}; ns.Foo; }\nns.«Foo»;');
  });

  it.each([
    ['function parameters', 'function f(Foo) { return Foo; }'],
    ['arrow parameters', 'const f = (Foo) => Foo;'],
    ['arrow parameters without parentheses', 'const f = Foo => Foo;'],
    ['function expression parameters', 'const f = function (Foo) { return Foo; };'],
    ['method parameters', 'class A { m(Foo) { return Foo; } }'],
    ['object method parameters', '({ m(Foo) { return Foo; } });'],
    ['constructor parameters', 'class A { constructor(Foo) { Foo; } }'],
    ['setter parameters', '({ set a(Foo) { Foo; } });'],
    ['destructured object parameters', 'function f({ Foo }) { return Foo; }'],
    ['renamed destructured parameters', 'function f({ a: Foo }) { return Foo; }'],
    ['destructured parameters with default', 'function f({ Foo = 1 }) { return Foo; }'],
    ['destructured array parameters', 'function f([Foo]) { return Foo; }'],
    ['deeply destructured parameters', 'function f({ a: [{ b: Foo }] }) { return Foo; }'],
    ['rest parameters', 'function f(...Foo) { return Foo; }'],
    ['parameters used by nested functions', 'function f(Foo) { return () => Foo; }'],
    ['named function expressions', 'const f = function Foo() { return Foo; };'],
    ['nested function declarations', 'function f() { function Foo() {} return Foo; }'],
    ['hoisted function declarations', 'function f() { Foo(); function Foo() {} }'],
    ['const in a function', 'function f() { const Foo = 1; return Foo; }'],
    ['let in a block', '{ let Foo = 1; Foo; }'],
    ['destructured const', '{ const { Foo } = obj; Foo; }'],
    ['renamed destructured const', '{ const { a: Foo } = obj; Foo; }'],
    ['destructured array const', '{ const [Foo] = arr; Foo; }'],
    ['class declarations', '{ class Foo {} new Foo(); }'],
    ['enum declarations', '{ enum Foo { A } Foo.A; }'],
    ['catch variables', 'try {} catch (Foo) { Foo; }'],
    ['destructured catch variables', 'try {} catch ({ Foo }) { Foo; }'],
    ['for-of variables', 'for (const Foo of list) { Foo; }'],
    ['for-in variables', 'for (const Foo in obj) { Foo; }'],
    ['for variables', 'for (let Foo = 0; Foo < 1; Foo++) { Foo; }'],
    ['declarations in a switch case', 'switch (x) { case 1: const Foo = 1; break; case 2: Foo; }'],
    ['shorthand properties', 'function f(Foo) { return { Foo }; }'],
    ['shorthand properties of a block variable', '{ const Foo = 1; ({ Foo }); }'],
  ])('should hide the import behind %s', (_name, body) => {
    check(body);
  });

  it('should not hide the import behind unrelated declarations', () => {
    check('function f(Bar) { const Baz = 1; return «Foo»; }');
  });

  it('should not hide the import behind the `this` parameter type', () => {
    check('function f(this: «Foo») {}');
  });

  it.each([
    ['var in a nested block', 'function f() { if (x) { var Foo = 1; } return Foo; }'],
    ['var used before its declaration', 'function f() { Foo; var Foo; }'],
    ['var in a for initializer', 'function f() { for (var Foo = 0; ; ) {} return Foo; }'],
    ['var in a for-of initializer', 'function f() { for (var Foo of list) {} return Foo; }'],
    ['var in a try block', 'function f() { try { var Foo = 1; } catch {} return Foo; }'],
    ['destructured var', 'function f() { if (x) { var { Foo } = obj; } return Foo; }'],
    ['var in an arrow function', 'const f = () => { if (x) { var Foo = 1; } return Foo; };'],
    ['var in a namespace', 'namespace N { if (x) { var Foo = 1; } Foo; }'],
  ])('should hide the import behind hoisted %s', (_name, body) => {
    check(body);
  });

  it('should not hide parameter initializers behind body-hoisted vars', () => {
    check('function f(value = «Foo») { var Foo = 1; return value; }');
    check('function f(value = «Foo») { if (x) { var Foo = 1; } return value; }');
    check('const f = (value = «Foo») => { var Foo = 1; return value; };');
    check('class A { m(value = «Foo») { var Foo = 1; return value; } }');
    check('function f({ a = «Foo» }) { for (var Foo of list) {} }');
  });

  it('should still hide the body behind hoisted vars when parameters use the import', () => {
    check('function f(value = «Foo») { if (x) { var Foo = 1; } return Foo; }');
  });

  it('should not leak a hoisted var out of a nested function', () => {
    check('function f() { function g() { var Foo; } return «Foo»; }');
  });

  it('should not leak a hoisted var out of a class method', () => {
    check('class A { m() { var Foo; } n() { return «Foo»; } }');
  });

  it('should not leak a hoisted var out of a namespace', () => {
    check('namespace N { var Foo = 1; }\n«Foo»;');
  });

  it('should not hoist let or const out of a nested block', () => {
    check('function f() { if (x) { let Foo = 1; } return «Foo»; }');
    check('function f() { if (x) { const Foo = 1; } return «Foo»; }');
  });

  it.each([
    ['a block', '{ const Foo = 1; Foo; }\n«Foo»;'],
    ['a catch clause', 'try {} catch (Foo) { Foo; }\n«Foo»;'],
    ['a for-of loop', 'for (const Foo of list) { Foo; }\n«Foo»;'],
    ['a for-in loop', 'for (const Foo in obj) { Foo; }\n«Foo»;'],
    ['a for loop', 'for (let Foo = 0; ; ) { Foo; }\n«Foo»;'],
    ['a switch', 'switch (x) { case 1: const Foo = 1; Foo; }\n«Foo»;'],
    ['a function', 'function a(Foo) { return Foo; }\nfunction b() { return «Foo»; }'],
    ['an arrow function', 'const a = (Foo) => Foo; const b = () => «Foo»;'],
    ['a method', 'class A { m(Foo) { return Foo; } n() { return «Foo»; } }'],
  ])('should stop hiding the import after leaving %s', (_name, body) => {
    check(body);
  });

  it('should leave the outer scope untouched by an inner shadow', () => {
    check('function a() { «Foo»; function b(Foo) { return Foo; } return «Foo»; }');
  });

  it('should share a switch scope across its clauses', () => {
    check('switch (x) { case 1: const Foo = 1; break; case 2: default: Foo; }');
  });

  it('should not let one sibling scope shadow the next', () => {
    check('{ const Foo = 1; }\n{ «Foo»; }\n{ let Foo; }\n«Foo»;');
  });

  it('should report shorthand properties outside of the shadowing scope', () => {
    check('function f(Foo) { return Foo; }\n({ «shorthand:Foo» });');
    check('function f(Bar) { return { «shorthand:Foo» }; }');
  });

  it.each([
    ['function parameters', 'function use(Foo: «Foo») { return Foo; }'],
    ['arrow parameters', 'const use = (Foo: «Foo») => Foo;'],
    ['function expression parameters', 'const use = function (Foo: «Foo») { return Foo; };'],
    ['method parameters', 'class A { m(Foo: «Foo») { return Foo; } }'],
    ['constructor parameter properties', 'class A { constructor(private Foo: «Foo») { Foo; } }'],
    ['setter parameters', 'class A { set a(Foo: «Foo») { Foo; } }'],
    ['destructured parameters', 'function use({ Foo }: «Foo») { return Foo; }'],
    ['rest parameters', 'function use(...Foo: «Foo»[]) { return Foo; }'],
    ['nested type arguments', 'function use(Foo: Array<«Foo»>) { return Foo; }'],
    ['other parameters', 'function use(a: «Foo», Foo: «Foo», b: «Foo») { return Foo; }'],
    ['return types', 'function use(Foo: unknown): «Foo» { return Foo as «Foo»; }'],
    ['type parameter constraints', 'function use<T extends «Foo»>(Foo: T) { return Foo; }'],
    ['type predicates', 'function is(Foo: unknown): Foo is «Foo» { return true; }'],
    ['block constants', '{ const Foo = 1; let a: «Foo»; }'],
    ['block functions', '{ function Foo() {} let a: «Foo»; Foo(); }'],
    ['hoisted var', 'function f() { var Foo = 1; let a: «Foo»; }'],
    ['for-of variables', 'for (const Foo of list) { let a: «Foo»; Foo; }'],
    ['catch variables', 'try {} catch (Foo) { let a: «Foo»; }'],
  ])('should keep type references despite shadowing %s', (_name, body) => {
    check(body);
  });

  it('should hide type queries behind a value declaration, as they resolve values', () => {
    check('function use(Foo: unknown) { let a: typeof Foo; }');
    check('function use(Foo: typeof Foo) { return Foo; }');
  });

  it('should hide class extends behind a value declaration but keep implements types', () => {
    check(
      [
        'function use(Foo: unknown) {',
        '  class A extends Foo {}',
        '  class B implements «Foo» {}',
        '  interface I extends «Foo» {}',
        '}',
      ].join('\n'),
    );
  });

  it.each([
    ['function type parameters', 'function use<Foo>(x: Foo) { return «Foo»; }'],
    ['arrow type parameters', 'const use = <Foo>(x: Foo) => «Foo»;'],
    ['method type parameters', 'class A { m<Foo>(x: Foo) { return «Foo»; } }'],
    ['type parameters used in type queries', 'function f<Foo>() { let a: typeof «Foo»; }'],
    ['block interfaces', '{ interface Foo {} let a: Foo; new «Foo»(); }'],
    ['block type aliases', '{ type Foo = string; let a: Foo; «Foo»; }'],
    ['function interfaces', 'function f() { interface Foo {} let a: Foo; return «Foo»; }'],
    ['interfaces used in type queries', '{ interface Foo {} let a: typeof «Foo»; }'],
  ])('should keep value references despite shadowing %s', (_name, body) => {
    check(body);
  });

  it('should stop hiding type references after the type declaration went out of scope', () => {
    check('{ interface Foo {} }\nlet a: «Foo»;');
    check('function a<Foo>(x: Foo) {}\nlet b: «Foo»;');
    check('{ type Foo = string; }\nlet a: «Foo»;');
  });

  it('should not report the names of type declarations themselves', () => {
    check('{ interface Foo {} type Bar = Foo; }');
  });

  it('should hide both type and value references behind a class declaration', () => {
    check('{ class Foo {} let a: Foo; new Foo(); }');
    check('{ class Foo {} }\nlet a: «Foo»; new «Foo»();');
  });

  it('should hide both type and value references behind an enum declaration', () => {
    check('{ enum Foo { A } let a: Foo; Foo.A; }');
  });

  it('should track type and value shadowing independently across scopes', () => {
    check(
      [
        'function f<Foo>(x: Foo) {',
        '  function g(Foo: Foo) { return Foo; }',
        '  return «Foo»;',
        '}',
      ].join('\n'),
    );
  });

  it('should keep an outer value shadow while an inner scope shadows the type', () => {
    check('function f(Foo: unknown) { function g<Foo>(x: Foo) { return Foo; } }');
  });

  it('should report a type reference inside a function which only shadows the value', () => {
    check('function f(Foo: unknown) { return (x: «Foo») => Foo; }');
  });

  it('should handle a mix of constructs in a single file', () => {
    check(
      [
        '',
        'const config = { «shorthand:Foo» };',
        '',
        'function use(Foo: «Foo») {',
        '  return Foo;',
        '}',
        '',
        'class Component {',
        '  Foo = «Foo»;',
        '  constructor(private ns: «Foo») {}',
        '}',
        '',
        'export { «Foo» };',
        '',
      ].join('\n'),
    );
  });

  it('should handle imports from several modules and targets', () => {
    expectRefs(
      [
        "import { «import:Button» } from '@lib/button';",
        "import { «import:Button» as Other, «import:Card» } from '@lib/card';",
        "import { Card as Unrelated } from '@other/card';",
        '',
        'const a = «Button»;',
        'const b = «Card»;',
        'const c = Other;',
        'const d = Unrelated;',
      ].join('\n'),
      [
        { name: 'Button', importedFrom: '@lib' },
        { name: 'Card', importedFrom: '@lib' },
      ],
    );
  });
});
