import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import CatchButton from '../components/view/CatchButton';
import { checkProps } from './__utils__/index';
import { getBoolean } from '../components/getters';

const mockStore = configureMockStore();
const setUp = (initialSate = {}, mockFunc) => {    

    const store = mockStore(initialSate);
    const wrapper = shallow(<CatchButton store={store} />).childAt(0).dive();
    wrapper.setProps({ id: 1, changeButton:  mockFunc});

    // console.log(wrapper.debug());
    // console.log(wrapper.props());    

    return wrapper;

};

describe('CathButton component', () => {

    let wrapper, mockFunc;

    mockFunc = jest.fn();

    const initialSate = {
        "catchedReducer" : {"catched" : []}, 
        "filterReducer" : {"filterText" : ""}
    };

    const props = { 
        id: 1, 
        name: 'pokemon',
        changeButton: mockFunc,
    };       

    wrapper = setUp(initialSate, mockFunc);  
    
    describe('> Checking PropTypes', () => {

        it('+++ Should not throw a warning', () => {       

            const propsError = checkProps(CatchButton, props);
            expect(propsError).toBeUndefined();

        });

    });

    describe('> Renders', () => {

        it('+++ Should render without throwing an error', () => {                           
            expect(wrapper.length).toBe(1);
        });

        describe('> Button', () => {

            it('+++ Should return <button>', () => {
                expect(wrapper.find('button').length).toBe(1);
            });
    
            it('Should emit callbak on click event', () => {                  
                
                wrapper.find('button').simulate('click'); 

                const callback = mockFunc.mock.calls.length;

                expect(mockFunc).toHaveBeenCalled();                
                expect(callback).toBe(1); 

                wrapper.setState({ catched: [{ id: 1, name: 'pokemon', date: '1.1.1', isCatched: true }] });

            });

        });

    });

    describe('> Functions', () => {

        it('+++ Should return true', () => {
            expect(getBoolean(wrapper.state(), props.id)).toBe(true);
        });

        wrapper.setState({ catched: [{ id: 1, name: 'pokemon', date: '1.1.1', isCatched: false }] });

        it('+++ Should return false', () => {
            expect(getBoolean(wrapper.state(), props.id)).toBe(true);
        });

    });

});