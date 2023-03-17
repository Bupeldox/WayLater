var express = require('express'),
    router = express.Router();


    //  /routes...

router
  // Add a binding to handle '/'
  .get('/test', (req,res)=>{
    
  })

  // Import my automated routes into the path '/tests/automated'
  // This works because we're already within the '/tests' route 
  // so we're simply appending more routes to the '/tests' endpoint
  //.use('/automated', automatedRoutes);
 
module.exports = router;