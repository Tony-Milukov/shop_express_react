const apiError = require('./apiError.ts');

const errorHandler = (err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  apiError(res, 'Internal server error', 500);
  next();
};

module.exports = errorHandler;
export {};
