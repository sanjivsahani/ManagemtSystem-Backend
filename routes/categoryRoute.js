const express=require('express')
const categoryConroller=require('./../controllers/categoryController')
const authConroller=require('./../controllers/authController')

const router=express.Router()

router
.route('/')
.get(authConroller.protect,categoryConroller.getAllCategory)
.post(authConroller.protect,categoryConroller.addUserId,categoryConroller.createCategory)

router
.route("/:id")
.get(authConroller.protect,categoryConroller.getCategory)
.patch(authConroller.protect,categoryConroller.updateCategory)
.delete(authConroller.protect,categoryConroller.deleteCategory)



module.exports=router