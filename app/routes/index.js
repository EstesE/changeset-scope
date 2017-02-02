import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        return [
            {
                "id": 1,
                "street": "88 Tennessee Street",
                "city": "Olympia",
                "state": "WA",
                "zip": "49208",
                "moveInDate": "2016-10-05",
                // "moveOutDate": "2016-04-20",
                "rent": false
            }, {
                "id": 2,
                "street": "3977 Arrowood Avenue",
                "city": "Worcester",
                "state": "MA",
                "zip": "99735",
                "moveInDate": "2016-12-18",
                "moveOutDate": "2016-11-23",
                "rent": true,
                "landlord": {
                    "name": "Anthony Crawford",
                    "phone": "5088675309",
                    "rent": "1200"
                }
            }
        ];
    }
});
