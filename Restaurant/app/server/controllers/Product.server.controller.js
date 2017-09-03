var Product = require('../models/Product.server.model');
var Customer = require('../models/Customer.server.model');
var Comment = require('../models/Comment.server.model');
var config = require('../../config');
module.exports={

   
	addProduct:function(req,res){
      var product=new Product({


        name:req.body.name,
        price:req.body.price,
        ingridients:req.body.ingridients,
        

 });
     

      product.save(function(err,data)
      	{

      		if(err)
      			res.send(err);
      		//console.log(data);
              
      		res.redirect('/products');
      	});

	},
	getProducts:function(req,res){

      Product.find({},function(err,data)
      	{

      		if(err)
      		res.send(err);
      	//console.log(data);
      	res.render('./views/product/productList.ejs',{products:data});
      	});
	},
	getSingleProductWithComments:function(req,res)
	{
  
    Product.aggregate([{$lookup:{from:Comment,localField:_id,foreignField:product,as:'coms'}}],function(err,data){

      console.log("hmm data:"+JSON.stringify(data));
    });
	 	
	}

	/*addComment:function(req,res){

  Customer.findOne({_id:req.session.currentCustomerId},function(err,customer)
{
 console.log(customer);
  Product.find({_id:req.params.id},function(err,data)
{ 
  console.log(data);
  req.session.id=data[0]._id;
  Product.update({_id:data[0]._id},
        {$push: {'comments': {description:req.body.description,commentDate:new Date(),commentedBy:customer}}},
        {safe: true, upsert: true},
        function(err, model) {
            console.log(model);
            res.redirect('/productDetail/'+req.session._id);
        }
    );
    //console.log(data);
});// einds Post.find 


});
   }//end addComment
*/
     

}

