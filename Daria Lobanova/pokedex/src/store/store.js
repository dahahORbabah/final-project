import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

// import rootReducer from './reducers/index';
import { rootReducer } from './reducers/reducers';

const store = createStore(rootReducer, applyMiddleware(logger));
// console.log(store.getState());

// store.subscribe(() => {
//     console.log('Store updated: ' + store.getState());
    
// })

export default store;
