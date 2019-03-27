// react libraries
import * as React from 'react';

// third party libraries
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from '../routes';

const App = () => (
  <div>
    <Router>
      <Switch>
        {Routes.map(route => (
          <Route exact={route.exact} path={route.path}
                 component={route.component} key={route.path}/>
        ))}
      </Switch>
    </Router>
  </div>
);

export default App;
