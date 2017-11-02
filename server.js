// SERVER DEPENDENCIES //
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const connectionUrl = require('./variables.env')
//SCHEMAS //
const Article = require('./services/Article.js');

// Express Instance
const app = express();

// Set Port
const PORT = process.env.PORT || 3300;

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
// Morgan initilize and bodyParser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Grab public folder
app.use(express.static('./public'));


  if(process.env.NODE_ENV == 'production'){
   mongoose.connect(herokuUrl);
 } else {
   mongoose.connect(connectionUrl);
 }



// MongoDB Config
//mongoose.connect('mongodb://localhost/nytreact');
let db = mongoose.connection;

db.on('error', (err) => {
  console.log('Mongoose Error: ', err);
});

db.once('open', () => {
  console.log('Mongoose connection successful.');
 });

// routes //
require('./services/controller.js')(app);

// Listener //
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
