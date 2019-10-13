import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';

const Loading = ({
  loading = true,
  loadingProps = {},
  children,
  container = true
}) => {
  let className = container ? 'loader-container' : '';
  className += container && loading ? '--active' : '';
  return (
    <div className={className}>
      <Dimmer inverted active={loading}>
        <Loader {...loadingProps} />
      </Dimmer>
      {children}
    </div>
  );
};

const { bool, object, node } = PropTypes;
Loading.propTypes = {
  loading: bool,
  loadingProps: object,
  children: node,
  container: bool
};

export default Loading;
