import moment from 'moment';

const
    currentDate = moment(),
    initialState = {
        year: currentDate.year(),
        month: currentDate.month(),
        date: currentDate.date(),
        focusedDate: currentDate.date()
    };

const calendar = (state = initialState, action) => {
    switch (action.type) {
        case 'NEXT_MONTH': {
            return {
                ...state,
                year: action.year,
                month: action.month,
                date: action.date,
                focusedDate: action.focusedDate
            };
        }

        case 'PREV_MONTH': {
            return {
                ...state,
                year: action.year,
                month: action.month,
                date: action.date,
                focusedDate: action.focusedDate
            };
        }

        case 'SELECT_DATE': {
            return {
                ...state,
                date: action.date,
                focusedDate: action.date
            };
        }

        default: {
            return state;
        }
    }
};

export default calendar;
