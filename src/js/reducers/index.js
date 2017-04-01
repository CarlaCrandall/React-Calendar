import { combineReducers } from 'redux';
import calendar from './calendar';
import events from './events';

const reducers = combineReducers({calendar, events});

export default reducers;
