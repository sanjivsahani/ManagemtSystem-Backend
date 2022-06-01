const express=require('express')
const suppliersController =require('./../controllers/suppliersController')
const authController=require('./../controllers/authController')

const router=express.Router({mergeParams:true})

router
.route('/')
.get(authController.protect,suppliersController.getAllSuppliers)
.post(authController.protect,suppliersController.addUserId,suppliersController.createSupplier)


router
.route('/:id')
.get(authController.protect,suppliersController.getSupplier)
.delete(authController.protect,suppliersController.deleteSupplier)
.patch(authController.protect,suppliersController.updateSupplier)


module.exports=router