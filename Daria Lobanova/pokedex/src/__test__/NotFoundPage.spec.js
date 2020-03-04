import React from 'react';
import { shallow } from 'enzyme';

import NotFoundPage from '../components/view/NotFoundPage';

describe('Not Found Component', () => {

    let wrapper = shallow(<NotFoundPage />);

    it('+++ Should render without throwing an error', () => {
        expect(wrapper.length).toBe(1);
    });

    it('+++ Should return <h1>', () => {
        expect(wrapper.find('h1').exists()).toEqual(true);
    });

});