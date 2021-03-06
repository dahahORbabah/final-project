import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import App from '../components/App';

const mockStore = configureMockStore();
const setUp = (initialSate = {}) => {

    const store = mockStore(initialSate);
    const wrapper = shallow(<App store={store} />).childAt(0).dive();   
    // console.log(wrapper);

    return wrapper;

};

describe('App component', () => {

    const initialSate = {
        "catchedReducer" : {"catched" : [{"date": "test", "id": 0, "isCatched": true, "name": "pokemon"}]}, 
        "filterReducer" : {"filterText" : "pi"}
    };

    describe('> Renders', () => {

        let wrapper = setUp(initialSate);

        it('+++ Should render without throwing an error', () => { 
            expect(wrapper.length).toBe(1);
        });

    });

});