const mongoose = require('mongoose')
const validator=require('validator')

const customerSchema=new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        required:[true,"user id is necessary"],
        ref:"Users"
    },
    name:{
        type:String,
        required:[true,"customer name should be provided"]
    },
    phone:{
        type:String,
        required:[true,"please provide phone number"],
        minlength:[10,"phone number should be atleast 10 character long"],
        maxlength:[10,"phone number should not be greater than 10 character "]
    },
  
    email:{
        type:String,
        validate:[validator.isEmail,"please provide valid email address"],
        required:[true,"email is required"],
        unique:[false,"email must be unique"]
        

    },
    status:{
        type:String,
        enum:["active","inActive"],
        default:"active"
    }
})

customerSchema.pre(/^find/,function(next){
    this.populate({
        path:'user',
        select:'firstname lastname '
    })
    next()
})

module.exports=mongoose.model("Customers",customerSchema)
