const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const fs = require('fs');
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
  if (user) {
    throw { status: 409, errorMSG: 'User with that email already exists' };
  } return !!user;
};
const doesUsernameExistService = async (username:string) => {
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (user) {
    throw { status: 409, errorMSG: 'User with that username already exists' };
  } return !!user;
};

const getUserByIdService = async (userId:number) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw { errorMSG: 'User with that userId was not defined' };
  }
  return user.dataValues;
};

const deleteOldImage = (img:string) => {
  const imgPath = `${__dirname}/../static/avatars/${img}`;
  if (img !== 'default.jpeg') {
    fs.unlink(imgPath, (err:any) => {
      if (err) {
        throw { errorMSG: 'something went wrong' };
      }
      return true;
    });
  }
};
const updateUserImageDB = (img:string, userId:number) => {
  const res = User.update({ img }, { where: { id: userId } });
  if (!res) {
    throw { errorMSG: 'something went wrong' };
  }
};

const getUserByUsernameService = async (username:string) => {
  const user = await User.findOne({
    where: {
      username,
    },
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt', 'id'],
    },
  });
  if (!user) {
    console.log(true);
    throw { errorMSG: 'User with that username was not defined' };
  }
  return user;
};
const isRoleGiven = async (userId:number, roleId:number) => {
  const [isRoleGiven] = await UserRole.findAll({
    where: {
      userId,
      roleId,
    },
  });
  if (isRoleGiven) {
    return true;
  }
  return false;
};
const getTokenService = (req:any) => {
  const rareToken = req.headers.authorization;

  if (!rareToken) {
    return false;
  }
  const token = rareToken.split(' ')[1];
  if (token) {
    return token;
  }
  return false;
};
const getUserByEmailService = async (email:string) => {
  const user = await User.findOne({
    where: {
      email,
    },

  });
  return user;
};
const genUserJWTService = async (email:string, password:string) => {
  const user = await getUserByEmailService(email);
  if (user) {
    const expectedPassword = user.password;
    if (bcrypt.compareSync(password, expectedPassword)) {
      return jwt.sign({ userId: user.id, username: user.username }, process.env.SECRET_JWT);
    } return false;
  }
  return false;
};

const decodeJwtService = async (token:string) => jwt.verify(token, process.env.SECRET_JWT, (err:any, decoded:any) => {
  if (err) {
    return false;
  } return decoded;
});

const uploadImage = async (img:any) => {
  const [fileType, ext] = img.mimetype.split('/');
  // if file is jpg or jpeg or png
  if (fileType === 'image' || ext === 'jpeg' || ext === 'png' || ext === 'jpg') {
    const fileName = `${uuid.v4()}_avatar.${ext}`;
    // get absoulute path for the user
    const path = `${__dirname}/../static/avatars/${fileName}`;
    img.mv(path);
    return fileName;
  }

  throw { errorMSG: 'File must be a image! (png,jpg,jpeg)', status: 400 };
};
module.exports = {
  deleteUserService,
  createUserService,
  getUserByIdService,
  doesEmailExistService,
  doesUsernameExistService,
  getUserByUsernameService,
  isRoleGiven,
  genUserJWTService,
  uploadImage,
  getTokenService,
  decodeJwtService,
  deleteOldImage,
  updateUserImageDB,
};
export {};
