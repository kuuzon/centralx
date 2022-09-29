// IMPORTED SERVER MODULES
// Import external packages
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const helmet = require("helmet");
const cors = require('cors');

// Import local modules
const config = require('./config/config'); 
const corsOptions = require('./config/corsOptions');
const { dbPing } = require('./config/db');
const ApiError = require('./utilities/ApiError');
const apiErrorHandler = require('./middleware/apiErrorHandler');
const routes = require('./routes/routes');

// Import root debug
const debugStartup = require('debug')('app:startup');

// Instantiated Express for Server
const app = express();

// EXPRESS MIDDLEWARE
// HTTP Header-setter security
app.use(helmet());

// Cross Origin Resource Sharing
app.use(cors(corsOptions));
debugStartup('Helmet & CORS Pre-Flight requests enabled on all routes');

// Middleware for json
app.use(express.json());

// Middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// File parsing middleware
app.use(fileUpload());

// Middlware to track our query performance, status & speed
app.use(morgan('dev'));

// Main routing middleware function
app.use('/api', routes());

// Not Found Route
app.use((req, res, next) => {
  next(ApiError.notFound());
});

// Error Handler Middleware
app.use(apiErrorHandler);

// Ping DB & Set Port
dbPing.then(() => {
  app.listen(
    config.port, 
    () => console.log(`Server is running on port: ${config.port}`)
  );
});