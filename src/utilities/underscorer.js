const underscorer = string =>
  string
    .trim()
    .toLowerCase()
    .replace(/\s/g, '_');

export default underscorer;
