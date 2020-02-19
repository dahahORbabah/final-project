import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import store from '../../store/store';
import Card from './Card';

class CatchedPage extends React.Component {   

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            catchedPokemons: store.getState().catched
        }
    }

    componentDidMount() {       
        this.getPokemonsData();     
    }

    getPokemonsData = () => {
        this.setState(
            {
                isLoading: true 
            }
        )     
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
                    className='container'>

                    <Helmet title='Pokédex | Catched' />                                      
                    
                    {                          
                        this.state.catchedPokemons.length > 0

                        ?   this.state.catchedPokemons.map(pokemon => (                       
                            <li
                                className='card border-dark item'
                                key={pokemon.id}> 
                                <Card
                                    id={pokemon.id}
                                    name={pokemon.name}
                                />
                            </li>
                        ))        

                        :   <h1
                                className='item'>
                                    You have not caught any Pokemon :(
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

export default CatchedPage;