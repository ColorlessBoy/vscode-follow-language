import assert from 'assert';
import { FollowParser } from '../FollowParser';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DiagnosticSeverity, Diagnostic, Position } from 'vscode-languageserver/node';
import path from 'path';
import { readFileSync } from 'fs';
import { URI } from 'vscode-uri';

suite('FollowParser Tests', () => {
  test('test #1: Diagnostics for single syntax error', async () => {
    const content = 'type wff; prop wff imp (wff w1, wff)';
    const textDocument = TextDocument.create('test://test.fol', 'fol', 0, content);
    const parser = new FollowParser();
    const result = await parser.getDiagnostics(textDocument).catch((_) => {
      assert.fail();
    });
    const collection = result.get(textDocument.uri);
    if (collection === undefined) {
      assert.fail();
    }
    assert.strictEqual(collection.length, 1);
    collection.forEach((diagnostic: Diagnostic) => {
      if (diagnostic.severity !== DiagnosticSeverity.Error) {
        assert.fail();
      } else {
        console.log(diagnostic);
      }
    });
  });
  test('test #2: Diagnostics for single semantic error', async () => {
    const content = 'type wff wff';
    const textDocument = TextDocument.create('test://test.fol', 'fol', 0, content);
    const parser = new FollowParser();
    const result = await parser.getDiagnostics(textDocument).catch((_) => {
      assert.fail();
    });
    const collection = result.get(textDocument.uri);
    if (collection === undefined) {
      assert.fail();
    }
    assert.strictEqual(collection.length, 1);
    collection.forEach((diagnostic: Diagnostic) => {
      if (diagnostic.severity !== DiagnosticSeverity.Error) {
        assert.fail();
      } else {
        console.log(diagnostic);
      }
    });
  });
  test('test #3: Diagnostics for single function stack', async () => {
    const content = 'type wff prop wff imp(wff w0, wff w1) axiom ax-1(wff w2, wff w3) { -| w2 |- imp w3}';
    const textDocument = TextDocument.create('test://test.fol', 'fol', 0, content);
    const parser = new FollowParser();
    const result = await parser.getDiagnostics(textDocument).catch((_) => {
      assert.fail();
    });
    const collection = result.get(textDocument.uri);
    if (collection === undefined) {
      assert.fail();
    }
    assert.strictEqual(collection.length, 1);
    collection.forEach((diagnostic: Diagnostic) => {
      if (diagnostic.severity !== DiagnosticSeverity.Error) {
        assert.fail();
      } else {
        console.log(diagnostic);
      }
    });
  });
  test('test #4: Hover', async () => {
    const content = 'type wff prop wff imp(wff w0, wff w1) axiom ax-1(wff w2, wff w3) { -| w2 |- imp w3 w2}';
    const textDocument = TextDocument.create('test://test.fol', 'fol', 0, content);
    const parser = new FollowParser();
    const hover = parser.getHover(textDocument, { line: 0, character: 47 });
    if (hover === undefined) {
      assert.fail();
    }
    assert(hover.contents !== null);
    console.log(hover);
  });
  test('test #5: Hover', async () => {
    const content: string =
      'type wff\n' +
      'const wff true false\n' +
      'prop wff imp(wff w0, wff w1)\n' +
      'axiom ax-1(wff w0, wff w1) { |- imp w0 imp w1 w0}\n' +
      'axiom ax-2(wff w0, wff w1, wff w2) { |- imp imp w0 imp w1 w2 imp imp w0 w1 imp w0 w2}\n' +
      'axiom ax-mp(wff w0, wff w1) { -| w0 -| imp w0 w1 |- w1}\n' +
      'thm a1i(wff w0, wff w1) { -| w0 |- imp w1 w0 } = {\n' +
      '    ax-mp w0 imp w1 w0\n' +
      '    ax-1 w0 w1\n';
    ('}\n');
    const textDocument = TextDocument.create('test://test.fol', 'fol', 0, content);
    const parser = new FollowParser();
    const hover = parser.getHover(textDocument, { line: 6, character: 5 });
    if (hover === undefined) {
      assert.fail();
    }
    assert(hover.contents !== null);
    console.log(hover);
  });
  test('test #6: Semantic Token', async () => {
    const content = 'type wff prop wff imp(wff w0, wff w1) axiom ax-1(wff w0) { |- w0 }';
    const textDocument = TextDocument.create('test://test.fol', 'fol', 0, content);
    const parser = new FollowParser();
    const semanticToken = parser.getSemanticToken(textDocument);
    if (semanticToken === undefined) {
      assert.fail();
    }
    console.log(parser.semanticTokenListDocMap.get(textDocument.uri)?.length);
  });
  test('test #7: Theorem without proof.', async () => {
    const content: string =
      'type wff\n' +
      'const wff true false\n' +
      'prop wff imp(wff w0, wff w1)\n' +
      'axiom ax-1(wff w0, wff w1) { |- imp w0 imp w1 w0}\n' +
      'axiom ax-2(wff w0, wff w1, wff w2) { |- imp imp w0 imp w1 w2 imp imp w0 w1 imp w0 w2}\n' +
      'axiom ax-mp(wff w0, wff w1) { -| w0 -| imp w0 w1 |- w1}\n' +
      'thm a1i(wff w0, wff w1) { -| w0 |- imp w1 w0 } = {\n' +
      '    ax-mp w0 imp w1 w0\n' +
      '    ax-mp w0\n' +
      '}\n';
    const textDocument = TextDocument.create('test://test.fol', 'fol', 0, content);
    const parser = new FollowParser();
    const diagnostic = await parser.getDiagnostics(textDocument);
    if (diagnostic === undefined) {
      assert.fail();
    }
    console.log(diagnostic);
  });
  test('test # 8: Import-parseImport', async () => {
    const filePath = path.resolve('./src/test/examples/import/negation.fol');
    const parser = new FollowParser();
    const fileUri = URI.parse(filePath).toString();
    parser.parseImport(fileUri);
    assert.equal(parser.childDocMap.size, 2);
    assert.equal(parser.parentDocMap.size, 2);
    assert.equal(parser.isParseImportVisitedDoc.size, 3);
    console.log(parser.isParseImportVisitedDoc);
  });
  test('test # 9: Import-hover', async () => {
    const filePath = path.resolve('./src/test/examples/import/negation.fol');
    const content = readFileSync(filePath, 'utf-8');
    const fileUri = URI.parse(filePath).toString();
    const textDocument = TextDocument.create(fileUri, 'fol', 0, content);
    const parser = new FollowParser();
    const diagnostic = await parser.getDiagnostics(textDocument);
    if (diagnostic === undefined) {
      assert.fail();
    }
    console.log(diagnostic);
  });
  test('test # 10: Import-hover', async () => {
    const filePath = path.resolve('./src/test/examples/import/negation.fol');
    const content = readFileSync(filePath, 'utf-8');
    const fileUri = URI.parse(filePath).toString();
    const textDocument = TextDocument.create(fileUri, 'fol', 0, content);
    const parser = new FollowParser();
    const diagnostic = await parser.getDiagnostics(textDocument);
    if (diagnostic === undefined) {
      assert.fail();
    }
    const filePath2 = path.resolve('./src/test/examples/import/definitions.fol');
    const content2 = readFileSync(filePath2, 'utf-8');
    const fileUri2 = URI.parse(filePath2).toString();
    const textDocument2 = TextDocument.create(fileUri2, 'fol', 0, content2);
    const location = parser.getReference(textDocument2, { line: 8, character: 7 });
    console.log(location);
  });
  test('test # 11 : Invalid diff statement', async () => {
    const content: string =
      'type setvar wff\n' +
      'prop wff eqset(setvar s0, setvar s1)' +
      'prop wff diffs(setvar s0, setvar s1)\n' +
      'prop wff diff(setvar s0, wff w0)\n' +
      'axiom ax-1(setvar s0) { |- diffs s0 s0 }\n' +
      'axiom ax-2(setvar s0, setvar s1) { |- diff s0 eqset s0 s1 }';
    const textDocument = TextDocument.create('test://test.fol', 'fol', 0, content);
    const parser = new FollowParser();
    const diagnostic = await parser.getDiagnostics(textDocument);
    if (diagnostic === undefined) {
      assert.fail();
    }
    console.log(diagnostic);
  });
  test('test # 11 : Invalid diff proof statement', async () => {
    const content: string =
      'type setvar wff\n' +
      'prop wff diffs(setvar s0, setvar s1)\n' +
      'const setvar hs0 hs1\n' +
      'axiom df-hs0-s(setvar s0) { |- diffs hs0 s0 }\n' +
      'axiom a1ii(wff w0, wff w1) { -| w1 -| w0 |- w0 }\n' +
      'thm th1(setvar s0) { |- diffs hs0 s0 } = { df-hs0-s s0 }\n' +
      'thm th2(setvar s0) { |- diffs hs1 s0 } = { a1ii diffs hs1 s0 diffs hs0 hs0 th1 hs0 }\n';

    const textDocument = TextDocument.create('test://test.fol', 'fol', 0, content);
    const parser = new FollowParser();
    const diagnostic = await parser.getDiagnostics(textDocument);
    if (diagnostic === undefined) {
      assert.fail();
    }
    console.log(diagnostic);
  });
});
