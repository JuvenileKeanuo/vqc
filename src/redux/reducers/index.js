import { combineReducers } from 'redux';
import hello from './hello';
import text from './text';

export default combineReducers({ hello, text });
