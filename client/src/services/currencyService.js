import api from "../services/api";

// MAIN AXIOS CURRENCY METHODS:
// GET - CurrencyMenu
function get() {
  return api.get('/api/currency');
};
// POST - AddCurrency
function post(data) {
  const formData = prepareFormData(data);
  return api.post(
    '/api/currency', 
    formData, 
    formConfig
  );
};
// GET BY ID - CurrencyDetail
function getById(id) {
  return api.get('/api/currency/' + id);
};
// PUT - EditCurrency
function put(id, data, uploadedfile) {
  const formData = prepareFormData(data, uploadedfile);
  return api.put(
    '/api/currency/' + id, 
    formData, 
    formConfig
  );
};
// DELETE - CurrencyDetail
function del(id) {
  return api.delete('/api/currency/' + id);
};

// REFACTORED VARIABLES/FUNCTIONS: Repeated code better abstracted to keep source code DRY (called above)
// [1] Form Config: sets the content header to form data
const formConfig = {
  headers: {
    'content-type': 'multipart/form-data'
  }
};

// [2] Form Data: format of mixed data when uploading files
function prepareFormData(data, uploadedfile){
  // New instance of class
  let formData = new FormData();

  // Append reconfigured mixed data to new object
  formData.append('name', data.name);
  formData.append('symbol', data.symbol);
  formData.append('current_price', data.current_price);
  formData.append('price_change_percentage_24h', data.price_change_percentage_24h);
  formData.append('status', data.status);
  formData.append('description', data.description);
  formData.append('nation', data.nation);
  formData.append('image', data.image);
  if (uploadedfile) {
    formData.append('uploadedFile', uploadedfile);
  }
  
  // Return restructured form data (for our API)
  return formData;
};

// [3] Create file name from URL in DB
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

const currencyService = {
  get,
  getById,
  post,
  put,
  del,
  getFileFromUrl
}

export default currencyService;