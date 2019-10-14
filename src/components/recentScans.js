import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import { requester } from '../utilities/apiUtils';
import Loader from '../shared/loading';
import Flex from '../shared/flex';
import Titler from '../shared/titler';

const RecentScans = () => {
  const [loading, updateLoading] = useState(true);
  const [scans, updateScans] = useState([]);
  const history = useHistory();

  const onClick = (e, obj) => {
    console.log(obj['data-scanid']);
    history.push(`/scans/${obj['data-scanid']}`);
  };

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
    <Loader
      loading={loading}
      loadingProps={{ size: 'huge', content: 'Fetching Scans...' }}
    >
      <Flex spacing="10" wrap>
        {scans.map(scan => (
          <div key={scan.id} flex="auto">
            <Card onClick={onClick} data-scanid={scan.id}>
              <Card.Content>
                <Card.Header
                  content={moment(scan.start_time * 1000).format('MMM D, YYYY')}
                />
                <Card.Meta>
                  <Titler
                    title="Hosts Scanned"
                    // TODO Fix host_up and hosts_down
                    value={scan.host_up + scan.hosts_down}
                    linebreak
                    bold
                  />
                  <Titler
                    title="Hosts Up"
                    // TODO Fix host_up and hosts_down
                    value={scan.host_up.toString()}
                    linebreak
                  />
                  <Titler
                    title="Hosts Down"
                    // TODO Fix host_up and hosts_down
                    value={scan.hosts_down.toString()}
                    linebreak
                  />
                </Card.Meta>
              </Card.Content>
            </Card>
          </div>
        ))}
      </Flex>
    </Loader>
  );
};

export default RecentScans;
