import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getPokemons } from '../fetchers';
import store from '../../store/store';
import Card from './Card';

class CatchedPage extends React.Component {   

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

    componentDidMount() {
        this.setState(
            {
                isLoading: true 
            }
        )

        getPokemons(this, this.state.textFilter, true);
    }

    setFilter = (textFilter) => {        
        if (textFilter !== this.state.textFilter) {
            this.setState(
                {
                    textFilter
                }
            );
            getPokemons(this, textFilter, true);
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
                    <Helmet title='Pokédex | Catched' />                                      
                    
                    {                          
                        pokemons.length

                        ?   pokemons.map(pokemon => (   
                                              
                                <li
                                    className='card border-dark item'
                                    key={pokemon.id}> 

                                        <Card
                                            id={pokemon.id}
                                            name={pokemon.name}
                                        />

                                </li>

                            ))        

                        :   <h1 className='item'>
                                You have not caught any Pokemon
                            </h1>
                    } 
                    
                </ul>
            )
        }
    }
}

CatchedPage.propTypes = {
    isLoading: PropTypes.bool,
    catchedPokemons: PropTypes.arrayOf(PropTypes.object)
};

const mapActionToProps = (dispatch) => {
    return {
        changeInput: bindActionCreators(dispatch)
    }
};

export default connect(mapActionToProps)(CatchedPage);