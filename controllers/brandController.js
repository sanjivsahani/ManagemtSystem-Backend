
const Brands = require('./../modals/brandModel')

const factoryFunction = require('./factoryFunction')

exports.addUserId=(req,res,next)=>{

    if(!req.body.user)  req.body.user=req.currentUser.id
    next()
}
exports.createBrands = factoryFunction.createOne(Brands)

exports.getAllBrands = factoryFunction.getAll(Brands)

exports.deleteBrand = factoryFunction.deleteOne(Brands)

exports.getBrand = factoryFunction.getOne(Brands)

exports.updateBrand = factoryFunction.updateOne(Brands)