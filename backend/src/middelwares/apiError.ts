const Sequelze = require('sequelize');

const apiError = (res:any, element:any) => {
  const ValidationError = element.errors ? element.errors[0] : false;
  if (element instanceof Sequelze.UniqueConstraintError) {
    res.status(409).json({ message: `${ValidationError.path} already exists` });
  } else {
    res.status(element.status || element.statusCode || 404).json({
      message: element.message ?? ValidationError.message ?? element ?? 'something went wrong',
    });
  }
};
module.exports = apiError;
export {};
