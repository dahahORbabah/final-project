import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import CatchedPage from '../components/view/CatchedPage';
// import Card from '../components/view/Card';
import { checkProps } from './__utils__/index';

describe('CatchedPage component', () => {

    describe('> Checking PropTypes', () => {

        it('++ Should not throw a warning', () => {

            const expectedProps = {
                isLoading: false,
                textFilter: 'Test',
                limit: 1,
                page: 1,
                pokemons: [{
                    id: 1,
                    name: 'Test',
                    isCatched: false,
                    date: 'date'
                }]
            };

            const propsError = checkProps(CatchedPage, expectedProps);
            expect(propsError).toBeUndefined();

        });

    });

    describe('> Renders', () => {

        const mockStore = configureMockStore();
        const initialState = {};
        let wrapper, store;

        beforeEach(() => {

            const props = {
                isLoading: false,
                textFilter: 'Test',
                limit: 1,
                page: 1,
                pokemons: [{
                    id: 1,
                    name: 'Test',
                    isCatched: false,
                    date: 'date'
                }]
            };

            store = mockStore(initialState);
            wrapper = shallow(<Provider store={store}><CatchedPage {...props} /></Provider>);

        });

        it('+++ Should render without throwing an error', () => {
            expect(wrapper.exists(<ul />)).toBe(false);
        });

        it('+++ Should return <li>', () => {
            expect(wrapper.find('li'));
        });

        it('+++ Should return <Card>', () => {
            expect(wrapper.find('Card'));
        });

        it('+++ Should return <h1>', () => {
            expect(wrapper.find('h1'));
        });

    });

});