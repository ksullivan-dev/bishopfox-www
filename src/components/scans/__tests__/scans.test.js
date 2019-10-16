import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render, waitForElement } from '@testing-library/react';

import { mockFetchPromise } from 'utilities/apiUtils';
import Main from 'components/main';

describe('Main Switch tests', () => {
  it('Renders the Scans page', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/scans']}>
        <Main />
      </MemoryRouter>
    );
    const header = getByText(/Recent Scans/);
    expect(header).toBeVisible();
  });

  test('Renders the scan page and fetches the scans', async () => {
    const fakeResponse = {
      message: 'This is a message',
      scans: [
        {
          start_time: 1524242214,
          stop_time: 1524242216,
          exit: 'success',
          errormsg: null,
          hosts_up: 40,
          hosts_down: 0,
          id: '1'
        }
      ]
    };
    const result = () => mockFetchPromise({ fakeResponse });
    global.fetch = jest.fn().mockImplementation(() => result());
    const { getByText, getByTestId } = render(
      <MemoryRouter initialEntries={['/scans']}>
        <Main />
      </MemoryRouter>
    );
    const loader = getByText(/Fetching Scans/);
    expect(loader).toBeVisible();

    const scans = await waitForElement(() => getByTestId('scans'));
    expect(scans).toBeVisible();
  });
});
