import React from 'react';

import { render, fireEvent, waitForElement } from '@testing-library/react';

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
    // TODO why do I have to do it this way instead of with spyOn?
    global.fetch = jest.fn().mockImplementation(() => result());
    // jest.spyOn(global, 'fetch').mockImplementationOnce(() => {
    //     return mockFetchPromise;
    // });
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

  // it('renders the ErrorHandler component on error with an array of errors', async () => {
  //   const { getByText, getByTestId } = render(<DeleteScan scan={{ id: 2 }} />);
  //   // Errors can either be an object with a message prop or an array
  //   const fakeResponse = ['input cannot be empty'];
  //   const result = () => mockFetchPromise({ fakeResponse, err: true });
  //   global.fetch = jest.fn().mockImplementation(() => result());
  //   const button = getByText(/delete order/i);

  //   // Event to show confirm modal
  //   fireEvent.click(button);
  //   const actual_delete = getByTestId('test_actually-delete');

  //   // Event to actually delete the order
  //   fireEvent.click(actual_delete);
  //   const errorhandler = await waitForElement(() =>
  //     getByText(/input cannot be empty/i)
  //   );
  //   expect(errorhandler).toBeVisible();
  // });

  //   it('renders the ErrorHandler component on error with an empty array', async () => {
  //     const { getByText, getByTestId } = render(<Delete id="12" />);
  //     // Errors can either be an object with a message prop or an array
  //     const fakeResponse = [];
  //     const result = () => mockFetchPromise({ fakeResponse, err: true });
  //     global.fetch = jest.fn().mockImplementation(() => result());
  //     const button = getByText(/delete order/i);

  //     // Event to show confirm modal
  //     fireEvent.click(button);
  //     const actual_delete = getByTestId('test_actually-delete');

  //     // Event to actually delete the order
  //     fireEvent.click(actual_delete);

  //     const errorhandler = await waitForElement(() =>
  //       getByText(/something went wrong/i)
  //     );
  //     expect(errorhandler).toBeVisible();
  //   });

  //   it('renders the ErrorHandler component on error with errors as an object', async () => {
  //     const { getByText, getByTestId } = render(<DeleteOrder id="12" />);
  //     // Errors can either be an object with a message prop or an array
  //     const fakeResponse = { message: 'input cannot be empty' };
  //     const result = () => mockFetchPromise({ fakeResponse, err: true });
  //     global.fetch = jest.fn().mockImplementation(() => result());
  //     const button = getByText(/delete order/i);

  //     // Event to show confirm modal
  //     fireEvent.click(button);
  //     const actual_delete = getByTestId('test_actually-delete');

  //     // Event to actually delete the order
  //     fireEvent.click(actual_delete);

  //     const errorhandler = await waitForElement(() =>
  //       getByText(/input cannot be empty/i)
  //     );
  //     expect(errorhandler).toBeVisible();
  //   });
});
