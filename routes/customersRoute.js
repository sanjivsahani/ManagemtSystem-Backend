const express=require('express')

const authController=require('./../controllers/authController')
const customerController=require('./../controllers/customerController')

const router=express.Router({mergeParams:true})


router
.route('/') 
.get(authController.protect,customerController.getAllCustomers)
.post(authController.protect,customerController.addUserId,customerController.createCustomer)

router
.route('/:id') 
.get(authController.protect,customerController.getCustomer)
.delete(authController.protect,customerController.delete)
.patch(authController.protect,customerController.updateCustomer)

module.exports=router