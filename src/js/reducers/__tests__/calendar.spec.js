import calendar from '../calendar';

describe('Calendar Reducers', () => {
    let state;

    beforeEach(() => {
        state = {
            year: 2017,
            month: 3,
            date: 1
        };
    });

    it('should return the state for actions that are not defined', () => {
        const
            action = { type: 'TEST_ACTION' },
            result = calendar(state, action);

        expect(result).toEqual(state);
    });

    it('should return the state for NEXT_MONTH', () => {
        const
            payload = {
                year: 2017,
                month: 4,
                date: 1
            },
            action = {
                type: 'NEXT_MONTH',
                ...payload
            },
            result = calendar(state, action);

        expect(result).toEqual(payload);
    });

    it('should return the state for PREV_MONTH', () => {
        const
            payload = {
                year: 2017,
                month: 2,
                date: 1
            },
            action = {
                type: 'PREV_MONTH',
                ...payload
            },
            result = calendar(state, action);

        expect(result).toEqual(payload);
    });

    it('should return the state for SELECT_DATE', () => {
        const
            action = {
                type: 'SELECT_DATE',
                date: 12
            },
            result = calendar(state, action);

        expect(result).toEqual({
            year: state.year,
            month: state.month,
            date: action.date
        });
    });

    it('should return the state for SELECT_FULL_DATE', () => {
        const
            payload = {
                year: 2016,
                month: 6,
                date: 9
            },
            action = {
                type: 'SELECT_FULL_DATE',
                ...payload
            },
            result = calendar(state, action);

        expect(result).toEqual(payload);
    });
});
