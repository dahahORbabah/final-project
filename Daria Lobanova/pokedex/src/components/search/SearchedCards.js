import React from 'react';

import { store } from '../../index';

class SearchedCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: store.getState().text
        };

        // this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    // handleFilterTextChange = (filterText) => {
    //     this.setState(
    //         {
    //             filterText:filterText
    //         }
    //     );
    //     console.log(this.state.filterText);
        
    // }

    render() {
        // console.log(this.props);
        
        return (
            <>
                
            </>
        );
    }
}

export default  SearchedCards;