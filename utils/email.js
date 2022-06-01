const nodemailer=require('nodemailer')

const sendEmail=async options =>{

    var smtpTransport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure:false,
        auth: {
            user: "inventorymanagementdigikull@gmail.com",
            pass: "digikull@1234"
        }
    });
    var mailOptions = {
        from: "INVENTOSHOP <inventorymanagementdigikull@gmail.com>",
        to:options.email , 
        subject:options.subject,
        text: options.message
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("success");
        }
    });
}

module.exports=sendEmail;