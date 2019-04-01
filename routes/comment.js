    ////////////////////////////////
    ////COMMENTS ROUTES////////////
    ///////////////////////////////
    var express=require("express");
var router=express.Router();
var Image   =require("../models/image");
var Comment =require("../models/comments.js");
    router.get("/image/:id/comments/new",isLoggedIn,function(req,res){
        Image.findById(req.params.id,function(err,img){
            if(err){
                console.log(err);
            }else{
                res.render("comments/comment",{img:img});
            }
        });
    });
    
    router.post("/image/:id/comments",function(req,res){
        //LOOKUP LAKE USING ID
        Image.findById(req.params.id,function(err,image){
            if(err){
                console.log(err);
            }else{
                Comment.create(req.body.i,function(err,imag){
                    if(err){
                        res.redirect("/image");
                    }else{
                        image.comments.push(imag);
                        image.save();
                        res.redirect("/image/"+req.params.id);
                    }
                });
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