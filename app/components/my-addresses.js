import Ember from 'ember';

export default Ember.Component.extend({

    actions: {

        removeAddress:function() {
            console.log('Remove Address');
        },

        addAddress: function() {
            console.log('Add Address');
        }
    }
});
