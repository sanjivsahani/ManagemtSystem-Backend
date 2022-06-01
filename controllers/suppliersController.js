const Suppliers=require('./../modals/suppliersModel')
const catchAsync=require('./../utils/catchAsync')
const factoryFunction=require('./factoryFunction')


exports.getAllSuppliers= catchAsync(async (req,res,next)=>{

    
    let query={user:{_id:req.currentUser.id}}
    const supplier=await Suppliers.find(query)

    res.status(200).json({
        status:"success",
        data:supplier
    })
})

exports.addUserId=(req,res,next)=>{

    if(!req.body.user)  req.body.user=req.currentUser.id
    next()
}

exports.createSupplier=catchAsync(async (req,res,next)=>{


    
    const supplier=await Suppliers.create(req.body)
    res.status(201).json({
        status:"success",
        supplier
    })
})

exports.getSupplier=factoryFunction.getOne(Suppliers)
exports.deleteSupplier=factoryFunction.deleteOne(Suppliers)


exports.updateSupplier=factoryFunction.updateOne(Suppliers)