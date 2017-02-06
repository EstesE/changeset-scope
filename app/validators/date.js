import Ember from 'ember';

const { isBlank, isPresent, set } = Ember;

export default function validateDate(/* options = {} */) {
	return (key, newValue, oldValue, changes, content) => {
		if (content.index > 0) {
			if (key === 'moveInDate') {
				let moveInDate = newValue;
				let moveOutDate = content.moveOutDate;

				if (isPresent(changes.moveOutDate)) {
					moveOutDate = changes.moveOutDate;
				}

				set(changes, 'moveInDate', newValue);
				set(content, 'moveInDate', newValue);

				let answer = moment(moveOutDate).isAfter(moveInDate);
				if (answer === false) {
					return '\'To Date\' should be after \'From Date\'';
				}
			} else if (key === 'moveOutDate') {
				let moveOutDate = newValue;
				let moveInDate = content.moveInDate;

				if (isPresent(changes.moveInDate)) {
					moveInDate = changes.moveInDate;
				}

				set(changes, 'moveOutDate', newValue);
				set(content, 'moveOutDate', newValue);

				let answer = moment(moveOutDate).isAfter(moveInDate);
				if (answer === false) {
					return '\'From Date\' should be before \'To Date\'';
				}
			} else {
				console.log('something');
			}
		}

		if (key === 'moveInDate') {
			if (isBlank(newValue)) {
				return 'Required';
			}
		}

		return true;
	};
}
