import React from 'react';

import { render } from '@testing-library/react';

import ErrorHandler from 'shared/errorHandler';

describe('Error handler', () => {
  it('Renders the error handler', async () => {
    const { queryByTestId } = render(
      <ErrorHandler errors={['input cannot be empty']} data-testid="error" />
    );
    const message = queryByTestId('error');
    expect(message).toBeVisible();
  });

  it('Returns null if given an empty array', async () => {
    const { queryByTestId } = render(
      <ErrorHandler errors={[]} data-testid="error" />
    );
    const message = queryByTestId('error');
    expect(message).toBeFalsy();
  });
});
