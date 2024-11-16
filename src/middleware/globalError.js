const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  return res
    .status(err.statusCode)
    .json({
      message: err.message,
      status: err.status,
    });
};

export default globalError;
