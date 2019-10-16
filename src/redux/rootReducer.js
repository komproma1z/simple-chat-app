import { combineReducers } from 'redux';
import { chatReducer } from '../store/reducer';

export default () => combineReducers({
    chatReducer,
});
