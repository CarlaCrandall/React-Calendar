import React from 'react';
import { shallow } from 'enzyme';
import { Calendar, Spinner } from '../../';

describe('Calendar', () => {
    const shallowRender = props => shallow(<Calendar {...props} />);

    let globalProps,
        SELECT_DATE,
        NEXT_MONTH,
        PREV_MONTH;

    beforeEach(() => {
        SELECT_DATE = jest.fn();
        NEXT_MONTH = jest.fn();
        PREV_MONTH = jest.fn();

        globalProps = {
            year: 2017,
            month: 7,
            date: 4,
            loading: false,
            eventsByDate: {},
            SELECT_DATE,
            NEXT_MONTH,
            PREV_MONTH
        };
    });


    describe('Events', () => {

        describe('onKeyDown', () => {
            it('should call handleArrowKey when keyCode is 37, 38, 39, or 40', () => {
                const
                    component = shallowRender(globalProps),
                    grid = component.find('.calendar__grid').at(0),
                    handleArrowKey = jest.fn(),
                    event = { preventDefault: () => false };

                component.instance().handleArrowKey = handleArrowKey;

                event.keyCode = 37;
                grid.simulate('keydown', event);
                expect(handleArrowKey).toHaveBeenCalledWith(37);

                event.keyCode = 38;
                grid.simulate('keydown', event);
                expect(handleArrowKey).toHaveBeenCalledWith(38);

                event.keyCode = 39;
                grid.simulate('keydown', event);
                expect(handleArrowKey).toHaveBeenCalledWith(39);

                event.keyCode = 40;
                grid.simulate('keydown', event);
                expect(handleArrowKey).toHaveBeenCalledWith(40);
            });

            it('should call handlePageKey when keyCode is 33 or 34', () => {
                const
                    component = shallowRender(globalProps),
                    grid = component.find('.calendar__grid').at(0),
                    handlePageKey = jest.fn(),
                    event = { preventDefault: () => false };

                component.instance().handlePageKey = handlePageKey;

                event.keyCode = 33;
                grid.simulate('keydown', event);
                expect(handlePageKey).toHaveBeenCalledWith(33);

                event.keyCode = 34;
                grid.simulate('keydown', event);
                expect(handlePageKey).toHaveBeenCalledWith(34);
            });

            it('should call handleHomeKey when keyCode is 35 or 36', () => {
                const
                    component = shallowRender(globalProps),
                    grid = component.find('.calendar__grid').at(0),
                    handleHomeKey = jest.fn(),
                    event = {
                        ctrlKey: false,
                        preventDefault: () => false
                    };

                component.instance().handleHomeKey = handleHomeKey;

                event.keyCode = 35;
                grid.simulate('keydown', event);
                expect(handleHomeKey).toHaveBeenCalledWith(35, false);

                event.keyCode = 36;
                grid.simulate('keydown', event);
                expect(handleHomeKey).toHaveBeenCalledWith(36, false);
            });

            it('should not call handleArrowKey, handlePageKey, or handleHomeKey when keyCode is not 33-40', () => {
                const
                    component = shallowRender(globalProps),
                    grid = component.find('.calendar__grid').at(0),
                    handleArrowKey = jest.fn(),
                    handlePageKey = jest.fn(),
                    handleHomeKey = jest.fn(),
                    event = { preventDefault: () => false };

                component.instance().handleArrowKey = handleArrowKey;
                component.instance().handlePageKey = handlePageKey;
                component.instance().handleHomeKey = handleHomeKey;

                event.keyCode = 20;
                grid.simulate('keydown', event);

                expect(handleArrowKey).not.toHaveBeenCalled();
                expect(handlePageKey).not.toHaveBeenCalled();
                expect(handleHomeKey).not.toHaveBeenCalled();
            });
        });

        it('should set the state onFocus', () => {
            const
                component = shallowRender(globalProps),
                grid = component.find('.calendar__grid').at(0),
                setState = jest.fn();

            component.instance().setState = setState;
            grid.simulate('focus', { type: 'focus' });

            expect(setState).toHaveBeenCalledWith({ hasFocus: true });
        });

        it('should set the state onBlur', () => {
            const
                component = shallowRender(globalProps),
                grid = component.find('.calendar__grid').at(0),
                setState = jest.fn();

            component.instance().setState = setState;
            grid.simulate('blur', { type: 'blur' });

            expect(setState).toHaveBeenCalledWith({ hasFocus: false });
        });
    });


    describe('Custom Functions', () => {
        describe('handleArrowKey', () => {
            it('should call updateMonth and SELECT_DATE with the correct values for the left arrow key', () => {
                const
                    component = shallowRender(globalProps),
                    instance = component.instance(),
                    updateMonth = jest.fn();

                instance.updateMonth = updateMonth;
                instance.handleArrowKey(37);

                expect(updateMonth).toHaveBeenCalledWith(7, 3);
                expect(SELECT_DATE).toHaveBeenCalledWith(3);
            });

            it('should call updateMonth and SELECT_DATE with the correct values for the up arrow key', () => {
                const
                    component = shallowRender(globalProps),
                    instance = component.instance(),
                    updateMonth = jest.fn();

                instance.updateMonth = updateMonth;
                instance.handleArrowKey(38);

                expect(updateMonth).toHaveBeenCalledWith(6, 28);
                expect(SELECT_DATE).toHaveBeenCalledWith(28);
            });

            it('should call updateMonth and SELECT_DATE with the correct values for the right arrow key', () => {
                const
                    component = shallowRender(globalProps),
                    instance = component.instance(),
                    updateMonth = jest.fn();

                instance.updateMonth = updateMonth;
                instance.handleArrowKey(39);

                expect(updateMonth).toHaveBeenCalledWith(7, 5);
                expect(SELECT_DATE).toHaveBeenCalledWith(5);
            });

            it('should call updateMonth and SELECT_DATE with the correct values for the down arrow key', () => {
                const
                    component = shallowRender(globalProps),
                    instance = component.instance(),
                    updateMonth = jest.fn();

                instance.updateMonth = updateMonth;
                instance.handleArrowKey(40);

                expect(updateMonth).toHaveBeenCalledWith(7, 11);
                expect(SELECT_DATE).toHaveBeenCalledWith(11);
            });

            it('should call updateMonth and SELECT_DATE with the default values for a non arrow key', () => {
                const
                    component = shallowRender(globalProps),
                    instance = component.instance(),
                    updateMonth = jest.fn();

                instance.updateMonth = updateMonth;
                instance.handleArrowKey(20);

                expect(updateMonth).toHaveBeenCalledWith(7, 4);
                expect(SELECT_DATE).toHaveBeenCalledWith(4);
            });
        });

        describe('handlePageKey', () => {
            it('should call NEXT_MONTH for the page up key', () => {
                const component = shallowRender(globalProps);
                component.instance().handlePageKey(33);
                expect(NEXT_MONTH).toHaveBeenCalled();
            });

            it('should call PREV_MONTH for the page down key', () => {
                const component = shallowRender(globalProps);
                component.instance().handlePageKey(34);
                expect(PREV_MONTH).toHaveBeenCalled();
            });
        });

        describe('handleHomeKey', () => {
            it('should call SELECT_DATE with the correct value for the home key', () => {
                const component = shallowRender(globalProps);
                component.instance().handleHomeKey(36, false);
                expect(SELECT_DATE).toHaveBeenCalledWith(1);
            });

            it('should call SELECT_DATE with the correct value for the end key', () => {
                const component = shallowRender(globalProps);
                component.instance().handleHomeKey(35, false);
                expect(SELECT_DATE).toHaveBeenCalledWith(5);
            });

            it('should call SELECT_DATE with the correct value for the home + ctrl key', () => {
                const component = shallowRender(globalProps);
                component.instance().handleHomeKey(36, true);
                expect(SELECT_DATE).toHaveBeenCalledWith(1);
            });

            it('should call SELECT_DATE with the correct value for the end + ctrl key', () => {
                const component = shallowRender(globalProps);
                component.instance().handleHomeKey(35, true);
                expect(SELECT_DATE).toHaveBeenCalledWith(31);
            });
        });

        describe('updateMonth', () => {
            it('should call PREV_MONTH when selectedMonth is less than the current month', () => {
                const component = shallowRender(globalProps);
                component.instance().updateMonth(6, 3);
                expect(PREV_MONTH).toHaveBeenCalled();
            });

            it('should call NEXT_MONTH when selectedMonth is greater than the current month', () => {
                const component = shallowRender(globalProps);
                component.instance().updateMonth(8, 3);
                expect(NEXT_MONTH).toHaveBeenCalled();
            });

            it('should not call PREV_MONTH or NEXT_MONTH when selectedMonth is equal to the current month', () => {
                const component = shallowRender(globalProps);
                component.instance().updateMonth(7, 3);
                expect(PREV_MONTH).not.toHaveBeenCalled();
                expect(NEXT_MONTH).not.toHaveBeenCalled();
            });
        });
    });


    describe('Render Functions', () => {
        it('should render without throwing an error', () => {
            const component = shallowRender(globalProps);
            expect(component.find('.calendar').length).toEqual(1);
        });

        it('should render the calendar grid when data has finished loading', () => {
            const component = shallowRender(globalProps);
            expect(component.find('.calendar__grid').length).toEqual(1);
        });

        it('should not render the spinner when data has finished loading', () => {
            const component = shallowRender(globalProps);
            expect(component.find(Spinner).length).toEqual(0);
        });

        it('should render the spinner when loading is true', () => {
            globalProps.loading = true;
            const component = shallowRender(globalProps);
            expect(component.find(Spinner).length).toEqual(1);
        });

        it('should render the spinner when eventsByDate is null', () => {
            globalProps.eventsByDate = null;
            const component = shallowRender(globalProps);
            expect(component.find(Spinner).length).toEqual(1);
        });


    });
});
