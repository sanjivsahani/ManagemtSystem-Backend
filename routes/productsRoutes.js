const express=require('express')
const authController=require('./../controllers/authController')
const productController=require('./../controllers/productsController')

const router=express.Router()

router
.route('/')
.get(authController.protect,productController.getAllProduct)
.post(authController.protect,productController.addUserId,productController.createProduct)


router
.route('/:id')
.get(authController.protect,productController.getProduct)
.delete(authController.protect,productController.deleteProduct)
.patch(authController.protect,productController.updateProduct)


module.exports=router