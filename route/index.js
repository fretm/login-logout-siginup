const express = require('express')
const router = express.Router()
//wellcome page 
router.get('/',(req,res)=> res.render("welcome"))
//dashboard
router.get('/dashboard',(req,res)=> res.render("dashbored"))
module.exports =router;
