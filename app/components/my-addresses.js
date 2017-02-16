import Ember from 'ember';
import AddressValidations from 'changeset-scope/validators/address';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

const { isPresent, set } = Ember;

export default Ember.Component.extend({
    allValid: false,
    
    init() {
        let component = this;
        component._super(...arguments);

        let objs = [];
        for (let i = 0; i < this.model.addresses.length; i++) {
            let address = this.model.addresses[i];
            let changeset = new Changeset(address, lookupValidator(AddressValidations), AddressValidations);

            if (address.rent === false) {
                changeset.set('rent', false);
            }

            let obj = {
                changeset: changeset,
                address: address
            };

            objs.pushObject(obj);
        }
        set(component, 'objs', objs);
    },


    actions: {

        save: function() {
            for (let i = 0, length = this.objs.length; i < length; i++ ){
                if (isPresent(this.objs[i].changeset)) {
                    this.objs[i].changeset.validate().then(() => {
                        console.log('changeset-' + i);
                        console.log('isValid: ', this.objs[i].changeset.get('isValid'));
                        console.log('isDirty: ', this.objs[i].changeset.get('isDirty'));
                        console.log('\n');
                    });
                }
                
            }
        },

        removeAddress: function (obj) {
            if (isPresent(obj)) {
                let objs = this.get('objs');
                objs.removeObject(obj);
            }
        },

        addAddress: function () {

            let objs = this.get('objs');
            let address = Ember.Object.create({
                street: '',
                city: '',
                state: '',
                zip: '',
                isCurrent: false,
                rent: false
            });

            let mId = 0;
            for (var i = 0, len = objs.length; i < len; i++) {
                mId = i;
            }

            set(address, 'index', mId + 1);
            let changeset = new Changeset(address, lookupValidator(AddressValidations), AddressValidations);
            
            let obj = {
                changeset: changeset,
                address: address
            };

            objs.pushObject(obj);
        }
    }
});
