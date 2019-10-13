import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header, Segment } from 'semantic-ui-react';

import RecentScans from './recentScans';

const Main = () => {
  return (
    <Segment>
      <Switch>
        <Route path="/scans">
          <Header content="Recent Scans" as="h2" />
          <RecentScans />
        </Route>
        <Route path="*">
          <Header content="Not Found" />
        </Route>
      </Switch>
    </Segment>
  );
};

export default Main;
