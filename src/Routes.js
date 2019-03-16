import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Home from './Home';
import Suggestion from './components/Suggestion';

const customHistory = createBrowserHistory();
const Routes = () => {
  return(
    <Router history={customHistory}>
      <div className={'routes'}>
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/search/:query' exact component={Suggestion}></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;

