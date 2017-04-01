import moment from 'moment';

const getDate = (calendar) => {
	return moment(`${calendar.year}-${calendar.month + 1}-${calendar.date}`, 'YYYY-M-D');
};

export default getDate;
