import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import Flex from '../shared/flex';
import Titler from '../shared/titler';

const RecentScans = ({ scans = [] }) => {
  const history = useHistory();

  const onClick = (e, obj) => {
    history.push(`/scans/${obj['data-scanid']}`);
  };

  return (
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
  );
};

RecentScans.propTypes = {
  scans: PropTypes.array
};

export default RecentScans;
