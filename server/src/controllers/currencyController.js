// Import modules
const { db } = require('../config/db');
const ApiError = require('../utilities/ApiError');
const { storageBucketUpload, getFilePathFromUrl, deleteFileFromBucket } = require('../utilities/bucketServices');

// Debug logs
const debugREAD = require('debug')('app:read');
const debugWRITE = require('debug')('app:write');

module.exports = {
  // [1] GET Currency (w SORT KEY)
  async getCurrency(req, res, next){
    try {
      // Store the collection reference in variable & call GET method
      const currencyRef = db.collection('currency');

      // [A] BASE OPTION: All Currencies
      const snapshot = await currencyRef.orderBy("name", "asc").get();

      // [B] INDEX OPTION: Currency Name in Ascending Order
      // const snapshot = await currencyRef.where("status", "==", "tradeable").orderBy("name", "asc").limit(5).get();

      // [C] INDEX OPTION: Currency Name in Descending Order
      // const snapshot = await currencyRef.where("status", "==", "pending").orderBy("name", "desc").limit(5).get();
  
      // [400 ERROR] Check for User Asking for Non-Existent Documents
      if (snapshot.empty) {
        return next(ApiError.badRequest('The items you were looking for do not exist'));

      // SUCCESS: Push object properties to array and send to client
      } else {
        let docs = [];
        snapshot.forEach(doc => {
          docs.push({
            id: doc.id,
            name: doc.data().name,
            symbol: doc.data().symbol,
            current_price: doc.data().current_price,
            price_change_percentage_24h: doc.data().price_change_percentage_24h,
            status: doc.data().status,
            description: doc.data().description,
            nation: doc.data().nation,
            image: doc.data().image,
          });
        });
        res.send(docs);
      }

    // [500 ERROR] Checks for Errors in our Query - issue with route or DB query
    } catch(err) {
      return next(ApiError.internal('The currencies selected could not be found', err));
    }
  },

  // [2] POST Currency
  async postCurrency(req, res, next){
    // (a) Validation (JOI) Direct from Form (refactored)
    debugWRITE(req.body);
    debugWRITE(req.files);
    debugWRITE(res.locals);

    // (b) File Upload to Storage Bucket
    let downloadURL = null;
    try {      
      const filename = res.locals.filename;
      downloadURL = await storageBucketUpload(filename);

    // [500 ERROR] Checks for Errors in our File Upload
    } catch(err) {
      return next(ApiError.internal('An error occurred in uploading the image to storage', err));
    }
    
    // (c) Store the currency document query in variable & call ADD method (NOT using SET())
    try {
      const currencyRef = db.collection('currency');
      const response = await currencyRef.add({
        name: req.body.name,
        symbol: req.body.symbol,
        current_price: Number(req.body.current_price),
        price_change_percentage_24h: Number(req.body.price_change_percentage_24h),
        status: req.body.status,
        description: req.body.description,
        nation: req.body.nation,
        image: downloadURL
      });
      console.log(`Added Currency with ID: ${response.id}`);
      res.send(response.id);

    // [500 ERROR] Checks for Errors in our Query - issue with route or DB query
    } catch(err) {
      return next(ApiError.internal('Your request could not be saved at this time', err));
    }
  },

  // [3] GET Currency BY ID
  async getCurrencyById(req, res, next){
    // Test: Check ID passed via URL query string parameters
    debugREAD(req.params);

    try {
      // Store the currency document query in variable & call GET method for ID
      const currencyRef = db.collection('currency').doc(req.params.id);
      const doc = await currencyRef.get();

      // [400 ERROR] Check for User Asking for Non-Existent Documents
      if (!doc.exists) {
        return next(ApiError.badRequest('The currency you were looking for does not exist'));

      // SUCCESS: Send back the specific document's data
      } else {
        res.send(doc.data());
      }

    // [500 ERROR] Checks for Errors in our Query - issue with route or DB query
    } catch(err) {
      return next(ApiError.internal('Your request could not be processed at this time', err));
    }
  },

  // [4] PUT Currency BY ID
  async putCurrencyById(req, res, next){
    // (a) Validation (JOI) Direct from Form (refactored)
    debugWRITE(req.body);
    debugWRITE(req.files);
    debugWRITE(res.locals);

    // (b1) File Upload to Storage Bucket
    // IMAGE CHANGED: If the image is updated, a new file will be saved under req.files
    // NOTE: We will call standard file uploader + we will ALSO need to delete the OLD image URL from the storage location (if there is one)
    let downloadURL = null;
    try {      
      if (req.files){
        // (i) Storage-Upload
        const filename = res.locals.filename;
        downloadURL = await storageBucketUpload(filename);

        // (ii) Delete OLD image version in Storage Bucket, if it exists
        if (req.body.filePath) {
          debugWRITE(`Deleting old image in storage: ${req.body.filePath}`);
          const bucketResponse = await deleteFileFromBucket(req.body.filePath);
        }
      // (b2) IMAGE NOT CHANGED: We just pass back the current downloadURL and pass that back to the database, unchanged!
      } else if (req.body.image) {
        console.log(`No change to image in DB`);
        downloadURL = req.body.image;
        
      } else {
        return next(ApiError.badRequest('The file you are trying to upload cannot be edited at this time'));
      }

    // [500 ERROR] Checks for Errors in our File Upload
    } catch(err) {
      return next(ApiError.internal('An error occurred in saving the image to storage', err));
    }

    // (c) Store the currency document query in variable & call UPDATE method for ID
    try {
      const currencyRef = db.collection('currency').doc(req.params.id);
      const response = await currencyRef.update({
        name: req.body.name,
        symbol: req.body.symbol,
        current_price: Number(req.body.current_price),
        price_change_percentage_24h: Number(req.body.price_change_percentage_24h),
        status: req.body.status,
        description: req.body.description,
        nation: req.body.nation,
        image: downloadURL
      });
      res.send(response);

    // [500 ERROR] Checks for Errors in our Query - issue with route or DB query
    } catch(err) {
      return next(ApiError.internal('Your request could not be processed at this time', err));
    }
  },

  // [5] DELETE Currency BY ID
  async deleteCurrencyById(req, res, next){
    // (a) Delete document image file from storage 
    try {
      // (i) Store the currency document query in variable & call GET method for ID
      const currencyRef = db.collection('currency').doc(req.params.id);
      const doc = await currencyRef.get();

      // [400 ERROR] Check for User Asking for Non-Existent Documents
      if (!doc.exists) {
        return next(ApiError.badRequest('The currency you were looking for does not exist'));
      } 
      
      // (ii) Store downloadURL and obtain filePath in storage bucket
      const downloadURL = doc.data().image;
      const filePath = getFilePathFromUrl(downloadURL);

      // (iii) Call storage bucket delete function & delete specified filepath
      const bucketResponse = await deleteFileFromBucket(filePath);

      // (b) Delete document from Cloud Firestore
      if (bucketResponse) {
        // Call DELETE method for ID (with PRECONDITION parameter to check document exists)
        // NOTE: We defined currencyRef earlier!
        const response = await currencyRef.delete({exists:true});

        // SUCCESS: Issue back response for timebeing
        res.send(response);
      }

    // [500 ERROR] Checks for Errors in our Query - issue with route or DB query
    } catch(err) {
      return next(ApiError.internal('Your request could not be saved at this time', err));
    }
  }
}