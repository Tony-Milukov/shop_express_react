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

module.exports = {
  deleteRoleService,
  addRoleService,
  getRoleById,
};
export {};
