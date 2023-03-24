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
    res.render('pages/home', { reviews:latestReviews });
})

router.get('/search', (req, res) => {
    var search = req.query.q;

    var filteredReviews = dataHandler.getFilteredReviews(search);

    res.render(viewfp + 'reviewList', { title: "Search", search:search, reviews:filteredReviews });
});





module.exports = router;