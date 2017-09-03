var Customer = require('../models/Customer.server.model');
var config = require('../../config');
var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())
var jwt = require('jsonwebtoken');
module.exports={
customerLogin:function(req, res) {
	if(req.body!==null)
     {
     	req.session.email=req.body.email;
     }
   
	  // find the user
	  Customer.findOne({email: req.session.email},function(err, customer) {//starts Customer.findOne method
       console.log(customer);
       console.log('user id: '+customer._id);
       req.session.id=customer._id;

	    if (err) throw err;

	    // no user with that username was found
	    if (!customer) {// checks customer or not starts
	      res.redirect('/');
	    }// ends customer checking

	    if (customer) {// checks if customer

	      // check if password matches
	      var validPassword = customer.comparePassword(req.body.InputPassword);
	      if (!validPassword) {
	        res.json({ 
	        	success: false, 
	        	message: 'Authentication failed. Wrong password.' 
	      	});
	      }
	       else {


              req.session.currentCustomerId=customer._id;
              var token = jwt.sign({ _id: customer._id }, config.secret, { expiresIn: "60 days" });
              res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
              res.redirect('/products');


          }
        
         
	        
	      }   //ends checking if customer

	    });//ends customer.findOne method

	  
	}// ends customerLogin function
}