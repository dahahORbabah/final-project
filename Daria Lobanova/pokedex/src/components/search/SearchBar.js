import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { changeInput } from '../../store/actions/actions';

export class SearchBar extends React.Component {

    render() {
        const { changeInput } = this.props;
        const filterText = this.props.filterText;
        
        return (
            <>
                <input
                    className='form-control'
                    type='text'
                    placeholder='Search'
                    value={filterText}
                    onChange={
                        (event) => {
                        this.props.onFilterTextChange(event.target.value);
                        changeInput(event.target.value);                                           
                    }
                }
                />
            </>
        );
    }
}

SearchBar.propTypes = {
    filterText: PropTypes.string
};

const mapStateProps = (state) => {           
    return {
        filterText: state.filterText
    };
};

const mapActionToProps = (dispatch) => {    
    return {
        changeInput: bindActionCreators(changeInput, dispatch)
    }
};

export default connect(mapStateProps, mapActionToProps)(SearchBar);
