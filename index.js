const express =require("express");
const app=express();
const mongoose=require('mongoose');
const cookieSession=require('cookie-session');
const passport=require('passport');
const keys=require('./config/keys');

mongoose.connect(keys.mongoURI);
require('./model/User');


app.use(cookieSession({
    keys:[keys.sessionKey],
    maxAge: 24*60*60*1000
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth')(app);

// In case of dev environment, we would still use 5000 
const HEROKU_PORT=process.env.PORT || 5000;

app.listen(HEROKU_PORT);