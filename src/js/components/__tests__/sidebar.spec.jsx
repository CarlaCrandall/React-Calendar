import React from 'react';
import { shallow } from 'enzyme';
import { EventList, Sidebar } from '../';

describe('Sidebar', () => {
    const shallowRender = props => shallow(<Sidebar {...props} />);

    let globalProps,
        NEXT_MONTH,
        PREV_MONTH;

    beforeEach(() => {
        NEXT_MONTH = jest.fn();
        PREV_MONTH = jest.fn();

        globalProps = {
            displayDatePicker: false,
            loading: false,
            error: false,
            year: 2017,
            month: 0,
            date: 10,
            eventsByDate: {},
            PREV_MONTH,
            NEXT_MONTH
        };
    });

    it('should render without throwing an error', () => {
        const component = shallowRender(globalProps);
        expect(component.find('.sidebar').length).toEqual(1);
    });

    it('should render the header when displayDatePicker is false', () => {
        const component = shallowRender(globalProps);
        expect(component.find('header').length).toEqual(1);
    });

    it('should not render the header when displayDatePicker is true', () => {
        globalProps.displayDatePicker = true;
        const component = shallowRender(globalProps);
        expect(component.find('header').length).toEqual(0);
    });

    it('should render the content when date is defined', () => {
        const component = shallowRender(globalProps);
        expect(component.find('.sidebar__content').length).toEqual(1);
    });

    it('should not render the content when date is null', () => {
        globalProps.date = null;
        const component = shallowRender(globalProps);
        expect(component.find('.sidebar__content').length).toEqual(0);
    });

    it('should render the EventList when data has loaded and there is no error', () => {
        const component = shallowRender(globalProps);
        expect(component.find(EventList).length).toEqual(1);
    });

    it('should not render the EventList when eventsByDate is null', () => {
        globalProps.eventsByDate = null;
        const component = shallowRender(globalProps);
        expect(component.find(EventList).length).toEqual(0);
    });

    it('should not render the EventList when loading is true', () => {
        globalProps.loading = true;
        const component = shallowRender(globalProps);
        expect(component.find(EventList).length).toEqual(0);
    });

    it('should not render the EventList when error is true', () => {
        globalProps.error = true;
        const component = shallowRender(globalProps);
        expect(component.find(EventList).length).toEqual(0);
    });

    it('should render the error message when error is true', () => {
        globalProps.error = true;
        const component = shallowRender(globalProps);
        expect(component.find('.sidebar__message').length).toEqual(1);
    });

    it('should call PREV_MONTH when the previous button is clicked', () => {
        const
            component = shallowRender(globalProps),
            btn = component.find('.sidebar__button--previous');

        btn.simulate('click');
        expect(PREV_MONTH).toHaveBeenCalled();
    });

    it('should call NEXT_MONTH when the next button is clicked', () => {
        const
            component = shallowRender(globalProps),
            btn = component.find('.sidebar__button--next');

        btn.simulate('click');
        expect(NEXT_MONTH).toHaveBeenCalled();
    });
});
