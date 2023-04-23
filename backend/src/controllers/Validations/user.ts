const { UserRole } = require('../../models/models.ts');

const isRoleGiven = async (userId:number, roleId:number) => {
  const [isRoleGiven] = await UserRole.findAll({
    where: {
      userId,
      roleId,
    },
  });
  if (isRoleGiven) {
    throw {
      errorMSG: 'User with that userId already have the role',
      status: 200,
    };
  }
};

module.exports = {
  isRoleGiven,
};
export {};
