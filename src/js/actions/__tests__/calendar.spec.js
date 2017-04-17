import * as actions from '../calendar';

describe('Calendar Actions', () => {
    describe('NEXT_MONTH', () => {
        it('should return the object with updated month when month is not December', () => {
            const result = actions.NEXT_MONTH(3, 2017, 20);
            expect(result).toEqual({
                type: 'NEXT_MONTH',
                date: 20,
                month: 4,
                year: 2017
            });
        });

        it('should return the object with updated month and year when month is December', () => {
            const result = actions.NEXT_MONTH(11, 2017, 20);
            expect(result).toEqual({
                type: 'NEXT_MONTH',
                date: 20,
                month: 0,
                year: 2018
            });
        });

        it('should return the object with updated month and date when date is invalid', () => {
            const result = actions.NEXT_MONTH(7, 2017, 31);
            expect(result).toEqual({
                type: 'NEXT_MONTH',
                date: 30,
                month: 8,
                year: 2017
            });
        });
    });


    describe('PREV_MONTH', () => {
        it('should return the object with updated month when month is not January', () => {
            const result = actions.PREV_MONTH(5, 2017, 3);
            expect(result).toEqual({
                type: 'PREV_MONTH',
                date: 3,
                month: 4,
                year: 2017
            });
        });

        it('should return the object with updated month and year when month is January', () => {
            const result = actions.PREV_MONTH(0, 2017, 14);
            expect(result).toEqual({
                type: 'PREV_MONTH',
                date: 14,
                month: 11,
                year: 2016
            });
        });

        it('should return the object with updated month and date when date is invalid', () => {
            const result = actions.PREV_MONTH(6, 2017, 31);
            expect(result).toEqual({
                type: 'PREV_MONTH',
                date: 30,
                month: 5,
                year: 2017
            });
        });
    });


    describe('SELECT_DATE', () => {
        it('should return the object with updated date', () => {
            const result = actions.SELECT_DATE(20);
            expect(result).toEqual({
                type: 'SELECT_DATE',
                date: 20
            });
        });
    });


    describe('SELECT_FULL_DATE', () => {
        it('should return the object with updated year, month, and date', () => {
            const result = actions.SELECT_FULL_DATE(2017, 2, 10);
            expect(result).toEqual({
                type: 'SELECT_FULL_DATE',
                year: 2017,
                month: 2,
                date: 10
            });
        });
    });
});
