import React, { useEffect, useState } from 'react';
import { Header, Loader, Dimmer, Segment } from 'semantic-ui-react';

import RecentScans from './components/recentScans';
import { requester } from './utilities/apiUtils';

function App() {
  const [loading, updateLoading] = useState(true);
  const [scans, updateScans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://localhost:3000/import';
      const result = await requester({ url, method: 'GET' });
      updateLoading(false);
      updateScans(result.scans);
    };
    fetchData();
  }, []);
  return (
    <div className="width-wrapper">
      <Segment>
        <Dimmer inverted active={loading}>
          <Loader size="huge" />
        </Dimmer>
        <Header content="Recent Scans" as="h2" />
        <RecentScans scans={scans} />
      </Segment>
    </div>
  );
}

export default App;
