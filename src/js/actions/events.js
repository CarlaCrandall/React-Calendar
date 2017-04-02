import { CALL_API } from 'redux-api-middleware';
import moment from 'moment';
import * as Utilities from '../utils';

export const fetchEvents = (calendar) => {
	// Get events for current month
	let startDate = moment(`${calendar.year}-${calendar.month + 1}-1`, 'YYYY-M-D'),
		endDate = startDate.clone().endOf('month');

	let calendarId = '85bekdqob37um8m0mdm6l1t1tg@group.calendar.google.com',
		apiKey = process.env.GOOGLE_API_KEY,
		baseUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
		queryString = `?key=${apiKey}&timeMin=${startDate.format()}&timeMax=${endDate.format()}&singleEvents=true&orderBy=startTime`;

	return {
		[CALL_API]: {
			endpoint: baseUrl + queryString,
			method: 'GET',
			types: ['EVENTS_REQUEST', 'EVENTS_RECEIVE', 'EVENTS_FAILURE']
		}
	}
}
