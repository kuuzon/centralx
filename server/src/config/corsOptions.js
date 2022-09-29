const config = require("./config");
// CORS: https://www.npmjs.com/package/cors

const whitelist = config.corsAllowedOptions;
console.log(whitelist);

const corsOptions = {
  origin: (origin, callback) => {
    if(whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}

module.exports = corsOptions;