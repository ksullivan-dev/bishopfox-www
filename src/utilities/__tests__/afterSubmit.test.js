import { afterSubmit, API_URL } from 'utilities/apiUtils';

describe('AfterSubmit tests', () => {
  test('if the response is an error, run the errback with the response', done => {
    const res = new Error();

    const errback = response => {
      expect(response instanceof Error).toBe(true);
      expect(response).toBe(res);
      done();
    };

    afterSubmit(res, null, errback);
  });

  test('if the response is not an error and redirect is defined, redirect to correct url', done => {
    delete global.window.location;
    const href = API_URL;
    const redirect_url = `${href}/temp`;
    const res = { redirect: true, redirect_url };

    global.window = Object.create(window);

    Object.defineProperty(window, 'location', {
      value: {
        href
      },
      writable: true
    });

    afterSubmit(res, null, null);
    setTimeout(() => {
      expect(window.location.href).toEqual(redirect_url);
      done();
    }, 401);
  });

  test('if the response is not an error and redirect is not defined, run the callback with the response', done => {
    const res = { data: '1234' };

    const callback = response => {
      expect(response).toBe(res);
      done();
    };

    afterSubmit(res, callback, null);
  });
});
