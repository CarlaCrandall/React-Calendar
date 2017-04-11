import moment from 'moment';

export const getFullDate = (year, month, date) => moment(`${year}-${month + 1}-${date}`, 'YYYY-M-D');
export const getMonthAndYear = (year, month) => moment(`${year}-${month + 1}`, 'YYYY-M');
