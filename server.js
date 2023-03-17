const express = require('express');
const { create } = require( 'express-handlebars');
const { helpers } = require('./lib/helpers');

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

const hbs = create({
    helpers: helpers
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use("/public",express.static('public'));

const routes  = require("./routes/top.routes");
app.use("/",routes);





app.listen(3000,()=>{
    console.log("http://localhost:3000/")
});

