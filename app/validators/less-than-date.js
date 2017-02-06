import Ember from 'ember';

const { isPresent } = Ember;

export default function lessThanDate() {
    return (key, newValue, oldValue, changes, content) => {
        // debugger;

        if (content.index > 0) {
            let moveOutDate = newValue;
            let moveInDate = content.moveInDate;

            if (isPresent(changes.moveInDate)) {
                moveInDate = changes.moveInDate;
            }
            let answer = moment(moveOutDate).isAfter(moveInDate);
            if (answer === false) {
                return '\'From Date\' should be before \'To Date\'';
            }
        }
        return true;

    };
}
