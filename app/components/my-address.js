import Ember from 'ember';

const { set } = Ember;

export default Ember.Component.extend({
    init() {
        let component = this;

        component._super(...arguments);
    },

    actions: {
        validateProperty(changeset, property) {
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
