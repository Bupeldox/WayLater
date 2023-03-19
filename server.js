const express = require('express');
const { create } = require( 'express-handlebars');
const { helpers } = require('./lib/helpers');
var bodyParser = require('body-parser')

var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

const app = express();
app.use(connectLiveReload());
app.use(bodyParser.json() );        // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



const hbs = create({
    helpers: helpers
});




app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use("/public",express.static('public'));

app.use("/review",require("./routes/reviewer.routes"));
app.use("/",require("./routes/consumer.routes"));





app.listen(3000,()=>{
    console.log("http://localhost:3000/")
});

