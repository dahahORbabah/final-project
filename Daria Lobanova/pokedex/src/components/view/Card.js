import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { changeButton } from '../../store/actions';
import { OPTIONS, PLACEHOLDER_SMALL } from '../constants';
import { getBoolean, getDate, getPicture } from '../getters';
import { getUpdateDB } from '../fetchers';
import store from '../../store/store';

class Card extends React.Component { 

    render() {
        const { changeButton } = this.props;
        const id = this.props.id;  
        const name = this.props.name;             

        return(
            <div className='pokemon text-monospace' >
                <Link to={`/pokemon/${id}`}>
                    
                    <p className='pokemon_name'>
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
                        getUpdateDB(id, date.toLocaleDateString(undefined, OPTIONS), true);                                             
                    }} 
                    disabled={getBoolean(store.getState().catchedReducer, this.props.id)}>
                    {
                        getBoolean(store.getState().catchedReducer, this.props.id)
                        ?   'CATCHED'
                        :   'CATCH'             
                    }
                </button>

                <div className='date text-center text-muted'>
                    {getDate(store.getState().catchedReducer, this.props.id)}
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
        catched: state.catchedReducer.catched
    };
};

const mapActionToProps = (dispatch) => {
    return {
        changeButton: bindActionCreators(changeButton, dispatch)
    }
};

export default connect(mapStateProps, mapActionToProps)(Card);