import * as DateUtils from '../utils/date-utils';

export const NEXT_MONTH = (currentMonth, currentYear, selectedDate = 1) => {
    let date = selectedDate,
        month = currentMonth + 1,
        year = currentYear;

    // If moving from December to January, update year
    if (currentMonth === 11) {
        month = 0;
        year = currentYear + 1;
    }

    const dateObj = DateUtils.getFullDate(year, month, date);

    // If date doesn't exist, set date to last day of month
    // Ex. Handles moving from Aug 31 to Sep 30
    if (!dateObj.isValid()) {
        const monthObj = DateUtils.getMonthAndYear(year, month).endOf('month');
        date = monthObj.date();
    }

    return {
        type: 'NEXT_MONTH',
        date,
        month,
        year
    };
};

export const PREV_MONTH = (currentMonth, currentYear, selectedDate = 1) => {
    let date = selectedDate,
        month = currentMonth - 1,
        year = currentYear;

    // If moving from January to December, update year
    if (currentMonth === 0) {
        month = 11;
        year = currentYear - 1;
    }

    const dateObj = DateUtils.getFullDate(year, month, date);

    // If date doesn't exist, set date to last day of month
    // Ex. Handles moving from July 31 to June 30
    if (!dateObj.isValid()) {
        const monthObj = DateUtils.getMonthAndYear(year, month).endOf('month');
        date = monthObj.date();
    }

    return {
        type: 'PREV_MONTH',
        date,
        month,
        year
    };
};


export const SELECT_DATE = date => ({
    type: 'SELECT_DATE',
    date
});

export const SELECT_FULL_DATE = (year, month, date) => ({
    type: 'SELECT_FULL_DATE',
    year,
    month,
    date
});
