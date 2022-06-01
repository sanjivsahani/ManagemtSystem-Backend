const catchAsync = require('../utils/catchAsync')
const Users = require('./../modals/usersModel')
const jwt = require('jsonwebtoken')
const appError = require('../utils/appError')
const sendEmail = require('./../utils/email')
const crypto = require('crypto')


const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRE
        })
}


//signUP


exports.signUp = catchAsync(async (req, res, next) => {
    const newUser = await Users.create(req.body)


    const token = createToken(newUser._id)

    res.status(200).json({
        status: "success",
        token,
        newUser
    })
})


//login 



exports.login = catchAsync(async (req, res, next) => {
    //is email and password is provided

    const { password, email } = req.body
    if (!email || !password) {
        return next(new appError("please provide email and password", 400))
    }

    //checking if user and password is correct



    const user = await Users.findOne({ email }).select("+password")

    if (!user || !await user.passcheck(password, user.password)) {
        return next(new appError("email or password is incorrect", 400))
    }

    const token = createToken(user._id)

    res.status(200).json({
        token
    })
})



//authorization


exports.protect = catchAsync(async (req, res, next) => {

    //is token provided
    if (!req.headers.authorization) {
        return next(new appError("token does not exist", 401))
    }

    const token = req.headers.authorization.split(' ')[1]

    //if token is correct

    const decoded = jwt.verify(token, process.env.SECRET)



    //to check if the email still exist

    const user = await Users.findById(decoded.id).select("+password")
    if (!user) {
        return next(new appError("user associated with this token does not exist anymore", 401))
    }

    //does user changed password after the token has issued

    if (user.passwordChange(decoded.iat)) {
        return next(new appError("password has been  changed already ", 401))
    }

    req.currentUser = user;
    

    next()
})


//forgetPassword


exports.forgetPassword = catchAsync(async (req, res, next) => {
    //1.verify email address

    const user = await Users.findOne({ email: req.body.email }).select("+password")
    if (!user) {
        return next(new appError("email address does not exist", 400))
    }

    //2.generate token and its not JWT token

    const token = user.userForgetPassword()
    await user.save()


    //3.send token via email

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetpassword/${token}`
    const email = user.email;
    const subject = 'reset password'
    const message = `this is a password reset link ${resetUrl} ,ignore if u havent forget your password`

    try {
        await sendEmail({
            email, subject, message
        })
    } catch (err) {

    }

    res.status(200).json({
        status: "success"
    })

})

//reset password

exports.resetPassword = catchAsync(async (req, res, next) => {

    //1. check if token exist in the databas

    const hashedToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex')



    const user = await Users.findOne({ forgetPassword: hashedToken, forgetPasswordExpiry: { $gt: Date.now() } }).select("+password")


    if (!user) {
        return next(new appError("token is invalid or expired"))
    }

    user.password = req.body.password
    user.confirmPassword = req.body.confirmPassword
    user.forgetPassword = undefined
    user.forgetPasswordExpiry = undefined
    await user.save()


    const token = createToken(user._id)
    res.status(200).json(
        {
            status: "success",
            token
        }
    )
})

//update password

exports.updatePassword = catchAsync(async (req, res, next) => {

    const user = await Users.findById(req.currentUser.id).select("+password")

    //check if the password is correct

    const pass = await user.passcheck(req.body.password, user.password)
    if (!pass) {
        return next(new appError("password is incorrect", 400))
    }

    user.password = req.body.newPassword
    user.confirmPassword = req.body.confirmPassword
    await user.save()
    res.status(200).json({
        status: "success"
    })
})

//user login,protect ,req.currentUser=user,updatapassword

