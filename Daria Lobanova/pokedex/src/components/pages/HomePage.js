import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// import InfiniteScroll from 'react-infinite-scroll-component';

import Card from '../Card';
// import { store } from '../../index';

const URL = 'http://localhost:3333/pokemons';
let firstLoad = true;

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // isLoading: false,
            hasMore: true,
            pokemons: [],
            limit: 6,
            page: 1
            // totalPages: null
        }
    } 

    componentDidMount() {

        if (firstLoad) {   
            this.init();
            firstLoad = false; 
        } 

        this.getPokemonsData();    
        window.addEventListener('scroll', event => {
            this.handleScroll(event);
        });
    }

    init = () => {    

        axios(URL)
        .then(response => {
            for (let i = 0; i < response.data.length; i++) {
                
                if (response.data[i].isCatched) {                                             
                    this.updateDB(i + 1, '');                                            
                }                
            }

            // this.setState(
            //     {
            //         isLoading: true
            //     }
            // )
            
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
        const {
            limit, 
            page
        } = this.state;

        const url = `${URL}/?_page=${page}&_limit=${limit}`;

        axios.get(url)
        // .then(response => response.json())
        .then(response => 
            this.setState(
                {
                    pokemons: response.data
                    // isLoading: false
                    // totalPages: response.totalPages
                }
            )
        )
    }

    loadMorePokemons = () => {
        this.setState(
            {
                limit: this.state.limit + 6
            }
        )        
        this.getPokemonsData();
    }

    handleScroll = () => {
        let lastLi = document.querySelector('ul > div > li:last-child');
        // console.log(lastLi);
        
        let lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
        // console.log(lastLiOffset);

        let pageOffset = window.pageYOffset + window.innerHeight;
        // console.log(pageOffset);
                
        if (pageOffset > lastLiOffset) {
            this.loadMorePokemons();
        }
    }

    render() {
        // let { isLoading } = this.state;

        // if (!isLoading) {
        //     return <h2>Loading...</h2>
        // } else {
            return (
                <>
               
                    <ul
                        className='container'>

                        <div
                            className='scroll'
                            // dataLength={this.state.pokemons.length}
                            // next={this.getPokemonsData}
                            // hasMore={this.state.hasMore}
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
                        
                        </div>   

                    </ul>

                    <button onClick={e => {
                        this.loadMorePokemons();
                    }}>
                        Load More Pokemons
                    </button>

                </>
                
            );
        // }
    }
}

HomePage.propTypes = {
    isLoading: PropTypes.bool,
    hasMore: PropTypes.bool,
    pokemons: PropTypes.array
};

export default HomePage;