import Ember from 'ember';

const { isPresent } = Ember;

export default function lessThanDate() {
	return (key, newValue, oldValue, changes, content) => {

        if (isPresent(newValue) && isPresent(content.moveOutDate)) {
            let moveInDate = newValue;
            let moveOutDate = content.moveOutDate;
            // debugger;
            if (changes.moveOutDate) {
                moveOutDate = changes.moveOutDate;
            }
            let answer = moment(moveOutDate).isAfter(moveInDate);
            if (answer === false) {
                return 'Move in date should be before move out date';
            }
            return true;
        }

		return false;
	};
}
