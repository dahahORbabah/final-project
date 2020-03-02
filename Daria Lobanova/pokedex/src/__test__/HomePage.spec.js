import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import HomePage from '../components/view/HomePage';
import { checkProps } from './__utils__/index';

const mockStore = configureMockStore();
const setUp = (initialSate = {}, props = {}) => {    

    const store = mockStore(initialSate);
    const wrapper = shallow(<HomePage store={store} {...props}/>).childAt(0).dive();
    wrapper.setState({ 
        isLoading: true, 
        pokemons: [
        {
            "name": "bulbasaur",
            "id": 1,
            "date": "",
            "isCatched": false
          },
          {
            "name": "ivysaur",
            "id": 2,
            "date": "",
            "isCatched": false
          },
          {
            "name": "venusaur",
            "id": 3,
            "date": "",
            "isCatched": false
          }
    ] });

    // console.log(wrapper.debug());
    // console.log(wrapper.props().children[1].props);
    // console.log(wrapper.props());    

    return wrapper;

};

describe('HomePage component', () => {

    let wrapper;

    const initialSate = {
        "catchedReducer" : {"catched" : []}, 
        "filterReducer" : {"filterText" : ""}
    };

    const props = { 
        firstLoad: false,
            isLoading: false,
            textFilter: 'Text',
            page: 1,
            limit: 3,
            pokemons: [{
                id: 1,
                name: 'Test',
                isCatched: false,
                date: 'date'
            }]
    };

    wrapper = setUp(initialSate, props);        


    describe('> Checking PropTypes', () => {

        it('+++ Should not throw a warning', () => {

            const expectedProps = {
                firstLoad: false,
                isLoading: false,
                textFilter: 'Text',
                page: 1,
                limit: 1,
                pokemons: [{
                    id: 1,
                    name: 'Test',
                    isCatched: false,
                    date: 'date'
                }]
            };

            const propsError = checkProps(HomePage, expectedProps);
            expect(propsError).toBeUndefined();

        });

    });

    describe('> Renders', () => {

        it('+++ Should render without throwing an error', () => {
            expect(wrapper.length).toBe(1);
        });

        it('+++ Should return <li>', () => {
            expect(wrapper.find('li').exists()).toEqual(true);
        });

        it('+++ Should return <Card>', () => {
            expect(wrapper.find('Connect(Card)').exists()).toEqual(true);
        });

    });

});