import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

import Scans from './scans/scans';
import Scan from './scans/scan';

const Main = () => {
  return (
    <Switch>
      <Route path="/scans" exact>
        <Scans />
      </Route>
      <Route path="/scans/:id" exact>
        <Scan />
      </Route>
      <Route path="*">
        <Header content="Not Found" />
      </Route>
    </Switch>
  );
};

export default Main;
