import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import mockFetchPromise from 'utilities/mockFetchPromise';
import DeleteScan from 'components/scans/deleteScan';

describe('Delete Scan tests', () => {
  it('shows the button and opens/closes modal', () => {
    const { getByText, queryByTestId } = render(
      <DeleteScan scan={{ id: 2 }} />
    );
    const button = getByText(/delete scan/i);
    expect(button).toBeVisible();

    // Event to show confirm modal
    fireEvent.click(button);
    const modal = () => queryByTestId('test_show-confirm');
    const cancel = getByText(/cancel/i);
    expect(modal()).toBeVisible();
    expect(cancel).toBeVisible();

    // Event to close modal
    fireEvent.click(cancel);
    expect(modal()).toBeFalsy();
  });

  it('actually deletes the scan', async () => {
    const { getByText, getByTestId } = render(<DeleteScan scan={{ id: 2 }} />);
    const fakeResponse = {
      redirect_url: 'www.redirecturl.com',
      redirect: true
    };
    const result = () => mockFetchPromise({ fakeResponse });
    global.fetch = jest.fn().mockImplementation(() => result());
    const button = getByText(/delete scan/i);

    // Event to show confirm modal
    fireEvent.click(button);
    const actual_delete = getByTestId('test_actually-delete');

    // Event to actually delete the order
    fireEvent.click(actual_delete);
    const value = await global.fetch.mock.results[0].value;
    const response = await value.json();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toBe(
      'http://localhost:3000/import/2'
    );
    expect(response.redirect).toBe(true);
    expect(response.redirect_url).toBe('www.redirecturl.com');
  });
});
