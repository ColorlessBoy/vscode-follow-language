import assert from 'assert';
import { FollowParser } from '../FollowParser';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DiagnosticSeverity, Diagnostic, Position } from 'vscode-languageserver/node';

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
});
