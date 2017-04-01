import { CALL_API } from 'redux-api-middleware';
import moment from 'moment';
import * as Utilities from '../utils';

export const fetchEvents = (calendar) => {
	let selectedDate = Utilities.getDate(calendar),
		nextDate = selectedDate.clone().add(1, 'days');

	let calendarId = '85bekdqob37um8m0mdm6l1t1tg@group.calendar.google.com',
		apiKey = process.env.GOOGLE_API_KEY,
		baseUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
		queryString = `?key=${apiKey}&timeMin=${selectedDate.format()}&timeMax=${nextDate.format()}&singleEvents=true&orderBy=startTime`;

	return {
		[CALL_API]: {
			endpoint: baseUrl + queryString,
			method: 'GET',
			types: ['EVENTS_REQUEST', 'EVENTS_RECEIVE', 'EVENTS_FAILURE']
		}
	}
}
