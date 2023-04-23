const { getTokenService } = require('../Service/userService.ts');

const isLoggedIn = (req:any, res:any, next:any) => {
  const token = getTokenService(req);
  if (token) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized!' });
  }
};
module.exports = isLoggedIn;
export {};
