// DATABASE CONFIGURATION
// Imports of db admin modules (imports the admin libraries)
var admin = require("firebase-admin");
const config = require("./config");

// Import debug logs
const dbStartup = require('debug')('app:db');
const debugError500 = require('debug')('app:error500');

try {
  // DEBUG: Notify attempting DB connection
  dbStartup('Attempting database connection...');
  // Imports of db credentials
  var serviceAccount = require(config.db.serviceAccountKey);
  
  // Configure database with our credentials + storage bucket details (for file/image storing)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: config.db.storageBucket
  });
  // DEBUG: Notify DB connection succeeded
  dbStartup('Connected to the database');
  
  // Store core database functions in variable objects (these each represent its OWN API, as part of the wider admin SDK!)
  const db = admin.firestore();
  const bucket = admin.storage().bucket();

  // DB Ping function
  const dbPing = db.listCollections()
  .then(collections => {
    for (let collection of collections) {
      dbStartup(`Found db collection: ${collection.id}`);
    }
  });

  // Export variable objects for use in our application
  module.exports = { db, bucket, dbPing };

// DEBUG: Unhandled error will be logged to console
} catch(err) {
  debugError500(error);
}