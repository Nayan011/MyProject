var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// user schema
var CommentSchema = new Schema({


        description:String,
        customer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        },
       product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        
        commentDate:Date

 });


module.exports = mongoose.model('Comment', CommentSchema);