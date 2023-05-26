const validateParam = (req:any, res:any, name:string) => {
  const paramValue = req.body[name];
  if (paramValue === 0 ? false : !paramValue || paramValue === 'undefined') {
    throw { errorMSG: `${name} was not entered` };
  }
  return paramValue;
};
module.exports = validateParam;
export {};
