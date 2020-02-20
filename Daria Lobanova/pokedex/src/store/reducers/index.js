import { combineReducers } from 'redux';
import catchedReducer from './catchedReducer';
import filterReducer from './filterReducer';

export default combineReducers(
    {
        catchedReducer,
        filterReducer
    }
);