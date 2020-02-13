import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import Card from '../Card';

const URL = 'http://localhost:3333/pokemons';
let firstLoad = true;

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            hasMore: true,
            pokemons: []
        }
    } 

    componentDidMount() {

        if (firstLoad) {   
            this.init();
            firstLoad = false; 
        } 

        this.getPokemonsData();    
    }

    init = () => {    

        axios(URL)
        .then(response => {
            for (let i = 0; i < response.data.length; i++) {
                
                if (response.data[i].isCatched) {                                             
                    this.updateDB(i + 1, '');                                            
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

        axios.patch(`${URL}/${id}`, {
            date: date,
            isCatched: false
        })    
        .catch(error => {
            console.log(error);            
        })  

    }

    getPokemonsData = () => {
        let pokemons = this.state.pokemons;          
    
        axios.get(URL)
        .then(response => {                
            response.data.splice(0, pokemons.length);
            ;
            
            this.setState(
                {
                    isLoading: true,
                    pokemons: this.state.pokemons.concat(response.data.slice(0, 6))
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
               
                <ul
                    className='container'>

                    <InfiniteScroll
                        className='scroll'
                        dataLength={this.state.pokemons.length}
                        next={this.getPokemonsData}
                        hasMore={this.state.hasMore}
                    >    

                    {this.state.pokemons.map(pokemon => (                            
                        <li 
                            className='card border-dark item'
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
                
            );
        }
    }
}

HomePage.propTypes = {
    isLoading: PropTypes.bool,
    hasMore: PropTypes.bool,
    pokemons: PropTypes.array
};

export default HomePage;