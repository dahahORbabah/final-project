import { 
    ACTION_CHANGE_BUTTON,
    INITIAL_STATE_CATCHED
} from '../constants';

const catchedReducer = (state = INITIAL_STATE_CATCHED, action = {}) => {    
    switch (action.type) {        
        case ACTION_CHANGE_BUTTON:          
            return {  
                ...state,
                catched: [...state.catched, action.payload]
            }
        default: 
            return state;
    }    
}

export default catchedReducer;