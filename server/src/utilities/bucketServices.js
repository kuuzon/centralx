// Import in modules
const { bucket } = require('../config/db');
const uuid = require('uuid');
const fs = require('fs');
const config = require("../config/config");
const ApiError = require('../utilities/ApiError');

// FUNCTIONS: File Uploading & Validation
module.exports = {
  async storageBucketUpload(filename) {
    console.log(`Firestore File Name: ${filename}`);
    // Generate random token (uuid) & store in variable to be passed into custom image bucket url 
    const storageToken = uuid.v4();

    // Declare the "filepath" & "options" parameters, which allows customisaton of bucket upload
    const serverFilePath = `./public/uploads/${filename}`;
    // File-Checker: Checks to see if file has been uploaded to server correctly before uploading
    // DOCS: https://nodejs.org/api/fs.html#fsaccesspath-mode-callback
    fs.access(serverFilePath, fs.F_OK, (err) => {
      if (err) {
        console.error(err);
        return({
          message: 'Error occurred in storing file to server'
        });
      } else {
        console.log("File Successfully Stored in Server");
      }
    });

    // Declare options for the upload to Cloud Firestore Storage Bucket
    const options = {
      destination: filename,
      resumable: true,
      validation: 'crc32c',
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: storageToken 
        },
      }
    };

    // Call Firebase Image Upload function to save to storage - which requires 2 parameters (i) the exact filePath & (ii) Options
    const result = await bucket.upload(serverFilePath, options);
    
    // Obtain bucket storage name from our upload result
    const bucketName = result[0].metadata.bucket;
    console.log(`Bucket Name: ${bucketName}`);
    
    // Construct the URL from (i) firebase base, (ii) bucket storage name, (iii) fileName submitted in POST & (iv) token
    // NOTE: We need to output the url, store in the DB so we can retrieve via GETs & display
    const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${filename}?alt=media&token=${storageToken}`;

    // Delete the files from temporary server location after bucket upload (/public/uploads)
    fs.unlink(serverFilePath, err => {
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
        ignoreNotFound: true,
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
  }
}