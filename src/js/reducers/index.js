import { combineReducers, createStore } from 'redux';
import calendar from './calendar';

const reducers = combineReducers({calendar});
const store = createStore(reducers);

export default store;
