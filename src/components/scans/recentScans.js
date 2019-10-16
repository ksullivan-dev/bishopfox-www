import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

import Titler from 'shared/titler';

const RecentScans = ({ scans }) => {
  const history = useHistory();

  const onClick = (e, obj) => history.push(`/scans/${obj['data-scanid']}`);

  return (
    <Card.Group>
      {scans.map(scan => (
        <Card
          onClick={onClick}
          data-testid="scans"
          data-scanid={scan.id}
          key={scan.id}
        >
          <Card.Content>
            <Card.Header
              content={moment(scan.start_time * 1000).format('MMM D, YYYY')}
            />
            <Card.Meta>
              <Titler
                title="Hosts Scanned"
                value={scan.hosts_up + scan.hosts_down}
                linebreak
                bold
              />
              <Titler
                title="Hosts Up"
                value={scan.hosts_up.toString()}
                linebreak
              />
              <Titler
                title="Hosts Down"
                value={scan.hosts_down.toString()}
                linebreak
              />
            </Card.Meta>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};

RecentScans.propTypes = {
  scans: PropTypes.array
};

export default RecentScans;
