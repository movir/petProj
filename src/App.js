import React from 'react';
import { Provider } from 'react-redux';
import { createStore, /*combineReducers,*/ applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import reducer from './reducers/';

import './App.scss';
import Dashboard from './components/dashboard/';
import CurrentUser from './components/users/user';

const history = createHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const routerHistoryMiddleware = routerMiddleware(history);

const store = createStore(
    //combineReducers({}),
    reducer,
    composeEnhancers(
        applyMiddleware(routerHistoryMiddleware, thunkMiddleware),
    )
);

const App = () => (
    <Provider store={store}>
        <div className="app">
            <header>
                <h1>Dolce gusto</h1>
                <CurrentUser />
            </header>
            <main>
                <Dashboard />
            </main>
            <footer>
                footer
            </footer>
        </div>
    </Provider>
);

export default App;
