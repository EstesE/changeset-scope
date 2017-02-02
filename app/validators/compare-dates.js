export default function validateDate() {
	return (key, newValue, oldValue, changes, content) => {
		if (Ember.isEmpty(content.moveOutDate)) {
			return true;
		} else {
			let inDate = content.moveInDate;
			let outDate = newValue;
			var answer = moment(outDate).isAfter(inDate);
			return answer;
		}
	};
}
