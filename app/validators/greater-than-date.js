import Ember from 'ember';

const { isPresent } = Ember;

export default function greaterThanDate() {
	return (key, newValue, oldValue, changes, content) => {
// debugger;
        // if (isPresent(newValue) && isPresent(content.moveOutDate)) {
            if (content.index > 0) {
                let moveInDate = newValue;
                let moveOutDate = content.moveOutDate;

                if (isPresent(changes.moveOutDate)) {
                    moveOutDate = changes.moveOutDate;
                }

                let answer = moment(moveOutDate).isAfter(moveInDate);
                if (answer === false) {
                    return '\'To Date\' should be after \'From Date\'';
                }
            }
            return true;
        // }

		// return false;
	};
}
