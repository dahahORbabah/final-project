import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { changeButton } from '../../store/actions';
import { URL, OPTIONS, PLACEHOLDER_SMALL } from '../constants';
import { getBoolean, getDate, getPicture } from '../getters';
import store from '../../store/store';

class Card extends React.Component { 

    updateDB = (id, date) => {
        if (id > 0) {
            axios.patch(`${URL}/${id}`, {
                date: date,
                isCatched: true
            })
            .catch(error => console.error(error))
        }              
    }

    render() {
        const { changeButton } = this.props;
        const id = this.props.id;  
        const name = this.props.name;             

        return(
            <div
                className='pokemon text-monospace'                
                >

                <Link 
                    to={`/pokemon/${id}`}
                >
                    
                    <p 
                        className='pokemon_name'>
                            {name}
                    </p>

                    <img 
                        className='pokemon_image'
                        src={getPicture(id, this)}
                        onError={(e) => {
                            e.target.onError = null;
                            e.target.src = PLACEHOLDER_SMALL;
                        }}
                        alt={'Pokemon'}
                    />

                </Link> 

                <button
                    className='btn-default pokemon_catch'
                    onClick={() => {   
                        let date = new Date();
                                                    
                        changeButton(id, name, true, date.toLocaleDateString(undefined, OPTIONS));                         
                        this.updateDB(id, date.toLocaleDateString(undefined, OPTIONS));                                             
                    }} 
                    disabled={getBoolean(store.getState(), this.props.id)}>
                    {
                        getBoolean(store.getState(), this.props.id)
                            ?   'CATCHED'
                            :   'CATCH'             
                    }
                </button>

                <div
                    className='date text-center text-muted'>
                    {getDate(store.getState(), this.props.id)}
                </div> 

            </div>
        );
    }
}

Card.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string
};

const mapStateProps = (state) => {     
    return {
        catched: state.catched,
        text: state.text
    };
};

const mapActionToProps = (dispatch) => {
    return {
        changeButton: bindActionCreators(changeButton, dispatch)
    }
};

export default connect(mapStateProps, mapActionToProps)(Card);