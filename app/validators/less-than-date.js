import Ember from 'ember';

const { isPresent } = Ember;

export default function lessThanDate() {
	return (key, newValue, oldValue, changes, content) => {
// debugger;
        // if (isPresent(newValue) && isPresent(content.moveOutDate)) {
            let moveOutDate = newValue;
            let moveInDate = content.moveInDate;

            if (content.index > 0) {
                if (changes.moveOutDate) {
                    moveOutDate = changes.moveOutDate;
                }
                let answer = moment(moveOutDate).isAfter(moveInDate);
                if (answer === false) {
                    return '\'From Date\' should be before \'To Date\'';
                }
            }
            return true;
        // }

		// return false;
	};
}
