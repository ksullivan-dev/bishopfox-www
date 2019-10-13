import React from 'react';
import PropTypes from 'prop-types';

import { callMeDanger } from '../utilities';

const Titler = ({ title, value, linebreak, bold }) => {
  if (!value) return null;
  return (
    <>
      {bold && callMeDanger(`<strong>${title}</strong>: ${value}`)}
      {!bold && `${title}: ${value}`}
      {linebreak && <br />}
    </>
  );
};

const { string, bool, number, oneOfType } = PropTypes;
Titler.propTypes = {
  title: string,
  value: oneOfType([string, number]),
  linebreak: bool,
  bold: bool
};

export default Titler;
