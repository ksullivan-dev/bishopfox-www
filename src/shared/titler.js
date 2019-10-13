import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable */
import { callMeDanger } from "utilities";
/* eslint-enable */

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

const { string, bool } = PropTypes;
Titler.propTypes = {
  title: string,
  value: string,
  linebreak: bool,
  bold: bool
};

export default Titler;
