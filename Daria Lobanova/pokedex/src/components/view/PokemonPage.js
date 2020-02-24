import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { PLACEHOLDER_LARGE } from '../constants';
import { getPicture } from '../getters';
import { getPokemon } from '../fetchers';

class PokemonPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            pokemon: []
        }        
    }

    componentDidMount() {        
        const id = this.props.match.params.id;                  
        getPokemon(id, this);        
    }

    render() {
        let { isLoading, pokemon } = this.state;

        if (!isLoading) {
            return(
                <h2 className='loading'>
                    Loading...
                </h2>
            )
        } else {
            return(
                <div className='container'>    
                    <Helmet title={`Pokédex | ${pokemon.name}`} />
    
                    <div className='card border-dark pokemon item text-monospace'>
    
                        <h4># {pokemon.id}</h4>
                        <h2>{pokemon.name}</h2>
                        <img
                            className='pokemon_image-full' 
                            src={getPicture(pokemon.id, this)}
                            onError={(e) => {
                                e.target.onError = null;
                                e.target.src = PLACEHOLDER_LARGE;
                            }}
                            alt={'Pokemon'}
                        /> 

                        {
                            pokemon.isCatched
                            ?   <h3 className='text-center text-muted'>
                                    Caught: {pokemon.date}
                                </h3>
                            :   <h3 className='text-center text-muted'>
                                    Pokemon is not caught
                                </h3>
                        }
    
                    </div>
    
                </div>
            )
        }
    } 
}

PokemonPage.propTypes = {
    isLoading: PropTypes.bool,
    pokemon: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        isCatched: PropTypes.bool,
        date: PropTypes.date
    }))
};

export default PokemonPage;