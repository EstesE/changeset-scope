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
                "moveOutDate": "2016-04-20",
                "rent": false
            }, {
                "id": 3,
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
            }, {
                "id": 4,
                "street": "10 Leroy Lane",
                "city": "Orlando",
                "state": "FL",
                "zip": "38433",
                "moveInDate": "2017-01-15",
                "moveOutDate": "2016-05-02",
                "rent": false
            }
        ];
    }
});
