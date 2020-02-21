import { ACTION_CHANGE_BUTTON, ACTION_CHANGE_INPUT } from '../constants';

export const changeButton = (id, name, boolean, date) => {            
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
    return {
        type: ACTION_CHANGE_INPUT,
        payload: {
            text: text
        }
    }
}