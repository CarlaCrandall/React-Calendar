import { CALL_API } from 'redux-api-middleware';
import moment from 'moment';

export const fetchEvents = (calendar) => {
	let selectedDate = moment(`${calendar.year}-${calendar.month + 1}-${calendar.date}`, 'YYYY-M-D'),
		nextDate = selectedDate.clone().add(1, 'days');


	let calendarId = '85bekdqob37um8m0mdm6l1t1tg@group.calendar.google.com',
		apiKey = process.env.GOOGLE_API_KEY,
		baseUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
		queryString = `?key=${apiKey}&timeMin=${selectedDate.format()}&timeMax=${nextDate.format()}`;

	return {
		[CALL_API]: {
			endpoint: baseUrl + queryString,
			method: 'GET',
			types: ['EVENTS_REQUEST', 'EVENTS_RECEIVE', 'EVENTS_FAILURE']
		}
	}
}
