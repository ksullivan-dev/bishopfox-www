import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

import Titler from '../../shared/titler';
import Loader from '../../shared/loading';

import { requester } from '../../utilities/apiUtils';

import DeleteScan from './deleteScan';
import Hosts from '../hosts/hosts';

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
  return (
    <>
      <Header as="h2" content="Scan Results" />
      <Loader
        loading={loading}
        loadingProps={{ size: 'huge', content: 'Populating Results...' }}
      >
        {scan && (
          <>
            <Header
              content={moment(scan.start_time * 1000).format('MMM D, YYYY')}
              as="h3"
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
            <Hosts hosts={scan.hosts} />
            <DeleteScan scan={scan} />
          </>
        )}
      </Loader>
    </>
  );
};

export default Scan;
