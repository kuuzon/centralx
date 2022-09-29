// CUSTOM ERROR UTILITY CLASS
// NOTE: Will set our different error types and attach error codes + stacks if need be (think of it like it organises our errors)

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
  // NOTE: Depending on the function, it may take different parameters depending on what we want it to display in browser and/or console

  // [400] Bad Request
  // PARAMETERS: We just pass in our custom message & status code is set as part of the function
  static badRequest(msg) {
    return new ApiError(400, `Bad Request: ${msg}`);
  }

  // [404] Not Found
  // PARAMETERS: Takes no arguments as it's a static error (only ever going to give one message!)
  static notFound() {
    return new ApiError(404, 'Resource Not Found');
  }

  // [500] Internal Server Error
  // PARAMETERS: This takes two arguments - our custom message to the client + the error stack passed from the server/DB.  We will need this for debugging, so we console.log this out!
  static internal(msg, err) {
    debugError500(err);
    return new ApiError(500, `Internal Server Error: ${msg}`);
  }
}

module.exports = ApiError;