var express=require("express");
var router=express.Router();
var Image   =require("../models/image");
//////INDEX ROUTE////////////////  

    
    router.get("/image",isLoggedIn,function(req,res){
         Image.find({},function(err,images){
           if(err){
               console.log(err);
           }else{
               res.render("index",{i:images,currentUser:req.user});
           } 
        });
    });
    
  ////FORM ROUTE////////////////
  router.get("/new",isLoggedIn,function(req,res){
      res.render("form");
  });
  
  ////SUBMISSION OF FORM//////////
  router.post("/new",function(req,res){
      Image.create(req.body.i,function(err){
          if(err){
              console.log(err);
          }
          res.redirect("/image");
      })
  });
   
  ///////SHOW ROUTE//////////////
  router.get("/image/:id",isLoggedIn,function(req,res){
      Image.findById(req.params.id).populate("comments").exec(function(err,image){
          if(err){
              console.log(err);
          }
          else{
              console.log(image);
              res.render("show",{i:image});
          }
      });
  });
  
  ///////EDIT ROUTE///////////////
  router.get("/image/:id/edit",isLoggedIn,function(req,res){
      Image.findById(req.params.id,function(err,im){
          if(err){
              console.log(err);
          }
          else{
              res.render("edit",{single:im});
          }
      })
      
  });
  
  ///////////UPDATE ROUTE//////////
  router.put("/image/:id",function(req,res){
      Image.findByIdAndUpdate(req.params.id,req.body.i,function(err,update){
          if(err){
              console.log(err);
          }else{
              res.redirect("/image/"+req.params.id);
          }
      });
  });
  
  
  ////////DELETE///////////////
  router.delete("/image/:id",function(req,res){
      Image.findByIdAndRemove(req.params.id,function(err){
          if(err){
             
          }else{
               res.redirect("/image");
          }
      });
  });
  
  function isLoggedIn(req,res,next)
      {
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
    }
    module.exports=router;