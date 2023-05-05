const uuid = require('uuid');
const { sendReviewReadyEmail, sendConfirmationEmail } = require('../lib/confirmationEmailHelper');
const { store } = require('../lib/datastore');



var express = require('express'),
    router = express.Router();


router.get("/",(req,res)=>{

    var hs = "<ul>";
    router.stack.map(i=>{
        hs+="<li><a href='."+i.route.path+"'>"+i.route.path+"</a></li>";

    })
    hs += "</ul>";
    res.send(hs);
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
        res.send("<a href='./'>Back</a>");//for testing
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
        //res.send(email);//for testing
        res.send("<a href='./'>Back</a>");
    });
});




module.exports = router;