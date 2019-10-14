import React, { useEffect, useState } from 'react';
import { Header } from 'semantic-ui-react';

import { requester } from '../utilities/apiUtils';
import Loader from '../shared/loading';

import RecentScans from './recentScans';
import ImportScan from './importScan';

const Scans = () => {
  const [loading, updateLoading] = useState(true);
  const [scans, updateScans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://localhost:3000/import';
      const result = await requester({ url, method: 'GET' });
      setTimeout(() => {
        updateLoading(false);
        updateScans(result.scans);
      }, 400);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header content="Recent Scans" as="h2" />
      <Loader
        loading={loading}
        loadingProps={{ size: 'huge', content: 'Fetching Scans...' }}
      >
        <RecentScans scans={scans} />
        <br />
        <ImportScan updateScans={updateScans} updateLoading={updateLoading} />
      </Loader>
    </>
  );
};

export default Scans;
