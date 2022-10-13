const getError = (err, language) => {
  return err.response &&
    err.response.data &&
    err.response.data.message &&
    err.response.data.persianMessage
    ? language === 'English'
      ? err.response.data.message
      : err.response.data.persianMessage
    : err.message;
  // ? err.response.data.message
  // : err.message;
};

export { getError };
