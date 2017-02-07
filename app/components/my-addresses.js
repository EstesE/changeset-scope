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
        let changesets = [];
        for (let i = 0; i < this.model.length; i++) {
            set(this.model[i], 'index', i);
            let changeset = new Changeset(this.model[i], lookupValidator(AddressValidations), AddressValidations);
            changesets.push(changeset);
            changeset.validate();
        }
        set(component, 'changesets', changesets);
        this.keyUp();
    },
    keyUp: function() {
        for (var i = 0, len = this.changesets.length; i < len; i++) {
            if (this.changesets[i].get('isValid') !== true) {
                set(this, 'allValid', false);
                break;
            } 
            set(this, 'allValid', true);
        }
    },

    actions: {
        changed: function() {
            this.keyUp();
        },

        save: function(/*changeset*/) {
            // debugger;
        },

        removeAddress: function (changeset) {
            if (isPresent(changeset)) {
                let changesets = this.get('changesets');
                changesets.removeObject(changeset);

                for (var i = 0, len = changesets.length; i < len; i++) {
                    changesets[i].set('index', i);
                }
                this.keyUp();
            }
        },

        addAddress: function () {
            let changesets = this.get('changesets');
            let model = Ember.Object.create({
                street: '',
                city: '',
                state: '',
                zip: '',
                isCurrent: false,
                rent: false
            });

            let mId = 0;
            for (var i = 0, len = changesets.length; i < len; i++) {
                mId = i;
            }

            set(model, 'index', mId + 1);
            let changeset = new Changeset(model, lookupValidator(AddressValidations), AddressValidations);
            changesets.pushObject(changeset);

            changeset.validate();
            this.keyUp();
        }
    }
});
