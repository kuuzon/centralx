// Import in modules
const { bucket } = require('../config/db');
const debugBucket = require('debug')('app:bucket');
const config = require("../config/config");
const uuid = require('uuid');
const fs = require('fs');

module.exports = {
  async storageBucketUpload(filename) {
    // 1. GENERATE RANDOM UUID STORAGE TOKEN 
    debugBucket(`Firestore File Name: ${filename}`);
    const storageToken = uuid.v4();

    // 2. DECLARE FILEPATH & OPTIONS PARAMETER VARIABLES FOR CUSTOM BUCKET UPLOAD
    const serverFilePath = `./public/uploads/${filename}`;
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

    // OPTIONAL DEBUGGING: Checks if server-side /uploads file exists before BUCKET UPLOAD
    fs.access(serverFilePath, fs.F_OK, (err) => {
      if (err) {
        debugBucket(err);
        return({
          message: 'Error occurred in storing file to server'
        });
      } else {
        debugBucket("File Successfully Stored in Server");
      }
    });

    // 3. CLOUD FIRESTORE UPLOAD METHOD CALL
    const result = await bucket.upload(serverFilePath, options);
    const bucketName = result[0].metadata.bucket;
    debugBucket(`Bucket Name: ${bucketName}`);
    
    // 4. CONSTRUCT DOWNLOAD URL
    const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${filename}?alt=media&token=${storageToken}`;
    console.log(`File Successfully Uploaded to Storage Bucket: ${downloadURL}`)

    // 5. DELETE TEMPORARY FILE IN SERVER-SIDE UPLOADS
    fs.unlink(serverFilePath, err => {
      if(err) {
        debugBucket(err);
        return({
          message: 'Error occurred in removing file from temporary local storage'
        });
      } else {
        debugBucket('File in temporary local storage deleted');
      }
    });

    return downloadURL;
  },

  getFileFromUrl(downloadURL) {
    debugBucket(`DownloadURL from DB: ${downloadURL}`);

    // Slice off the base URL from downloadURL
    const baseURL = `https://firebasestorage.googleapis.com/v0/b/${config.db.storageBucket}/o/`;
    let fileGlob = downloadURL.replace(baseURL, "");
    
    // Remove everything after the query string
    const indexOfEndPath = fileGlob.indexOf("?");
    fileGlob = fileGlob.substring(0, indexOfEndPath);
    
    // Return file glob to be deleted 
    debugBucket(`File in Bucket for Deletion: ${fileGlob}`);
    return fileGlob;
  },

  async deleteFileFromBucket(uploadedFile) {
    // Determine File Location in Storage 
    // NOTE: You would ALSO want to CHECK if it existed in the storage bucket before deletion OTHERWISE it would hit an error!    
    const file = bucket.file(uploadedFile);
    const fileChecker = await file.exists();

    // [400 ERROR] Check for Item Existing in Storage Bucket
    // NOTE: To ensure our delete function still works against Firestore DB, we will modify the delete request to prevent an error.
    if (fileChecker[0] === false) {
      // [TOGGLE]: Set custom option parameter to prevent error returning (true = ignores missing file!)
      const options = {
        ignoreNotFound: true,
      };

      // Call modified delete request (no deletion from storage bucket)
      // NOTE: Default option is "false", meaning error is issued and delete request fails if file does NOT exist!
      const data = await file.delete(options);
      debugBucket(`The file: ${uploadedFile}, does not exist in Storage.  Please check server for inconsistent data handling & database queries.`);

      // Return API response to controller
      return data[0];

    // [SUCCESS] FILE EXISTS: Standard delete path
    } else {
      // Call standard delete request
      const data = await file.delete();
      console.log(`File deleted from Storage Bucket: ${uploadedFile}`);

      // Return API response to controller
      return data[0];
    }
  }
}