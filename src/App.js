import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, /*combineReducers,*/ applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import { initialize } from './actions/';
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
  composeEnhancers(applyMiddleware(routerHistoryMiddleware, thunkMiddleware))
);
const ConnectedApp = connect(
  null,
  { initialize }
)(
  class ConnectedApp extends Component {
    componentDidMount() {
      this.props.initialize();
    }

    render() {
      return (
        <div className="app">
          <header>
            <h1>Dolce gusto</h1>
            <CurrentUser />
          </header>
          <main>
            <Dashboard />
          </main>
          <footer>footer</footer>
        </div>
      );
    }
  }
);

const App = () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);

export default App;
