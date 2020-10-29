import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Dashboard from './components/Dashboard';
import Restaurants from './components/Restaurants';
import Menu from './components/Menu';
import NavBar from './components/NavBar';
import Cart from './components/Cart';
import Admin from './components/admin/Admin';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Restaurants}/>
        {/* <Route exact path="/" component={Dashboard} /> */}
        {/* <Route path="/admin" component={Admin} /> */}
        {/* <Route path="/restaurants" component={Restaurants} /> */}
        <Route path="/restaurant/:restName" component={Menu} />
        <Route path="/cart" component={Cart} />
      </Switch>
    </Router>
    // <div className={classes.container}>
    //   <Restaurants />
    // </div>
  );
};

export default App;
