const Categories=require('./../modals/categoryModel')
const factoryFunction=require('./factoryFunction')


exports.addUserId=(req,res,next)=>{

    if(!req.body.user)  req.body.user=req.currentUser.id
    next()
}
exports.createCategory=factoryFunction.createOne(Categories)

exports.getAllCategory=factoryFunction.getAll(Categories)

exports.deleteCategory=factoryFunction.deleteOne(Categories)


exports.getCategory=factoryFunction.getOne(Categories)


exports.updateCategory=factoryFunction.updateOne(Categories)