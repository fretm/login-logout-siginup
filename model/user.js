const mongoose =require('mongoose');
const Userschema = new mongoose.Schema({
    name:{
        type:String,
        requires:true
    },
    email:{
        type:String,
        required : true
    },
    password:{
        type:String,
        requires:true
    },
    date:{
        type:Date,
        default:Date.now
    },

})

module.exports= mongoose.model('User',Userschema)