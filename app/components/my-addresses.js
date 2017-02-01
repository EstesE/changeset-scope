import Ember from 'ember';

const { get, isPresent, set } = Ember;

export default Ember.Component.extend({
    numberOfAddresses: null,

    init() {
        let component = this;
        component._super(...arguments);


        set(component, 'numberOfAddresses', component.model.length);
    },

    actions: {

        removeAddress:function(address) {
            let component = this;
            let addressNum = get(component, 'numberOfAddresses');
            if (isPresent(address)) {
                let addresses = this.get('model');
                addresses.removeObject(address);
                set(component, 'numberOfAddresses', addressNum - 1);
            }
        },

        addAddress: function() {
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
