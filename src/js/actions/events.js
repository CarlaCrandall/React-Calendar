import { CALL_API } from 'redux-api-middleware';

export const fetchEvents = () => {
	let calendarId = '85bekdqob37um8m0mdm6l1t1tg@group.calendar.google.com',
		apiKey = process.env.GOOGLE_API_KEY,
		url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;

	return {
		[CALL_API]: {
			endpoint: url,
			method: 'GET',
			types: ['EVENTS_REQUEST', 'EVENTS_RECEIVE', 'EVENTS_FAILURE']
		}
	}
}
