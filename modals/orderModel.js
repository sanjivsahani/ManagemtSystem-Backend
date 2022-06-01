const mongoose=require('mongoose')

const orderschema=new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Users",
        required:true,
    },
    customer:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Customers",
        required:true
    },
    orderDate:{
        type:Date,
        default:Date.now()
    },
    totalAmount:{
        type:Number,
        required:[true,"total amount is required"]
    },
    productDetails:[
       { 
        name:{
            type:String,
            required:[true,"name of product is required"]
        },
        quant:{
            type:Number,
            required:[true,"quantity is required"]
        },
        amount:{
            type:Number,
            required:true
        },
        image:String
    }
    ]
})

orderschema.pre(/^find/,function(next){
    this.populate({
        path:"customer",
        select:'name '
    }).populate({
        path:"user",
        select:"name"
    })
    next()
})


module.exports=mongoose.model('Orders',orderschema)