import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Hosts from 'components/hosts/hosts';
import HostDetails from 'components/hosts/hostDetails';

import scan from 'components/scans/__fixtures__/scan';

describe('Hosts tests', () => {
  it('Renders all hosts and open and closes a host', async () => {
    const { getByText, getAllByTestId, queryByTestId } = render(
      <Hosts hosts={scan.hosts} />
    );
    const header = getByText(/Hosts/);
    expect(header).toBeVisible();

    const triggers = getAllByTestId('host-trigger');
    fireEvent.click(triggers[0]);

    const details = () => queryByTestId(`host-details${scan.hosts[0].id}`);
    expect(details()).toBeVisible();

    fireEvent.click(triggers[0]);
    expect(details()).toBeFalsy();
  });

  it('Renders host without a hostname', async () => {
    const host = {
      id: 601,
      scan_id: 16,
      status: 'up',
      reason: 'user-set',
      ip4_addr: '81.107.115.203',
      os: '{"portsused":[],"osclasses":[],"osmatches":[]}',
      hostnames: '[]',
      times_srtt: 178708,
      times_rttvar: 108359,
      times_to: 612144,
      starttime: 1524242214,
      endtime: 1524242216,
      created_at: '2019-10-14T16:52:05.408Z',
      updated_at: '2019-10-14T16:52:05.408Z',
      ports: [
        {
          id: 3001,
          host_id: 601,
          scan_id: null,
          proto: 'tcp',
          num: 80,
          state: 'open',
          reason: 'syn-ack',
          reason_ttl: 0,
          reason_ip: null,
          service_name: 'http',
          service_method: 'table',
          service_conf: 3,
          created_at: '2019-10-14T16:52:05.412Z',
          updated_at: '2019-10-14T16:52:05.412Z'
        }
      ]
    };
    const { queryByText } = render(<HostDetails host={host} />);
    const hostname = queryByText(/Hostname/);
    expect(hostname).toBeFalsy();
  });
});
