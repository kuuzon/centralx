// Create file name from URL in DB
function getFileFromUrl(downloadURL) {
  // Slice off the base URL from downloadURL
  const baseURL = `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_STORAGE_BUCKET_URL}/o/`;
  console.log(baseURL);
  let fileGlob = downloadURL.replace(baseURL, "");
  
  // Remove everything after the query string
  const indexOfEndPath = fileGlob.indexOf("?");
  fileGlob = fileGlob.substring(0, indexOfEndPath);
  
  // Return existing uploaded file glob
  console.log(`Generated File Glob: ${fileGlob}`);
  return fileGlob;
};

const writeUtils = {
  getFileFromUrl
}

export default writeUtils;