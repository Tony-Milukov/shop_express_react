import { logger } from 'sequelize/types/utils/logger';

const validateBody = require('../validations/bodyValidations.ts');
const validateParams = require('../validations/paramsValidation.ts');
const { isRoleGiven } = require('../service/userService.ts');
const {
  deleteUserService,
  createUserService,
  getUserByIdService,
  doesEmailExistService,
  doesUsernameExistService,
  getUserByUsernameService,
  genUserJWTService,
  updateUserImageDB,
  getUserByToken,
  getAllUsersService,
} = require('../service/userService.ts');

const {
  uploadImage,
  deleteOldImage,
} = require('../middelwares/updateImage.ts');

const { getRoleById } = require('../service/roleService.ts');

const apiError = require('../utilits/apiError.ts');

const createUser = async (req: any, res: any) => {
  try {
    const email = validateBody(req, res, 'email');
    const password = validateBody(req, res, 'password');
    const username = validateBody(req, res, 'username');

    // if exist > throw error
    await doesEmailExistService(email);
    await doesUsernameExistService(username);

    const user = await createUserService(email, username, password);
    if (user) {
      res.status(200)
        .json({ message: `user with userId ${user.id} was created` });
    }
  } catch (e: any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const getUser = async (req: any, res: any) => {
  try {
    const username = validateParams(req, res, 'username');
    // getting user, if not exist > throw error
    const user = await getUserByUsernameService(username);
    res.status(200)
      .json(user);
  } catch (e: any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const getRole = async (req: any, res: any) => {
  try {
    const userId = validateBody(req, res, 'userId');

    // get user
    const user = await getUserByIdService(userId);

    // getRoles
    const roles = await user.getRoles();

    // if user exist, every user have min 1 role: USER,  if there are no roles, user does not exist
    if (roles && roles.length >= 1) {
      res.json(roles);
    } else {
      res.status(404)
        .json({ message: 'User with that userId is not defined' });
    }
  } catch (e: any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const addRole = async (req: any, res: any) => {
  try {
    const userId = validateBody(req, res, 'userId');
    const roleId = parseFloat(validateBody(req, res, 'roleId'));

    // get role
    const role = await getRoleById(roleId);

    // get user
    const user = await getUserByIdService(userId);

    // is role given
    const hasRole = await isRoleGiven(userId, roleId);

    if (hasRole) {
      return res.status(200)
        .json({
          errorMSG: 'User with that userId already have the role',
        });
    }
    await user.addRole(role);
    res.status(200)
      .json({ message: 'Role was given to the user Succesfully' });
  } catch (e: any) {
    apiError(res, e.errorMSG, e.status);
  }
};

const removeRole = async (req: any, res: any) => {
  try {
    const userId = validateBody(req, res, 'userId');
    const roleId = parseFloat(validateBody(req, res, 'roleId'));

    // get role
    const role = await getRoleById(roleId);

    // get user
    const user = await getUserByIdService(userId);

    // is role given
    const hasRole = await isRoleGiven(userId, roleId);

    if (!hasRole) {
      return res.status(200)
        .json({
          errorMSG: 'User with that userId do not have the role',
        });
    }
    await user.removeRole(role);
    res.status(200)
      .json({ message: 'Role was removed for this user' });
  } catch (e: any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const deleteUser = async (req: any, res: any) => {
  try {
    const user = await getUserByToken(req, res);
    const userId = parseFloat(req.params.userId);

    // does user exist
    await getUserByIdService(user.id);
    // deleting user from DB
    let result = null;
    if (await isRoleGiven(user.id, process.env.ADMIN_ROLE) && userId) {
      result = await deleteUserService(userId);
    } else {
      result = await deleteUserService(user.id);
    }
    if (result) {
      res.status(200)
        .json({ message: `user with userId ${userId ?? user.id} was deleted` });
    } else {
      res.status(404)
        .json({ message: 'Something went wrong' });
    }
  } catch (e: any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const getUserJWT = async (req: any, res: any) => {
  try {
    const email = validateBody(req, res, 'email');
    const password = validateBody(req, res, 'password');

    // generate JWT token (userId && username)
    const jwt = await genUserJWTService(email, password);
    if (jwt) {
      res.status(200)
        .json({ token: jwt });
    } else {
      res.status(404)
        .json({ message: 'email or password are incorrect' });
    }
  } catch (e: any) {
    apiError(res, e.errorMSG, e.status);
  }
};

const updateUserImage = async (req: any, res: any) => {
  const img = req.files ? req.files.img : undefined;
  if (!img) {
    return res.status(404)
      .json({ message: 'img was not send' });
  }
  try {
    // getting user by jwt token in header
    const user = await getUserByToken(req, res);

    // deleting old image if it is not default image
    await deleteOldImage(user.img, 'avatars');

    // adding image to static/avatars and returning its new name
    const newImg = await uploadImage(img, 'avatars');

    // updating img for user
    await updateUserImageDB(newImg, user.id);
    return res.status(200)
      .json({ message: 'updated succesfully' });
  } catch (e: any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const getProfile = async (req: any, res: any) => {
  try {
    const user = await getUserByToken(req, res);
    if (user && !user.statusCode) {
      return res.status(200)
        .json(user);
    }
  } catch (e: any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const getAllUsers = async (req: any, res: any) => {
  try {
    const pageSize = parseFloat(validateBody(req, res, 'pageSize'));
    const page = parseFloat(validateBody(req, res, 'page'));
    const offset = (page - 1) * pageSize;
    const users = await getAllUsersService(pageSize, offset);
    res.status(200).json(users);
  } catch (e: any) {
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
  updateUserImage,
  removeRole,
  getProfile,
  getAllUsers,
};
export {};
