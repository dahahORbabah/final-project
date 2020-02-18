import { ACTION_CHANGE_BUTTON } from '../index';
import { ACTION_CHANGE_INPUT } from '../index';

export const changeButton = (id, name, boolean, date) => { 
    // console.log(name);
       
    return {
        type: ACTION_CHANGE_BUTTON,
        payload: {            
            id: id,
            name: name,
            isCatched: boolean,
            date: date
        }
    }
}

export const changeInput = (text) => {    
    // console.log(text);
    
    return {
        type: ACTION_CHANGE_INPUT,
        payload: {
            text: text
        }
    }
}