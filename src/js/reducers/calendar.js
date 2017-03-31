import moment from 'moment';
import monthNames from '../../config/month-names';

const
	date = moment(),
	month = date.month(),
	initialState = {
		year: date.year(),
		month: {
			num: month + 1,
			name: monthNames[month]
		}
	};

const calendar = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MONTH':
		return {
			month: {
				num: action.month + 1,
				name: monthNames[action.month]
			}
		};

    default:
    	return state;
  }
}

export default calendar;
