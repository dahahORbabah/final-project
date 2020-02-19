import { ACTION_CHANGE_BUTTON, ACTION_CHANGE_INPUT } from './constants';

const initialState = {
    catched: [],
    text: ''
};

export const rootReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case ACTION_CHANGE_BUTTON: 

        console.log(state);
        console.log(action); 

            return {  
                catched: [...state.catched, action.payload],
                text: state.text
            }
        case ACTION_CHANGE_INPUT:  
        
        console.log(state);
        console.log(action);        
                 
            return {        
                catched: state.catched,        
                text: action.payload                               
            }
        default: 
            return state;
    }
}
