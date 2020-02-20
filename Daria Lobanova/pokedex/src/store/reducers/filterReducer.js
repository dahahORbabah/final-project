import { 
    ACTION_CHANGE_INPUT,
    INITIAL_STATE
} from '../constants';

const filterReducer = (state = INITIAL_STATE, action = {}) => {    
    switch (action.type) {
        case ACTION_CHANGE_INPUT:      
            return {        
                catched: state.catched,        
                text: action.payload                               
            }
        default: 
            return state;
    }
}

export default filterReducer;