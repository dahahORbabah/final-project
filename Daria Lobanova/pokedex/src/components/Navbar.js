import React from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component {
    render() {
        return (
            <ul>
                <li>
                    <NavLink to='/'>Home Page</NavLink>
                </li>
                <li>
                    <NavLink to='/catched'>Catched Page</NavLink>
                </li>
            </ul>
        )
    }
}

export default Navbar;