import React, { useEffect, useState } from 'react';
import { Header } from 'semantic-ui-react';

import { requester } from '../../utilities/apiUtils';
import Loader from '../../shared/loading';

import RecentScans from './recentScans';
import ImportScan from './importScan';

const Scans = () => {
  const [loading, updateLoading] = useState({
    status: true,
    text: 'Fetching Scans...'
  });
  const [scans, updateScans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://localhost:3000/import';
      const result = await requester({ url, method: 'GET' });
      setTimeout(() => {
        updateLoading({ status: false });
        updateScans(result.scans);
      }, 400);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header content="Recent Scans" as="h2" />
      <Loader
        loading={loading.status}
        loadingProps={{ size: 'huge', content: loading.text }}
      >
        <RecentScans scans={scans} />
        <br />
        <ImportScan updateLoading={updateLoading} />
      </Loader>
    </>
  );
};

export default Scans;
