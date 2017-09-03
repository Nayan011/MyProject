var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var Product=require('./Product.server.model');
var Customer=require('./Customer.server.model');

// user schema
var OrderSchema = new Schema({



 orderedBy:Object,
    orderDate: {
     type: Date,
     default: Date.now
    },
    
    products:[{

    	numberOfItems:Number,
    	selectedProduct: Object
    }]

 });



module.exports = mongoose.model('Order', OrderSchema);