import { combineReducers, createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';

import calendar from './calendar';
import events from './events';

const reducers = combineReducers({calendar, events});
const store = createStore(reducers, applyMiddleware(apiMiddleware, thunk));

export default store;
