var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan'); // used to see requests
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var session = require('express-session');
var app = express();
//var Customer = require('./models/Customer.server.model');
var config = require('./config');
var jwt = require('jsonwebtoken');
//require('./routes/userProfile.server.route')(app);
app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());
 app.use(cookieParser())
 app.use(session({secret: 'ssshhhhh'}));
 app.use(express.static(__dirname + '/client'));
 app.set('views', path.join(__dirname, 'views'));
 app.set('views', './client');

 app.set('view  engine', 'ejs'); // set up ejs for templating


 app.use(morgan('dev'));

 mongoose.connect(config.database);
 var customerController=require('./server/controllers/Customer.server.controller');
 var productController=require('./server/controllers/Product.server.controller');
 var orderController=require('./server/controllers/Order.server.controller');
 var customerAuthenticationController=require('./server/controllers/CustomerAuthentication.server.controller');
 var commentController=require('./server/controllers/Comment.server.controller');
 var checkAuth = function (req, res, next) {
  console.log("Checking authentication");

  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.customer = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.customer = decodedToken.payload;
    console.log("from d"+req.customer);
  }

  next()
};

app.use(checkAuth);

 app.get('/', function(req, res) {
 res.render('./views/customer/signup.ejs');
 });
 
 app.post('/',customerController.createCustomer);


app.get('/customers',customerController.findAllCustomers);

app.get('/addProduct',function(req,res)
                                     {

  res.render('./views/product/addProduct.ejs');
});
app.get('/products',productController.getProducts);
app.post('/addProduct',productController.addProduct);
app.get('/sendOrder',productController.getProducts);
app.post('/sendOrder',orderController.sendOrder);
app.get('/productDetail/:id',productController.getSingleProductWithComments);

app.get('/login',function(req,res){

  res.render('./views/auth/login.ejs');
;
});
app.post('/login',customerAuthenticationController.customerLogin);
app.get('/commentList',commentController.getComments);
/*app.get('/addComment',function(req,res){

res.render('./views/product/addComment.ejs');

});*/
app.get('/addComment',commentController.addComment);
//app.post('/addComment',productController.addComment);



 // START THE SERVER
 // ===============================
 //var port=process.env.PORT || 8080,
 app.listen(config.port);
 console.log('Magic happens on port ' + config.port);