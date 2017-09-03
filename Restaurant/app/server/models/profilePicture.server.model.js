var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// user schema
var profilePicSchema = new Schema({


        uploadedBy: Object,
        path:String,
       uploaded_date: {
     type: Date,
     default: Date.now
    }

 });


// return the model
module.exports = mongoose.model('profilePicture', profilePicSchema);