import Ember from 'ember';

const { get, isBlank, isPresent, set } = Ember;

export default Ember.Component.extend({
    EventBus: Ember.inject.service('event-bus'),

    numberOfAddresses: null,
    addressesValid: null,

    init() {
        let component = this;
        component._super(...arguments);

        set(component, 'numberOfAddresses', component.model.length);

        component.get('EventBus').subscribe('valid-addresses', function (changeset) {
            changeset.validate();
            if (isBlank(get(changeset._content, 'landlord'))) {
                delete changeset._errors['landlord.phone'];
                delete changeset._errors['landlord.rent'];
                delete changeset._errors['landlord.name'];
            }

            if (changeset.get('errors').length > 0) {
                console.log('set to false');
                set(component, 'addressesValid', false);
            } else {
                console.log('set to true');
                set(component, 'addressesValid', true);
            }

        });
    },

    actions: {

        removeAddress: function (address) {
            let component = this;
            let addressNum = get(component, 'numberOfAddresses');
            if (isPresent(address)) {
                let addresses = this.get('model');
                addresses.removeObject(address);
                set(component, 'numberOfAddresses', addressNum - 1);
            }
        },

        addAddress: function () {
            let component = this;
            let addressNum = get(component, 'numberOfAddresses');
            let addresses = this.get('model');
            let address = Ember.Object.create({
                street: '',
                city: '',
                state: '',
                zip: '',
                isCurrent: false,
                rent: false
            });
            addresses.pushObject(address);
            set(component, 'numberOfAddresses', addressNum + 1);
        }
        
    }
});
