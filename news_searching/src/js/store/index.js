import {createStore, applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import logger from "../middlewares/logger";
import reducer from '../reducers'

const enhancer = applyMiddleware(thunk, logger);

const store = createStore(reducer, {}, enhancer);

//dev only
window.store = store;

export default store