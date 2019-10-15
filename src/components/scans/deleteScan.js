import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button, Confirm } from 'semantic-ui-react';

import { requester, afterSubmit } from 'utilities/apiUtils';

const DeleteScan = ({ scan }) => {
  const { id } = scan;
  const [open, setOpen] = useState(false);
  const deleteScan = async () => {
    const url = `http://localhost:3000/import/${id}`;
    const response = await requester({ url, method: 'DELETE' });
    afterSubmit(response);
  };
  const showConfirm = () => setOpen(true);
  const closeConfirm = () => setOpen(false);
  return (
    <>
      <br />
      <Button content="Delete Scan" onClick={showConfirm} negative />
      <Confirm
        data-testid="test_show-confirm"
        header={`Delete scan from ${moment(scan.start_time * 1000).format(
          'MMM D, YYYY'
        )}`}
        open={open}
        onCancel={closeConfirm}
        onConfirm={deleteScan}
        size="mini"
        content="This action cannot be undone. Please confirm that you do want to delete this scan."
        confirmButton={{
          content: 'Delete Scan',
          negative: true,
          primary: false,
          'data-testid': 'test_actually-delete'
        }}
      />
    </>
  );
};

DeleteScan.propTypes = {
  scan: PropTypes.object
};

export default DeleteScan;
