import { useState } from 'react';

import namespacer from '../fieldNamespacer';

const useHandleInput = initialValues => {
  const [details, updateDetails] = useState(initialValues);

  const handleInputChange = (event, { value, name, checked, ...rest }) => {
    const newdetails = { ...details };
    if (name === '') return;
    const val = value || checked;
    if (rest['data-namespace']) {
      namespacer(rest['data-namespace'], newdetails)[name] = val || '';
    } else {
      newdetails[name] = val || '';
    }
    updateDetails(newdetails);
  };

  return {
    handleInputChange,
    details,
    updateDetails
  };
};

export default useHandleInput;
