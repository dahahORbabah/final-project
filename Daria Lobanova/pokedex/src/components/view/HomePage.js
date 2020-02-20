import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getAllPokemons, getPaginatedPokemons, getInitialStateAfterReload } from '../fetchers';
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
            getInitialStateAfterReload(this);
            firstLoad = false; 
        }         
        
        //get all data for searching
        getAllPokemons(this);

        getPaginatedPokemons(this);    
        window.addEventListener('scroll', event => {
            this.handleScroll(event);
        });
    }

    loadMorePokemons = () => {
        this.setState(
            {
                limit: this.state.limit + 6
            }
        )       

        getPaginatedPokemons(this);
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
                <h2 className='loading'>
                    Loading...
                </h2>
            )
        } else {
            if (store.getState().text) {
                return (

                    <ul className='container' >

                        {
                            allPokemons
                            .filter(pokemon => (
                                pokemon.name.toLowerCase().includes((Object.entries(store.getState().text))[0][1])
                            ))
                            .map(pokemon => (    

                                <li 
                                    className='card border-dark item'
                                    key={pokemon.id}> 

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
               
                    <ul className='container'>
    
                        {
                            pokemons.map(pokemon => (  

                                <li 
                                    className='card border-dark item'
                                    key={pokemon.id}> 

                                    <Card 
                                        id={pokemon.id} 
                                        name={pokemon.name} 
                                    /> 
                                    
                                </li>   

                            ))
                        }  
    
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