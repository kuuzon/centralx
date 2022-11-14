// DATABASE CONFIGURATION
var admin = require("firebase-admin");
const config = require("./config");
const dbStartup = require('debug')('app:db');
const debugError500 = require('debug')('app:error500');

try {
  dbStartup('Attempting database connection...');
  // Imports of db credentials
  var serviceAccount = require(config.db.serviceAccountKey);
  
  // Configure database services
  admin.initializeApp({
    // Set Application Default Credentials (ADC implicitly determines credentials from GOOGLE_APPLICATION_CREDENTIALS ENV)
    credential: admin.credential.cert(serviceAccount),
    // credential: admin.credential.applicationDefault(),
    storageBucket: config.db.storageBucket
  });
  
  // Store core database functions in variable objects (these each represent its OWN API, as part of the wider admin SDK!)
  const db = admin.firestore();
  const bucket = admin.storage().bucket();
  
  // DB Ping function
  const dbPing = db.listCollections()
  .then(collections => {
    dbStartup("Connected to Cloud Firestore");
    for (let collection of collections) {
      dbStartup(`DB collection: ${collection.id}`);
    }
  });

  // Export variable objects for use in our application
  module.exports = { db, bucket, dbPing };

// DEBUG: Unhandled error will be logged to console
} catch(err) {
  debugError500(error);
}