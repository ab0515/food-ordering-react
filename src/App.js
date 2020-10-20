import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Restaurants from './components/Restaurants';
import Menu from './components/Menu';

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
      <Switch>
        <Route exact path="/" component={Restaurants}/>
        <Route path="/:restName" component={Menu} />
      </Switch>
    </Router>
    // <div className={classes.container}>
    //   <Restaurants />
    // </div>
  );
};

export default App;
