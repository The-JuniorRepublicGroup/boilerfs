// main imports
const express = require('express');
const mongoose = require('mongoose');

// services imports
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

// other imports 
require('./models/User');
require('./services/passport');

// connect to mongo db using the URI in keys directory
mongoose.connect(keys.mongoURI);

// Beginning of running app
const app = express();

//tell express and passport to use cookies
app.use(cookieSession({
    // requires 2 arguements... 
    maxAge: 30 * 24 * 60 * 60 * 1000, // maxAge for when it expires... this is 30 days
    keys: [keys.cookieKey]
}));

app.use(passport.initialize());

app.use(passport.session());

// Routes import... all endpoint handling is done at authRoutes file... this passes app into the path
require('./routes/authRoutes')(app);

// connect to environment port but if none connect to 5000, then listen to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
