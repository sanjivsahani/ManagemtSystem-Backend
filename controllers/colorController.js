const Colors=require('./../modals/ColorModel')
const factoryFunction=require('./factoryFunction')


exports.addUserId=(req,res,next)=>{

    if(!req.body.user)  req.body.user=req.currentUser.id
    next()
}
exports.createColor=factoryFunction.createOne(Colors)

exports.getAllColor=factoryFunction.getAll(Colors)

exports.deleteColor=factoryFunction.deleteOne(Colors)


exports.getColor=factoryFunction.getOne(Colors)


exports.updateColor=factoryFunction.updateOne(Colors)