const checkIsArray = (array:any, name:string) => {
  if (!Array.isArray(array)) {
    throw { errorMSG: `${name} must be an array!`, status: 400 };
  }
};

module.exports = checkIsArray;
