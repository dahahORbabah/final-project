import axios from 'axios';
import { URL } from './constants';

export function getUpdateDB(id, date, boolean) {
    if (id > 0) {
        axios.patch(`${URL}/${id}`, {
            date: date,
            isCatched: boolean
        })
        .catch(error => console.error(error))
    }              
}

export function getPokemon (id, component) {            
    axios.get(`${URL}/${id}`)
    .then(response => {                
        component.setState(
            {
                isLoading: true,
                data: {
                    id: response.data.id,
                    name: response.data.name,
                    date: response.data.date,
                    isCatched: response.data.isCatched
                } 
            }
        )               
    })  
    .catch(error => console.error(error))       
}

export function getAllPokemons(component) {
    axios.get(URL)
    .then(response => {       
         component.setState(
            {
                isLoading: true,
                allPokemons: response.data
            }
        )
    })
    .catch(error => console.error(error))
}

export function getPaginatedPokemons(component) {
    const { limit, page } = component.state;
    const currentURL = `${URL}/?_page=${page}&_limit=${limit}`;

    axios.get(currentURL)
    .then(response => 
        component.setState(
            {
                pokemons: response.data,
                isLoading: true
            }
        )
    )
    .catch(error => console.error(error))
}

export function getInitialStateAfterReload(component) {    
    axios.get(URL)
    .then(response => {         

        component.setState(
            {
                isLoading: true
            }
        )

        for (let i = 0; i < response.data.length; i++) {
            
            if (response.data[i].isCatched) {                                             
                getUpdateDB(i + 1, '', false);                                            
            }                
        }

    })
    .catch(error => console.error(error))        
}