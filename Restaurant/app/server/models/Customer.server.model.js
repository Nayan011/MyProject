var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// user schema
var CustomerSchema = new Schema({


        firstName:String,
        lastName: String,
        email: {
        type: String,
      
        match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
         },
      
      password:String,
     created: {
     type: Date,
     default: Date.now
    },
    
    mobileno:Number,
    gender:String

 });

// hash the password before the user is saved
 CustomerSchema.pre('save', function(next) {
   var user = this;
 // hash the password only if the password has been changed or user is new
 if (!user.isModified('password')) return next();

 // generate the hash
 bcrypt.hash(user.password, null, null, function(err, hash) {
 if (err) return next(err);

// change the password to the hashed version
  user.password = hash;
  next();
  });
});

 // method to compare a given password with the database hash
CustomerSchema.methods.comparePassword = function(password) {
var user = this;

return bcrypt.compareSync(password, user.password);
};

// return the model
module.exports = mongoose.model('Customer', CustomerSchema);