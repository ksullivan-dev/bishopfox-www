import React from 'react';
import { jsonToFormData } from '../utilities';
import { requester } from '../utilities/apiUtils';
import Input from '../shared/input';

const ImportScan = () => {
  const handleSubmit = async formData => {
    const form_data = jsonToFormData(formData);
    const url = 'http://localhost:3000/import';
    const response = await requester({
      url,
      body: form_data,
      noContentType: true
    });
    console.log(response);
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

export default ImportScan;
