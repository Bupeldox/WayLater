var express = require('express'),
    router = express.Router();

const datastore = require('../lib/datastore');
var apiRoutes = require('./api.routes');

router.use('/api', apiRoutes);

//  /...

const viewfp = "pages/consumer/";

// Add a binding to handle '/'
router.get('/', (req, res) => {
    
    var latestReviews = datastore.getLatestReviews();
    
    res.render('home', { title: "hello", reviews:latestReviews });

})

router.get('/products', (req, res) => {
    res.render(viewfp+'productlist', { title: "products" });
})

router.get('/reviews', (req, res) => {
    res.render(viewfp+'reviewlist', { title: "reviews" });
})




module.exports = router;