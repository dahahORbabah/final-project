import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import Card from '../components/view/Card';
import { URL } from '../components/constants';
import { checkProps } from './__utils__/index';

const mockStore = configureMockStore();
const setUp = (initialSate = {}, props = {}) => {    

    const store = mockStore(initialSate);
    const wrapper = shallow(<Card store={store} {...props}/>).childAt(0).dive();
    wrapper.setProps({ props });

    // console.log(wrapper.debug());
    // console.log(wrapper.props());    

    return wrapper;

};

describe('Card component', () => {

    let wrapper, mockFunc;

    beforeEach(() => {

        mockFunc = jest.fn();
        // mockFunc.mockName('buttonClick');

        const initialSate = {
            "catchedReducer" : {"catched" : []}, 
            "filterReducer" : {"filterText" : ""}
        };

        const props = { 
            id: 1, 
            name: 'bulbasaur' ,
            catched: [],
            changeButton: mockFunc
        };       

        wrapper = setUp(initialSate, props);        

    });

    describe('> Checking PropTypes', () => {

        it('+++ Should not throw a warning', () => {       

            const propsError = checkProps(Card, { id: 1, name: 'bulbasaur', catched: [] });
            expect(propsError).toBeUndefined();

        });

    });


    describe('> Renders', () => {

        it('+++ Should render without throwing an error', () => {                           
            // expect(props.name).toBe('bulbasaur');              
            // expect(props.id).toBe(1);

            expect(wrapper.length).toBe(1);
        });

        it('+++ Should return <p> with name of pokemon', () => {          
            expect(wrapper.find('.pokemon_name').exists()).toEqual(true);
            // expect(wrapper.contains(<p className='pokemon_name'>{props.name}</p>));
        });

        describe('> Image', () => {
            
            it('+++ Should return <img>', () => {
                expect((wrapper.find('.pokemon_image')).length).toBe(1);
            });

            it('+++ Should handle error', () => {

                const props = {
                    imgSrc: `${URL}/1.png`,
                    imgAlt: 'Pokemon'
                };

                expect(wrapper.find('img').props()).toEqual({
                    className: 'pokemon_image',
                    src: props.imgSrc,
                    alt: props.imgAlt,
                    onError: expect.any(Function)
                });

                expect(wrapper.find('img').props().src).toBe(props.imgSrc);
                // expect(wrapper.find('img').props().onError.target.onError).toBe(null);               

            });

        });

        it('+++ Should return <div> with date string', () => {
            expect(wrapper.find('div').hasClass('date')).toEqual(true);
        });

    });

});