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
                    onChange={(event) => {
                        this.props.onFilterTextChange(event.target.value);                       // console.log(event.target.value);
                        changeInput(event.target.value);                                           
                    }}
                />
            </>
        );
    }
}

const putStateProps = (state) => {           
    return {
        text: state.text
    };
};

const putActionToProps = (dispatch) => {    
    return {
        changeInput: bindActionCreators(changeInput, dispatch)
    }
};

export default connect(putStateProps, putActionToProps)(SearchBar);
