import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { mockFetchPromise } from 'utilities/apiUtils';
import ImportScan from 'components/scans/importScan';

describe('Import Scan tests', () => {
  it('Renders the button', () => {
    const { getByText } = render(<ImportScan />);
    const button = getByText(/import scan/i);
    expect(button).toBeVisible();
  });

  test('Processes the file redirects to the redirect url', async () => {
    const updateLoading = jest.fn();
    const fakeResponse = {
      redirect_url: 'www.redirecturl.com',
      redirect: true
    };
    const result = () => mockFetchPromise({ fakeResponse });
    global.fetch = jest.fn().mockImplementation(() => result());
    const { getByLabelText } = render(
      <ImportScan updateLoading={updateLoading} />
    );
    const file = new File(['file'], 'results.nmap.xml', {
      type: 'text/xml'
    });
    const importInput = getByLabelText('Import Scan');
    fireEvent.change(importInput, { target: { files: [file] } });

    const req = global.fetch.mock.calls[0][1];
    const value = await global.fetch.mock.results[0].value;
    const response = await value.json();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe('http://localhost:3000/import');
    expect(req.headers['Content-Type']).toBeFalsy();
    expect(response.redirect).toBe(true);
    expect(response.redirect_url).toBe('www.redirecturl.com');
  });
});
