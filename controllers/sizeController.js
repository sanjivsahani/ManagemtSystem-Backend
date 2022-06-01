const Sizes=require('./../modals/sizeModel')
const factoryFunction=require('./factoryFunction')


exports.addUserId=(req,res,next)=>{

    if(!req.body.user)  req.body.user=req.currentUser.id
    next()
}
exports.createSize=factoryFunction.createOne(Sizes)

exports.getAllSize=factoryFunction.getAll(Sizes)

exports.deleteSize=factoryFunction.deleteOne(Sizes)


exports.getSize=factoryFunction.getOne(Sizes)


exports.updateSize=factoryFunction.updateOne(Sizes)