import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { changeButton } from '../../store/actions/actions';
import { getBoolean } from '../getters'; 
import { getUpdateDB } from '../fetchers';
import store from '../../store/store';
import { OPTIONS } from '../constants';

export class CatchButton extends React.Component {

    render() {
        const { changeButton } = this.props;
        const id = this.props.id;  
        const name = this.props.name;   
      
        return (

            <button
                className='btn btn-dark pokemon_catch'
                onClick={() => {   
                    let date = new Date();                                                    
                    changeButton(id, name, true, date.toLocaleDateString(undefined, OPTIONS));                         
                    getUpdateDB(id, date.toLocaleDateString(undefined, OPTIONS), true);                                             
                }} 
                disabled={Boolean(getBoolean(store.getState().catchedReducer, id))}>
                {
                    getBoolean(store.getState().catchedReducer, id)
                    ?   'CATCHED'
                    :   'CATCH'             
                }
            </button>

        );
    }
}

CatchButton.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    changeButton: PropTypes.func
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

export default connect(mapStateProps, mapActionToProps)(CatchButton);