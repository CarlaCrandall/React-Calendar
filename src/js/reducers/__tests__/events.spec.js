import events from '../events';

describe('Events Reducers', () => {
    let state;

    beforeEach(() => {
        state = {
            eventsByDate: null,
            loading: false,
            error: false
        };
    });

    it('should return the state for actions that are not defined', () => {
        const
            action = { type: 'TEST_ACTION' },
            result = events(state, action);

        expect(result).toEqual(state);
    });

    it('should return the state for EVENTS_REQUEST', () => {
        const
            action = { type: 'EVENTS_REQUEST' },
            result = events(state, action),
            expectedState = {
                eventsByDate: null,
                loading: true,
                error: false
            };

        expect(result).toEqual(expectedState);
    });

    it('should return the state for EVENTS_RECEIVE', () => {
        const
            items = [{
                start: { date: '2017-04-01' },
                end: { date: '2017-04-02' },
                summary: 'Event 1'
            }, {
                start: { dateTime: '2017-04-01T07:00:00-04:00' },
                end: { dateTime: '2017-04-01T08:00:00-04:00' },
                summary: 'Event 2'
            }, {
                start: { dateTime: '2017-04-06T09:00:00-04:00' },
                end: { dateTime: '2017-04-06T10:00:00-04:00' },
                summary: 'Event 3'
            }],
            action = {
                type: 'EVENTS_RECEIVE',
                payload: { items }
            },
            result = events(state, action),
            expectedState = {
                eventsByDate: {
                    day_1: [items[0], items[1]],
                    day_6: [items[2]]
                },
                loading: false,
                error: false
            };

        expect(result).toEqual(expectedState);
    });

    it('should return the state for EVENTS_FAILURE', () => {
        const
            action = { type: 'EVENTS_FAILURE' },
            result = events(state, action),
            expectedState = {
                eventsByDate: null,
                loading: false,
                error: true
            };

        expect(result).toEqual(expectedState);
    });
});
