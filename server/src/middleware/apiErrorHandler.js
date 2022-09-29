// ERROR HANDLING MIDDLEWARE
// NOTE: All errors get passed to this middleware and issue a response + sets a catch-all if our Error Utility does not encompass a specific error!

const ApiError = require('../utilities/ApiError');

function apiErrorHandler(err, req, res, next) {
  // Middleware Checks if the Error is one of our Pre-Defined Methods ("instanceof")
  if(err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
    
  // Middleware Catch-All: If it doesn't fall within a Pre-Defined Method, it passes to a General Error Message & Logs the Error Stack
  } else {
    console.error(err);
    res.status(500).json({
      message: 'Oops! Something went wrong - Please try again later'
    });
  }

}

module.exports = apiErrorHandler;