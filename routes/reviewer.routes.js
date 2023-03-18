var express = require('express'),
    router = express.Router();

var apiRoutes = require('./api.routes');

router.use('/api', apiRoutes);

//  /...

const viewfp = "pages/consumer/";

// Add a binding to handle '/'
router.get('/', (req, res) => {
    res.render('home', { title: "hello" });
})

router.get('/products', (req, res) => {
    res.render(viewfp+'productlist', { title: "products" });
})

router.get('/reviews', (req, res) => {
    res.render(viewfp+'reviewlist', { title: "reviews" });
})








module.exports = router;