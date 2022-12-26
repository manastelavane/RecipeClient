import React from 'react';
// import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import {  applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';


import { reducers } from './reducers';
const store = configureStore({reducer:reducers}, compose(applyMiddleware(thunk)));
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </>
);

