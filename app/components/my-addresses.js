import Ember from 'ember';
import AddressValidations from 'changeset-scope/validators/address';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';

const { get, isPresent, set } = Ember;

export default Ember.Component.extend({
    numberOfAddresses: null,
    addressesValid: null,
    xAddresses: [],
    allValid: false,
    addressIndex: null,
    
    init() {
        let component = this;
        component._super(...arguments);

        let changesets = []
        for (let i = 0; i < this.model.length; i++) {
            let changeset = new Changeset(this.model[i], lookupValidator(AddressValidations), AddressValidations);
            changesets.push(changeset);
        }
        set(component, 'changesets', changesets);
    },

    actions: {
        validatedUp: function (changeset, address) {
            if (isPresent(changeset) && isPresent(address)) {
                let mAdd = this.xAddresses.findBy('name', address.name);
                if (isPresent(mAdd)) {
                    set(mAdd, 'changeset', changeset);
                    set(address, 'valid', changeset.get('isValid'));
                }
            }

            for (let i = 0; i < this.xAddresses.length; i++) {
                if (this.xAddresses[i].valid === true) {
                    set(this, 'allValid', true);
                } else {
                    set(this, 'allValid', false);
                    break;
                }
            }
        },

        removeAddress: function (address, index) {
            let component = this;
            let addressNum = get(component, 'numberOfAddresses');
            if (isPresent(address)) {
                let addresses = this.get('model');
                addresses.removeObject(address);
                set(component, 'numberOfAddresses', addressNum - 1);
                this.xAddresses.removeAt(index);

                for (let i = 0; i < this.xAddresses.length; i++) {
                    if (this.xAddresses[i].valid === true) {
                        set(this, 'allValid', true);
                    } else {
                        set(this, 'allValid', false);
                        break;
                    }
                }
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

            let index = get(this, 'addressIndex') + 1;
            let name = 'address' + index;
            let add = {
                name: name,
                valid: false,
                changeset: {}
            };
            this.xAddresses.push(add);
            set(this, 'addressIndex', get(this, 'addressIndex') + 1);
        }

    }
});
