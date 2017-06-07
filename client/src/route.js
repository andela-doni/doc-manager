import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Landing from './components/pages/Landing.jsx';
import Login from './components/pages/Login.jsx';
import SignUp from './components/pages/SignUp.jsx';
import App from './components/layout/App.jsx';
import Dashboard from './components/pages/Dashboard.jsx';
//eslint-disable-line import/no-named-as-default

export default (
<Route>
 <Route path="/welcome" component={Landing} />
  <Route path="/login" component={Login} />
   <Route path="/signup" component={SignUp} />
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard} />
  </Route>
</Route>
);
