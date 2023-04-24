const { Role } = require('../models/models.ts');
const apiError = require('../middelwares/apiError.ts');
const validateParam = require('./Validations/paramsValidation.ts');
const {
  deleteRoleService, addRoleService, getRoleById,
} = require('../Service/roleService.ts');

const addRole = async (req:any, res:any) => {
  try {
    const role = validateParam(req, res, 'role');
    const response = await addRoleService(role);
    if (response) {
      res.status(200).json({ message: 'Role was added succesfully' });
    } else {
      // default error (apiError)
      throw {};
    }
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const deleteRole = async (req:any, res:any) => {
  try {
    const roleId = validateParam(req, res, 'roleId');
    const response = await deleteRoleService(roleId);
    if (response) {
      res.status(200).json({ message: 'Role was deleted succesfully' });
    } else {
      // default error (apiError)
      throw {};
    }
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};

const getAllRoles = async (req:any, res:any) => {
  try {
    const response = await Role.findAndCountAll();
    res.send(response);
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const getRole = async (req:any, res:any) => {
  try {
    const roleId = validateParam(req, res, 'roleId');

    const role = await getRoleById(roleId);
    res.send(role);
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};

module.exports = {
  addRole,
  getAllRoles,
  deleteRole,
  getRole,
};
