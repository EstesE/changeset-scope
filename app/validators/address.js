import {
	validatePresence,
	validateLength,
	validateFormat,
	validateNumber,
} from 'ember-changeset-validations/validators';
import validateDate from './date';
import validateConditional, { equal, notEqual, lt } from './conditional';
import validateCompareDates from './compare-dates';

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

	moveOutDate: validateConditional({
		if: notEqual('moveInDate', 'moveOutDate'),
		// then: validatePresence({ presence: true, message: 'Required Date' }),
		then: validateCompareDates({ }),
		else: validatePresence({ presence: false })
	}),

	// moveOutDate: validateConditional({
	// 	if: notEqual('index', 0),
	// 	then: validatePresence({ presence: true, message: 'Required Date' }),
	// 	else: validatePresence({ presence: false })
	// }),

	// moveOutDate: [
	// 	validatePresence({ presence: true, message: 'Required' }),
	// 	validateDate({ message: '(Invalid date format)' })
	// ],

	'landlord.name': validateConditional({
		if: equal('rent', true),
		then: validatePresence({ presence: true, message: 'Required' }),
		else: validatePresence({ presence: false })
	}),
	'landlord.phone': validateConditional({
		if: equal('rent', true),
		then: [
			validatePresence({ presence: true , message: 'Required' }),
        	validateFormat({ presence: true, type: 'phone', message: 'Check format' })
		],
		else: validatePresence({ presence: false })
	}),
	'landlord.rent': validateConditional({
		if: equal('rent', true),
		then: [
			validatePresence({ presence: true , message: 'Required' }),
			validateNumber({ allowBlank: false, message: 'Numbers only (Example: 1150)' }),
			validateNumber({ integer: true }),
			validateNumber({ positive: true, message: 'Positive numbers only' }),
			validateNumber({ gte: 0 })
		],
		else: validatePresence({ presence: false })
	})
};