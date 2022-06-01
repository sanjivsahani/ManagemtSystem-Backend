const express=require('express')

const sizeController=require('./../controllers/sizeController')
const authConroller=require('./../controllers/authController')

const router=express.Router()

router
.route('/')
.get(authConroller.protect,sizeController.getAllSize)
.post(authConroller.protect,sizeController.addUserId,sizeController.createSize)

router
.route("/:id")
.get(authConroller.protect,sizeController.getSize)
.patch(authConroller.protect,sizeController.updateSize)
.delete(authConroller.protect,sizeController.deleteSize)



module.exports=router