const apiError = (res:any, message = 'Internal Server Error') => {
  res.status(500).json({ message });
};
module.exports = apiError;
export {};
