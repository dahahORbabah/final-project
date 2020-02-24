import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../components/view/HomePage';
import { checkProps } from './__utils__/index';

describe('HomePage component', () => {

    describe('+ Checking PropTypes', () => {

        it('++ Should not throw a warning', () => {

            const expectedProps = {
                firstLoad: false,
                isLoading: false,
                page: 1,
                limit: 1,
                pokemons: [{
                    id: 1,
                    name: 'Test',
                    isCatched: false,
                    date: 'date'
                }]
            };

            const propsError = checkProps(HomePage, expectedProps);
            expect(propsError).toBeUndefined();

        });

    });

});