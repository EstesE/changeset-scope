import {
	validatePresence,
	validateLength,
	validateFormat,
	validateNumber,
} from 'ember-changeset-validations/validators';
import validateConditional, { equal } from './conditional';
import date from './date';
import custom from './custom';

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
		date({})
	],
	moveOutDate: [
		date({})
	],
	'landlord.name': custom({}),
	// 'landlord.name': validateConditional({
	// 	if: equal('rent', true),
	// 	then: validatePresence({ presence: true, message: 'Required' }),
	// 	else: validatePresence({ presence: false })
	// }),
	'landlord.phone': validateConditional({
		if: equal('rent', true),
		then: [
			validatePresence({ presence: true , message: 'Required' }),
        	validateFormat({ presence: true, type: 'phone', message: 'Check format' })
		],
		else: validatePresence({ presence: false })
	}),
	'landlord.rent': custom({})
	// 'landlord.rent': validateConditional({
	// 	if: equal('rent', true),
	// 	then: [
	// 		validatePresence({ presence: true , message: 'Required' }),
	// 		validateNumber({ allowBlank: false, message: 'Numbers only (Example: 1150)' }),
	// 		validateNumber({ integer: true }),
	// 		validateNumber({ positive: true, message: 'Positive numbers only' }),
	// 		validateNumber({ gte: 0 })
	// 	],
	// 	else: validatePresence({ presence: false })
	// })
};