const ApiError = require('../utilities/ApiError');
const path = require('path');
const debugWRITE = require('debug')('app:post');

const fileServerUpload = (req, res, next) => {
  if(req.files) {
    // [1] STORE FILE (SINGLE)
    const file = req.files.image;
    debugWRITE(`Image for Server Processing: ${file.name}`);
  
    // [2] APPEND UNIQUE FILENAME EXTENSION
    const filename = Date.now() + '_' + file.name;
    debugWRITE(`Unique Filename: ${filename}`);
  
    // [3] DECLARE SERVER STORAGE DIRECTORY PATH
    const uploadPath = path.join(
      __dirname, 
      '../../public/uploads/', 
      filename);
    
    // [4] MOVE FILE TO SERVER STORAGE ("mv" function returns a PROMISE)
    file
    .mv(uploadPath)
    .then(() => {
      // [5] SET FILENAME VARIABLE ON REQ OBJECT & PASS TO NEXT MIDDLEWARE
      console.log(`Server Upload Successful: ${uploadPath}`);
      res.locals.filename = filename;
      next();
    })
    .catch(err => {
      if (err) return next(ApiError.internal('Your file request could not be processed at this time', err));
    });
  } else {
    next();
  }
}

module.exports = fileServerUpload;