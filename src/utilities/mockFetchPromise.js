const mockFetchPromise = ({ err, fakeResponse }) => {
  const res = {
    json: () => Promise.resolve(fakeResponse)
  };
  res.ok = !err;
  return Promise.resolve(res);
};

export default mockFetchPromise;
