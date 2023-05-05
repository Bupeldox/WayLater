
var express = require('express'),
    router = express.Router();

const { sendConfirmationEmail } = require('../lib/confirmationEmailHelper');

const  { v4: uuidv4, validate: validateuuid }  = require("uuid");
const dataHandler = require('../lib/dataHandler');

//  /...


const viewfp = "pages/reviewer/";

function showError(res){
    res.render(viewfp+'somethingconfirmed', { 
        title: "Something went wrong",
        message: "Soz, might want to try again, or just give up I guess."
    });
}


// Add a binding to handle '/'
router.get('/setupreview', (req, res) => {
    res.render(viewfp+'setupreview', { 
        title: "Setup Review" 
    });
});

router.post('/setupreview', (req, res) => {
    console.log(req.body);
    //send email
    //redirect to wesentyouanemail
    var fd = req.body;
    
    var reviewItem = dataHandler.createReviewRequest(fd.email,fd.manufacture,fd.product);

    sendConfirmationEmail(reviewItem).then((email)=>{
        res.redirect("./wesentyouanemail");
    }).catch((error)=>{ console.log(error); showError(res); });
    
});

router.get('/wesentyouanemail', (req, res) => {
    res.render(viewfp+'somethingconfirmed', { 
        title: "We sent you an email",
        message: "The email contains links to manage the review and to confirm we sent the email to the right person. Go check it out!"
    });
});

router.get('/confirm', (req, res) => {
    res.render(viewfp+'somethingconfirmed', { 
        title: "Email confirmed",
        message: "See you in a year! You can cancel the reminder at any time with the link on the email we sent."
    });
});

router.get('/cancel', (req, res) => {
    res.render(viewfp+'somethingconfirmed', { 
        title: "Review canceled",
        message: "Who are you? we have got rid of all the details regarding this review and we don't store user data anyway!"
    });
});


router.get("/write/:id",(req,res)=>{

    var reviewId = req.params.id;

    if(!validateuuid(reviewId)){
        res.redirect("/");
    }

    var reviewItem = dataHandler.getReviewableById(reviewId);

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
        
    var formData = req.body;


    dataHandler.updateReview(formData.reviewContent,formData.product,formData.manufacture,reviewId);
    
    res.render(viewfp+'somethingconfirmed', 
    { 
        title: "Review Created!",
        message: "Ty for reviewing, you can edit it at any time with the link on the email we sent you"
    });
});


module.exports = router;