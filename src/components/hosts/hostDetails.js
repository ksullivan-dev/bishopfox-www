import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
import moment from 'moment';

import Titler from '../../shared/titler';

const formattedDate = value => {
  return moment(value * 1000).format('HH:mm:ss');
};

const parseArray = value => {
  const data = JSON.parse(value);
  if (Array.isArray(data) && !!data[0]) {
    return data.join(';');
  }
  return '';
};

const details = [
  { title: 'Hostname', name: 'hostnames', formatter: parseArray },
  { title: 'IP4 Address', name: 'ip4_addr' },
  { title: 'Scan Start', name: 'starttime', formatter: formattedDate },
  { title: 'Scan End', name: 'endtime', formatter: formattedDate }
];

const HostDetails = ({ host = {} }) => {
  return (
    <>
      <Header content="Details" as="h4" />
      {details.map(({ title, name, formatter }) => {
        let value = host[name];
        if (formatter) value = formatter(value);
        return <Titler key={name} title={title} value={value} bold linebreak />;
      })}
    </>
  );
};

HostDetails.propTypes = {
  host: PropTypes.object
};

export default HostDetails;
