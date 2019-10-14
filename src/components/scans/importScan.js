import React from 'react';
import PropTypes from 'prop-types';
import { jsonToFormData } from '../../utilities';
import { useAfterSubmit as afterSubmit } from '../../utilities/hooks';
import { requester } from '../../utilities/apiUtils';
import Input from '../../shared/input';

const ImportScan = ({ updateLoading }) => {
  const callback = () => {
    updateLoading({ status: false });
  };
  const errback = response => {
    updateLoading({ status: false });
    console.log(response);
  };
  const handleSubmit = async formData => {
    updateLoading({ status: true, text: 'Processing Scan...' });
    const form_data = jsonToFormData(formData);
    const url = 'http://localhost:3000/import';
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
    <Input
      inputType="file"
      name="importScan"
      label="Import Scan"
      onChange={handleFile}
      id="import-scan"
      accept=".xml"
    />
  );
};

const { func } = PropTypes;
ImportScan.propTypes = {
  updateLoading: func
};

export default ImportScan;
