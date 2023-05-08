const apiError = require('../utilits/apiError.ts');
const validateBody = require('../validations/bodyValidations.ts');
const validateParams = require('../validations/paramsValidation.ts');
const {
  deleteRoleService, addRoleService, getRoleById, getAllRolesService,
} = require('../service/roleService.ts');

const addRole = async (req:any, res:any) => {
  try {
    const role = validateBody(req, res, 'role');
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
    const roleId = validateParams(req, res, 'roleId');
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
    const pageSize = validateBody(req, res, 'pageSize');
    const page = validateBody(req, res, 'page');
    const offset = pageSize * (page - 1);
    const roles = await getAllRolesService(pageSize, offset);
    res.status(200).json(roles);
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const getRole = async (req:any, res:any) => {
  try {
    const roleId = validateBody(req, res, 'roleId');
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
