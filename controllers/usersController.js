const { resetWatchers } = require("nodemon/lib/monitor/watch")
const appError = require("../utils/appError")
const Users =require("./../modals/usersModel")

const factoryFunction=require('./factoryFunction')


exports.getAllUsers=factoryFunction.getAll(Users)

exports.createUser=factoryFunction.createOne(Users)

exports.getUser=factoryFunction.getOne(Users)


exports.passwordnotupdate=(req,res,next)=>

{   
    const passUrl=`${req.protocol}://${req.get('host')}/api/v1/users/updatepassword`
    if(req.body.password){
        return next(new appError(`please visit ${passUrl} for password update`,401))
    }
    next()
}

exports.updateMe=factoryFunction.updateOne(Users)