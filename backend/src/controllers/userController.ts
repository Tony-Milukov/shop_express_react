const bcrypt = require('bcrypt');
const { User } = require('../models/models.ts');
const { Basket } = require('../models/models.ts');
const { UserRole } = require('../models/models.ts');
const apiError = require('../middelwares/apiError.ts');

const createUser = async (req:any, res:any) => {
  const { email, password, username } = req.body;
  try {
    if (email && password && username) {
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

        res.status(200).json({ message: `user with userId ${user.id} was created` });
      }
    } else {
      res.status(404).json({ message: 'email or password or username were not entered' });
    }
  } catch (e:any) {
    console.log(e);
    apiError(res, e);
  }
};
const getUser = async (req:any, res:any) => {
  const { username } = req.params;
  try {
    if (username) {
      const user = await User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          username,
        },
      });
      if (user) {
        res.send(user);
      } else {
        res.status(404).json({ message: 'user with that username was not defined' });
      }
    } else {
      res.status(404).json({ message: 'username was not entered' });
    }
  } catch (e) {
    apiError(res, e);
  }
};
const getRole = async (req:any, res:any) => {
  const { userId } = req.body;
  try {
    if (userId) {
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
    } else {
      res.status(404).json({ message: 'userId was not entered' });
    }
  } catch (e) {
    apiError(res, e);
  }
};
const addRole = async (req:any, res:any) => {
  const { userId, roleId } = req.body;
  try {
    if (userId) {
      const user = await User.findByPk(userId);
      const role = await UserRole.findByPk(roleId);
      if (user) {
        const [isRoleGiven] = await UserRole.findAll({
          where: {
            userId,
            roleId,
          },
        });
        if (!isRoleGiven && role) {
          await UserRole.create({
            userId,
            roleId,
          });
          res.status(200).json({ message: 'Role was given to the user Succesfully' });
        } else if (!isRoleGiven) {
          res.status(200).json({ message: 'User with that userId already have the role' });
        } else {
          res.status(200).json({ message: 'This role does not exist' });
        }
      } else {
        res.status(404).json({ message: 'User with that userId was not defined' });
      }
    } else {
      res.status(404).json({ message: 'userId or was not entered' });
    }
  } catch (e) {
    apiError(res, e);
  }
};
const deleteUser = async (req:any, res:any) => {
  const { userId } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (userId && user) {
      if (userId) {
        const user = await User.findByPk(userId);
        if (user) {
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
          if (result) {
            res.status(200).json({ message: `user with userId ${userId} was deleted` });
          } else {
            res.status(404).json({ message: 'user with that userId was not defined' });
          }
        }
      }
    } else {
      res.status(404).json({ message: 'userId was not entered' });
    }
  } catch (e) {
    apiError(res, e);
  }
};
module.exports = {
  createUser,
  getRole,
  getUser,
  deleteUser,
  addRole,
};
export {};
