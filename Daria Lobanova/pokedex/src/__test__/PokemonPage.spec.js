import React from 'react';
import { shallow } from 'enzyme';

import PokemonPage from '../components/view/PokemonPage';
import { URL } from '../components/constants';
import { checkProps1 } from './__utils__/index';


const setUp = () => {   
    
    const props = { 
        isLoading: true,
        pokemon: {
            id: 1,
            name: 'bulbasayr',
            isCatched: false,
            date: 'date'
        }
    };

    const wrapper = shallow(<PokemonPage {...props}/>);
    wrapper.setState({ isLoading: true, pokemon: { id: 1, name: 'pokemon', isCatched: false, date: 'date' } });

    // console.log(wrapper.debug());
    // console.log(wrapper.props().children[1].props);
    // console.log(wrapper.props());    

    return wrapper;

};

describe('PokemonPage component', () => {

    let wrapper = setUp();

    describe('> Checking PropTypes', () => {

        it('+++ Should not throw a warning', () => {

            const expectedProps = {
                isLoading: true,
                pokemon: {
                    id: 1,
                    name: 'pokemon',
                    isCatched: false,
                    date: 'date'
                }
            };

            const propsError = checkProps1(PokemonPage, expectedProps);
            expect(propsError).toBeUndefined();

        });

    });

    describe('> Renders', () => {

        it('+++ Should render without throwing an error', () => {            
            expect(wrapper.length).toBe(1);
        });

        it('+++ Should return <h4> with id', () => {           
            expect(wrapper.find('h4').exists()).toEqual(true);
            expect(wrapper.contains(<h4># {wrapper.state().pokemon.id}</h4>));
            
        });

        it('+++ Should render <h2>', () => {
            expect(wrapper.find('h2').exists()).toEqual(true);
            expect(wrapper.contains(<h4>{wrapper.state().pokemon.name}</h4>));
        });

        describe('> Image', () => {

            it('+++ Should return <img>', () => {
                expect(wrapper.find('img').exists()).toEqual(true);
            });

            it('+++ Should handle error', () => {

                const props = {
                    imgSrc: `${URL}/1.png`,
                    imgAlt: 'Pokemon'
                };

                expect(wrapper.find('img').props()).toEqual({
                    className: 'pokemon_image-full',
                    src: props.imgSrc,
                    alt: props.imgAlt,
                    onError: expect.any(Function)
                });

                expect(wrapper.find('img').props().src).toBe(props.imgSrc);
                // expect(wrapper.find('img').props().onError.target.onError).toBe(null);               

            });

        });

        // it('+++ Should return <h3>', () => {
        //     expect(wrapper.find('h3'));
        // });

    });

});