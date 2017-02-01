import Ember from 'ember';
import AddressValidations from 'changeset-scope/validators/address';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

const { set } = Ember;

export default Ember.Component.extend({
    EventBus: Ember.inject.service('event-bus'),

    init() {
        let component = this;

        component._super(...arguments);

        this.changeset = new Changeset(this.model, lookupValidator(AddressValidations), AddressValidations);

        component.get( 'EventBus' ).publish('valid-addresses', this.changeset);
    },

    keyUp: function() {
        this.changeset.validate();
        this.get( 'EventBus' ).publish('valid-addresses', this.changeset);
    },

    actions: {
        validateProperty(changeset, property) {
            this.get( 'EventBus' ).publish('valid-addresses', this.changeset, property);  
            return changeset.validate(property);
        },
        rentOrOwn: function (value) {
            // debugger;
            let component = this;
            let model = this.model;
            let changeset = this.changeset;
            if (value === true) {
                set(model, 'landlord', { name: '', phoneNumber: '', monthlyRent: '' });
                set(changeset, 'landlord.name', '');
                set(changeset, 'landlord.phone', '');
                set(changeset, 'landlord.rent', '');
                component.get( 'EventBus' ).publish('valid-addresses', this.changeset);
            } else {
                delete model.landlord;
                set(this, 'changeset', new Changeset(this.model, lookupValidator(AddressValidations), AddressValidations));
                component.get( 'EventBus' ).publish('valid-addresses', this.changeset);
            }
        }
    }
});
