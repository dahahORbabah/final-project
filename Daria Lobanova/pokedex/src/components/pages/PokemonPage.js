import React from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { store } from '../../index';

const URL = 'http://localhost:3333/pokemons';

class PokemonPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: store.getState().catched
        }
    }

    getPicture = (id) => {
        this.src = `${URL}/${id}.png`;
        return this.src;
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
                }
            }
        } else {
            axios(`${URL}/${id}`)
            .then(response => {                
                this.setState(
                    {
                        isLoading: true,
                        data: {
                            id: response.data.id,
                            name: response.data.name,
                            date: '',
                            isCatched: false
                        } 
                    }
                )               
            })
        }
    }

    render() {
        let { isLoading } = this.state;

        if (!isLoading) {
            return(
                <h2>Loading...</h2>
            )
        }

        return(
            <div
                className='container'>

                <Helmet title={`Pokédex | ${this.state.data.name}`} />

                <div
                    className='card border-dark pokemon item'>

                    <h6># {this.state.data.id}</h6>
                    <h2>{this.state.data.name}</h2>
                    <img
                        className='pokemon_image-full' 
                        src={this.getPicture(this.state.data.id)}
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

export default PokemonPage;