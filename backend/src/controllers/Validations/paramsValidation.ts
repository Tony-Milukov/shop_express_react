const validateParam = (req:any, res:any, name:string) => {
  const paramValue = req.body[name];
  if (!paramValue) {
    throw { errorMSG: `${name} was not entered` };
  }
  return paramValue;
};
module.exports = validateParam;
export {};
