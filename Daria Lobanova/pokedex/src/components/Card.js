import React from 'react';
import axios from 'axios';
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
        return(
            <div>
                <Link to={`/pokemon/${this.props.id}`}>
                    <h3>{this.props.name}</h3>
                </Link>
                <img 
                    src={this.getPicture(this.props.id)}
                    onError={(e) => {
                        e.target.onError = null;
                        e.target.src = 'https://via.placeholder.com/475.png?text=Pokemon+Not+Found';
                    }}
                    alt={'Pokemon'}
                />
                <button
                    onClick={() => {   
                        let date = new Date();
                                                    
                        changeButton(id, true, date.toLocaleDateString(undefined, options)); 
                        this.updateDB(id, date.toLocaleDateString(undefined, options));                                             
                    }} 
                    disabled={this.getBoolean(store.getState())}>
                    {
                        this.getBoolean(store.getState())
                            ?   'CATCHED'
                            :   'CATCH'             
                    }
                </button>
                <p>
                    Catched date: {this.getDate(store.getState())}
                </p>
                <hr/>
            </div>
        );
    }
}

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