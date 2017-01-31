import { module, test } from 'qunit';
import validateAddress from 'changeset-scope/validators/address';

module('Unit | Validator | address');

test('it exists', function(assert) {
  assert.ok(validateAddress());
});
