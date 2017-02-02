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

        set(component.model, 'index', component.index);

        this.changeset.validate();
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
                set(changeset, 'landlord.name', null);
                set(changeset, 'landlord.phone', null);
                set(changeset, 'landlord.rent', null);
                this.sendAction('validatedUp', this.changeset, this.xAddresses[this.index]);
            }
        }
    }
});
