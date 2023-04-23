const bcrypt = require('bcrypt');

const {
  User, Basket, UserRole,
} = require('../models/models.ts');

const deleteUserService = async (userId: number) => {
  await Basket.destroy({
    where: {
      userId,
    },
  });
  await UserRole.destroy({
    where: {
      userId,
    },
  });
  const result = await User.destroy({
    where: {
      id: userId,
    },
  });
  return !!result;
};

const createUserService = async (email: string, username:string, password:string) => {
  const hash = bcrypt.hashSync(password, 10);
  const user = await User.create({
    email,
    password: hash,
    username,
    img: 'default.jpg',
  });
  if (user) {
    await Basket.create({
      userId: user.id,
    });
    await UserRole.create({
      userId: user.id,
      roleId: 1,
    });
    return user;
  }
  throw { errorMSG: 'Internal server Error' };
};
const doesEmailExistService = async (email:string) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    throw { status: 409, errorMSG: 'User with that email already exists' };
  } return !!user;
};
const doesUsernameExistService = async (username:string) => {
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (!user) {
    throw { status: 409, errorMSG: 'User with that username already exists' };
  } return !!user;
};

const getUserByIdService = async (userId:number) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw { errorMSG: 'User with that userId was not defined' };
  }
  return user;
};
const getUserByUsernameService = async (username:string) => {
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (!user) {
    console.log(true);
    throw { errorMSG: 'User with that username was not defined' };
  }
  return user;
};
module.exports = {
  deleteUserService,
  createUserService,
  getUserByIdService,
  doesEmailExistService,
  doesUsernameExistService,
  getUserByUsernameService,
};
export {};
