import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddelware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import {getUser} from '../utils/storage'
import * as reducers from './reducers';

const userStorage = getUser();
const loggerMiddleware = createLogger();
const composeEnhancers = composeWithDevTools;

function preloadedState(state = {}) {

    if(userStorage !== null){
    return {
            user: {
                name:       userStorage.name,
                surname:    userStorage.surname,
                tags:       userStorage.tags,
                isRegister: userStorage.isRegister
            },
            ads: [],
            ui: {
                isFetching: false,
                err: null
            },
            detailAd: null,
            
    }
    }else{
        return{
            user: {},
            ads: [],
            ui: {
                isFetching: false,
                err: null
            },
            detailAd: null,
            
            
        }
    }
}
    


export function configureStore() {
    const reducer = combineReducers(reducers);
    // const middlewares = [thunkMiddelware, loggerMiddleware]
    const middlewares = [thunkMiddelware]
    const store = createStore(
            reducer,
            preloadedState(),
            composeEnhancers(applyMiddleware(...middlewares)))
    return store;
}