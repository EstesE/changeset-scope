import Ember from 'ember';

const { isPresent } = Ember;

export default Ember.Component.extend({

    actions: {

        removeAddress:function(address) {
            console.log('Remove Address');
            if (isPresent(address)) {
                let addresses = this.get('model');
                addresses.removeObject(address);
            }
        },

        addAddress: function() {
            console.log('Add Address');
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
        }
    }
});
