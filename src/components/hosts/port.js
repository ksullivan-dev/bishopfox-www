import React from 'react';
import PropTypes from 'prop-types';

import Titler from 'shared/titler';

const details = [
  { title: 'Port Number', name: 'num' },
  { title: 'Proto', name: 'proto' },
  { title: 'Service', name: 'service_name' },
  { title: 'Reason', name: 'reason' },
  { title: 'State', name: 'state' }
];

const Port = ({ port }) => {
  return (
    <div className={`port port--${port.state}`}>
      {details.map(({ title, name }) => {
        const value = port[name];
        return <Titler key={name} title={title} value={value} bold linebreak />;
      })}
    </div>
  );
};

Port.propTypes = {
  port: PropTypes.object
};

export default Port;
