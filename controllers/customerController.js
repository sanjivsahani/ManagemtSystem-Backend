
const catchAsync = require('../utils/catchAsync')
const Customers=require('./../modals/customersModel')
const factoryFunction=require('./factoryFunction')

exports.addUserId=(req,res,next)=>{
    if(!req.body.user)  req.body.user=req.currentUser.id;
    next()
}

exports.createCustomer=factoryFunction.createOne(Customers)

exports.getAllCustomers=catchAsync(async (req,res,next)=>{
    let query={}
    if(!req.body.user) query={user:{_id:req.currentUser.id}}
    const customer=await Customers.find(query)
    res.status(200).json({
        status:"success",
        customer
    })
})

exports.getCustomer=factoryFunction.getOne(Customers)

exports.delete=factoryFunction.deleteOne(Customers)

exports.updateCustomer=factoryFunction.updateOne(Customers)
