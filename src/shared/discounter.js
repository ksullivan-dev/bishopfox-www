/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';

import { Money } from './textFormatters';

const Discounter = ({
  original,
  discount,
  linebreak = false,
  spacer = false
}) => {
  const origNum = Number(original);
  const discNum = Number(discount);
  const isDiscounted = discNum < origNum;
  return (
    <>
      {isDiscounted ? (
        <>
          <span className="slasher">
            <Money>{origNum}</Money>
          </span>
          {linebreak && <br />}
          {spacer && ' '}
          <Money type="positive">{discNum}</Money>
        </>
      ) : (
        <Money type="positive">{origNum}</Money>
      )}
    </>
  );
};

const { oneOfType, number, string, bool } = PropTypes;
Discounter.propTypes = {
  original: oneOfType([number, string]),
  discount: oneOfType([number, string]),
  linebreak: bool,
  spacer: bool
};

export default Discounter;
