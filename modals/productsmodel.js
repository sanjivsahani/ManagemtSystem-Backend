const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Users",
        required:true,
    },
    name:{
        type:String,
        required:[true,"name of the product is required"]
    },
    image:{
        type:String,

    },
    color:{
        type:String,
        required:[true,"color of the product is required"]
    },
    size:{
        type:String,
        required:[true,"size of the product is required"]
    },
    supplier:{
        type:String,
        required:[true,"supplier is required"],

    },
    price:{
        type:Number,
        required:[true,"please mention the price"]
    },
    quantity:{
        type:Number,
        default:1
    },
    initialQuantity:{
        type:Number,
        default:this.quantity
    },
    category:{
        type:String,
        required:[true,"please select the category"]
    },
    brand:{
        type:String,
        required:[true,"please select the brand"]
    },
    purchaseDate:{
        type:Date,
        default:Date.now()
    }
    

})

productSchema.pre(/^find/,function(next){
    this.populate({
        path:"user",
        select:"firstname"
    })
    
    next()
})

module.exports=mongoose.model("Products",productSchema)