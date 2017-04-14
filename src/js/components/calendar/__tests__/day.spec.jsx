import React from 'react';
import { shallow, mount } from 'enzyme';
import { Day } from '../../';

describe('Day', () => {
    const
        shallowRender = props => shallow(<Day {...props} />),
        fullRender = props => mount(<Day {...props} />);

    let globalProps,
        SELECT_DATE;

    beforeEach(() => {
        SELECT_DATE = jest.fn();

        globalProps = {
            year: 2017,
            month: 9,
            date: 2,
            events: [],
            isHeading: false,
            isSelected: false,
            SELECT_DATE
        };
    });

    describe('Component Lifecycle', () => {
        it('should set the dayButton ref to null', () => {
            const component = shallowRender(globalProps);
            expect(component.instance().dayButton).toEqual(null);
        });

        it('should not call focus when componentDidMount is called and isSelected is false', () => {
            const
                component = shallowRender(globalProps),
                instance = component.instance(),
                focus = jest.fn();

            instance.dayButton = { focus };
            instance.componentDidMount();

            expect(focus).not.toHaveBeenCalled();
        });

        it('should call focus when componentDidMount is called and isSelected is true', () => {
            globalProps.isSelected = true;

            const
                component = shallowRender(globalProps),
                instance = component.instance(),
                focus = jest.fn();

            instance.dayButton = { focus };
            instance.componentDidMount();

            expect(focus).toHaveBeenCalled();
        });

        it('should nit call focus when componentDidUpdate is called and isSelected is false', () => {
            const
                component = shallowRender(globalProps),
                instance = component.instance(),
                focus = jest.fn();

            instance.dayButton = { focus };

            jest.useFakeTimers();
            instance.componentDidUpdate({ isSelected: true });
            jest.runAllTimers();

            expect(focus).not.toHaveBeenCalled();
        });

        it('should call focus when componentDidUpdate is called and isSelected is true', () => {
            globalProps.isSelected = true;

            const
                component = shallowRender(globalProps),
                instance = component.instance(),
                focus = jest.fn();

            instance.dayButton = { focus };

            jest.useFakeTimers();
            instance.componentDidUpdate({ isSelected: false });
            jest.runAllTimers();

            expect(focus).toHaveBeenCalled();
        });
    });


    describe('Events', () => {
        it('should call SELECT_DATE onClick', () => {
            const
                component = shallowRender(globalProps),
                btn = component.find('button').at(0);

            btn.simulate('click');

            expect(SELECT_DATE).toHaveBeenCalled();
        });
    });


    describe('Custom Functions', () => {
        it('should set the dayButton ref to passed in element when refHandler is called', () => {
            const
                component = shallowRender(globalProps),
                instance = component.instance(),
                fakeElement = 'TEST';

            instance.refHandler(fakeElement);
            expect(instance.dayButton).toEqual(fakeElement);
        });
    });


    describe('Render Functions', () => {
        it('should render without throwing an error', () => {
            const component = shallowRender(globalProps);
            expect(component.find('.day').length).toEqual(1);
        });

        it('should render heading text when isHeading is true', () => {
            globalProps.isHeading = true;
            const component = shallowRender(globalProps);
            expect(component.find('.day__heading').length).toEqual(1);
        });

        it('should not render heading text when isHeading is false', () => {
            const component = shallowRender(globalProps);
            expect(component.find('.day__heading').length).toEqual(0);
        });

        it('should not render heading text when date is 0', () => {
            globalProps.isHeading = true;
            globalProps.date = 0;
            const component = shallowRender(globalProps);
            expect(component.find('.day__heading').length).toEqual(0);
        });

        it('should render button when isHeading is false', () => {
            const component = shallowRender(globalProps);
            expect(component.find('.day__button').length).toEqual(1);
        });

        it('should not render button when isHeading is true', () => {
            globalProps.isHeading = true;
            const component = shallowRender(globalProps);
            expect(component.find('.day__button').length).toEqual(0);
        });

        it('should not render button when date is 0', () => {
            globalProps.date = 0;
            const component = shallowRender(globalProps);
            expect(component.find('.day__button').length).toEqual(0);
        });

        it('should add class \'--selected\' when isSelected is true', () => {
            globalProps.isSelected = true;

            const
                component = shallowRender(globalProps),
                day = component.find('.day').at(0);

            expect(day.hasClass('day--selected')).toEqual(true);
        });

        it('should add class \'--heading\' when isHeading is true', () => {
            globalProps.isHeading = true;

            const
                component = shallowRender(globalProps),
                day = component.find('.day').at(0);

            expect(day.hasClass('day--heading')).toEqual(true);
        });

        it('should add class \'--has-events\' when events.length is greater than 0', () => {
            globalProps.events = ['Event 1'];

            const
                component = shallowRender(globalProps),
                day = component.find('.day').at(0);

            expect(day.hasClass('day--has-events')).toEqual(true);
        });
    });
});
