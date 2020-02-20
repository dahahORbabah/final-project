import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { URL } from '../constants';
import Card from './Card';
import store from '../../store/store';

let firstLoad = true;

class HomePage extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            isLoading: false,
            allPokemons: [],
            pokemons: [],
            limit: 12,
            page: 1
        }

    } 

    componentDidMount = () => {

        if (firstLoad) {   
            this.init();
            firstLoad = false; 
        } 

        this.getAllPokemons();

        this.getPokemonsData();    
        window.addEventListener('scroll', event => {
            this.handleScroll(event);
        });

    }

    init = () => {    

        axios.get(URL)
        .then(response => {         

            this.setState(
                {
                    isLoading: true
                }
            )

            for (let i = 0; i < response.data.length; i++) {
                
                if (response.data[i].isCatched) {                                             
                    this.updateDB(i + 1, '');                                            
                }                
            }
        })
        .catch(error => console.error(error))
        
    }

    updateDB = (id, date) => {

        axios.patch(`${URL}/${id}`, {
            date: date,
            isCatched: false
        })    
        .catch(error => console.error(error)) 

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
        .catch(error => console.error(error))

    }

    getAllPokemons = () => {
        axios.get(URL)
        .then(response => {         

            this.setState(
                {
                    isLoading: true,
                    allPokemons: response.data
                }
            )

        })
        .catch(error => console.error(error))
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
        let { isLoading, allPokemons, pokemons } = this.state;       
    
        if (!isLoading) {
            return (
                <h2
                    className='loading'
                >
                    Loading...
                </h2>
            )
        } else {
            if (store.getState().text) {
                return (

                    <ul
                        className='container'
                    >

                        {
                            allPokemons
                            .filter(pokemon => (
                                pokemon.name.toLowerCase().includes((Object.entries(store.getState().text))[0][1])
                            ))
                            .map(pokemon => (    

                                <li 
                                    className='card border-dark item'
                                    key={pokemon.id}
                                > 
                                    <Card 
                                        id={pokemon.id} 
                                        name={pokemon.name} 
                                    /> 
                                </li> 

                            ))
                        }  

                    </ul>

                )                        
            } else {
                return (                
               
                    <ul
                        className='container'
                    >
    
                        {pokemons.map(pokemon => (                            
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
}

HomePage.propTypes = {
    firstLoad: PropTypes.bool,
    isLoading: PropTypes.bool,
    pokemons: PropTypes.array,
    page: PropTypes.number,
    limit: PropTypes.number
};


const mapActionToProps = (dispatch) => {
    return {
        changeButton: bindActionCreators(dispatch)
    }
};

export default connect(mapActionToProps)(HomePage);