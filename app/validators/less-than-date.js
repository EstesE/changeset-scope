import Ember from 'ember';

const { isPresent } = Ember;

export default function lessThanDate() {
	return (key, newValue, oldValue, changes, content) => {

        if (isPresent(newValue) && isPresent(content.moveOutDate)) {
            let moveInDate = newValue;
            let moveOutDate = content.moveOutDate;

            if (changes.moveOutDate) {
                moveOutDate = changes.moveOutDate;
            }
            let answer = moment(moveOutDate).isAfter(moveInDate);
            if (answer === false) {
                return '\'From Date\' should be before \'To Date\'';
            }
            return true;
        }

		return false;
	};
}
