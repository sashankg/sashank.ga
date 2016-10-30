import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import contents from './contentsReducer';
import openProject from './openProjectReducer';

export default combineReducers({
    routing: routerReducer,
    contents,
    openProject,
});
