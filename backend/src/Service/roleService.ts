const { Role } = require('../models/models.ts');

const getRoleById = async (roleId:number) => {
  const role = await Role.findByPk(roleId);
  if (!role) {
    throw { errorMSG: 'role with that roleId was not defined' };
  }
  return role;
};
const addRoleService = async (role: string) => {
  const result = await Role.create({
    name: role,
  });
  return !!result;
};
const deleteRoleService = async (roleId: number) => {
  // does roleId exist
  await getRoleById(roleId);
  const result = await Role.destroy({
    where: {
      id: roleId,
    },
  });
  return !!result;
};
const getAllRolesService = async (limit:number, offset:number) => {
  const roles = await Role.findAndCountAll({
    offset,
    limit,
  });
  if (roles.rows.length >= 1) {
    return roles;
  } throw { errorMSG: 'roles by this page do not exist', status: 404 };
};
module.exports = {
  deleteRoleService,
  addRoleService,
  getRoleById,
  getAllRolesService,
};
export {};
