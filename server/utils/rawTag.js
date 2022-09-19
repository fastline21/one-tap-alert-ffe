const convertRawTag = (string) => {
  return string
    .replace(/<[^>]*>|[^a-zA-Z ]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
};

const removeHTMLCode = (string) => {
  return string.replace(/<[^>]*>|[^a-zA-Z ]/g, '');
};

module.exports = {
  convertRawTag,
  removeHTMLCode,
};
