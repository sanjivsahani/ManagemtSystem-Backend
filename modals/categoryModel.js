const mongoose=require('mongoose')

const categorySchema=new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Users",
        required:true,
    },
    category:{
        type:String,
        required:[true,"category is required"],
        unique:[true,"category already exist"]
    }
})
categorySchema.pre('save',function(next){
    this.populate({
        path:"user",
        select:"firstname"
    })
    next()
})
module.exports=mongoose.model("Categories",categorySchema)

