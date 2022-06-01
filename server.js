const app=require('./app')
const mongoose=require('mongoose')

const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})

 const port=process.env.PORT || 8000

const db=String(process.env.DATABASE).replace("<password>",process.env.PASSWORD)


mongoose.connect(db).then(()=>{
    console.log("database connected")
}).catch((err)=>console.log(err))



app.listen(port,()=>{
    console.log("server has been connected")
})