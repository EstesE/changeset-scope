import Ember from 'ember';

const { isPresent } = Ember;

export default function greaterThanDate() {
	return (key, newValue, oldValue, changes, content) => {

        if (isPresent(newValue) && isPresent(content.moveOutDate)) {
            let moveOutDate = newValue;
            let moveInDate = content.moveInDate;
            // debugger;
            if (changes.moveInDate) {
                moveInDate = changes.moveInDate;
            }
            let answer = moment(moveOutDate).isAfter(moveInDate);
            if (answer === false) {
                return 'Move out date should be after move in date';
            }
            return true;
        }

		return false;
	};
}
