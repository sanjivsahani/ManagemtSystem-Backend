const mongoose=require('mongoose')
const sizeSchema=new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Users",
        required:true,
    },
    size:{
        type:String,
        
        required:[true,"please provide size"],
        unique:[true,"size already exist"]
    }
})

sizeSchema.pre(/^find/,function(next){
    this.populate({
        path:"user",
        select:"firstname"
    })
    
    next()
})

module.exports=mongoose.model("Sizes",sizeSchema)