var Product = require('../models/Product.server.model');
var Customer = require('../models/Customer.server.model');
var Comment = require('../models/Comment.server.model');
var config = require('../../config');
module.exports={
	addComment:function(req,res){

  Customer.findOne({_id:req.session.currentCustomerId},function(err,customer)
{
 console.log(customer);
  Product.findOne({name:'VAt'},function(err,product)
  { 
  
    var comment=new Comment({// starts comment
     description:" I am Nuruzzaman",
    
     customer:req.session.currentCustomerId,
      product:product._id
     //commentDate:new Date()

    });//ends comment

  
   comment.save(function(err,data){//comment.save method starts
     Comment.find({})
     .populate('product ')
            .populate('customer')
            
            .exec(function(error, comments) {
              //console.log(posts);
        res.render('./views/comment/commentList.ejs',{comments:JSON.parse(comments)});
               console.log(JSON.stringify(comments, null, "\t"))
            });// exec method ends
    
   });// ends comment.save method
    
  });// einds Product.find 


});
   },//end addComment

   getComments:function(req,res){
    Comment.find({})
     
            
            .populate('product')
            .populate('customer')
            .exec(function(error, comments) {
              //console.log(posts);
        res.render('./views/comment/commentList.ejs',{comments:comments});
               console.log(JSON.stringify(comments, null, "\t"))
            });// exec method ends

   }// ends getComment function

     

}


