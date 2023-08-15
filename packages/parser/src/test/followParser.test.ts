import assert from 'assert';
import * as followParser from '../followParser';

suite('FollowParser Tests', () => {
  test('Parsing empty file.', () => {
    var result = followParser.parseTreeStr('');
    var target = '(root <EOF>)';
    assert.equal(result, target);
  });

  test('Parsing var block.', () => {
    var result = followParser.parseTreeStr('var wff w0');
    var target = '(root (varBlock var (typeID wff) (varID w0)) <EOF>)';
    assert.equal(result, target);
  });

  test('Parsing prop block.', () => {
    var result = followParser.parseTreeStr('prop wff imp (wff w0, wff w1)');
    var target =
      '(root (propBlock prop (typeID wff) (propID imp) (paramBlock ( (typeID wff) (argID w0) , (typeID wff) (argID w1) ))) <EOF>)';
    assert.equal(result, target);
  });

  test('Parsing axiom block.', () => {
    var result = followParser.parseTreeStr('axiom axiom1(wff w0, wff w1) {|- imp w0 imp w1 w0}');
    var target =
      '(root (axiomBlock axiom (axiomID axiom1) (paramBlock ( (typeID wff) (argID w0) , (typeID wff) (argID w1) )) (contentBlock { (targetBlock |- (targetID imp) (targetID w0) (targetID imp) (targetID w1) (targetID w0)) })) <EOF>)';
    assert.equal(result, target);
  });

  test('Parsing theorem block.', () => {
    var result = followParser.parseTreeStr('thm thm1(wff w0, wff w1) {|- imp w0 imp w1 w0} = {ax1 w0 w1}');
    var target =
      '(root (theoremBlock thm (theoremID thm1) (paramBlock ( (typeID wff) (argID w0) , (typeID wff) (argID w1) )) (contentBlock { (targetBlock |- (targetID imp) (targetID w0) (targetID imp) (targetID w1) (targetID w0)) }) = (proofBlock { (proofID ax1) (proofID w0) (proofID w1) })) <EOF>)';
    assert.equal(result, target);
  });
});
