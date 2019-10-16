import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

import { jsonToFormData } from 'utilities';
import { requester, afterSubmit, API_SCANS } from 'utilities/apiUtils';

import Input from 'shared/input';

const ImportScan = ({ updateLoading }) => {
  const callback = () => updateLoading({ status: false });
  const errback = () => updateLoading({ status: false });
  const handleSubmit = async formData => {
    updateLoading({ status: true, text: 'Processing Scan...' });
    const form_data = jsonToFormData(formData);
    const url = API_SCANS;
    const response = await requester({
      url,
      body: form_data,
      noContentType: true
    });

    afterSubmit(response, callback, errback);
  };

  const handleFile = async e => {
    const { files } = e.target;
    if (files.length > 0) {
      handleSubmit({ imported_file: files[0] });
    }
  };

  return (
    <Form>
      <Input
        inputType="file"
        name="importScan"
        label="Import Scan"
        onChange={handleFile}
        id="import-scan"
        accept=".xml"
      />
    </Form>
  );
};

const { func } = PropTypes;
ImportScan.propTypes = {
  updateLoading: func
};

export default ImportScan;
