import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './components/hoc/auth';

import Restaurants from './components/view/Restaurants';
import NavBar from './components/NavBar';
import Signup from './components/user/Signup';
import Login from './components/user/Login';

const App = () => {
  return (
    <Router>
      {/* <NavBar /> */}
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/" component={Auth(Restaurants)}/> */}
        <Route component={ProtectedLayout} />
      </Switch>
    </Router>
  );
};

const ProtectedLayout = () => (
  <div>
    <NavBar />
    <Route exact path="/" component={Auth(Restaurants)}></Route>
  </div>
);

export default App;
