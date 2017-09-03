var Customer = require('../models/Customer.server.model');
var config = require('../../config');
var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())
var jwt = require('jsonwebtoken');

module.exports={

   
	createCustomer:function(req,res){
     Customer.findOne({email:req.body.InputEmail1},function(err,customer)

 	{
 		if(customer){
          console.log('customer id: '+customer._id);
 			res.json({ 
	        	success: false, 
	        	message: 'Customer exits.' 
	      	});
 		}
 		else
 		{
 var customer1 = new Customer(); // create a new instance of the User model
 customer1.firstName = req.body.firstname; // set the users name (comes from the request)
 customer1.lastName = req.body.lastname; // set the users username (comes from the request)
 customer1.password = req.body.InputPassword; // set the users password (comes  from the request)
 customer1.email=req.body.InputEmail1;
 customer1.mobileno=req.body.InputMobile;
 customer1.gender=req.body.sell;
 

 customer1.save(function(err,customer) {
 if (err) res.send(err);
 console.log(customer);
 var token = jwt.sign({ _id: customer._id }, config.secret, { expiresIn: "60 days" });
  res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });

 // return a message
/*res.json({ message: 'User created!' });*/
 res.redirect('/login');
 });
 		}
 	});
	
},
findAllCustomers:function(req,res)
{

	Customer.find({},function(err,customers)
		{
			console.log(err);
			console.log(customers);
			res.render('./views/customer/customerList.ejs',{customers:customers});
		});
}


}

/*getUsers:function(req, res) {
	var user = new User();
 User.find(function(err, users) {
 if (err) res.send(err);

 // return the users
 res.json(users);
 });
},
 
 getSingleUser:function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
 if (err) res.send(err);

 // return that user
 res.json(user);
 });
 },

  updateUser:function(req, res) {
 User.findById(req.params.user_id, function(err, user) {

 if (err) res.send(err);

// set the new user information if it exists in the request
 if (req.body.name) user.name = req.body.name;
 if (req.body.username) user.username = req.body.username;
 if (req.body.password) user.password = req.body.password;

 // save the user
 user.save(function(err) {
 if (err) res.send(err);

 // return a message
 res.json({ message: 'User updated!' });
 });

 });
 },

 deleteUser:function(req, res) {
 User.remove({
 _id: req.params.user_id
}, function(err, user) {
 if (err) res.send(err);


 res.json({ message: 'Successfully deleted' });
 });
 },*/

 




