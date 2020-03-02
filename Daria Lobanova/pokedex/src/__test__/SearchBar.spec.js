import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import SearchBar from '../components/search/SearchBar';
import { checkProps } from './__utils__/index';

describe('SearchBar component', () => {

    describe('> Checking PropTypes', () => {

        it('+++ Should not throw a warning', () => {

            const expectedProps = {
                filterText: 'Test'
            };

            const propsError = checkProps(SearchBar, expectedProps);
            expect(propsError).toBeUndefined();

        });

    });

    describe('> Renders', () => {

        const mockStore = configureMockStore();
        const initialState = {};
        let wrapper, store;

        beforeEach(() => {

            const props = {
                filterText: 'Test'
            };

            store = mockStore(initialState);
            wrapper = shallow(<Provider store={store}><SearchBar {...props} /></Provider>);

        });

        it('+++ Should render without throwing an error', () => {
            expect(wrapper.exists(<div />)).toBe(false);
        });

        it('+++ Should return <input>', () => {
            expect(wrapper.find('input'));
        });

    });

});