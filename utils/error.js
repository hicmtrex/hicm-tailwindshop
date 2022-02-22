export const getError = (err) =>
  err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message;

export const onError = async (err, req, res) => {
  res.status(500).send({ message: err.toString() });
};
