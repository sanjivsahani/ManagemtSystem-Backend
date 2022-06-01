const express=require('express')
const brandController=require('./../controllers/brandController')
const authController=require('./../controllers/authController')

const router=express.Router()

router
.route('/')
.get(authController.protect,brandController.getAllBrands)
.post(authController.protect,brandController.addUserId,brandController.createBrands)

router
.route("/:id")
.get(authController.protect,brandController.getBrand)
.patch(authController.protect,brandController.updateBrand)
.delete(authController.protect,brandController.deleteBrand)



module.exports=router