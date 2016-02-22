var crypto = require('crypto');
var mongoose = require('libs/mongoose');
var async = require('async');
var AuthError = require('error').AuthError;

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.encryptPassword = function(password){
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

UserSchema.virtual('password')
  .set(function(password){
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function(){ return this._plainPassword; });

UserSchema.methods.checkPassword = function(password){
  return this.encryptPassword(password) === this.hashedPassword;
};

UserSchema.statics.add = function(username, password, callback){
  var User = this;
  User.findOne({username: username}, function(err, user){
    if (err) callback(err);
    if (user){
      callback( err, username );
    } else {
      var user = new User({ username: username, password: password });
      user.save(function(err, user){
        if(err) callback(err);
        callback( err, user );
      });
    }
  });
};

UserSchema.statics.authorize = function(username, password, callback){
  var User = this;
  User.findOne({username: username}, function(err, user){
    if (err) return callback(err);
    if (user){
      if(user.checkPassword(password)){
        callback(err, user);
      } else {
        callback(err, null, username);
      }
    } else {
      callback(err);
    }
  })
};

module.exports = mongoose.model('User', UserSchema);
