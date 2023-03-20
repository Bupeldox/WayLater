
var express = require('express'),
    router = express.Router();

const { sendConfirmationEmail, sendReviewReadyEmail } = require('../lib/confirmationEmailHelper');
var datastore = require("../lib/datastore");

const  { v4: uuidv4, validate: validateuuid }  = require("uuid");

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
    var reviewItem = {
        email:fd.email,
        brand:fd.brand,
        productName:fd.product,
        dateRequested: Date.now(),
        id:uuidv4()
    };

    datastore.store("reviews",reviewItem);

    sendEmail(res,reviewItem).then((email)=>{

        res.send(email);
    });
    
    //kjkres.redirect("./wesentyouanemail");
});


router.get('/testConfirmEmail', (req, res) => {

    var reviewItem ={
        email:"email@email.email",
        brand:"adidas",
        productName:"airforce 1",
        dateRequested: Date.now(),
        id:uuidv4()
    };

    datastore.store("reviews",reviewItem);

    sendConfirmationEmail(reviewItem).then((email)=>{
        res.send(email);
    });
});

router.get('/testReviewEmail', (req, res) => {

    var reviewItem ={
        email:"email@email.email",
        brand:"adidas",
        productName:"airforce 1",
        dateRequested: Date.now(),
        id:uuidv4()
    };

    datastore.store("reviews",reviewItem);

    sendReviewReadyEmail(reviewItem).then((email)=>{
        res.send(email);
    });
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


router.get("/write/:id",(req,res)=>{

    var reviewId = req.params.id;

    if(!validateuuid(reviewId)){
        res.redirect("/");
    }

    var reviewItem = datastore.getReviewableById(reviewId);

    var viewmodel = {
        productName: reviewItem.productName,
        brand: reviewItem.brand,
        reviewContent: reviewItem.reviewContent,
        id: reviewId
    };

    res.render(viewfp+'writereview', viewmodel);
});

router.post("/write",(req,res)=>{

    var reviewId = req.body.id;
    
    if(!validateuuid(reviewId)){
        res.redirect("/");
    }
    
    var fd = req.body;
    var formData = {
        reviewContent: fd.reviewContent,
        brand:fd.brand,
        productName:fd.product,
    };
    
    var reviewItem = datastore.getReviewableById(reviewId);

    reviewItem.productName = formData.productName;
    reviewItem.brand = formData.brand;
    reviewItem.reviewContent = formData.reviewContent;

    datastore.store("review",reviewItem);

    res.render(viewfp+'writereview', viewmodel);
});


module.exports = router;