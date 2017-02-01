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
            } else {
                delete model.landlord;
                set(this, 'changeset', new Changeset(this.model, lookupValidator(AddressValidations), AddressValidations));
            }
        }
    }
});
