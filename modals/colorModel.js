const mongoose=require('mongoose')
const colorSchema=new mongoose.Schema({
    
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Users",
        required:true,
    },
    color:{
        type:String,
        
        required:[true,"please provide color"],
        unique:[true,"color already exist"]
    }
})
colorSchema.pre(/^find/,function(next){
    this.populate({
        path:"user",
        select:"firstname"
    })
    
    next()
})

module.exports=mongoose.model("Colors",colorSchema)