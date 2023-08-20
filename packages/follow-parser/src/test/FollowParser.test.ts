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
    const hover = await parser.getHover(textDocument, { line: 0, character: 47 }).catch((_) => {
      assert.fail();
    });
    if (hover === undefined) {
      assert.fail();
    }
    assert(hover.contents !== null);
    console.log(hover);
  });
});
