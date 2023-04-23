const validateParam = require('./Validations/paramsValidation.ts');
const { isRoleGiven } = require('../Service/userService.ts');
const {
  deleteUserService, createUserService, getUserByIdService, doesEmailExistService, doesUsernameExistService, getUserByUsernameService, genUserJWTService, decodeJwtService,
} = require('../Service/userService.ts');
const { getRoleById } = require('../Service/roleService.ts');
const {
  UserRole,
} = require('../models/models.ts');
const apiError = require('../middelwares/apiError.ts');

const createUser = async (req:any, res:any) => {
  try {
    const email = validateParam(req, res, 'email');
    const password = validateParam(req, res, 'password');
    const username = validateParam(req, res, 'username');

    // if exist throw error
    await doesEmailExistService(email);
    await doesUsernameExistService(email);

    const user = await createUserService(email, username, password);
    if (user) {
      res.status(200).json({ message: `user with userId ${user.id} was created` });
    }
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const getUser = async (req:any, res:any) => {
  try {
    const { username } = req.params;

    const user = await getUserByUsernameService(username);
    res.status(200).json(user);
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const getRole = async (req:any, res:any) => {
  try {
    const userId = validateParam(req, res, 'userId');
    // getRoles
    const roles = await UserRole.findAndCountAll({
      where: {
        userId,
      },
    });
      // if user exist, every user have min 1 role: USER,  if there are no roles, user does not exist
    if (roles && roles.rows.length >= 1) {
      res.json(roles);
    } else {
      res.status(404).json({ message: 'User with that userId is not defined' });
    }
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const addRole = async (req:any, res:any) => {
  try {
    const userId = validateParam(req, res, 'userId');
    const roleId = validateParam(req, res, 'roleId');

    // does user exist
    await getUserByIdService(userId);

    // does role exist
    await getRoleById(roleId);

    // is role given
    const hasRole = await isRoleGiven(userId, roleId);
    if (hasRole) {
      res.status(200).json({
        errorMSG: 'User with that userId already have the role',
      });
    }

    await UserRole.create({
      userId,
      roleId,
    });
    res.status(200).json({ message: 'Role was given to the user Succesfully' });
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const deleteUser = async (req:any, res:any) => {
  try {
    const userId = validateParam(req, res, 'userId');
    // does user exist
    await getUserByIdService(userId);

    const result = deleteUserService(userId);
    if (result) {
      res.status(200).json({ message: `user with userId ${userId} was deleted` });
    } else {
      res.status(404).json({ message: 'Something went wrong' });
    }
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const getUserJWT = async (req:any, res:any) => {
  try {
    const email = validateParam(req, res, 'email');
    const password = validateParam(req, res, 'password');
    const jwt = await genUserJWTService(email, password);
    if (jwt) {
      res.status(200).json(jwt);
    } else {
      res.status(404).json({ message: 'email or password are incorrect' });
    }
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
module.exports = {
  createUser,
  getRole,
  getUser,
  deleteUser,
  addRole,
  getUserJWT,
};
export {};
