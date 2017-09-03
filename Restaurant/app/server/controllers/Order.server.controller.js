var Order = require('../models/Order.server.model');
var Product = require('../models/Product.server.model');
var Customer = require('../models/Customer.server.model');
var config = require('../../config');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var express = require('express');
var app=express();
app.use(session({secret: 'ssshhhhh'}));
module.exports={

   
	sendOrder:function(req,res){
      
     Product.find({},function(err,prod){
      Customer.findOne({email:'engg.nayan@yahoo.com'},function(err,customer){
       //console.log(product);
       //console.log(customer);

        var order=new Order({
            orderedBy:customer,

            products:[{
                  numberOfItems:17,
                  selectedProduct:req.body.product
            }]//ends products
            
            
          });//finish Order
        order.save(function(err, order){
          res.redirect('/sendOrder');
          
          console.log(order);


         /* Order.find({}).populate('orderedBy').populate('products.selectedProduct')
            .exec(function(e,d){
                  req.session.data=d;
                  // console.log(JSON.stringify(d, null, "\t"));
            });
             console.log(req.session.data);*/

        } );// ends order.save method

        });//ends Customer.findOne method

     });//ends Product.findOne method
     
         
     }// ends sendOrder method

     

}

