import Ember from 'ember';

const { isPresent, set } = Ember;

export default Ember.Component.extend({
    init() {
        let component = this;

        component._super(...arguments);
        console.log(component.get('changeset'));
    },

    actions: {
        validateProperty(changeset, property) {
            return changeset.validate(property);
        },
        rentOrOwn: function (value) {
            let changeset = this.changeset;
            let address = this.address;
            if (isPresent(address) && isPresent(changeset)) {
                if (value === true) {
                    set(address, 'landlord', {});
                    changeset.set('landlord.name', '');
                    changeset.set('landlord.phone', '');
                    changeset.set('landlord.rent', '');
                } else {
                    changeset.set('landlord.name', null);
                    changeset.set('landlord.phone', null);
                    changeset.set('landlord.rent', null);
                    set(address, 'landlord', null);
                }
            }
        }
    }
});
