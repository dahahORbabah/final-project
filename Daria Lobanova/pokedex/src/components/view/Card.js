import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { changeButton } from '../../store/actions/actions';
import { PLACEHOLDER_SMALL } from '../constants';
import { getDate, getPicture } from '../getters';
import store from '../../store/store';
import CatchButton from './CatchButton';

export class Card extends React.Component { 

    render() {
        // const { changeButton } = this.props;
        const id = this.props.id;  
        const name = this.props.name;    
        
        // console.log(this.props);        

        return(
            <article className='pokemon text-monospace' >
                <Link to={`/pokemon/${id}`}>
                    
                    <p className='pokemon_name'>
                        {name}
                    </p>

                    <img 
                        className='pokemon_image'
                        src={getPicture(id, this)}
                        onError={(e) => {
                            // e.target.onError = null;
                            e.target.src = PLACEHOLDER_SMALL;
                        }}
                        alt={'Pokemon'}
                    />

                </Link> 

                <CatchButton 
                    id={id}
                    name={name}
                />

                <div className='date text-center text-muted'>
                    {getDate(store.getState().catchedReducer, id)}
                </div> 

            </article>
        );
    }
}

Card.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    catched: PropTypes.array
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