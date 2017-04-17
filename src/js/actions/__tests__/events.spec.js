import nock from 'nock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import * as actions from '../events';

describe('Events Actions', () => {
    let mockStore;

    beforeAll(() => {
        mockStore = configureStore([thunk, apiMiddleware]);
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('should dispatch EVENTS_RECEIVE when FETCH_EVENTS has successfully completed', () => {
        const
            calendarId = '85bekdqob37um8m0mdm6l1t1tg@group.calendar.google.com',
            calendar = {
                year: 2017,
                month: 5,
                date: 12
            },
            store = mockStore({});

        nock('https://www.googleapis.com')
            .get(`/calendar/v3/calendars/${calendarId}/events`)
            .query(true)
            .reply(200, { payload: 'OK!' });

        return store.dispatch(actions.FETCH_EVENTS(calendar))
            .then(() => {
                const storeActions = store.getActions();

                expect(storeActions[0].type).toEqual('EVENTS_REQUEST');
                expect(storeActions[1].type).toEqual('EVENTS_RECEIVE');
            });
    });

    it('should dispatch EVENTS_FAILURE when FETCH_EVENTS has failed', () => {
        const
            calendarId = '85bekdqob37um8m0mdm6l1t1tg@group.calendar.google.com',
            calendar = {
                year: 2017,
                month: 5,
                date: 12
            },
            store = mockStore({});

        nock('https://www.googleapis.com')
            .get(`/calendar/v3/calendars/${calendarId}/events`)
            .query(true)
            .reply(404);

        return store.dispatch(actions.FETCH_EVENTS(calendar))
            .then(() => {
                const storeActions = store.getActions();

                expect(storeActions[0].type).toEqual('EVENTS_REQUEST');
                expect(storeActions[1].type).toEqual('EVENTS_FAILURE');
            });
    });
});
