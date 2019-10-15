import { requester, mockFetchPromise } from 'utilities/apiUtils';

describe('Requester tests', () => {
  test('Successful GET response', async () => {
    const fakeResponse = {
      data: {
        id: 1
      }
    };
    const result = () => mockFetchPromise({ fakeResponse });
    global.fetch = jest.fn().mockImplementation(() => result());
    const response = await requester({ url: '/users', method: 'GET' });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(response).toBe(fakeResponse);
    expect(global.fetch.mock.calls[0][0]).toBe('/users');
    expect(response.data.id).toBe(1);
    expect(global.fetch.mock.calls[0][1].method).toBe('GET');
  });

  test('Successful POST response', async () => {
    const fakeResponse = {
      data: {
        id: 1
      }
    };
    const result = () => mockFetchPromise({ fakeResponse });
    global.fetch = jest.fn().mockImplementation(() => result());
    const response = await requester({
      url: '/users',
      body: { ...fakeResponse }
    });
    const req = global.fetch.mock.calls[0][1];
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(response).toBe(fakeResponse);
    expect(global.fetch.mock.calls[0][0]).toBe('/users');
    expect(req.method).toBe('POST');
    expect(req.body).toBe(JSON.stringify({ ...fakeResponse }));
  });

  test('Successful POST response for FormData', async () => {
    const fakeResponse = {
      data: {
        id: 1
      }
    };
    const result = () => mockFetchPromise({ fakeResponse });
    global.fetch = jest.fn().mockImplementation(() => result());
    const response = await requester({
      url: '/users',
      body: { ...fakeResponse },
      noContentType: true
    });
    const req = global.fetch.mock.calls[0][1];
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(response).toBe(fakeResponse);
    expect(global.fetch.mock.calls[0][0]).toBe('/users');
    expect(response.data.id).toBe(1);
    expect(req.method).toBe('POST');
    expect(req.headers['Content-Type']).toBeFalsy();
  });

  test('Error', async () => {
    const fakeResponse = ['input cannot be empty'];
    const err = new Error(fakeResponse);
    const data = {
      data: {
        id: 1
      }
    };
    global.fetch = jest.fn().mockImplementation(() => {
      throw err;
    });
    const response = await requester({
      url: '/users',
      body: { ...data }
    });
    const req = global.fetch.mock.calls[0][1];
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(response).toBe(err);
    expect(global.fetch.mock.calls[0][0]).toBe('/users');
    expect(req.method).toBe('POST');
  });
});
