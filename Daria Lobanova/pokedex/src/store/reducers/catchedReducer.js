import { 
    ACTION_CHANGE_BUTTON,
    INITIAL_STATE
} from '../constants';

const catchedReducer = (state = INITIAL_STATE, action = {}) => {    
    switch (action.type) {        
        case ACTION_CHANGE_BUTTON:  
        console.log(state);
        
            return {  
                catched: [...state.catched, action.payload],
                text: state.text
            }
        default: 
            return state;
    }
}

export default catchedReducer;