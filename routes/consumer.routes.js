var express = require('express'),
    router = express.Router();

const dataHandler = require('../lib/dataHandler');
var apiRoutes = require('./api.routes');

router.use('/api', apiRoutes);

//  /...

const viewfp = "pages/consumer/";

// Add a binding to handle '/'
router.get('/', (req, res) => {
    var latestReviews = dataHandler.getLatestReviews();
    res.render('home', { reviews:latestReviews });
})

router.get('/products/:search', (req, res) => {
    var search = req.params.search;

    var filteredReviews = dataHandler.getFilteredReviews(search);

    res.render(viewfp + 'reviewlist', { title: "products", reviews:filteredReviews });
})

router.get('/reviews', (req, res) => {
    res.render(viewfp + 'reviewlist', { title: "reviews" });
})




module.exports = router;