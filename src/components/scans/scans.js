import React, { useEffect, useState } from 'react';
import { Header, Segment } from 'semantic-ui-react';

import { requester, API_SCANS } from 'utilities/apiUtils';
import Loader from 'shared/loading';

import RecentScans from 'components/scans/recentScans';
import ImportScan from 'components/scans/importScan';
import EmptyScans from 'components/scans/emptyScan';

const Scans = () => {
  const [loading, updateLoading] = useState({
    status: true,
    text: 'Fetching Scans...'
  });
  const [scans, updateScans] = useState([]);
  const [loaded, updateLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = API_SCANS;
      const result = await requester({ url, method: 'GET' });
      updateLoaded(true);
      updateLoading({ status: false });
      updateScans(result.scans);
    };
    const timer = setTimeout(() => fetchData(), 400);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const noScans = !scans.length && loaded;
  const hasScans = scans.length > 0 && loaded;
  return (
    <>
      <div className="header-section" data-testid="single-scan">
        <Header content="Recent Scans" as="h2" />
      </div>
      <Loader
        loading={loading.status}
        loadingProps={{ size: 'huge', content: loading.text }}
      >
        <Segment secondary textAlign="center" padded="very">
          {noScans && (
            <EmptyScans>
              <ImportScan updateLoading={updateLoading} />
            </EmptyScans>
          )}
          {hasScans && <RecentScans scans={scans} />}
        </Segment>
        {hasScans && <ImportScan updateLoading={updateLoading} />}
      </Loader>
    </>
  );
};

export default Scans;
