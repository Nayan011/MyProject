var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// user schema
var ProductSchema = new Schema({


        name:String,
        price:Number,
        ingridients:[],
        
 });


module.exports = mongoose.model('Product', ProductSchema);