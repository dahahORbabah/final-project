import { 
        ACTION_CHANGE_BUTTON, 
        ACTION_CHANGE_INPUT,
        INITIAL_STATE
    } from '../constants';


export const rootReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case ACTION_CHANGE_BUTTON: 

        // console.log(state);
        // console.log(action); 

            return {  
                catched: [...state.catched, action.payload],
                text: state.text
            }
        case ACTION_CHANGE_INPUT:  
        
        // console.log(state);
        // console.log(action);        
                 
            return {        
                catched: state.catched,        
                text: action.payload                               
            }
        default: 
            return state;
    }
}