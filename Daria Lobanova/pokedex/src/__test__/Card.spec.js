import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import Card from '../components/view/Card';
import { URL } from '../components/constants';
import { checkProps } from './__utils__/index';
import { getDate, getPicture } from '../components/getters';

const mockStore = configureMockStore();
const setUp = (initialSate = {}, props = {}) => {    

    const store = mockStore(initialSate);
    const wrapper = shallow(<Card store={store} {...props}/>).childAt(0).dive();
    // wrapper.setProps({ props });    
    wrapper.setState({ id: 1, name: 'bulbasaur', catched: [{ id: 1, name: 'bulbasaur', date: '1.1.1', isCatched: true }] });

    // console.log(wrapper.debug());
    // console.log(wrapper.props());    

    return wrapper;

};

describe('Card component', () => {

    let wrapper, mockFunc;

    beforeEach(() => {

        mockFunc = jest.fn();

        const initialSate = {
            "catchedReducer" : {"catched" : []}, 
            "filterReducer" : {"filterText" : ""}
        };

        const props = { 
            id: 1, 
            name: 'bulbasaur'
        };       

        wrapper = setUp(initialSate, props);        

    });

    describe('> Checking PropTypes', () => {

        it('+++ Should not throw a warning', () => {       

            const propsError = checkProps(Card, { id: 1, name: 'bulbasaur' });
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
        });

        describe('> Image', () => {
            
            it('+++ Should return <img>', () => {
                expect((wrapper.find('.pokemon_image')).length).toBe(1);
            });

            it('+++ Should handle error', () => {

                const props = {
                    imgSrc: `${URL}/1.png`,
                    imgAlt: 'Pokemon',
                    // imgErr: () => { }
                };

                expect(wrapper.find('img').props()).toEqual({
                    className: 'pokemon_image',
                    src: props.imgSrc,
                    alt: props.imgAlt,
                    onError: expect.any(Function)
                });

                expect(wrapper.find('img').props().src).toBe(props.imgSrc);
                // expect(wrapper.find('img').props().onError).toBe(props.imgErr);              

            });

        });

        it('+++ Should return <div> with date string', () => {
            expect(wrapper.find('div').hasClass('date')).toEqual(true);
        });

    });

    describe('> Functions', () => {

        it('+++ Should return date string', () => {            
            expect(getDate(wrapper.state(), wrapper.state().id)).toBe('1.1.1');
        });

        it('+++ Should return URL to pokemon', () => {            
            expect(getPicture(wrapper.state().id, wrapper)).toBe('http://localhost:3333/pokemons/1.png');
        });

    });

});