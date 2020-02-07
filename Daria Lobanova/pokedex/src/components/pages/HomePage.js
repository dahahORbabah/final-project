import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../Card';

const URL = 'http://localhost:3333/pokemons';
let COUNT = 0;

class HomePage extends React.Component {

    state = {
        isLoading: false,
        hasMore: true,
        pokemons: []
    }

    componentDidMount() {
        if (COUNT === 0) {                       
            this.init();
            COUNT++;
        } 
        
        this.getPokemonsData();
    }

    init = () => {        
        axios(URL)
        .then(response => {
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].isCatched) {                                             
                    this.updateDB(i, '');                        
                }                
            }

            this.setState(
                {
                    isLoading: true
                }
            )
        })
        .catch(error => {
            console.log(error);            
        })
    }

    updateDB = (id, date) => {
        axios.patch(`${URL}/${id + 1}`, {
            date: date,
            isCatched: false
        })    
        .catch(error => {
            console.log(error);            
        })         
    }

    getPokemonsData = () => {
        let pokemons = this.state.pokemons;
        
        if (pokemons.length >= 802) {
            this.setState(
                {
                    hasMore:false
                }
            )
            return;
        } else {
            axios.get(URL)
            .then(response => {
                response.data.splice(0, pokemons.length);
                
                this.setState(
                    {
                        isLoading: true,
                        pokemons: this.state.pokemons.concat(response.data.slice(0, 2))
                    }
                );             
            })  
            .catch(error => {
                console.log(error);                
            }) 
        }      
    }

    render() {
        let { isLoading } = this.state;

        if (!isLoading) {
            return <h2>Loading...</h2>
        } else {
            return (
                <>
                    <ul>
                        <InfiniteScroll
                            dataLength={this.state.pokemons.length}
                            next={this.getPokemonsData}
                            hasMore={this.state.hasMore}
                            loader={<h4>Loading...</h4>}
                            endMessage={<h2>End message</h2>}
                        >    

                        {this.state.pokemons.map(pokemon => (                            
                            <li 
                                key={pokemon.id}
                            >
                                <Card 
                                    id={pokemon.id} 
                                    name={pokemon.name} 
                                /> 
                            </li>                            
                        ))}  
                        
                        </InfiniteScroll>                     
                    </ul>
                </>
            );
        }
    }
}

export default HomePage;