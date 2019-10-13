import React from 'react';
import PropTypes from 'prop-types';

const ArrayToString = props => {
  const { children, keys, output } = props;
  let { content } = props;
  if (children) content = children;
  const values = content.map((obj, idx) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={`${idx}temp`}>{output(keys.map(key => obj[key]))}</div>
  ));
  return values;
};

const { node, array } = PropTypes;
ArrayToString.propTypes = {
  content: array,
  children: node
};

export default ArrayToString;
