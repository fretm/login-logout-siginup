const express = require('express');
const expresslayout = require('express-ejs-layouts')
const app = express();
const mongoose = require('mongoose')
const flash=require('connect-flash')
const session = require('express-session')
const db = require('./config/keys').MongoURI;
const passport = require('passport')


//Passport config
 require('./config/passport')(passport)


mongoose.connect(db,{useNewUrlParser:true, useUnifiedTopology: true })
.then(()=>{console.log("mongo db connected")
app.listen(PORT,console.log("sever running ....")) 

})
.catch(()=>{
    err=>{
        console.log(err)
    }
})
//ejs
app.use(expresslayout)
app.set('view engine','ejs')
  
app.use(express.urlencoded({extended:false}))
//express session 
 
app.use(session({secret: 'ssshhhhh', 
saveUninitialized:true,

}));
//passport middleware 
app.use(passport.initialize());
app.use(passport.session());

//connect flas
app.use(flash());
app.use((req,res,next)=>{
res.locals.success_msg = req.flash('success_msg ')
res.locals.error_msg= req.flash('error_msg')
res.locals.errors= req.flash('error_msg') 
next();
});
//login
app.use('/',require('./route/index'))
const PORT = process.env.PORT||3000;
//register 
app.use('/users',require('./route/user'))
