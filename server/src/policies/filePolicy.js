const ApiError = require('../utilities/ApiError');
const path = require('path');

// [1] VALIDATION: Check for file passed from client
const filesPayloadExists = (req, res, next) => {
  if(!req.files && !req.body.uploadedFile) {
    return next(ApiError.badRequest('No file uploaded'));

  }
  next();
}

// [2] VALIDATION: Check if file size exceeds set size
const fileSizeLimiter = (req, res, next) => {
  const MB = 5;   // 5MB
  const FILE_SIZE_LIMIT = MB * 1024 * 1024;

  if(req.files){
    const file = req.files.image;
  
    if(file.size > FILE_SIZE_LIMIT) {
      const message = `${file.name.toString()} is over the file size limit of ${MB} MB.`;
  
      return next(ApiError.tooLarge(message)); 
    }
  }
  next();
}

// [3] VALIDATION: Restrict file to accepted file extension types (images ONLY)
const fileExtLimiter = (allowedExtArray) => {
  return (req, res, next) => {
    if(req.files) {
      const file = req.files.image;
      const fileExtension = path.extname(file.name);
  
      const allowed = allowedExtArray.includes(fileExtension);
      if (!allowed) {
        const message = `Only ${allowedExtArray.toString()} files allowed.`.replaceAll(",", ", ");
  
        return next(ApiError.cannotProcess(message));   
      }
    }

    next();
  }
}

const filePolicy = {
  filesPayloadExists,
  fileSizeLimiter,
  fileExtLimiter
}

module.exports = filePolicy