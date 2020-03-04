import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import CatchedPage from '../components/view/CatchedPage';
import { checkProps } from './__utils__/index';

const mockStore = configureMockStore();
const setUp = (initialSate = {}, props = {}) => {    

    const store = mockStore(initialSate);
    const wrapper = shallow(<CatchedPage store={store} {...props}/>).childAt(0).dive();
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
    // console.log(wrapper.props());    

    return wrapper;

};

describe('CatchedPage component', () => {

    let wrapper;

    const initialSate = {
        "catchedReducer" : {"catched" : [
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
        ]}, 
        "filterReducer" : {"filterText" : ""}
    };

    const props = { 
        isLoading: false,
        textFilter: 'Test',
        limit: 1,
        page: 1,
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
                isLoading: false,
                textFilter: 'Test',
                limit: 1,
                page: 1,
                pokemons: [{
                    id: 1,
                    name: 'Test',
                    isCatched: true,
                    date: 'date'
                }]
            };

            const propsError = checkProps(CatchedPage, expectedProps);
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

        it('+++ Should not return <h1>', () => {
            expect(wrapper.find('h1').exists()).toEqual(false);
        });

    });

});