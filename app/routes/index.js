import Ember from 'ember';

const { set } = Ember;

export default Ember.Route.extend({
    model: function () {
        return { addresses: Ember.A() };
        // return [
        //     {
        //         "id": 1,
        //         "street": "88 Tennessee Street",
        //         "city": "Olympia",
        //         "state": "WA",
        //         "zip": "49208",
        //         "moveInDate": "2017-02-01",
        //         // "moveOutDate": "2016-04-20",
        //         "rent": false
        //     }, {
        //         "id": 2,
        //         "street": "3977 Arrowood Avenue",
        //         "city": "Worcester",
        //         "state": "MA",
        //         "zip": "99735",
        //         "moveInDate": "2017-03-01",
        //         "moveOutDate": "2017-02-01",
        //         "rent": true,
        //         "landlord": {
        //             "name": "Anthony Crawford",
        //             "phone": "5088675309",
        //             "rent": '1150'
        //         }
        //     }
        // ];
    },
    afterModel(model) {
        // debugger;
        if (model.addresses.length < 1) {
            let address = {
                id: 1,
                street: '',
                city: '',
                // state: '',
                state: {
                    abbreviation: ''
                },
                applicantPets: {
                    number: 0
                },
                zip: '',
                moveInDate: '',
                moveOutDate: '',
                rent: false,
                landlord: null
                // landlord: {
                //     name: '',
                //     phone: '',
                //     rent: ''
                // }
            }
            let addresses = Ember.A();
            addresses.pushObject(address);
            set(model, 'addresses', addresses);
        }
    }
});
