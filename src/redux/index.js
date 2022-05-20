import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import postReducer from './reducers/postReducer'

const rootReducer = combineReducers({
    postReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;