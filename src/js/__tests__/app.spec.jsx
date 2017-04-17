import React from 'react';
import { shallow } from 'enzyme';
import App from '../app';
import { Calendar, DatePicker } from '../components';

describe('App', () => {
    const shallowRender = props => shallow(<App {...props} />);

    let globalProps,
        FETCH_EVENTS,
        NEXT_MONTH,
        PREV_MONTH,
        SELECT_DATE,
        SELECT_FULL_DATE;

    beforeEach(() => {
        FETCH_EVENTS = jest.fn();
        NEXT_MONTH = jest.fn();
        PREV_MONTH = jest.fn();
        SELECT_DATE = jest.fn();
        SELECT_FULL_DATE = jest.fn();

        globalProps = {
            calendar: {
                year: 2017,
                month: 10,
                date: 20
            },
            events: {
                loading: false,
                error: false,
                eventsByDate: {}
            },
            FETCH_EVENTS,
            NEXT_MONTH,
            PREV_MONTH,
            SELECT_DATE,
            SELECT_FULL_DATE
        };
    });

    describe('Component Lifecycle', () => {
        it('should call FETCH_EVENTS when componentWillMount is called', () => {
            const component = shallowRender(globalProps);
            component.instance().componentWillMount();
            expect(FETCH_EVENTS).toHaveBeenCalledWith(globalProps.calendar);
        });

        it('should call FETCH_EVENTS when the calendar.month prop is updated', () => {
            const
                component = shallowRender(globalProps),
                calendar = {
                    year: 2017,
                    month: 11,
                    date: 20
                };

            component.instance().componentWillReceiveProps({ calendar });
            expect(FETCH_EVENTS.mock.calls.length).toEqual(2);
            expect(FETCH_EVENTS.mock.calls[1]).toEqual([calendar]);
        });

        it('should call FETCH_EVENTS when the calendar.year prop is updated', () => {
            const
                component = shallowRender(globalProps),
                calendar = {
                    year: 2016,
                    month: 10,
                    date: 20
                };

            component.instance().componentWillReceiveProps({ calendar });
            expect(FETCH_EVENTS.mock.calls.length).toEqual(2);
            expect(FETCH_EVENTS.mock.calls[1]).toEqual([calendar]);
        });

        it('should not call FETCH_EVENTS when the calendar.month and calendar.year props remain the same', () => {
            const
                component = shallowRender(globalProps),
                calendar = {
                    year: 2017,
                    month: 10,
                    date: 20
                };

            component.instance().componentWillReceiveProps({ calendar });
            expect(FETCH_EVENTS.mock.calls.length).toEqual(1);
        });
    });


    describe('Events', () => {
        it('should set the state onClick', () => {
            const
                component = shallowRender(globalProps),
                link = component.find('a').at(0),
                event = { preventDefault: () => false },
                setState = jest.fn();

            component.instance().setState = setState;
            link.simulate('click', event);

            expect(setState).toHaveBeenCalledWith({
                displayDatePicker: true
            });
        });
    });


    describe('Render Functions', () => {
        it('should render without throwing an error', () => {
            const component = shallowRender(globalProps);
            expect(component.find(Calendar).length).toEqual(1);
        });

        it('should render the Calendar when displayDatePicker is false', () => {
            const component = shallowRender(globalProps);
            expect(component.find(Calendar).length).toEqual(1);
        });

        it('should not render the Calendar when displayDatePicker is true', () => {
            const component = shallowRender(globalProps);
            component.setState({ displayDatePicker: true });
            expect(component.find(Calendar).length).toEqual(0);
        });

        it('should render the DatePicker when displayDatePicker is true', () => {
            const component = shallowRender(globalProps);
            component.setState({ displayDatePicker: true });
            expect(component.find(DatePicker).length).toEqual(1);
        });

        it('should not render the DatePicker when displayDatePicker is false', () => {
            const component = shallowRender(globalProps);
            expect(component.find(DatePicker).length).toEqual(0);
        });
    });
});
