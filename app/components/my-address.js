import Ember from 'ember';
// import AddressValidations from 'changeset-scope/validators/address';
// import lookupValidator from 'ember-changeset-validations';
// import Changeset from 'ember-changeset';

const { set } = Ember;

export default Ember.Component.extend({
    init() {
        let component = this;

        component._super(...arguments);

        // this.changeset = new Changeset(this.model, lookupValidator(AddressValidations), AddressValidations);

        // set(component.model, 'index', component.index);

        // this.changeset.validate();
        // this.validateUp(this.changeset);
    },

    // keyUp: function() {
    //     console.log('test1');
    //     // this.sendAction('validatedUp', this.changeset, this.xAddresses[this.index]);
    // },

    // validateUp(changeset) {
    //     this.sendAction('validatedUp', changeset, this.xAddresses[this.index]);
    // },

    actions: {
        validateProperty(changeset, property) {
            console.log('validateProperty');
            // this.sendAction('validatedUp', this.changeset, this.xAddresses[this.index]);
            this.sendAction('changed');
            return changeset.validate(property);
        },
        rentOrOwn: function (value) {
            let changeset = this.changeset;
            if (value === true) {
                set(changeset._content, 'landlord', {});
                set(changeset, 'landlord.name', '');
                set(changeset, 'landlord.phone', '');
                set(changeset, 'landlord.rent', '');
            } else {
                set(changeset, 'landlord.name', null);
                set(changeset, 'landlord.phone', null);
                set(changeset, 'landlord.rent', null);
            }
            this.sendAction('changed');
        }
    }
});
