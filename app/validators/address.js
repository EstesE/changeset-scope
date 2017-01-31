// export default function validateAddress(/* options = {} */) {
//   return (/* key, newValue, oldValue, changes, content */) => {
//     return true;
//   };
// }


import {
	validatePresence,
	validateLength,
	validateFormat,
	validateNumber,
} from 'ember-changeset-validations/validators';
import validateDate from './date';

export default {
	street: [
		validatePresence({ presence: true, message: 'Required' })
	],
	city: [
		validatePresence({ presence: true, message: 'Required' })
	],
	state: [
		validatePresence({ presence: true, message: 'Required' })
	],
	zip: [
		validatePresence({ presence: true, message: 'Required' }),
		validateLength({ is: 5, allowBlank: false, message: 'Check Length' })
	],
	moveInDate: [
		validatePresence({ presence: true, message: 'Required' }),
		validateDate({ message: '(Invalid date format)' })
	],
	moveOutDate: [
		validatePresence({ presence: true, message: 'Required' }),
		validateDate({ message: '(Invalid date format)' })
	],
	'landlord.name': [
		validatePresence({ presence: true, message: 'Required' })
	],
	'landlord.phone': [
		validatePresence({ presence: true, message: 'Required' }),
		validateFormat({ presence: true, type: 'phone', message: 'Check format' })
	],
	'landlord.rent': [
		validatePresence({ presence: true, message: 'Required' }),
		validateNumber({ allowBlank: false, message: 'Check format' }),
		validateNumber({ integer: true }),
		validateNumber({ positive: true, message: 'Positive numbers only' }),
		validateNumber({ gte: 0 })
	]
};