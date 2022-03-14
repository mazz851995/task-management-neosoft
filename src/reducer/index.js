import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    userReducer, taskReducer
});

export default rootReducer