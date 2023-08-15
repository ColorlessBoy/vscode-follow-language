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
});
