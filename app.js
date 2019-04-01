var express      =require("express"),
        app      =express(),
   bodyParser    =require("body-parser"),
   mongoose      =require("mongoose"),
   Image         =require("./models/image"),
   seedDB        =require("./seeds.js"),
    LocalStrategy =require("passport-local"),
    methodOverride=require("method-override"),
     passport  =require("passport"),
   passportLocalMongoose=require("passport-local-mongoose");
   var passport  =require("passport");
var User   =require("./models/user");
var passportLocal =require("passport-local");

   app.set("view engine","ejs");
   mongoose.connect("mongodb://localhost:27017/img_gallery");
   app.use(bodyParser.urlencoded({extended:true}));
   app.use(methodOverride("_method"));
   app.use(require("express-session")({
    secret:"Why would i tell u",
    resave: false,
    saveUninitialized: false
    }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

   
   app.use(function(req,res,next){
   res.locals.currentUser=req.user;
   next();
});
   
   var indexroutes=require("./routes/index.js"),
        commentroutes=require("./routes/comment.js"),
        authroutes=require("./routes/authenticate.js");
        
    app.use(indexroutes);
    app.use(commentroutes);
    app.use(authroutes);
   
   

    
    
    
    

    
   seedDB();
    
 //ROUTES///////////////////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////////////////////////
 
 
  

  
  app.listen(process.env.PORT,process.env.IP,function(){
      console.log("Server has started");
  });
    
    
    // Image.create({name:"Lake Baikal",
    //        img:"https://sacredland.org/wp-content/uploads/2017/07/Lake-Baikal.jpg",
     //       description:"This is the deepest lake in the world"
   //},function(err,image){
     //  if(err){
       //    console.log(err);
       //}else{
        //   console.log("correct");
      // }
   //});