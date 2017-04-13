import React from 'react';
import { shallow } from 'enzyme';
import { Spinner } from '../';

describe('Spinner', () => {
    const shallowRender = () => shallow(<Spinner />);

    it('should render without throwing an error', () => {
        const component = shallowRender();
        expect(component.find('.spinner').length).not.toEqual(0);
    });

    it('should call focus when componentDidMount is called', () => {
        const
            component = shallowRender(),
            instance = component.instance(),
            focusMock = jest.fn();

        instance.spinner = { focus: focusMock };
        instance.componentDidMount();

        expect(focusMock).toHaveBeenCalled();
    });

    it('should set spinner to null', () => {
        const component = shallowRender();
        expect(component.instance().spinner).toEqual(null);
    });

    it('should set spinner to passed in element when refHandler is called', () => {
        const
            component = shallowRender(),
            instance = component.instance(),
            fakeElement = 'TEST';

        instance.refHandler(fakeElement);
        expect(instance.spinner).toEqual(fakeElement);
    });
});
