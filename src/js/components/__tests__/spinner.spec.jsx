import React from 'react';
import { shallow } from 'enzyme';
import { Spinner } from '../';

describe('Spinner', () => {
    const shallowRender = () => shallow(<Spinner />);


    describe('Component Lifecycle', () => {
        it('should call focus when componentDidMount is called', () => {
            const
                component = shallowRender(),
                instance = component.instance(),
                focus = jest.fn();

            instance.spinner = { focus };
            instance.componentDidMount();

            expect(focus).toHaveBeenCalled();
        });

        it('should set the spinner ref to null', () => {
            const component = shallowRender();
            expect(component.instance().spinner).toEqual(null);
        });
    });


    describe('Custom Functions', () => {
        it('should set the spinner ref to passed in element when refHandler is called', () => {
            const
                component = shallowRender(),
                instance = component.instance(),
                fakeElement = 'TEST';

            instance.refHandler(fakeElement);
            expect(instance.spinner).toEqual(fakeElement);
        });
    });


    describe('Render Functions', () => {
        it('should render without throwing an error', () => {
            const component = shallowRender();
            expect(component.find('.spinner').length).toEqual(1);
        });
    });
});
