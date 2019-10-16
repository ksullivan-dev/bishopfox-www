import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Scans from 'components/scans/scans';
import Scan from 'components/scans/scan';
import NotFound from 'components/notFound';

const Main = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Scans />
      </Route>
      <Route path="/scans" exact>
        <Scans />
      </Route>
      <Route path="/scans/:id" exact>
        <Scan />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Main;
