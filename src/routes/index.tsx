// react libraries
import * as React from 'react';

// third party packages
import { Route, Switch } from 'react-router-dom';

// components
import HomePage from 'pages/HomePage';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomePage}/>
    </Switch>
);

export default Routes;
