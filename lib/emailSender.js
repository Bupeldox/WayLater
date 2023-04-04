

//https://developers.sendinblue.com/reference/getting-started-1
//https://ethereal.email

var SibApiV3Sdk = require('sib-api-v3-sdk');
const nodemailer = require("nodemailer");
const secret = require("./secretsManager");

SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = secret.email.key;

function sendEmail(toAddress, body, subject) {

    if (!toAddress) {
        return
    }
    if (!toAddress.includes("@")) {
        return;
    }
    if (!body) {
        return
    }
    if (!subject) {
        return;
    }

    if (!secret.email.actuallySend) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: secret.testEmail.username, // generated ethereal user
                pass: secret.testEmail.password  // generated ethereal password
            }
        });

        return new Promise((res, rej) => {
            transporter.sendMail({
                from: secret.email.emailFrom,
                to: "dion48@ethereal.email",
                subject: subject,
                text: body.split("</head>")[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim(),
                html: body
            });
            res();
        });

    } else {
        /*
                
                return new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
                    "sender":{ "email":secret.email.emailFrom, "name":"Way Later Reviews"},
                    "subject":subject,
                    "htmlContent":body,        
                    "to":[{"email": toAddress }],
                });*/
    }

}

module.exports.sendEmail = sendEmail;