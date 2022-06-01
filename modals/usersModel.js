
const {Schema,model}=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const crypto=require('crypto')



const userSchema=new Schema({
    firstname:{
        type:String,
        required:[true,"name field cant be empty"]
    },
    lastname:{
        type:String,
        required:[true,"lastname field cant be empty"]
    },
    email:{
        type:String,
        unique:[true,"email already exist"],
        required:[true,"email is required"],
        lowercase:true,
        validate:[validator.isEmail,"please provide valid email"]
    },
    password:{
        type:String,
        required:[true,"password is necessary"],
        select:false
    },
    confirmPassword:{
        type:String,
        validate:{
            validator:function (val){
                return this.password===val;
            },
            message:"password and confirm password does not match"
        }
    },
    company:{
        type:String,
        required:[true,"please provide company name"]
    },
    DOB:{
        type:Date,
        required:[true,"please provide your DOB"]
    },
    gender:{
        type:String,
        enum:["male","female"],
        required:[true,"gender is required"]

    },
    address:{
        type:String,
        required:[true,"please provide address"]
    },
    passwordChangedAt:{
        type:Date,
        select:false
    },
    forgetPassword:String,
    forgetPasswordExpiry:Date
})


userSchema.pre("save",async function(next){
    if(!this.isModified('password'))
    {
        return next()
    }

    this.password=await bcrypt.hash(this.password,12)
    this.confirmPassword=undefined;
    next()
})

//isNew true if document is new
userSchema.pre("save",function(next){
    if(!this.isModified('password') || this.isNew)
    {
        return next()
    }
    this.passwordChangedAt=Date.now()
    next()
})

userSchema.methods.passcheck=async (candidatePass,userPass)=>{
    return  await bcrypt.compare(candidatePass,userPass)
}

userSchema.methods.passwordChange=function(tokenIssue){
    if(this.passwordChangedAt)
    {
        const change=parseInt(this.passwordChangedAt.getTime()/1000,10)
        return change>tokenIssue
    }
    return false;
}

userSchema.methods.userForgetPassword=function(){

    //this token we will send via email
    
    const token=crypto.randomBytes(32).toString('hex')
    
// console.log(token)
    //storing this token in DB in encrypted form

    this.forgetPassword=crypto.createHash('sha256').update(token).digest('hex')
    // console.log(this.forgetPassword)

    //set token expiry date

    this.forgetPasswordExpiry=Date.now() + 15*60*1000;

    return token;

    
}


module.exports=model("Users",userSchema);