  ////////REGISTER FORM/////////////
  var express=require("express");
  var router=express.Router();
 var passport  =require("passport");
var User   =require("../models/user");

    router.get("/",function(req,res){
       res.render("landing");
    });  

  router.get("/register",function(req,res){
      res.render("register");
  });
  
  
  
  //HANDLING REGISTRATION FORM/////////
  router.post("/register",function(req,res){
      var user=new User({username:req.body.username});
      User.register(user ,req.body.password,function(err,user){
          if(err){
              console.log(err);
              return res.render("register");
          }
          passport.authenticate("local")(req,res,function(){
              res.redirect("/image");
          });
      });
  });
  
  /////LOGIN FORM/////////////////
  router.get("/login",function(req,res){
      res.render("login");
  });
  
  router.post("/login",passport.authenticate("local",{
    successRedirect:"/image",
    failureRedirect:"/login"
}),function(req,res){
    });
    
    router.get("/logout",isLoggedIn,function(req,res){
        req.logout();
        res.redirect("/");
    });
  
  function isLoggedIn(req,res,next)
      {
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
    }

module.exports=router;