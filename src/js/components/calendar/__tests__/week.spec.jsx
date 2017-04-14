import React from 'react';
import { shallow } from 'enzyme';
import { Day, Week } from '../../';

describe('Week', () => {
    const shallowRender = props => shallow(<Week {...props} />);

    let globalProps,
        SELECT_DATE;

    beforeEach(() => {
        SELECT_DATE = jest.fn();

        globalProps = {
            identifier: '2017030901',
            days: [5, 6, 7, 8, 9, 10, 11],
            year: 2017,
            month: 3,
            date: 9,
            eventsByDate: {},
            isHeading: false,
            SELECT_DATE
        };
    });


    describe('Render Functions', () => {
        it('should render without throwing an error', () => {
            const component = shallowRender(globalProps);
            expect(component.find('.week').length).toEqual(1);
        });

        it('should render one Day component for each item in the days array', () => {
            const component = shallowRender(globalProps);
            expect(component.find(Day).length).toEqual(7);
        });

        it('should not render any Day components when the days array is empty', () => {
            globalProps.days = [];
            const component = shallowRender(globalProps);
            expect(component.find(Day).length).toEqual(0);
        });
    });
});
