import React, { useState } from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';

import styles from 'stylesheets/variables.scss';

import { callMeDanger } from 'utilities';

import Loader from 'shared/loading';

import ImportScan from 'components/scans/importScan';

const NotFound = () => {
  const [loading, updateLoading] = useState({
    status: false
  });
  const paraStyles = {
    maxWidth: 400,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 18
  };
  const iconStyles = { color: styles.darkgray };
  return (
    <>
      <div className="header-section">
        <Header content="Page Not Found" as="h2" />
      </div>
      <Loader
        loading={loading.status}
        loadingProps={{ size: 'huge', content: loading.text }}
      >
        <Segment secondary textAlign="center" padded="very">
          <Icon name="file alternate" size="huge" style={iconStyles} />
          <Header as="h2" content="Oh No!" />
          <p style={paraStyles}>
            {callMeDanger(
              `I couldn't find what you were looking for. But maybe you wanted
               to upload a scan. Or <a href="/">view your existing scans</a>.`
            )}
          </p>
          <ImportScan updateLoading={updateLoading} />
        </Segment>
      </Loader>
    </>
  );
};

export default NotFound;
