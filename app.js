const express =require('express')
const app = express()
const cors=require('cors')

const usersRoute=require('./routes/usersRoute')
const customerRoute=require('./routes/customersRoute')
const supplierRoute=require('./routes/suppliersRoute')
const productRoute=require('./routes/productsRoutes')
const categoryRoute=require('./routes/categoryRoute')
const brandRoute=require('./routes/brandRoute')
const orderRoute=require('./routes/orderRoute')
const sizeRoute=require('./routes/sizeRoute')
const colorRoute=require('./routes/colorRoute')


const errorController=require('./controllers/errorController')
const appError = require('./utils/appError')


//
app.use(cors({
    origin:"http://localhost:3000"
}))

//inbuilt middleware

app.use(express.json())

//route middlewares

app.use('/api/v1/users',usersRoute)
app.use('/api/v1/customers',customerRoute)
app.use('/api/v1/suppliers',supplierRoute)
app.use('/api/v1/products',productRoute)
app.use('/api/v1/categories',categoryRoute)
app.use('/api/v1/brands',brandRoute)
app.use('/api/v1/orders',orderRoute)
app.use('/api/v1/sizes',sizeRoute)
app.use('/api/v1/colors',colorRoute)



//unhandled routes
app.all("*",(req,res,next)=>{
    
    
    next(new appError("this route does not exist",404))
}) 
    
//error handling middleware
app.use(errorController.errorController)

module.exports=app;