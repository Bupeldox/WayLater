var express = require('express'),
    router = express.Router();

var apiRoutes = require('./api.routes');

router.use('/api', apiRoutes);

//  /...


// Add a binding to handle '/'
router.get('/', (req, res) => {
    res.render('home', { title: "hello" });
})

router.get('/products', (req, res) => {
    res.render('home', { title: "hello" });
})

router.get('/reviews', (req, res) => {
    res.render('home', { title: "hello" });
})








module.exports = router;