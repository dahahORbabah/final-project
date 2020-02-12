import React from 'react';
import PropTypes from 'prop-types';
// import InfiniteScroll from 'react-infinite-scroll-component';
import { store } from '../../index';
import { Helmet } from 'react-helmet';

import Card from '../Card';

class CatchedPage extends React.Component {   

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            hasMore: true,
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
            return <h2>Loading...</h2>
        } else {
            return (
                <ul
                    className='container'>

                    <Helmet title='Pokédex | Catched' />

                    {/* <InfiniteScroll
                        className='scroll'
                        dataLength={this.state.catchedPokemons.length}
                            // {
                            //     store === undefined
                            //     ?   0
                            //     :   store.getState().catched.length
                            // }   
                        next={this.getPokemonsData}
                        hasMore={this.state.hasMore}
                    > */}                     
                        
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

                    {/* </InfiniteScroll>  */}
                </ul>
            )
        }
    }
}

CatchedPage.propTypes = {
    isLoading: PropTypes.bool,
    hasMore: PropTypes.bool,
    catchedPokemons: PropTypes.arrayOf(PropTypes.object)
};

export default CatchedPage;