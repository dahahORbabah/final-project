import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import Card from '../Card';

const URL = 'http://localhost:3333/pokemons';

class CatchedPage extends React.Component {

    state = {
        isLoading: false,
        hasMore: true,
        catchedPokemons: []
    }

    componentDidMount() {                       
        this.getPokemonsData();
    }

    getPokemonsData = () => {
        let pokemons = this.state.catchedPokemons;
        
        axios.get(URL)
        .then(response => {
            response.data.splice(0, pokemons.length);
            
            this.setState(
                {
                    isLoading: true,
                    catchedPokemons: this.state.catchedPokemons.concat(response.data.slice(0, 6))
                }
            );             
        }) 
        .catch(error => {
            console.log(error);            
        })      
    }

    render() {
        let { isLoading } = this.state;

        if (!isLoading) {
            return <h2>Loading...</h2>
        } else {
            return (
                <ul>
                    <InfiniteScroll
                        className='scroll'
                        dataLength={this.state.catchedPokemons.length}
                        next={this.getPokemonsData}
                        hasMore={this.state.hasMore}
                    >

                    {this.state.catchedPokemons.filter((pokemon) => 
                        pokemon.isCatched).map((pokemon) => (
                            <li
                                className='item'
                                key={pokemon.id}> 
                                <Card
                                    id={pokemon.id}
                                    name={pokemon.name}
                                />
                            </li>
                        ))
                    }

                    </InfiniteScroll> 
                </ul>
            )
        }
    }
}

export default CatchedPage;