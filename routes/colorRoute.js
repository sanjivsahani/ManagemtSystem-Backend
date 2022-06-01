const express=require('express')

const colorController=require('./../controllers/colorController')
const authConroller=require('./../controllers/authController')

const router=express.Router()

router
.route('/')
.get(authConroller.protect,colorController.getAllColor)
.post(authConroller.protect,colorController.addUserId,colorController.createColor)

router
.route("/:id")
.get(authConroller.protect,colorController.getColor)
.patch(authConroller.protect,colorController.updateColor)
.delete(authConroller.protect,colorController.deleteColor)



module.exports=router