import { 
    ACTION_CHANGE_INPUT,
    INITIAL_STATE_FILTER
} from '../constants';

const filterReducer = (state = INITIAL_STATE_FILTER, action = {}) => {    
    switch (action.type) {
        case ACTION_CHANGE_INPUT:      
            return {        
                filterText: action.payload                         
            }
        default: 
            return state;
    }
}

export default filterReducer;