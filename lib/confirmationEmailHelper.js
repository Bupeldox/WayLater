
const path = require("path");
const { vars } = require('./environmentVars');

var hb = require('express-handlebars').create({
    partialsDir:"views/partials"
});

async function renderViewToString(view,viewmodel) {
    return new Promise((resolve, reject) => {
        hb.render(view,viewmodel).then((renderedHtml) => {
            resolve(renderedHtml);
        });
    });
}

module.exports.sendConfirmationEmail = async (reviewItem)=>{

    var viewmodel = {
        urls:{
            confirm:vars.baseUrl+"/review/confirm?id="+reviewItem.id+"&product="+reviewItem.brand+"&productName="+reviewItem.productName,
            homepage:vars.baseUrl,
        },
        productName:reviewItem.productName,
        layout:false,
    };

    return await renderViewToString('views/emails/confirmemail.handlebars',viewmodel);
       
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

    return await renderViewToString('views/emails/reviewreadyemail.handlebars',viewmodel);
       
} 