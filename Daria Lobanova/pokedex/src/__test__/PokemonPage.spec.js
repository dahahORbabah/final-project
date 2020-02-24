import React from 'react';
import { shallow } from 'enzyme';
import PokemonPage from '../components/view/PokemonPage';
import { checkProps } from './__utils__/index';

describe('PokemonPage component', () => {

    describe('+ Checking PropTypes', () => {

        it('++ Should not throw a warning', () => {

            const expectedProps = {
                isLoading: false,
                pokemon: [{
                    id: 1,
                    name: 'Test',
                    isCatched: false,
                    date: 'date'
                }]
            };

            const propsError = checkProps(PokemonPage, expectedProps);
            expect(propsError).toBeUndefined();

        });

    });

});