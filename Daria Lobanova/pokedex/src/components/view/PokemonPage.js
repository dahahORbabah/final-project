import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { URL } from '../variables';
import { getPicture } from '../getters';
import store from '../../store/store';

class PokemonPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: store.getState().catched
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
                    this.fetchPokemon(id);
                }
            }
        } else {
            this.fetchPokemon(id);
        }
    }

    fetchPokemon = (id) => {        
        axios.get(`${URL}/${id}`)
        .then(response => {                
            this.setState(
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
    }

    render() {
        let { isLoading } = this.state;

        if (!isLoading) {
            return(
                <h2
                    className='loading'>
                        Loading...
                </h2>
            )
        } else {
            return(
                <div
                    className='container'>
    
                    <Helmet title={`Pokédex | ${this.state.data.name}`} />
    
                    <div
                        className='card border-dark pokemon item text-monospace'>
    
                        <h4># {this.state.data.id}</h4>
                        <h2>{this.state.data.name}</h2>
                        <img
                            className='pokemon_image-full' 
                            src={getPicture(this.state.data.id, this)}
                            onError={(e) => {
                                e.target.onError = null;
                                e.target.src = 'https://via.placeholder.com/475.png?text=Pokemon+Not+Found';
                            }}
                            alt={'Pokemon'}
                        /> 
                        {
                            this.state.data.isCatched
                                ?   <h3
                                        className='text-center text-muted'>
                                            Caught: {this.state.data.date}
                                    </h3>
                                :   <h3
                                        className='text-center text-muted'>
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