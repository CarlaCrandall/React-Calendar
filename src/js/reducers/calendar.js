import moment from 'moment';

const
	currentDate = moment(),
	initialState = {
		year: currentDate.year(),
		month: currentDate.month(),
		date: currentDate.date()
	};

const calendar = (state = initialState, action) => {
  switch (action.type) {
    case 'NEXT_MONTH':
		return {
			...state,
			year: action.year,
			month: action.month,
			date: action.date
		};

    case 'PREV_MONTH':
		return {
			...state,
			year: action.year,
			month: action.month,
			date: action.date
		};

	case 'SELECT_DATE':
		return {
			...state,
			date: action.date
		}

    default:
    	return state;
  }
}

export default calendar;
