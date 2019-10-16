import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render, waitForElement } from '@testing-library/react';

import { mockFetchPromise } from 'utilities/apiUtils';
import Main from 'components/main';

import scan from '../__fixtures__/scan';

describe('Scan tests', () => {
  test('Renders a single scan page and fetches the scan', async () => {
    const fakeResponse = { ...scan };
    const result = () => mockFetchPromise({ fakeResponse });
    global.fetch = jest.fn().mockImplementation(() => result());
    const { getByText, getByTestId } = render(
      <MemoryRouter initialEntries={[`/scans/${scan.id}`]}>
        <Main />
      </MemoryRouter>
    );
    const loader = getByText(/Populating Results/);
    expect(loader).toBeVisible();

    const scans = await waitForElement(() => getByTestId('single-scan'));
    expect(scans).toBeVisible();
  });
  test('Renders the not found page if scan id is invalid', async () => {
    const fakeResponse = undefined;
    const result = () => mockFetchPromise({ fakeResponse });
    global.fetch = jest.fn().mockImplementation(() => result());
    const { getByText } = render(
      <MemoryRouter initialEntries={[`/scans/456`]}>
        <Main />
      </MemoryRouter>
    );

    const loader = getByText(/Populating Results/);
    expect(loader).toBeVisible();

    const notFound = await waitForElement(() => getByText(/Page Not Found/));
    expect(notFound).toBeVisible();
  });
});
