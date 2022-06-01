const express= require('express')

const usersController=require('./../controllers/usersController')
const authController=require('./../controllers/authController')
const orderRoute=require('./orderRoute')



const router=express.Router()

//api/v1/users/46asd5f5df/orders
router.use('/:customerId/orders',orderRoute)

router
.route('/signup')
.post(authController.signUp)

router
.route('/login')
.post(authController.login)

router
.route('/forgetpassword')
.post(authController.forgetPassword)

router
.route('/resetpassword/:resetToken')
.post(authController.resetPassword)

router
.route('/updatepassword')
.post(authController.protect,authController.updatePassword)

router
.route("/")
.get(authController.protect,usersController.getAllUsers)
.post(usersController.createUser)

router
.route('/:id')
.get(authController.protect,usersController.getUser)
.patch(usersController.passwordnotupdate,usersController.updateMe)

//api/v1/users/customer



module.exports=router;