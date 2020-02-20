import { URL } from './constants';

export function getBoolean(obj, id) {            
    for (let catched in obj) {        
        for (let num in obj[catched]) {
            if (id === obj[catched][num].id) {
                return obj[catched][num].isCatched;
            }
        } 
    }        
}

export function getDate(obj, id) {    
    for (let catched in obj) {
        for (let num in obj[catched]) {
            if (id === obj[catched][num].id) {                    
                return obj[catched][num].date;
            }
        } 
    }
}

export function getPicture(id, img) {
    if (id) {
        img.src = `${URL}/${id}.png`;
        return img.src;
    } else return;
}