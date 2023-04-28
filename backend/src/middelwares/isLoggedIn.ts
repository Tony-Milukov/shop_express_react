const { getUserByToken } = require('../service/userService.ts');

const isLoggedIn = async (req:any, res:any, next:any) => {
  const user = await getUserByToken(req, res);
  if (user) {
    next();
  }
};
module.exports = isLoggedIn;
export {};
