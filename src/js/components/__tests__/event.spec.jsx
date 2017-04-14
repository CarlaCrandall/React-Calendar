import React from 'react';
import { shallow } from 'enzyme';
import { Event } from '../';

describe('Event', () => {
    const shallowRender = props => shallow(<Event {...props} />);

    let globalProps;

    beforeEach(() => {
        globalProps = {
            data: {
                start: { date: '2017-04-01' },
                end: { date: '2017-04-02' },
                summary: 'Test Event Name'
            }
        };
    });


    describe('Custom Functions', () => {
        const
            startDate = { date: '2017-04-01' },
            endDate = { date: '2017-04-02' },
            startDateTime = { dateTime: '2017-04-01T09:00:00-04:00' },
            endDateTime = { dateTime: '2017-04-01T10:00:00-04:00' };

        it('isScheduledEvent should return false when start and end dateTime properties are not defined', () => {
            const
                component = shallowRender(globalProps),
                result = component.instance().isScheduledEvent(startDate, endDate);

            expect(result).toEqual(false);
        });

        it('isScheduledEvent should return true when start and end dateTime properties are defined', () => {
            const
                component = shallowRender(globalProps),
                result = component.instance().isScheduledEvent(startDateTime, endDateTime);

            expect(result).toEqual(true);
        });

        it('getTimeRange returns an object with formatted times', () => {
            const
                component = shallowRender(globalProps),
                result = component.instance().getTimeRange(startDateTime, endDateTime);

            expect(result).toEqual({
                startTime: '9:00 AM',
                endTime: '10:00 AM'
            });
        });
    });


    describe('Render Functions', () => {
        it('should render without throwing an error', () => {
            const component = shallowRender(globalProps);
            expect(component.find('.event').length).toEqual(1);
        });

        it('should render the event time as \'All Day\' when start and end dateTime properties are not defined', () => {
            const component = shallowRender(globalProps);
            expect(component.find('.event__time').text()).toEqual('All Day');
        });

        it('should render the event time range when start and end dateTime properties are defined', () => {
            globalProps.data.start.dateTime = '2017-04-01T09:00:00-04:00';
            globalProps.data.end.dateTime = '2017-04-01T10:00:00-04:00';

            const component = shallowRender(globalProps);
            expect(component.find('.event__time').text()).toEqual('9:00 AM - 10:00 AM');
        });

        it('should not render the location when the location property is not defined', () => {
            const component = shallowRender(globalProps);
            expect(component.find('.event__location').length).toEqual(0);
        });

        it('should render the location when the location property is defined', () => {
            globalProps.data.location = '123 Test Street, New York, NY';
            const component = shallowRender(globalProps);
            expect(component.find('.event__location').length).toEqual(1);
        });
    });
});
