const uuid = require('uuid');
const fs = require('fs');

const uploadImage = async (img:any, folder:string) => {
  const [fileType, ext] = img.mimetype.split('/');
  // if file is jpg or jpeg or png
  if (fileType === 'image' || ext === 'jpeg' || ext === 'png' || ext === 'jpg') {
    const fileName = `${uuid.v4()}_${folder}.${ext}`;
    // get absolute path for the user
    const path = `${__dirname}/../static/${folder}/${fileName}`;
    img.mv(path);
    return fileName;
  }
  throw { errorMSG: 'File must be a image! (png,jpg,jpeg)', status: 400 };
};
const deleteOldImage = (imgName:string, folder:string) => {
  const imgPath = `${__dirname}/../static/${folder}/${imgName}`;
  if (imgName !== 'default.jpg') {
    fs.unlink(imgPath, (err:any) => {
      if (err) {
        throw { errorMSG: 'something went wrong' };
      }
      return true;
    });
  }
};
module.exports = { uploadImage, deleteOldImage };
export {};
