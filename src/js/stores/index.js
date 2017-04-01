import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const store = createStore(reducers, applyMiddleware(apiMiddleware, thunk));

export default store;
