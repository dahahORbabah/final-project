import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import SearchBar from '../components/search/SearchBar';
import { checkProps } from './__utils__/index';

const mockStore = configureMockStore();
const setUp = (initialSate = {}, mockFunc) => {    

    const store = mockStore(initialSate);
    const wrapper = shallow(<SearchBar store={store} />).childAt(0).dive();
    wrapper.setProps({ onFilterTextChange: mockFunc });

    // console.log(wrapper.debug());
    // console.log(wrapper.props());    

    return wrapper;

};

describe('SearchBar component', () => {

    let wrapper, mockFunc;

    // beforeEach(() => {

        mockFunc = jest.fn();
        // mockFunc.mockName('buttonClick');

        const initialSate = {
            "catchedReducer" : {"catched" : []}, 
            "filterReducer" : {"filterText" : ""}
        };

        const props = { 
            filterText: 'test',
            onFilterTextChange: mockFunc
        };       

        wrapper = setUp(initialSate, mockFunc);        

    // });

    describe('> Checking PropTypes', () => {

        it('+++ Should not throw a warning', () => {

            const propsError = checkProps(SearchBar, props);
            expect(propsError).toBeUndefined();

        });

    });

    describe('> Renders', () => {

        it('+++ Should render without throwing an error', () => {
            expect(wrapper.length).toBe(1);
        });

    });

    describe('> Input', () => {

        it('+++ Should return <input>', () => {
            expect((wrapper.find('input')).length).toBe(1);
        });

        it('+++ Should return string', () => {
            wrapper.find('input').simulate('change', { target: { value: 'pika' } });

            const callback = mockFunc.mock.calls.length;

            expect(mockFunc).toHaveBeenCalled();
            expect(callback).toBe(1);          
            
        });

    });

});