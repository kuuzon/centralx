import axios from 'axios';
import { toast } from 'react-toastify';

// CREATE NEW INSTANCE OF AXIOS: Allows us to customise its configuration
const cgApi = axios.create({
  baseURL: "https://api.coingecko.com/api/v3"
});

// AXIOS RESPONSE (INTERCEPTOR): Allows errors to be intercepted globally and displays messages with React Toast
cgApi.interceptors.response.use(null, (error) => {
  // Setting Expected Error Range: If it is a error from 400 - 500
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status &&
    error.response.status < 500;
  console.log(expectedError);

  if (!expectedError) {
    // NOTE: We could also implement a logging system for errors here
    console.log(`Interceptors - ${error}`);
    toast.error('Unexpected Error');
  } else {
    // STANDARDISED: By creating uniform error responses, like our backend, we can standardise our errors on the front end
    console.log(`${error?.response}`);
    toast.warn(`${error.response.data}`);
  }

  // Function Return: As we a intercepting an ERROR we want to make sure we return a rejected promise
  return Promise.reject(error); 
});

// AXIOS DEFAULT CONFIGS: Set default header with each axios REQUEST for auth token
// cgApi.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
// cgApi.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
function setAuthToken(token) {
  cgApi.defaults.headers.common["x-auth-token"] = '';
  delete cgApi.defaults.headers.common["x-auth-token"];

  if (token) {
    cgApi.defaults.headers.common["x-auth-token"] = `${token}`;
  }
}
setAuthToken(localStorage.getItem("token"));

// EXPORT METHODS: Need to access modified axios instance & its CRUD methods, via api.js
export default cgApi;