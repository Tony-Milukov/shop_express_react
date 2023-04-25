const { getTokenService, isRoleGiven, decodeJwtService } = require('../Service/userService.ts');

const checkRole = (roleId_:string) => async (req:any, res:any, next:any) => {
  const roleId = parseFloat(roleId_);
  const token = getTokenService(req);
  const userInfo = await decodeJwtService(token);
  if (userInfo && await isRoleGiven(userInfo.userId, roleId)) {
    next();
  } else {
    res.status(403).json({ message: 'it seems, you have no permission to do that!' });
  }
};
module.exports = checkRole;
