import moment from 'moment';

const
	date = moment(),
	initialState = {
		year: date.year(),
		month: date.month()
	};

const calendar = (state = initialState, action) => {
  switch (action.type) {
    case 'NEXT_MONTH':
		return {
			year: action.year,
			month: action.month
		};

    case 'PREV_MONTH':
		return {
			year: action.year,
			month: action.month
		};

    default:
    	return state;
  }
}

export default calendar;
