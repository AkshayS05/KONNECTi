const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const port = 8000;

// to read through the post requests
app.use(express.urlencoded());

app.use(cookieParser());

// styles
app.use(express.static('./assets'));

//express ejs layout
app.use(expressLayouts);

// extract styles and scripts from subpages into the layout
app.set('layout extracStyles', true);

app.set('layout extracScripts', true);

//use express.router in the main index.js file
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function (err) {
  if (err) {
    console.log(`Error while running the server, ${err}`);
  }
  console.log(`App is running on port ${port}`);
});
