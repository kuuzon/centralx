// Import Joi Validation module
const Joi = require('joi');
const ApiError = require('../utilities/ApiError');
const debugJoi = require('debug')('app:joi');

module.exports = {
  // [1] AUTH POST Validation
  validateAuth(req, res, next){
    debugJoi(req.body);
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(30),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });

    // Return one of two values
    const { error, value } = schema.validate(req.body);

    // ON VALIDATION ERROR: We call Error Middleware & Pass Bad Request with Dynamic Validation Error Message
    if ( error ) {
      debugJoi(error);
      switch(error.details[0].context.key){
        case 'username':
          next(ApiError.badRequest('You must provide a valid username'))
          break

        case 'email':
          next(ApiError.badRequest('You must provide a valid email'))
          break

        case 'password':
          console.log(error)
          next(ApiError.badRequest('You must provide a valid passwprd'))
          break

        default: 
          next(ApiError.badRequest('Invalid Form Information - please check form information and submit again'))
      }

    // ON SUCCSSS: We pass to next middleware
    } else {
      next();
    }
  }
  
}