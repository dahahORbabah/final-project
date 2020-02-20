import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './view/HomePage';
import CatchedPage from './view/CatchedPage';
import PokemonPage from './view/PokemonPage';
import NotFoundPage from './view/NotFoundPage';
import Navbar from './view/Navbar';

class App extends React.Component {
    render() {
        return(
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/catched' component={CatchedPage} />
                    <Route path='/pokemon/:id' component={PokemonPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </Router>
        );
    }
}

export default App;