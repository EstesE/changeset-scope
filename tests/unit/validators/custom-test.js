import { module, test } from 'qunit';
import validateCustom from 'changeset-scope/validators/custom';

module('Unit | Validator | custom');

test('it exists', function(assert) {
  assert.ok(validateCustom());
});
