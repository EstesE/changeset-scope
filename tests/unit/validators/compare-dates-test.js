import { module, test } from 'qunit';
import validateCompareDates from 'changeset-scope/validators/compare-dates';

module('Unit | Validator | compare-dates');

test('it exists', function(assert) {
  assert.ok(validateCompareDates());
});
