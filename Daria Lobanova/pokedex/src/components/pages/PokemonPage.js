import React from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

class PokemonPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: null
        }
    }

    getPicture = (id) => {
        this.src = `http://localhost:3300/pokemons/${id}.png`;
        return this.src;
    }

    //learn about errors and add handlers for ones

    componentDidMount() {
        const URL = 'http://localhost:3333/pokemons';
        const id = this.props.match.params.id;

        axios.get(`${URL}/${id}`)
        .then(response => {
            let pokemon = response.data;
            if(pokemon.id) {
                this.setState(
                    {
                        isLoading: true,
                        data: pokemon
                    }
                )
            } else {
                this.setState(
                    {
                        isLoading: true,
                        data: undefined
                    }
                )
            }
        })
        .catch(error => {
            console.log(error);            
        })
    }

    render() {
        let { isLoading } = this.state;

        //message about error

        if (!isLoading) {
            return(
                <h2>Loading...</h2>
            )
        }

        return(
            <div
                className='container pokemon border'>

                <Helmet title={`Pokédex | ${this.state.data.name}`} />

                <p>PokemonID: {this.state.data.id}</p>
                <p>PokemonNAME: {this.state.data.name}</p>
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
                        ?   <p>Catched: {this.state.data.date}</p>
                        :   'not catched yet'
                }

            </div>
        )
    } 
}

export default PokemonPage;