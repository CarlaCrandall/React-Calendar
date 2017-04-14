import React from 'react';
import { shallow } from 'enzyme';
import { EventList, Event } from '../';

describe('EventList', () => {
    const shallowRender = props => shallow(<EventList {...props} />);

    let globalProps;

    beforeEach(() => {
        globalProps = {
            displayDatePicker: false,
            year: 2017,
            month: 3,
            date: 30,
            events: []
        };
    });


    describe('Component Lifecycle', () => {
        it('should set the heading ref to null', () => {
            const component = shallowRender(globalProps);
            expect(component.instance().heading).toEqual(null);
        });

        it('should call window.addEventListener when componentDidMount is called', () => {
            const
                component = shallowRender(globalProps),
                addEventListener = jest.fn();

            global.addEventListener = addEventListener;
            component.instance().componentDidMount();
            expect(addEventListener).toHaveBeenCalled();
        });

        it('should not call focus when componentDidMount is called and displayDatePicker is false', () => {
            const
                component = shallowRender(globalProps),
                instance = component.instance(),
                focus = jest.fn();

            instance.heading = { focus };
            instance.componentDidMount();

            expect(focus).not.toHaveBeenCalled();
        });

        it('should call focus when componentDidMount is called and displayDatePicker is true', () => {
            globalProps.displayDatePicker = true;

            const
                component = shallowRender(globalProps),
                instance = component.instance(),
                focus = jest.fn();

            instance.heading = { focus };
            instance.componentDidMount();

            expect(focus).toHaveBeenCalled();
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
        it('should call focus when window keydown event is triggered and event.keyCode is not 69', () => {
            const
                component = shallowRender(globalProps),
                instance = component.instance(),
                focus = jest.fn();

            instance.heading = { focus };
            instance.onWindowKeydown({ keyCode: 1 });

            expect(focus).not.toHaveBeenCalled();
        });

        it('should call focus when window keydown event is triggered and event.keyCode is 69', () => {
            const
                component = shallowRender(globalProps),
                instance = component.instance(),
                focus = jest.fn();

            instance.heading = { focus };
            instance.onWindowKeydown({ keyCode: 69 });

            expect(focus).toHaveBeenCalled();
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
            expect(component.find('.event-list').length).toEqual(1);
        });

        it('should render one Event for each object in the events array', () => {
            globalProps.events = [{ summary: 'Event 1' }];
            const component = shallowRender(globalProps);
            expect(component.find(Event).length).toEqual(1);
        });

        it('should not render any Event components when the events array is empty', () => {
            const component = shallowRender(globalProps);
            expect(component.find(Event).length).toEqual(0);
        });
    });
});
