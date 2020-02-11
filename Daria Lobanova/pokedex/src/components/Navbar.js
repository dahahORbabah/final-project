import React from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component {
    render() {
        return (
            <ul
                className='navbar fixed-top navbar-dark bg-dark'>
                <li>
                    <NavLink 
                        className='badge badge-primary'
                        to='/'>Home Page</NavLink>
                </li>
                <li
                    className='title'>
                        <h3>P O K E M O N S</h3>
                </li>
                <li>
                    <NavLink
                        className='badge badge-secondary' 
                        to='/catched'>Catched Page</NavLink>
                </li>
            </ul>
        )
    }
}

export default Navbar;