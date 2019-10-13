const processData = data => {
  const rows = data.split(/\r\n|\n/);
  const headers = rows[0].split(',');
  const json = [];
  for (let i = 1; i < rows.length; i += 1) {
    if (rows[i] !== '') {
      const object = {};
      const cols = rows[i].split(',');
      for (let x = 0; x < cols.length; x += 1) {
        object[headers[x]] = cols[x];
      }
      json.push(object);
    }
  }
  return json;
};

export default processData;
