const catchAsync = require('../utils/catchAsync')
const Orders=require('./../modals/orderModel')
const factoryFunction=require('./factoryFunction')
const sendEmail=require('./../utils/email')
const Customers=require('./../modals/customersModel')

exports.addCustomerId=(req,res,next)=>{
    if(!req.body.customer) req.body.customer=req.params.customerId
    if(!req.body.user) req.body.user=req.currentUser.id
   
    next()
}


exports.createOrder=catchAsync(async(req,res,next)=>{

    
    
    const order=await Orders.create(req.body)

    const customer=await Customers.findById(req.params.customerId)

    const email=customer.email;
    const subject='order placed'
    const message=`your order has been placed`

    try{
        sendEmail({
            email,subject,message
        })
    }catch(err){}

    res.status(201).json({
        status:"success",
        order
    })
})

exports.getAllOrders=catchAsync(async (req,res,next)=>{

    let query={user:{_id:req.currentUser.id}}
    if(req.params.customerId) query={customer:{_id:req.params.customerId}}
    const order=await Orders.find(query)
    res.status(200).json({
        status:"success",
        order
    })
})


exports.getOrder=factoryFunction.getOne(Orders)

exports.deleteOrder=factoryFunction.deleteOne(Orders)

exports.updateOrder=factoryFunction.updateOne(Orders)