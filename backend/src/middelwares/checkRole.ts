const { isRoleGiven, getUserByToken } = require('../service/userService.ts');

const checkRole = (roleId_:string) => async (req:any, res:any, next:any) => {
  const roleId = parseFloat(roleId_);
  const user = await getUserByToken(req, res);
  if (user && await isRoleGiven(user.id, roleId)) {
    next();
  } else {
    res.status(403).json({ message: 'it seems, you have no permission to do that!' });
  }
};
module.exports = checkRole;
