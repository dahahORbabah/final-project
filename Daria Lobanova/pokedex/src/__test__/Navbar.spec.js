import React from 'react';
import { shallow } from 'enzyme';

import Navbar from '../components/view/Navbar';

describe('Navbar component', () => {

    let wrapper = shallow(<Navbar />);

    it('+++ Should render without throwing an error', () => {
        expect(wrapper.length).toBe(1);
    });

    it('+++ Should return <ul>', () => {
        expect(wrapper.find('ul').exists()).toEqual(true);
    });

});