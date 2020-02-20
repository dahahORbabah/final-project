import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getPokemons, getInitialStateAfterReload } from '../fetchers';
import Card from './Card';
import store from '../../store/store';

let firstLoad = true;

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            pokemons: [],
            textFilter: '',
            limit: 12,
            page: 1
        }
    } 

    componentDidMount = () => {
        if (firstLoad) {   
            getInitialStateAfterReload(this);
            firstLoad = false; 
        }         

        getPokemons(this, this.state.textFilter);    
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

        getPokemons(this, this.state.textFilter);
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

    setFilter = (textFilter) => {        
        if (textFilter !== this.state.textFilter) {
            this.setState(
                {
                    textFilter
                }
            );
            getPokemons(this, textFilter);
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
    pokemons: PropTypes.array,
    page: PropTypes.number,
    limit: PropTypes.number
};


const mapActionToProps = (dispatch) => {
    return {
        changeInput: bindActionCreators(dispatch)
    }
};

export default connect(mapActionToProps)(HomePage);