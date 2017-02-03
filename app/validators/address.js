import {
	validatePresence,
	validateLength,
	validateFormat,
	validateNumber,
} from 'ember-changeset-validations/validators';
import validateConditional, { equal, notEqual } from './conditional';
import lessThanDate from './less-than-date';
import greaterThanDate from './greater-than-date';

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
	moveInDate: validateConditional({
		if: equal('index', 0),
		then: validatePresence({ presence: true, message: 'Required' }),
		else: [
			validatePresence({ presence: true, message: 'Required' }),
			lessThanDate({ })
		]
	}),
	moveOutDate: validateConditional({
		if: notEqual('index', 0),
		then: [
			validatePresence({ presence: true, message: 'Required' }),
			greaterThanDate({ })
		],
		else: validatePresence({ presence: false, message: 'Required' })
	}),
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