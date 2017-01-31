import { module, test } from 'qunit';
import validateDate from 'changeset-scope/validators/date';

module('Unit | Validator | date');

test('it exists', function(assert) {
  assert.ok(validateDate());
});
