import React from 'react';
import { shallow } from 'enzyme';
import CatchedPage from '../components/view/CatchedPage';
import { checkProps } from './__utils__/index';

describe('CatchedPage component', () => {

    describe('+ Checking PropTypes', () => {

        it('++ Should not throw a warning', () => {

            const expectedProps = {
                isLoading: false,
                textFilter: 'Test',
                limit: 1,
                page: 1,
                pokemon: [{
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

});