import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Card from './Card';
import { URL } from '../variables';

let firstLoad = true;

class HomePage extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            isLoading: false,
            pokemons: [],
            limit: 6,
            page: 1
        }

    } 

    componentDidMount = () => {

        if (firstLoad) {   
            this.init();
            firstLoad = false; 
        } 

        this.getPokemonsData();    
        window.addEventListener('scroll', event => {
            this.handleScroll(event);
        });

    }

    init = () => {    

        axios(URL)
        .then(response => {
            for (let i = 0; i < response.data.length; i++) {
                
                if (response.data[i].isCatched) {                                             
                    this.updateDB(i + 1, '');                                            
                }                
            }

            this.setState(
                {
                    isLoading: true
                }
            )
            
        })
        .catch(error => console.log(error)) 
    }

    updateDB = (id, date) => {

        axios.patch(`${URL}/${id}`, {
            date: date,
            isCatched: false
        })    
        .catch(error => console.log(error))  

    }

    getPokemonsData = () => {

        const { limit, page } = this.state;
        const currentURL = `${URL}/?_page=${page}&_limit=${limit}`;

        axios.get(currentURL)
        .then(response => 
            this.setState(
                {
                    pokemons: response.data,
                    isLoading: true
                }
            )
        )
        .catch(error => console.log(error))

    }

    loadMorePokemons = () => {

        this.setState(
            {
                limit: this.state.limit + 6
            }
        )        

        this.getPokemonsData();

    }

    handleScroll = () => {
        let lastLi = document.querySelector('ul.container > li:last-child');
        // console.log(lastLi);
        if (lastLi) {
            let lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
            // console.log(lastLiOffset);
            let pageOffset = window.pageYOffset + window.innerHeight;
            // console.log(pageOffset);                    
            if (pageOffset > lastLiOffset) {
                this.loadMorePokemons();
            }
        }       
    }

    render() {
        let { isLoading } = this.state;

        if (!isLoading) {
            return (
                <h2
                    className='loading'
                >
                    Loading...
                </h2>
            )
        } else {
            return (                
               
                <ul
                    className='container'
                >

                    {this.state.pokemons.map(pokemon => (                            
                        <li 
                            className='card border-dark item'
                            key={pokemon.id}
                        >
                            <Card 
                                id={pokemon.id} 
                                name={pokemon.name} 
                            /> 
                        </li>                            
                    ))}  

                </ul>               
                
            );
        }
    }
}

HomePage.propTypes = {
    firstLoad: PropTypes.bool,
    isLoading: PropTypes.bool,
    pokemons: PropTypes.array,
    page: PropTypes.number,
    limit: PropTypes.number
};

export default HomePage;