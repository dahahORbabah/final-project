import React from 'react';
import { NavLink } from 'react-router-dom';

import SearchBar from '../search/SearchBar';

class Navbar extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            inputValue: '' 
        }
    }

    handleInputChange = (inputValue) => {
        this.setState(
            {
                inputValue: inputValue
            }
        )
    }

    render() {
        const inputValue = this.state.inputValue;

        return (
            <ul
                className='navbar fixed-top navbar-dark bg-dark'>
                <li>
                    <NavLink 
                        className='badge badge-primary'
                        to='/'>
                            Home Page
                    </NavLink>
                </li>
                <li>
                    <SearchBar
                        filterText={inputValue}
                        onFilterTextChange={this.handleInputChange}
                    />
                </li>
                <li>
                    <NavLink
                        className='badge badge-secondary' 
                        to='/catched'>
                            Catched Page
                    </NavLink>
                </li>
            </ul>
        )
    }
}

export default Navbar;