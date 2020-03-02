import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import CatchButton from '../components/view/CatchButton';
import { checkProps } from './__utils__/index';

const mockStore = configureMockStore();
const setUp = (initialSate = {}, mockFunc) => {    

    const store = mockStore(initialSate);
    const wrapper = shallow(<CatchButton store={store} />).childAt(0).dive();
    wrapper.setProps({ changeButton:  mockFunc});

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
        name: 'bulbasaur',
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

            });

        });

    });

});