import Ember from 'ember';
import AddressValidations from 'changeset-scope/validators/address';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

export default Ember.Component.extend({
    init: function() {
        let component = this;

		component._super(...arguments);

        this.changeset = new Changeset(this.model, lookupValidator(AddressValidations), AddressValidations);
    },
    actions: {
        validateProperty(changeset, property) {
			return changeset.validate(property);
		},
        rentOrOwn: function (value) {
            console.log(value);
        }
    }
});
