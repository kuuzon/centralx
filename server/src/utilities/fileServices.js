// Import in modules
const { bucket } = require('../config/db');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const config = require("../config/config");

// FUNCTIONS: File Uploading & Validation
module.exports = {
  fileServerUpload (file) {
    // We can see what this file looks like at a data level
    console.log(file);
    
    // [1] UNIQUE FILE NAME:
    // NOTE: We need to break up the file name and concatenate some unique data to the filename to make it unique in our server & storage bucket!
    const fileName = Date.now() + '_' + file.name;
    console.log(`Unique Filename: ${fileName}`);

    // [2] DECLARE SERVER STORAGE FILE PATH
    const filePath = path.join(
      __dirname, 
      '../../', 
      `/public/uploads/${fileName}`
    );
      
    // [3] SAVE FILE TO SERVER STORAGE
    // NOTE: We take the file object & use "mv" method to move file where we want it on our server
    file.mv(filePath);
    console.log(`Server Uploaded File Path: ${filePath}`);

    return fileName;
  },

  async storageBucketUpload(fileName) {
    console.log(`File Name: ${fileName}`);

    // Generate random token (uuid) & store in variable to be passed into custom image bucket url 
    const storageToken = uuid.v4();

    // Declare the "filepath" & "options" parameters, which allows customisaton of bucket upload
    const filePath = `./public/uploads/${fileName}`;
    const destFileName = fileName;

    const options = {
      destination: destFileName,
      resumable: true,
      validation: 'crc32c',
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: storageToken 
        },
      }
    };

    // Call Firebase Image Upload function to save to storage - which requires 2 parameters (i) the exact filePath & (ii) Options
    const result = await bucket.upload(filePath, options);
    
    // Obtain bucket storage name from our upload result
    const bucketName = result[0].metadata.bucket;
    console.log(`Bucket Name: ${bucketName}`);
    
    // Construct the URL from (i) firebase base, (ii) bucket storage name, (iii) fileName submitted in POST & (iv) token
    // NOTE: We need to output the url, store in the DB so we can retrieve via GETs & display
    const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${fileName}?alt=media&token=${storageToken}`;

    // Delete the files from temporary server location after bucket upload (/public/uploads)
    fs.unlink(filePath, err => {
      if(err) {
        return({
          message: 'Error occurred in removing file from temporary local storage'
        });
      } else {
        console.log('File in temporary local storage deleted');
      }
    });

    return downloadURL;
  },

  getFilePathFromUrl(downloadURL) {
    console.log(`DownloadURL from DB: ${downloadURL}`);

    // Slice off the base URL from downloadURL
    const baseURL = `https://firebasestorage.googleapis.com/v0/b/${config.db.storageBucket}/o/`;
    let filePath = downloadURL.replace(baseURL, "");
    
    // Remove everything after the query string
    const indexOfEndPath = filePath.indexOf("?");
    filePath = filePath.substring(0, indexOfEndPath);
    
    // Return filepath to be deleted 
    console.log(`File in Bucket for Deletion: ${filePath}`);
    return filePath;
  },

  async deleteFileFromBucket(filePath) {
    // Determine File Location in Storage 
    // NOTE: You would ALSO want to CHECK if it existed in the storage bucket before deletion OTHERWISE it would hit an error!    
    const file = bucket.file(filePath);
    const fileChecker = await file.exists();

    // [400 ERROR] Check for Item Existing in Storage Bucket
    // NOTE: To ensure our delete function still works against Firestore DB, we will modify the delete request to prevent an error.
    if (fileChecker[0] === false) {
      // [TOGGLE]: Set custom option parameter to prevent error returning
      const options = {
        ignoreNotFound: false,
      };

      // Call modified delete request (no deletion from storage bucket)
      // NOTE: Default option is "false", meaning error is issued and delete request fails if file does NOT exist!
      const data = await file.delete(options);
      console.log(`The file: ${filePath}, does not exist in Storage.  Please check server for inconsistent data handling & database queries.`);

      // Return API response to controller
      return data[0];

    // [SUCCESS] FILE EXISTS: Standard delete path
    } else {
      // Call standard delete request
      const data = await file.delete();
      console.log(`File deleted from Storage Bucket: ${filePath}`);

      // Return API response to controller
      return data[0];
    }
  },
 
  validateFile(file, maxSize) {
    // (a) Check for file exists 
    if(file === null) {
      return({
        message: 'No file uploaded'
      });
    }

    // (b) Check if file size exceeds set size
    if(file.image.size > maxSize) {
      return({
        message: 'The file is too large'
      });
    }

    // (c) Restrict file types
    // (i) Split the extension from file name & store
    let ext = file.image.name;
    ext = ext.split('.').pop();
    ext = ext.toLowerCase();
    console.log(ext);

    // (ii) Destructure the accepted file types passed in a third parameter array
    // const [png, jpeg, gif, jpg] = fileTypes;

    // (iii) Check for restrictions against declared variable strings
    if( !(ext == "png" || ext == "jpeg" || ext == "jpg" || ext == "gif" ) ) {
      return({
        message: `Please upload an accepted image file type`
      });
    }
  }
}