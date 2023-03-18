var express = require('express'),
    router = express.Router();

var apiRoutes = require('./api.routes');

router.use('/api', apiRoutes);

//  /...

const viewfp = "pages/reviewer/";

// Add a binding to handle '/'
router.get('/setupreview', (req, res) => {
    res.render(viewfp+'home', { title: "setup review" });
});

router.post('/setupreview', (req, res) => {
    //send email
    //redirect to wesentyouanemail
});

router.get('/wesentyouanemail', (req, res) => {
    res.render(viewfp+'somethingconfirmed', 
    { 
        title: "We sent you an email",
        message: "The email contains links to manage the review and to confirm we sent the email to the right person. Go check it out!"
    });
});


router.get('/confirmemail', (req, res) => {
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