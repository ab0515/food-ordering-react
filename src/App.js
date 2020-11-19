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
      <NavBar />
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Auth(Restaurants)}/>
      </Switch>
    </Router>
  );
};

export default App;
