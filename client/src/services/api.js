import axios from 'axios';
import { toast } from 'react-toastify';

// CREATE NEW INSTANCE OF AXIOS: Allows us to customise its configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_CXAPI_URL
});

// AXIOS RESPONSE (INTERCEPTOR): Allows errors to be intercepted globally and displays messages with React Toast
api.interceptors.response.use(null, (error) => {
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
    console.log(`${error?.response.data}`);
    toast.warn(`${error.response.data}`);
  }

  // Function Return: As we a intercepting an ERROR we want to make sure we return a rejected promise
  return Promise.reject(error); 
});

// AXIOS DEFAULT CONFIGS: Set default header with each axios REQUEST for auth token
// NOTE on Authorization > x-auth-token: 
// - https://stackoverflow.com/questions/69494662/x-auth-token-vs-x-access-token-vs-authorization-in-jwt 
// - https://jwt.io/introduction/ 
// - https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes

export function setHeaderToken() {
  const token = localStorage.getItem("token");
  if(token) {
    api.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}
setHeaderToken();

// EXPORT METHODS: Need to access modified axios instance & its CRUD methods, via api.js
export default api;