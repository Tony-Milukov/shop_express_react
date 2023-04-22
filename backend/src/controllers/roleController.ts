const { Role } = require('../models/models.ts');
const apiError = require('../middelwares/apiError.ts');

const addRole = async (req:any, res:any) => {
  const { role } = req.body;
  try {
    if (role) {
      const response = await Role.create({
        name: role,
      });
      if (response) {
        res.status(200).json({ message: 'Role was added succesfully' });
      }
    } else {
      res.status(404).json({ message: 'Role was not entered' });
    }
  } catch (e:any) {
    apiError(res, e);
  }
};
const deleteRole = async (req:any, res:any, next:any) => {
  const { roleId } = req.body;
  try {
    if (roleId) {
      const response = await Role.destroy({
        where: {
          id: roleId,
        },
      });
      if (response) {
        res.status(200).json({ message: 'Role was deleted succesfully' });
      } else {
        res.status(404).json({ message: 'role with that roleId doesn\'t exist' });
      }
    } else {
      res.status(404).json({ message: 'roleId was not entered' });
    }
  } catch (e:any) {
    apiError(res, e);
  }
};

const getAllRoles = async (req:any, res:any) => {
  try {
    const response = await Role.findAndCountAll();
    res.send(response);
  } catch (e:any) {
    apiError(res, e);
  }
};

module.exports = {
  addRole,
  getAllRoles,
  deleteRole,
};
