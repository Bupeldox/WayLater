const uuid = require('uuid');
const { sendReviewReadyEmail, sendConfirmationEmail } = require('../lib/confirmationEmailHelper');
const { store } = require('../lib/datastore');


var express = require('express'),
    router = express.Router();


router.get("/",(req,res)=>{
    res.send("hello");
})

router.get('/testConfirmEmail', (req, res) => {

    var reviewItem ={
        email:"email@email.email",
        brand:"adidas",
        productName:"airforce 1",
        dateRequested: Date.now(),
        id:uuid.v4()
    };

    store("reviews",reviewItem);

    sendConfirmationEmail(reviewItem).then((email)=>{
        res.send(email);//for testing
    });
});

router.get('/testReviewEmail', (req, res) => {

    var reviewItem = {
        email:"email@email.email",
        brand:"adidas",
        productName:"airforce 1",
        dateRequested: Date.now(),
        id:uuid.v4()
    };

    store("reviews",reviewItem);

    sendReviewReadyEmail(reviewItem).then((email)=>{
        res.send(email);//for testing
    });
});




module.exports = router;