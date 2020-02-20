import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { PLACEHOLDER_LARGE } from '../constants';
import { getPicture } from '../getters';
import { getPokemon } from '../fetchers';
import store from '../../store/store';

class PokemonPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: store.getState().catchedReducer.catched
        }        
    }

    componentDidMount() {        
        const id = this.props.match.params.id;           

        if (this.state.data.length > 0) {                                               
            for (let i = 0; i < this.state.data.length; i++) {
                if (this.state.data[i].id === Number(id)) {
                    this.setState(
                        {
                            isLoading: true,
                            data: this.state.data[i]
                        }
                    )                    
                } else {
                    getPokemon(id, this);
                }
            }
        } else {
            getPokemon(id, this);
        }
    }

    render() {
        let { isLoading } = this.state;

        if (!isLoading) {
            return(
                <h2 className='loading'>
                    Loading...
                </h2>
            )
        } else {
            return(
                <div className='container'>    
                    <Helmet title={`Pokédex | ${this.state.data.name}`} />
    
                    <div className='card border-dark pokemon item text-monospace'>
    
                        <h4># {this.state.data.id}</h4>
                        <h2>{this.state.data.name}</h2>
                        <img
                            className='pokemon_image-full' 
                            src={getPicture(this.state.data.id, this)}
                            onError={(e) => {
                                e.target.onError = null;
                                e.target.src = PLACEHOLDER_LARGE;
                            }}
                            alt={'Pokemon'}
                        /> 

                        {
                            this.state.data.isCatched
                            ?   <h3 className='text-center text-muted'>
                                    Caught: {this.state.data.date}
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
    data: PropTypes.arrayOf(PropTypes.object)
};

export default PokemonPage;