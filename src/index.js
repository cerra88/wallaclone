import React from 'react';
import { render } from 'react-dom';
//import './style.css';
import App from './App.js'
import {configureStore} from './store/index';
// import api from "./utils/api";


const store = configureStore();


store.subscribe(() => store.getState())


render(<App store={store}/>, document.getElementById('root'));


