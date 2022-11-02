const fs = require('fs');
const debugServerFile = require('debug')('app:serverfile');

module.exports = {
  // CHECK IF FILE EXISTS IN SERVER
  checkServerFile(serverFilePath){
    fs.access(serverFilePath, fs.F_OK, (err) => {
      if (err) {
        debugServerFile(err);
        return({
          message: 'Error occurred in storing file to server'
        });
      } else {
        debugServerFile("File Successfully Stored in Server");
      }
    });
  },

  // DELETE FILE FROM SERVER
  deleteServerFile(serverFilePath){
    fs.unlink(serverFilePath, err => {
      if(err) {
        debugServerFile(err);
        return({
          message: 'Error occurred in removing file from temporary local storage'
        });
      } else {
        debugServerFile('File in temporary local storage deleted');
      }
    });
  }
}