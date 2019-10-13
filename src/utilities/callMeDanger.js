import React from 'react';

const callMeDanger = (template, el = 'span') =>
  React.createElement(el, { dangerouslySetInnerHTML: { __html: template } });

export default callMeDanger;
