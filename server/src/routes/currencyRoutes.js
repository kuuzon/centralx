// CENTRAL ROUTE FILE
// Import express and router 
const express = require('express'); 
const router = express.Router();

// Import modules
const CurrencyPolicy = require('../policies/currencyPolicy');
const FilePolicy = require('../policies/filePolicy');
const fileServerUpload = require('../middleware/fileServerUpload');
const CurrencyController = require('../controllers/currencyController');

// Setup routes within export function
module.exports = () => {
  // CURRENCY ROUTES
  // GET Route
  router.get('/', 
    CurrencyController.getCurrency
  );
  // POST Route
  router.post('/', 
    [CurrencyPolicy.validateCurrency,
    FilePolicy.filesPayloadExists,
    FilePolicy.fileSizeLimiter,
    FilePolicy.fileExtLimiter(['.png', '.jpg', '.jpeg', '.gif']),
    fileServerUpload],
    CurrencyController.postCurrency
  );
  // GET BY ID Route
  router.get('/:id',
    CurrencyController.getCurrencyById
  );
  // UPDATE BY ID Route
  router.put('/:id',
    [CurrencyPolicy.validateCurrency,
    FilePolicy.filesPayloadExists,
    FilePolicy.fileSizeLimiter,
    FilePolicy.fileExtLimiter(['.png', '.jpg', '.jpeg', '.gif']),
    fileServerUpload],
    CurrencyController.putCurrencyById
  );
  // DELETE BY ID Route
  router.delete('/:id',
    CurrencyController.deleteCurrencyById
  );

  return router
}