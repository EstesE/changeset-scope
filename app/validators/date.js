// export default function validateDate(/* options = {} */) {
//   return (/* key, newValue, oldValue, changes, content */) => {
//     return true;
//   };
// }


export default function validateDate() {
	return (key, newValue, oldValue/*, changes, content*/) => {
		if (newValue === oldValue) {
			return true;
		}

		let format = 'YYYY-MM-DD';
		if (key === 'dateOfBirth') {
			let momentValue = moment(newValue);
			let age = moment().diff(momentValue, 'years');
			if (moment.utc(newValue, format, true).isValid() && age >= 18 && age < 200 && isNaN(age) === false) {
				return true;
			} else {
				return 'Please check format';
			}
		} else {
			if (moment.utc(newValue, format, true).isValid()) {
				return true;
			} else {
				return 'Please check format';
			}
		}
	};
}
