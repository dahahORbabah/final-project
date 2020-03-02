import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import HomePage from './view/HomePage';
import CatchedPage from './view/CatchedPage';
import PokemonPage from './view/PokemonPage';
import NotFoundPage from './view/NotFoundPage';
import Navbar from './view/Navbar';
import store from '../store/store';

class App extends React.Component {
    render() {
        return(
            <Provider store={store}>
                <Router>
                    <Navbar />
                    <Switch>
                        <Route path='/' exact component={HomePage} />
                        <Route path='/catched' component={CatchedPage} />
                        <Route path='/pokemon/:id' component={PokemonPage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;