import { ACTION_CHANGE_BUTTON } from '../index';

export const changeButton = (id, boolean, date) => {    
    return {
        type: ACTION_CHANGE_BUTTON,
        payload: {            
            id: id,
            isCatched: boolean,
            date: date
        }
    }
}