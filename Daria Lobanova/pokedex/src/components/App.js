import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CatchedPage from './view/CatchedPage';
import HomePage from './view/HomePage';
import PokemonPage from './view/PokemonPage';
import Navbar from './view/Navbar';

class App extends React.Component {
    render() {
        return(
            <Router>
                <Navbar />
                <Route exact path='/' component={HomePage} />
                <Route path='/catched' component={CatchedPage} />
                <Route path='/pokemon/:id' component={PokemonPage} />
            </Router>
        );
    }
}

export default App;