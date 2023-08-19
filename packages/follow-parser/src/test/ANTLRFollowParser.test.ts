import assert from 'assert';
import { parseTreeStr, FollowParser } from '../FollowParser';

suite('ANTLRFollowParser Tests', () => {
  test('Parsing empty file.', () => {
    var result = parseTreeStr('');
    var target = '(root <EOF>)';
    assert.equal(result, target);
  });

  test('Parsing type block.', () => {
    var result = parseTreeStr('type wff set nat');
    var target = '(root (typeBlock type (typeDef wff) (typeDef set) (typeDef nat)) <EOF>)';
    assert.equal(result, target);
  });

  test('Parsing const block.', () => {
    var result = parseTreeStr('const wff w0');
    var target = '(root (constBlock const (typeID wff) (constID w0)) <EOF>)';
    assert.equal(result, target);
  });

  test('Parsing var block.', () => {
    var result = parseTreeStr('var wff w0');
    var target = '(root (varBlock var (typeID wff) (varID w0)) <EOF>)';
    assert.equal(result, target);
  });

  test('Parsing prop block.', () => {
    var result = parseTreeStr('prop wff imp (wff w0, wff w1)');
    var target =
      '(root (propBlock prop (typeID wff) (propID imp) (paramBlockNonEmpty ( (paramPair (typeID wff) (argID w0)) , (paramPair (typeID wff) (argID w1)) ))) <EOF>)';
    assert.equal(result, target);
  });

  test('Parsing axiom block.', () => {
    var result = parseTreeStr('axiom axiom1(wff w0, wff w1) {|- imp w0 imp w1 w0}');
    var target =
      '(root (axiomBlock axiom (axiomID axiom1) (paramBlock ( (paramPair (typeID wff) (argID w0)) , (paramPair (typeID wff) (argID w1)) )) (contentBlock { (targetBlock |- (targetID imp) (targetID w0) (targetID imp) (targetID w1) (targetID w0)) })) <EOF>)';
    assert.equal(result, target);
  });

  test('Parsing theorem block.', () => {
    var result = parseTreeStr('thm thm1(wff w0, wff w1) {|- imp w0 imp w1 w0} = {ax1 w0 w1}');
    var target =
      '(root (theoremBlock thm (theoremID thm1) (paramBlock ( (paramPair (typeID wff) (argID w0)) , (paramPair (typeID wff) (argID w1)) )) (contentBlock { (targetBlock |- (targetID imp) (targetID w0) (targetID imp) (targetID w1) (targetID w0)) }) = (proofBlock { (proofID ax1) (proofID w0) (proofID w1) })) <EOF>)';
    assert.equal(result, target);
  });
});
