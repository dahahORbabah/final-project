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

});