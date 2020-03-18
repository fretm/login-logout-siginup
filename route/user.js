const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require('bcryptjs');
const passport = require('passport')
const controler= require('../controler/login')

router.get("/login",controler.loginpage );

router.get("/register", (req, res) => res.render("register"));

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "password do not match .." });
  }
  if (password !== password2) {
    errors.push({ msg: "password should be at least 6 characters" });
  }
  if (password.length < 6) {
    errors.push({ msg: "password shoulf ne at least 6 characteer .." });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors: errors
    });
  } else {
    //validation passs ...
    User.findOne({ "email": email }).then(async user => {
      
      if (user) {
        //user exists
        errors.push({ msg: "email is already registerd" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2
         });
      } else {
        const newuser = new User({ name, email, password });
      
     //hash password
     const salt = await bcrypt.genSalt(10)
      newuser.password= await bcrypt.hash(newuser.password,salt)
     await newuser.save()
     req.flash('success_msg','you are now signed up you can login')
      res.redirect("/users/login")
      }
    });  
  }
});
//login handle 
router.post('/login',(req,res,next )=>{
 passport.authenticate('local',{
   successRedirect:'/dashboard',
   failureRedirect:'/users/login',
   failureFlash:true
 }  )(req,res,next);
})
//logout  handel

router.get('/logout',(req,res)=>{
  req.logOut()
  req.flash('success_msg','you are logg ed out ')
  res.redirect('/users/login')
})


module.exports = router;
