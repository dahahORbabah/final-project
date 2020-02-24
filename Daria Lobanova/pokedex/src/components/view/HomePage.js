import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getPokemons, getInitialStateAfterReload } from '../fetchers';
import Card from './Card';
import store from '../../store/store';

let firstLoad = true;

export class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            pokemons: [],
            textFilter: store.getState().filterReducer.filterText.text || '',
            limit: 12,
            page: 1
        }
    } 

    componentDidMount = () => {
        if (firstLoad) {   
            getInitialStateAfterReload(this);
            firstLoad = false; 
        }         
        
        getPokemons(this, this.state.textFilter, false);    
        window.addEventListener('scroll', event => {
            this.handleScroll(event);
        });
    }

    loadMorePokemons = () => {
        this.setState(
            {
                limit: this.state.limit + 12
            }
        )       
        getPokemons(this, this.state.textFilter, false);
    }

    handleScroll = () => {
        let lastLi = document.querySelector('ul.container > li:last-child');
  
        if (lastLi) {
            let lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;            
            let pageOffset = window.pageYOffset + window.innerHeight;

            if (pageOffset > lastLiOffset) {
                this.loadMorePokemons();
            }
        }       
    }

    setFilter = (textFilter) => {        
        if (textFilter !== this.state.textFilter) {
            this.setState(
                {
                    textFilter
                }
            );            
            getPokemons(this, textFilter, false);
        }
    }

    render() {
        let { isLoading, pokemons } = this.state;     
        const textFilter = store.getState().filterReducer.filterText.text;
        
        if (textFilter !== undefined) {
            this.setFilter(textFilter);                         
        }        
    
        if (!isLoading) {
            return (
                <h2 className='loading'>
                    Loading...
                </h2>
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

HomePage.propTypes = {
    firstLoad: PropTypes.bool,
    isLoading: PropTypes.bool,
    page: PropTypes.number,
    limit: PropTypes.number,
    pokemons: PropTypes.array,
};


const mapActionToProps = (dispatch) => {
    return {
        changeInput: bindActionCreators(dispatch)
    }
};

export default connect(mapActionToProps)(HomePage);