const catchAsync = require("../utils/catchAsync")

exports.getAll=modal=>catchAsync(async(req,res,next)=>{
    
    const doc=await modal.find({user:{_id:req.currentUser.id}})

    res.status(200).json({
        status:"success",
        data:doc  
    })
})

exports.createOne=modal=>catchAsync(async(req,res,next)=>{
    const doc=await modal.create(req.body)

    res.status(201).json({
        status:"success",
        data:doc    
    })
})

exports.deleteOne= modal=>catchAsync(async(req,res,next)=>{
    const doc=await modal.findByIdAndDelete(req.params.id)

    res.status(204).json({
        status:"success",
        data:doc   
    })
})

exports.getOne=modal=>catchAsync(async(req,res,next)=>{
    const doc=await modal.findById(req.currentUser.id)

    res.status(200).json({
        stasus:"success",
        data:doc    
    })
})

exports.updateOne=modal=>catchAsync(async(req,res,next)=>{
    const doc=await modal.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        status:"success",
        data:doc    
    })
})