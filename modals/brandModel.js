const mongoose=require('mongoose')

const brandSchema=new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Users",
        required:true,
    },
    brand:{
        type:String,
        required:[true,"brand is required"],
        unique:[true,"brand already exist"]
    },
    category:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Categories",
        
    }
})

brandSchema.pre(/^find/,function(next){
    this.populate({
        path:"category"
    })
    next()
})
brandSchema.pre('save',function(next){
    this.populate({
        path:"user",
        select:"firstname"
})
next()
})
module.exports=mongoose.model("Brands",brandSchema)

