import React from 'react';
import { shallow, mount } from 'enzyme';
import { KeyboardInstructions } from '../';

describe('KeyboardInstructions', () => {
    const
        shallowRender = () => shallow(<KeyboardInstructions />),
        fullRender = () => mount(<KeyboardInstructions />);


    describe('Component Lifecycle', () => {
        it('should set the table ref to null', () => {
            const component = shallowRender();
            expect(component.instance().table).toEqual(null);
        });

        it('should not call focus when componentDidUpdate is called and displayTable is false', () => {
            const
                component = shallowRender(),
                instance = component.instance(),
                focus = jest.fn();

            instance.table = { focus };
            instance.componentDidUpdate({}, { displayTable: false });

            expect(focus).not.toHaveBeenCalled();
        });

        it('should call focus when componentDidUpdate is called and displayTable is true', () => {
            const
                component = shallowRender(),
                instance = component.instance(),
                focus = jest.fn();

            instance.table = { focus };
            instance.state = { displayTable: true };
            instance.componentDidUpdate({}, { displayTable: false });

            expect(focus).toHaveBeenCalled();
        });
    });


    describe('Events', () => {
        it('should set the state when button is clicked', () => {
            const
                component = shallowRender(),
                btn = component.find('button').at(0),
                setState = jest.fn();

            component.instance().setState = setState;
            btn.simulate('click');

            expect(setState).toHaveBeenCalled();
        });
    });


    describe('Custom Functions', () => {
        it('should set the table ref to passed in element when refHandler is called', () => {
            const
                component = shallowRender(),
                instance = component.instance(),
                fakeElement = 'TEST';

            instance.refHandler(fakeElement);
            expect(instance.table).toEqual(fakeElement);
        });
    });


    describe('Render Functions', () => {
        it('should render without throwing an error', () => {
            const component = shallowRender();
            expect(component.find('.keyboard-instructions').length).toEqual(1);
        });

        it('should not render the table when displayTable is false', () => {
            const component = shallowRender();
            expect(component.find('table').length).toEqual(0);
        });

        it('should not render the table when displayTable is true', () => {
            const component = fullRender();
            component.instance().setState({ displayTable: true });
            expect(component.find('table').length).toEqual(1);
        });
    });
});
