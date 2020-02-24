import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers/index';

export const middlewares = [ReduxThunk];

export const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export const sore = createStoreWithMiddleware(rootReducer);

export default createStore(rootReducer, applyMiddleware(logger));



