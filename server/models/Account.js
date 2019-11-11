// - REQUIRE -
// Encapsulate secure credentials
const crypto = require('crypto');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let AccountModel = {};
const iterations = 10000;
const saltLength = 64;
const keyLength = 64;

// - SCHEMA DEFINITION -
const AccountSchema = new mongoose.Schema({
  username: {
    type: String,  // the type of schema
    required: true,  // path must be set before saving can occur
    trim: true,  // calls .trim()
    unique: true,  // unique index created for this path
    match: /^[A-Za-z0-9_\-.]{1,32}$/,  // RegExp, checks if value is in given array
  },
  
  salt: {
    type: Buffer,
    required: true,
  },
  
  password: {
    type: String,
    required: true,
  },
  
  createdDate: {
    type: Date,
    default: Date.now,  // Default value of SchemaType
  }
});

// - STATICS / FUNCTIONS -
AccountSchema.statics.toAPI = doc => ({
  username: doc.username,
  _id: doc._id,
});

const validatePassword = (doc, password, callback) => {
  const pass = doc.password;
  
  return crypto.pbkdf2(password, doc.salt, iterations, keyLength, 'RSA-SHA512', (err, hash) =>{
    if(hash.toString('hex') !== pass) {
      return callback(false);
    }
    
    return callback(true);
  });
};

AccountSchema.statics.findByUsername = (name, callback) => {
  const search = {
    name: name,
  };
  
  return AccountModel.findOne(search, callback);
};

AccountSchema.statics.generateHash = (password, callback) => {
  const salt = crypto.randomBytes(saltLength);
  
  crypto.pbkdf2(password, salt, iterations, keyLength, 'RSA-SHA512', (err, hash) =>
    callback(salt, hash.toString('hex'))
  );
};

AccountSchema.statics.authenticate = (username, password, callback) => 
AccountModel.findByUsername(username, (err, doc) => {
  if (err) {
    return callback(err);
  }
  
  if (!doc) {
    return callback();
  }
  
  return validatePassword(doc, password, (result) => {
    if(result === true) {
      return callback(null, doc);
    }
    
    return callback();
  });
});

AccountModel = mongoose.model('Account', AccountSchema);

module.exports.AccountModel = AccountModel;
module.exports.AccountSchema = AccountSchema;