import Ember from 'ember';
const { get, makeArray } = Ember;

export default function validateConditional(options) {
	let thenValidators = makeArray(options.then);
	let elseValidators = makeArray(options.else);
	let max = Math.max(thenValidators.length, elseValidators.length);

	// A single validator can't return an array of validations,
	// so we return an array of validators instead :/
	let validators = [];
	for (let i = 0; i < max; i++) {
		validators.push(makeValidator(options.if, thenValidators[i], elseValidators[i]));
	}
	console.log(validators);
	return validators;
}

function makeValidator(condition, thenValidator, elseValidator) {
	return (key, newValue, oldValue, changes, content) => {
		const conditionPassed = condition(key, newValue, oldValue, changes, content);
		const validator = conditionPassed ? thenValidator : elseValidator;
		return !validator || validator(key, newValue, oldValue, changes, content);
	};
}

export function prop(name, callback) {
	return (key, newValue, oldValue, changes, content) => {
		let value = changes.hasOwnProperty(name) ? changes[name] : get(content, name);
		return callback(value);
	};
}

export function equal(name, expected) {
	return prop(name, value => value === expected);
}
