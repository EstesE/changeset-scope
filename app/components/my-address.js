import Ember from 'ember';
import AddressValidations from 'changeset-scope/validators/address';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

const { set } = Ember;

export default Ember.Component.extend({
    init() {
        let component = this;

        component._super(...arguments);

        this.changeset = new Changeset(this.model, lookupValidator(AddressValidations), AddressValidations);

        // validate default fields
        this.changeset.validate('street');
        this.changeset.validate('city');
        this.changeset.validate('state');
        this.changeset.validate('zip');
        this.changeset.validate('moveInDate');
        this.changeset.validate('moveOutDate');

        this.validateUp(this.changeset);
    },

    keyUp: function() {
        this.sendAction('validatedUp', this.changeset, this.xAddresses[this.index]);
    },

    validateUp(changeset) {
        this.sendAction('validatedUp', changeset, this.xAddresses[this.index]);
    },

    actions: {
        validateProperty(changeset, property) {
            this.sendAction('validatedUp', this.changeset, this.xAddresses[this.index]);
            return changeset.validate(property);
        },
        rentOrOwn: function (value) {
            let model = this.model;
            let changeset = this.changeset;
            if (value === true) {
                set(model, 'landlord', { name: '', phoneNumber: '', monthlyRent: '' });
                set(changeset, 'landlord.name', '');
                set(changeset, 'landlord.phone', '');
                set(changeset, 'landlord.rent', '');
                this.sendAction('validatedUp', this.changeset, this.xAddresses[this.index]);
            } else {
                debugger;
                // Need to remove 'landlord' from the changeset and remove any errors associated with 'landlord' in order for the changeset to be 'isValid' true.

                // set(changeset, 'landlord', null);
                // this.sendAction('validatedUp', this.changeset, this.xAddresses[this.index]);

                // delete model.landlord;
                // debugger;
                
                // delete changeset._errors['landlord.phone'];
				// delete changeset._errors['landlord.rent'];
				// delete changeset._errors['landlord.name'];

                // delete changeset._content['landlord.phone'];
                // delete changeset._content['landlord.rent'];
				// delete changeset._content['landlord.name'];
                // // set(this, 'changeset', new Changeset(this.model, lookupValidator(AddressValidations), AddressValidations));
                // this.sendAction('validatedUp', this.changeset, this.xAddresses[this.index]);
            }
        }
    }
});
