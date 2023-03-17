const express = require('express');
const { create } = require( 'express-handlebars');


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
    helpers: require('./lib/helpers').helpers
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');






app.get('/', (req, res) => {
    res.render('home',{ title:"hello" });
});


app.get('/yell', (req, res) => {
    res.render('yell',{ message:"Omggggggg" });
});



app.listen(3000,()=>{
    console.log("http://localhost:3000/")
});

