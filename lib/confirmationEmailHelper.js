
const path = require("path");
const { vars } = require('./environmentVars');
const { sendEmail } = require("./emailSender");

var hb = require('express-handlebars').create({
    partialsDir:"views/partials"
});

async function renderViewToString(view,viewmodel) {
    return new Promise((resolve, reject) => {
        hb.render(view,viewmodel).then((renderedHtml) => {
            resolve(renderedHtml);
        }).catch(()=>reject());
    });
}

module.exports.sendConfirmationEmail = (reviewItem)=>{

    var viewmodel = {
        urls:{
            confirm:vars.baseUrl+"/review/confirm?id="+reviewItem.id+"&product="+reviewItem.brand+"&productName="+reviewItem.productName,
            cancel:vars.baseUrl+"/review/cancel?id="+reviewItem.id,
            homepage:vars.baseUrl,
        },
        productName:reviewItem.productName,
        layout:false,
    };

    return new Promise((resolve,reject)=>{

        renderViewToString('views/emails/confirmemail.handlebars',viewmodel)
        .then((hs)=>{
            sendEmail(reviewItem.email,hs,"Confirm Email & Review - Way Later Reviews")
            .then(()=>{
                resolve();
            })
            .catch((e)=>{console.log(e);reject()});
        })
        .catch((e)=>{console.log(e); reject()});
    });
    

       
};

module.exports.sendReviewReadyEmail = async(reviewItem)=>{
    var viewmodel = {
        urls:{
            review:vars.baseUrl+"/review/write/"+reviewItem.id,
            homepage:vars.baseUrl,
        },
        layout:false,
        productName:reviewItem.productName,
        layout:false,
    };

    return new Promise((resolve,reject)=>{

        renderViewToString('views/emails/reviewreadyemail.handlebars',viewmodel)
        .then((hs)=>{
            sendEmail(reviewItem.email,hs,"Ready For Your Review ("+reviewItem.productName+") - Way Later Reviews")
            .then(()=>{
                resolve();
            })
            .catch(()=>reject());
        })
        .catch(()=>reject());
    });
} 