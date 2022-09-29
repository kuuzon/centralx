// Import custom modules & configurations 
const { db } = require('../config/db');
const config = require('../config/config');

// Import modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

module.exports = {
  async findUser(email) {
    // (a) Set our DB variables & call GET on user collection
    const usersRef = db.collection('users'); 
    const snapshot = await usersRef.get();

    // (b) Push each user doc into users array for manipulation
    let users = [];
    snapshot.forEach(doc => {
      users.push({
        id: doc.id,
        username: doc.data().username,
        email: doc.data().email,
        password: doc.data().password,
        isAdmin: doc.data().isAdmin
      });
    });

    // (c) Search the user email passed in against all emails in the users DB array 
    const userMatch = users.filter( user => 
      email === user.email  
    );

    // (d) Return value for match (we MAY or MAY NOT want a match!)
    return userMatch;
  },

  async hashPassword(password) {
    // Encrypt our password ("hash & salt")
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
  },

  async comparePassword(user, password) {
    // (a) Retrieves hashed password in DB
    const hashPassword = user[0].password;

    // (b) Compare password passed in with DB hashed password via Bcrypt for match
    const passwordMatch = await bcrypt.compare(
      password, 
      hashPassword
    );

    // (c) Return result (we want a match!)
    return passwordMatch;
  },

  async userDetailsToJSON(id) {
    // (a) Call New Registered User Data 
    const usersRef = db.collection('users'); 
    const user = await usersRef.doc(id).get();

    // (b) Convert Data to JSON (EXCEPT password!)
    // NOTE: We use the spread operator to merge the id into the user object (it sits OUTSIDE it in the DB)
    // NOTE: We also call a lodash method to EXCLUDE the password while reconstructing the user object
    const userJSON = _.omit(
      { id: id, ...user.data() },
      'password'
    );
    console.log(userJSON);

    return userJSON;
  },

  jwtSignUser(user) {
    // (a) Declare variables for generation of token
    // NOTE: SET Time-To-Live (TTL) - we set the token to expire after 24 hours
    const payload = user;
    const secret = config.authentication.jwtSecret;
    const tokenExpireTime = 60 * 60 * 24

    // (b) Generate token 
    // NOTE: Creates token from user details, signs it with the app secret & sets an expiry
    const token = jwt.sign(
      payload,
      secret,
      { expiresIn: tokenExpireTime }
    );

    // (c) Return token as ouput
    return token;
  }
}