import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CatchedPage from './pages/CatchedPage';
import HomePage from './pages/HomePage';
import PokemonPage from './pages/PokemonPage';
import Navbar from './Navbar';

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