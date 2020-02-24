import React from 'react';
import { shallow } from 'enzyme';
import Card from '../components/view/Card';
import { checkProps } from './__utils__/index';
import { bool } from 'prop-types';

describe('Card component', () => {

    describe('+ Checking PropTypes', () => {

        it('++ Should not throw a warning', () => {

            const expectedProps = {
                id: 1,
                name: 'Test'
            };

            const propsError = checkProps(Card, expectedProps);
            expect(propsError).toBeUndefined();

        });

    });

});