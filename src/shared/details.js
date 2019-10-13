import React from 'react';
import PropTypes from 'prop-types';

import { namespacer, humanize } from '../utilities';
import Flex from './flex';

const Details = ({
  attributes,
  leftWidth,
  fields,
  leftStyles,
  rightStyles
}) => {
  const buildDetails = () => {
    return fields.map(field => {
      const { namespace, name, label, formatter: Formatter, ...rest } = field;
      let value = namespace
        ? namespacer(namespace, attributes)[name]
        : attributes[name];
      if (Formatter) value = <Formatter content={value} />;
      return (
        <Flex {...rest} key={name}>
          <div flex="auto" style={{ width: leftWidth, ...leftStyles }}>
            {label || humanize(name)}
          </div>
          <div flex="fill" style={{ ...rightStyles }}>
            {value}
          </div>
        </Flex>
      );
    });
  };

  return <>{buildDetails()}</>;
};

const { oneOfType, number, string, object, array } = PropTypes;
Details.propTypes = {
  leftWidth: oneOfType([number, string]),
  attributes: object,
  fields: array,
  leftStyles: object,
  rightStyles: object
};

export default Details;
