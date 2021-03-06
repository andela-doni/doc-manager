import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './route.jsx';
import configureStore from './store/store';

require('../styles/main.scss');


const store = configureStore();
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  global.document.getElementById('app')
);
