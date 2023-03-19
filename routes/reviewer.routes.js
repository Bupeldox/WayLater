
var express = require('express'),
    router = express.Router();

const { sendEmail } = require('../lib/confirmationEmailHelper');
var datastore = require("../lib/datastore");
const { vars } = require('../lib/environmentVars');

const  { v4: uuidv4 }  = require("uuid");

//  /...

const viewfp = "pages/reviewer/";

// Add a binding to handle '/'
router.get('/setupreview', (req, res) => {
    res.render(viewfp+'setupreview', { 
        title: "setup review" 
    });
});

router.post('/setupreview', (req, res) => {
    console.log(req.body);
    //send email
    //redirect to wesentyouanemail
    var fd = req.body;
    var reviewItem ={
        email:fd.email,
        brand:fd.brand,
        productName:fd.product,
        dateRequested: Date.now(),
        id:uuidv4()
    };
    datastore.store("reviews",reviewItem);

    sendEmail(res,reviewItem);

    //kjkres.redirect("./wesentyouanemail");
});

router.get('/testemail', (req, res) => {

    var reviewItem ={
        email:"email@email.email",
        brand:"adidas",
        productName:"airforce 1",
        dateRequested: Date.now(),
        id:uuidv4()
    };

    var viewmodel = {
        urls:{

            confirm:vars.baseUrl+"/review/confirm?id="+reviewItem.id+"&product="+reviewItem.brand+"&productName="+reviewItem.productName,
            homepage:vars.baseUrl,

        },
        layout:false,
    };

    res.render('emails/confirmemail', viewmodel);
});


router.get('/wesentyouanemail', (req, res) => {
    res.render(viewfp+'somethingconfirmed', { 
        title: "We sent you an email",
        message: "The email contains links to manage the review and to confirm we sent the email to the right person. Go check it out!"
    });
});

router.get('/confirm', (req, res) => {
    res.render(viewfp+'somethingconfirmed', 
    { 
        title: "Email confirmed",
        message: "See you in a year! You can cancel the reminder at any time with the link on the email we sent."
    });
});

router.get('/cancel', (req, res) => {
    res.render(viewfp+'somethingconfirmed', 
    { 
        title: "Review canceled",
        message: "Who are you? we have got rid of all the details regarding this review and we don't store user data anyway!"
    });
});




module.exports = router;