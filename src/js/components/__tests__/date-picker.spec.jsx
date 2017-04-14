import React from 'react';
import { shallow } from 'enzyme';
import { DatePicker } from '../';

describe('DatePicker', () => {
    const
        shallowRender = props => shallow(<DatePicker {...props} />);

    let globalProps,
        SELECT_FULL_DATE;

    beforeEach(() => {
        SELECT_FULL_DATE = jest.fn();

        globalProps = {
            year: 2017,
            month: 2,
            date: 24,
            SELECT_FULL_DATE
        };
    });

    describe('Component Lifecycle', () => {
        it('should set the heading ref to null', () => {
            const component = shallowRender(globalProps);
            expect(component.instance().heading).toEqual(null);
        });

        it('should call focus when componentDidMount is called', () => {
            const
                component = shallowRender(globalProps),
                instance = component.instance(),
                focus = jest.fn();

            instance.heading = { focus };
            instance.componentDidMount();

            expect(focus).toHaveBeenCalled();
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
    });


    describe('Events', () => {
        it('should call SELECT_FULL_DATE onBlur', () => {
            const
                component = shallowRender(globalProps),
                input = component.find('input').at(0),
                event = {
                    target: { value: '2017-03-27' }
                };

            input.simulate('blur', event);

            expect(SELECT_FULL_DATE).toHaveBeenCalled();
        });
    });


    describe('Custom Functions', () => {
        it('should set the heading ref to passed in element when refHandler is called', () => {
            const
                component = shallowRender(globalProps),
                instance = component.instance(),
                fakeElement = 'TEST';

            instance.refHandler(fakeElement);
            expect(instance.heading).toEqual(fakeElement);
        });
    });


    describe('Render Functions', () => {
        it('should render without throwing an error', () => {
            const component = shallowRender(globalProps);
            expect(component.find('.datepicker').length).toEqual(1);
        });
    });
});
