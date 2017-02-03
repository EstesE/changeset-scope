import Ember from 'ember';

const { isEmpty } = Ember;

export default function validateDate() {
	return (key, newValue, oldValue, changes, content) => {
		if (isEmpty(content.moveOutDate)) {
			return true;
		} else {
			let inDate = content.moveInDate;
			let outDate = newValue;
			var answer = moment(outDate).isAfter(inDate);
			return answer;
		}
	};
}
