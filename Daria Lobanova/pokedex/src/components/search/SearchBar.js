import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { changeInput } from '../../store/actions';

class SearchBar extends React.Component {

    render() {
        const { changeInput } = this.props;
        const filterText = this.props.filterText;
        
        return (
            <>
                <input
                    type='text'
                    placeholder='Search for pokemons ...'
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

const mapStateProps = (state) => {           
    return {
        text: state.text
    };
};

const mapActionToProps = (dispatch) => {    
    return {
        changeInput: bindActionCreators(changeInput, dispatch)
    }
};

export default connect(mapStateProps, mapActionToProps)(SearchBar);
