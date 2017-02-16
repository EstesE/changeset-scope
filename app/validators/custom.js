import Ember from 'ember';

const { isBlank, isNone, isPresent, set, RSVP: { resolve } } = Ember;

export default function validateCustom(/* options = {} */) {
  return ( key, newValue, oldValue, changes, content ) => {

	if (key === 'landlord.name') {
		if (isNone(newValue)) {
			return true;
		}
		if (newValue.length < 1) {
			return resolve('Required');
		}

		return true;
    }

    if (key === 'landlord.rent') {
		if (isNone(newValue)) {
			return true;
		}
		if (newValue.length < 1) {
			return resolve('Required');
		}

		let pat = /^\d*$/gm;
		let pass = pat.test(newValue);
		if (pass === false) {
			return resolve('Check format (1234)');
		}
		return true;
    }
    return true;
  };
}






// export default function validateDate(/* options = {} */) {
// 	return (key, newValue, oldValue, changes, content) => {
// 		if (content.index > 0) {
// 			if (key === 'moveInDate') {
// 				let moveInDate = newValue;
// 				let moveOutDate = content.moveOutDate;

// 				if (isPresent(changes.moveOutDate)) {
// 					moveOutDate = changes.moveOutDate;
// 				}

// 				set(changes, 'moveInDate', newValue);
// 				set(content, 'moveInDate', newValue);

// 				let answer = moment(moveOutDate).isAfter(moveInDate);
// 				if (answer === false) {
// 					return '\'To Date\' should be after \'From Date\'';
// 				}
// 			} else if (key === 'moveOutDate') {
// 				let moveOutDate = newValue;
// 				let moveInDate = content.moveInDate;

// 				if (isPresent(changes.moveInDate)) {
// 					moveInDate = changes.moveInDate;
// 				}

// 				set(changes, 'moveOutDate', newValue);
// 				set(content, 'moveOutDate', newValue);

// 				let answer = moment(moveOutDate).isAfter(moveInDate);
// 				if (answer === false) {
// 					return '\'From Date\' should be before \'To Date\'';
// 				}
// 			} else {
// 				console.log('something');
// 			}
// 		}

// 		if (key === 'moveInDate') {
// 			if (isBlank(newValue)) {
// 				return 'Required';
// 			}
// 		}

// 		return true;
// 	};
// }
