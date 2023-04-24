const { getTokenService, decodeJwtService } = require('../Service/userService.ts');

const isLoggedIn = async (req:any, res:any, next:any) => {
  const token = getTokenService(req);
  const decoded = await decodeJwtService(token);
  if (!token || !decoded) {
    res.status(401).json({ message: 'Unauthorized!' });
  } else {
    next();
  }
};
module.exports = isLoggedIn;
export {};
