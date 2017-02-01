import { module, test } from 'qunit';
import validateConditional from 'changeset-scope/validators/conditional';

module('Unit | Validator | conditional');

test('it exists', function(assert) {
  assert.ok(validateConditional());
});
