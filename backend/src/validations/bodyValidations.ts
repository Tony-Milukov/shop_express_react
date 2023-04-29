const validateParam = (req:any, res:any, name:string) => {
  const paramValue = req.body[name];
  console.log(paramValue !== 0);
  if (paramValue === 0 ? false : !paramValue) {
    throw { errorMSG: `${name} was not entered` };
  }
  return paramValue;
};
module.exports = validateParam;
export {};
