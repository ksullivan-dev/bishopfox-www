import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Segment } from 'semantic-ui-react';
import { callMeDanger } from '../utilities';

const RecentScans = ({ scans }) => {
  return (
    <>
      {scans.map(scan => (
        <Segment key={scan.id}>
          {callMeDanger(
            `Scan from ${moment(scan.start_time * 1000).format('MMM D, YYYY')}`
          )}
        </Segment>
      ))}
    </>
  );
};

RecentScans.propTypes = {
  scans: PropTypes.array
};

export default RecentScans;
