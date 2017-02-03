import Ember from 'ember';

const { isPresent } = Ember;

export default function greaterThanDate() {
	return (key, newValue, oldValue, changes, content) => {

        if (isPresent(newValue) && isPresent(content.moveOutDate)) {
            let moveOutDate = newValue;
            let moveInDate = content.moveInDate;

            if (changes.moveInDate) {
                moveInDate = changes.moveInDate;
            }
            let answer = moment(moveOutDate).isAfter(moveInDate);
            if (answer === false) {
                return '\'To Date\' should be after \'From Date\'';
            }
            return true;
        }

		return false;
	};
}
