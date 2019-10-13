/* eslint-disable no-param-reassign */
import readCookie from '../readCookie';

const requester = async ({
  url,
  body,
  headers,
  method = 'POST',
  noContentType
}) => {
  const cookie = decodeURIComponent(readCookie('X-CSRF-Token'));
  headers = {
    'Content-Type': 'application/json',
    'X-CSRF-Token': cookie,
    ...headers
  };
  if (noContentType) {
    delete headers['Content-Type'];
  }
  if (headers['Content-Type'] === 'application/json') {
    body = JSON.stringify(body);
  }
  try {
    const response = await fetch(url, {
      method,
      body,
      headers
    });
    if (response.ok) {
      const responseJson = await response.json();
      return responseJson;
    }
    const error = new Error(response.statusText || response.status);
    error.response = await response.json();
    throw error;
  } catch (e) {
    console.log(e.response);
    return e;
  }
};

export default requester;
