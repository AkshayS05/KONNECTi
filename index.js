const express = require('express');
const env = require('./config/environment');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const db = require('./config/mongoose');
// used for session-cookies
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJwt = require('./config/passport-jwt-startegy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
// in order to maintain the session-->Passing session as we want to store that
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
// to display a flash message
const flash = require('connect-flash');
// call flash's meddleware after the session is set up
const customMware = require('./config/middleware');

// set up the chat server to be used with socket.io
// setup the chat server to be used with socket.io

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');
const path = require('path');
app.use(
  sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css',
  }),
);
// local port
const port = 8000;

// to read through the post requests
app.use(express.urlencoded());

app.use(cookieParser());

// styles
app.use(express.static(env.asset_path));
// makes the /uploads file available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

//express ejs layout
app.use(expressLayouts);

// extract styles and scripts from subpages into the layout
app.set('layout extracStyles', true);

app.set('layout extracScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// express-session
// MongoStore is used to store the session cookie in the db
app.use(
  session({
    name: 'konnecti',
    // To do change the secret before the production
    secret: env.session_cookie_key,
    // if user is not authrnticated, no need to save
    saveUninitialized: false,
    // as we do not want to save again n again the already saved cookies of the user-->we do not need to modify anything
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: 'disabled',
      },
      // in case the connection is not established
      function (err) {
        console.log(err || 'connect mongoDB setup ok');
      },
    ),
  }),
);
app.use(passport.initialize());
app.use(passport.session());
// --next step is to go to user controller
//use express.router in the main index.js file
app.use(flash());
app.use(customMware.setFlash);
app.use(passport.setAuthenticatedUser);
app.use('/', require('./routes'));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error while running the server, ${err}`);
  }
  console.log(`App is running on port ${port}`);
});
