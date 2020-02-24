import { ACTION_CHANGE_BUTTON, ACTION_CHANGE_INPUT } from '../../store/constants';
import rootReducer from '../../store/reducers/index';

describe('Reducers', () => {

    it('+++ Should return default state', () => {

        const newState = rootReducer(undefined, {});
        expect(newState).toEqual({"catchedReducer" : {"catched" : []}, "filterReducer" : {"filterText" : ""}});
    
    });

    it('+++ Should return new state if receiving type: ACTION_CHANGE_BUTTON', () => {

        const state = {"catchedReducer" : {"catched" : [{"date": "test", "id": 1, "isCatched": true, "name": "bulbasaur"}]}, "filterReducer" : {"filterText" : ""}};
        const pokemon = {"date": "test", "id": 1, "isCatched": true, "name": "bulbasaur"};
        const newState = rootReducer(undefined, {
            type: ACTION_CHANGE_BUTTON,
            payload: pokemon
        });

        expect(newState).toEqual(state);

    });

    it('+++ Should return new state if receiving type: ACTION_CHANGE_INPUT', () => {

        const state = {"catchedReducer" : {"catched" : []}, "filterReducer" : {"filterText" : "filterText"}};
        const filterText = 'filterText';
        const newState = rootReducer(undefined, {
            type: ACTION_CHANGE_INPUT,
            payload: filterText
        });

        expect(newState).toEqual(state);
    });

});