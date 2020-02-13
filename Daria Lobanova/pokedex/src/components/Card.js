import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeButton } from '../store/actions';

import { store } from '../index';

const URL = 'http://localhost:3333/pokemons';
const options = {
    hour: 'numeric',
    minute: 'numeric'
}

class Card extends React.Component {
 
    getBoolean = (obj) => {        
        for (let catched in obj) {
            for (let num in obj[catched]) {
                if (this.props.id === obj[catched][num].id) {
                    return obj[catched][num].isCatched;
                }
            } 
        }        
    }

    getDate = (obj) => {
        for (let catched in obj) {
            for (let num in obj[catched]) {
                if (this.props.id === obj[catched][num].id) {                    
                    return obj[catched][num].date;
                }
            } 
        }
    }

    updateDB = (id, date) => {
        if (id > 0) {
            axios.patch(`${URL}/${id}`, {
                date: date,
                isCatched: true
            })
            .catch(error => {
                console.log(error);                
            })
        }              
    }

    getPicture = (id) => {
        this.src = `http://localhost:3300/pokemons/${id}.png`;
        return this.src;
    }

    render() {
        const { changeButton } = this.props;
        const id = this.props.id;  
        const name = this.props.name;

        return(
            <div
                className='pokemon text-monospace'>

                <Link to={`/pokemon/${id}`}>
                    
                    <p className='pokemon_name'>
                            {name}
                    </p>

                    <img 
                        className='pokemon_image'
                        src={this.getPicture(id)}
                        onError={(e) => {
                            e.target.onError = null;
                            e.target.src = 'https://via.placeholder.com/250.png?text=Pokemon+Not+Found';
                        }}
                        alt={'Pokemon'}
                    />

                </Link> 

                <button
                    className='btn-default pokemon_catch'
                    onClick={() => {   
                        let date = new Date();
                                                    
                        changeButton(id, name, true, date.toLocaleDateString(undefined, options)); 
                        this.updateDB(id, date.toLocaleDateString(undefined, options));                                             
                    }} 
                    disabled={this.getBoolean(store.getState())}>
                    {
                        this.getBoolean(store.getState())
                            ?   'CATCHED'
                            :   'CATCH'             
                    }
                </button>

                <div
                    className='date text-center text-muted'>
                    {this.getDate(store.getState())}
                </div>                           

            </div>
        );
    }
}

Card.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string
};

const putStateProps = (state) => {
    return {
        catched: state.catched
    };
};

const putActionToProps = (dispatch) => {
    return {
        changeButton: bindActionCreators(changeButton, dispatch)
    }
};

export default connect(putStateProps, putActionToProps)(Card);