const { Role } = require('../../models/models.ts');

const getRoleById = async (roleId:number) => {
  const role = await Role.findByPk(roleId);
  if (!role) {
    throw { errorMSG: 'role with that roleId was not defined' };
  }
  return role;
};

module.exports = {
  getRoleById,
};
export {};
