import { combineReducers } from 'redux';
import catchedReducer from './catchedReducer';
import filterReducer from './filterReducer';

const rootReducer = combineReducers(
    {
        catchedReducer,
        filterReducer
    }
);

export default rootReducer;