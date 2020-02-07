import { ACTION_CHANGE_BUTTON } from '../index';

const initialState = {
    catched: []
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CHANGE_BUTTON:            
            return { ...state.initialState, 
                catched: [...state.catched, action.payload]
            }
        default: 
            return state;
    }
}
