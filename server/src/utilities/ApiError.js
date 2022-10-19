// CUSTOM ERROR UTILITY CLASS
// Import development debug tool
const debugError500 = require('debug')('app:error500');

class ApiError {
  // CLASS PROPERTIES: Properties to be passed in as arguments
  constructor(code, message, err) {
    this.code = code;
    this.message = message;
    this.err = err;
  }

  // CLASS METHODS: Custom functions for each type of error we expect
  // [400] Bad Request
  static badRequest(msg) {
    return new ApiError(400, `Bad Request: ${msg}`);
  }

  // [401] Unauthorised
  // NOTE: Returned when the client provides no credentials or invalid credentials
  static denyAccess(msg) {
    return new ApiError(401, `Access Denied: ${msg}`);
  }

  // [403] Forbidden
  // NOTE: Returned when client has valid credentials BUT NOT enough privileges to perform an action on a resource
  static forbidden(msg) {
    return new ApiError(403, `Access Denied: ${msg}`);
  }

  // [404] Not Found
  static notFound() {
    return new ApiError(404, 'Resource Not Found');
  }

  // [413] Entity Too Large
  static tooLarge(msg) {
    return new ApiError(413, `Upload Failed: ${msg}`);
  }

  // [422] Entity Too Large
  static cannotProcess(msg) {
    return new ApiError(422, `Upload Failed: ${msg}`);
  }

  // [500] Internal Server Error
  // PARAMETERS: This takes two arguments - our custom message to the client + the error stack passed from the server/DB.  We will need this for debugging, so we console.log this out!
  static internal(msg, err) {
    debugError500(err);
    return new ApiError(500, `Internal Server Error: ${msg}`);
  }
}

module.exports = ApiError;