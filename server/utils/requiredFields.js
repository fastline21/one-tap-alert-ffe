const checkRequiredFields = (fields) => {
  const errors = [];

  for (const [key, value] of Object.entries(fields)) {
    if (!value) {
      errors.push(key);
    }
  }

  const message = `Please fill in ${errors.join(', ')} field${
    errors.length > 1 ? 's' : ''
  }`;

  return {
    isError: !errors.length ? false : true,
    message,
    statusCode: 400,
  };
};

module.exports = {
  checkRequiredFields,
};
