import { ACTION_CHANGE_BUTTON } from '../index';

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