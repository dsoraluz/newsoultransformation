const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');

//------------ NEEDED FOR PASSPORT.JS ---------------
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const flash = require('connect-flash');

const User = require("./models/user-model.js");

//----------- LOADS .env FILE -----------------------
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(process.env.MONGODB_URI);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'New Soul Transformation';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);

//------------- PASSPORT -------------------
app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
  if(req.user){
    res.locals.user = req.user;
  } else {
    res.locals.user = null;
  }
  next();
});

//Local strategy - authentication is comming from internal check of records.
passport.use(new LocalStrategy((username, password, next) => {
  //Check first if the database has an entry with that username.
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    //if user exists (fail) (authentication failed)--(error message)
    else if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }//If password does not match
    else if (!bcrypt.compareSync(password, user.encryptedPassword)) {
      return next(null, false, { message: "Incorrect password" });
    }else{
      //Retutn the user that we found.
      next(null, user);
    }

  });
}));

//In your session you want to minimize the amount of info stored
//instead of storing all info of user, we store unique things about
//them (user.id)..
//Serialize = take the user object and just associate that to the user id.
//Kind of makes a key (user id) to value (user object)
////cb is callback in passport
passport.serializeUser((user, cb) => {
  if(user.provider){
    //Need to save all user info if using facebook or other OAuth because we cant cross reference it with our own data.
    cb(null,user);
  }else{
    cb(null, user._id);
  }
});

//Takes the user id and deserializes it.. Takes user id and returns the
//corresponding user object.
passport.deserializeUser((id, cb) => {
//If using facbook or other OAuth, you cannot reference user data if it is not saved, so cross reference from it with facebook.
//Usually we would say users profile to database but lesson did not.
  if(id.provider){
    cb(null,id);
    return;
  }
  User.findOne({ "_id": id }, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});
//------------- PASSPORT END ----------------------------


// ------------ ROUTES GO HERE ------------------------
const index = require('./routes/index');
const authRoutes = require('./routes/auth-routes');
const memberRoutes = require('./routes/member-routes');
// const coinbaseRoutes = require('./routes/coinbase-routes');
app.use('/', index);
app.use('/', authRoutes);
app.use('/', memberRoutes);
// app.use('/', coinbaseRoutes);

//------------- ROUTES END ----------------------------

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('index', {
			page: 'error',
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('index', {
		page: 'error',
		message: err.message,
		error: {}
	});
});



module.exports = app;
