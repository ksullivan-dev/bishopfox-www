import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header, Segment } from 'semantic-ui-react';

import Scans from './scans';
import Scan from './scan';

const Main = () => {
  return (
    <Segment>
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
    </Segment>
  );
};

export default Main;
