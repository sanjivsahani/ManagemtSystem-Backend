const express=require('express')
const orderController=require('./../controllers/orderController')
const authController=require('./../controllers/authController')

const router=express.Router({mergeParams:true})

router
.route('/')
.get(authController.protect,orderController.getAllOrders)
.post(authController.protect,orderController.addCustomerId,orderController.createOrder)

router
.route("/:id")
.get(authController.protect,orderController.getOrder)
.patch(authController.protect,orderController.updateOrder)
.delete(authController.protect,orderController.deleteOrder)



module.exports=router