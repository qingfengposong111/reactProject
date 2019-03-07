import {createStore,  applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import counterReducer from '../reducers/counter'
let store = createStore(counterReducer,applyMiddleware(thunk));
export default store;