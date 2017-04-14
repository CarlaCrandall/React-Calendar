import React from 'react';
import { shallow } from 'enzyme';
import { Month } from '../../';

describe('Month', () => {
    const shallowRender = props => shallow(<Month {...props} />);

    let globalProps,
        SELECT_DATE;

    beforeEach(() => {
        SELECT_DATE = jest.fn();

        globalProps = {
            year: 2017,
            month: 9,
            date: 2,
            eventsByDate: {},
            SELECT_DATE
        };
    });

    describe('Component Lifecycle', () => {
        it('should set the grid ref to null', () => {
            const component = shallowRender(globalProps);
            expect(component.instance().grid).toEqual(null);
        });

        it('should call window.addEventListener when componentDidMount is called', () => {
            const
                component = shallowRender(globalProps),
                addEventListener = jest.fn();

            global.addEventListener = addEventListener;
            component.instance().componentDidMount();
            expect(addEventListener).toHaveBeenCalled();
        });

        it('should set the state when componentWillReceiveProps is called', () => {
            const
                component = shallowRender(globalProps),
                instance = component.instance(),
                setState = jest.fn();

            instance.setState = setState;
            instance.componentWillReceiveProps({});

            expect(setState).toHaveBeenCalled();
        });

        it('should call window.removeEventListener when componentWillUnmount is called', () => {
            const
                component = shallowRender(globalProps),
                removeEventListener = jest.fn();

            global.removeEventListener = removeEventListener;
            component.instance().componentWillUnmount();
            expect(removeEventListener).toHaveBeenCalled();
        });
    });


    describe('Events', () => {
        it('should call focus when window keydown event is triggered and event.keyCode is not 67', () => {
            const
                component = shallowRender(globalProps),
                instance = component.instance(),
                focus = jest.fn();

            instance.grid = { focus };
            instance.onWindowKeydown({ keyCode: 1 });

            expect(focus).not.toHaveBeenCalled();
        });

        it('should call focus when window keydown event is triggered and event.keyCode is 67', () => {
            const
                component = shallowRender(globalProps),
                instance = component.instance(),
                focus = jest.fn();

            instance.grid = { focus };
            instance.onWindowKeydown({ keyCode: 67 });

            expect(focus).toHaveBeenCalled();
        });
    });


    describe('Custom Functions', () => {
        it('should set the grid ref to passed in element when refHandler is called', () => {
            const
                component = shallowRender(globalProps),
                instance = component.instance(),
                fakeElement = 'TEST';

            instance.refHandler(fakeElement);
            expect(instance.grid).toEqual(fakeElement);
        });

        it('should return correct number of weeks for each month when calculateWeeksOfMonth is called', () => {
            const
                component = shallowRender(globalProps),
                instance = component.instance();

            const
                resultFeb = instance.calculateWeeksOfMonth(0, 28),
                resultMar = instance.calculateWeeksOfMonth(3, 31),
                resultApr = instance.calculateWeeksOfMonth(6, 30);

            expect(resultFeb.numWeeks).toEqual(4);
            expect(resultMar.numWeeks).toEqual(5);
            expect(resultApr.numWeeks).toEqual(6);
        });
    });


    describe('Render Functions', () => {
        it('should render without throwing an error', () => {
            const component = shallowRender(globalProps);
            expect(component.find('.month').length).toEqual(1);
        });
    });
});
