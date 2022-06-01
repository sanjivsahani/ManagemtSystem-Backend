
const catchAsync = require('../utils/catchAsync')
const Products=require('./../modals/productsmodel')
const factoryFunction=require('./factoryFunction')



exports.getAllProduct=catchAsync(async(req,res,next)=>{
    
    //filteriing
    const queryObj={...req.query}
    
    const excludedFields=["sort","page","limit","field"]
    excludedFields.forEach((item)=>delete queryObj[item])

    let querystring=JSON.stringify(queryObj)
    querystring=querystring.replace(/\b(gte|gt|eq|lt|lte)\b/g,match=>`$${match}`)
    
   const queryparsed=JSON.parse(querystring)
   
//    let query=Products.find(queryparsed)
    let query=Products.find({user:{_id:req.currentUser.id}})
    query=query.find(queryparsed)

    //sorting
    
    if(req.query.sort){
        // console.log(req.query.sort)

        const sortQuery=req.query.sort.split(',').join(' ')
        
        query=query.sort(sortQuery)
        
        
    }

    //select
    if(req.query.field)
    {
        const fieldQuery=req.query.field.split(',').join(' ')
        query=query.select(fieldQuery)
    }
    
    
   const product =await query;

   

    let length=product.length
    res.status(201).json({
        status:"success",
        length,
        data:product
    })
})


exports.addUserId=(req,res,next)=>{

    if(!req.body.user)  req.body.user=req.currentUser.id
    next()
}
exports.createProduct=factoryFunction.createOne(Products)


exports.getProduct=factoryFunction.getOne(Products)


exports.deleteProduct=factoryFunction.deleteOne(Products)

exports.updateProduct=factoryFunction.updateOne(Products)