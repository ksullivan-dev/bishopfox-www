import React from 'react';
import PropTypes from 'prop-types';
import { Header, Icon } from 'semantic-ui-react';

import styles from 'stylesheets/variables.scss';

import { callMeDanger } from 'utilities';

const EmptyScans = ({ children }) => {
  const paraStyles = {
    maxWidth: 400,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 18
  };
  const iconStyles = { color: styles.darkgray };
  return (
    <>
      <Icon name="file alternate" size="huge" style={iconStyles} />
      <Header as="h2" content="Oh No!" />
      <p style={paraStyles}>
        {callMeDanger(
          `It looks like you haven't uploaded any scans. Import one below to get started.`
        )}
      </p>
      {children}
    </>
  );
};
EmptyScans.propTypes = {
  children: PropTypes.node
};

export default EmptyScans;
