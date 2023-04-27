const checkIsObject = (object: object, name:string) => {
  if (typeof object !== 'object') {
    throw { errorMSG: `${name} must be an object!`, status: 400 };
  }
};
module.exports = checkIsObject;
