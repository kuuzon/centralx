const ApiError = require('../utilities/ApiError');
const path = require('path');

const fileServerUpload = (req, res, next) => {
  if(req.files) {
    // [1] STORE FILE (SINGLE)
    const file = req.files.image;
    console.log(file);
  
    // [2] APPEND UNIQUE FILENAME EXTENSION
    const filename = Date.now() + '_' + file.name;
    console.log(`Unique Filename: ${filename}`);
  
    // [3] DECLARE SERVER STORAGE DIRECTORY PATH
    const uploadPath = path.join(
      __dirname, 
      '../../public/uploads/', 
      filename);
    
    // [4] MOVE FILE TO SERVER STORAGE
    file.mv(uploadPath, (err) => {
      if (err) return next(ApiError.internal('Your request could not be processed at this time', err));
    })
  
    // [5] SET FILENAME VARIABLE ON REQ OBJECT & PASS TO NEXT MIDDLEWARE
    console.log(`Server Upload Successful: ${uploadPath}`);
    res.locals.filename = filename;
  }

  next();
}

module.exports = fileServerUpload;