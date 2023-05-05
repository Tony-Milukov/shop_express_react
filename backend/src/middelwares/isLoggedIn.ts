const { getUserByToken } = require('../service/userService.ts');
const apiError = require('../utilits/apiError.ts');

const isLoggedIn = async (req: any, res: any, next: any) => {
  try {
    const user = await getUserByToken(req, res);
    if (user) {
      next();
    }
  } catch (e: any) {
    console.log(e);
    apiError(res, e.errMSG, e.status);
  }
};
module.exports = isLoggedIn;
export {};
