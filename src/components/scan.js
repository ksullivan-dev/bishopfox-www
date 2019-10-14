import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';
import Titler from '../shared/titler';
import Loader from '../shared/loading';
import { requester } from '../utilities/apiUtils';
import { useAfterSubmit as afterSubmit } from '../utilities/hooks';

const Scan = () => {
  const { id } = useParams();
  const [loading, updateLoading] = useState(true);
  const [scan, updateScan] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:3000/import/${id}`;
      const result = await requester({ url, method: 'GET' });
      setTimeout(() => {
        updateLoading(false);
        updateScan(result);
      }, 400);
    };
    fetchData();
  }, [id]);
  const deleteScan = async () => {
    const url = `http://localhost:3000/import/${id}`;
    const response = await requester({ url, method: 'DELETE' });
    afterSubmit(response);
  };
  return (
    <>
      <Loader
        loading={loading}
        loadingProps={{ size: 'huge', content: 'Populating Results...' }}
      >
        {console.log(scan)}
        {scan && (
          <>
            <Header
              content={`Scan from ${moment(scan.start_time * 1000).format(
                'MMM D, YYYY'
              )}`}
              as="h2"
            />
            <Titler
              title="Hosts Scanned"
              value={(scan.hosts_up + scan.hosts_down).toString()}
              bold
              linebreak
            />
            <Titler
              title="Hosts Up"
              value={scan.hosts_up.toString()}
              bold
              linebreak
            />
            <Titler
              title="Hosts Down"
              value={scan.hosts_down.toString()}
              bold
              linebreak
            />
            <div>This will be an individual scan</div>
            <br />
            <Button content="Delete Scan" onClick={deleteScan} negative />
          </>
        )}
      </Loader>
    </>
  );
};

export default Scan;
