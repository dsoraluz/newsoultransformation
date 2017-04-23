const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('../models/user-model.js');

const authRoutes = express.Router();

//Get route for signup
authRoutes.get('/signup',(req, res, next)=>{
  res.render('auth/signup-view.ejs');
});

//Post route for signup from submission
authRoutes.post('/signup', (req,res,next)=>{
  let adminId = '';

  User.findOne({'role': 'ADMIN'}, '_id', (err, result)=>{
      if(err){
        console.log("error at admin id");
        next(err);
        return;
      }
      adminId = result;
      console.log(adminId);
  });

  const username = req.body.email;
  const password = req.body.password;

  //Check to see if username or password is null
  if (username === '' || password === ''){
    res.render('auth/signup-view',{
      errorMessage: 'Please fill out both email and password.'
    });
    return;
  }

  //Checks to see if username exits
  User.findOne({ username: username}, {username:1}, (err, foundUser)=>{
    if(err){
      next(err);
      return;
    }

    //If username does not exist, continue with user creation.
    if (foundUser !== null){
      res.render('auth/signup-view.ejs',{
        errorMessage: 'The username already exists'
      });
      return;
    }

    //Encypt password
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    //Create userinfo with hashed password
    const userInfo = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: username,
      encryptedPassword: hashPass,
      role: "MEMBER",
      descendedFrom: adminId,
      points: 0
    };


    //Create userInfo with hashed password
    const theUser = new User(userInfo);

    //Save user to database
    theUser.save((err)=>{
      if(err){
        res.render('auth/signup-view', {
          errorMessage: 'There was a problem saving. Try again later.'
        });
        return;
      } else {
        req.flash('success','You have been registered. Try loggin in.');
        res.redirect('/');
      }
    });

  });
});

// function addDescendant(adminId, descendantId){
//
//   const userUpdates = {
//     descendants: descendantId
//   };
//
//   User.findByIdAndUpdate(adminId, userUpdates, (err, newDescendant)=>{
//     if(err){
//       next(err);
//       return;
//     }
//     console.log("new descendant created");
//   });
// }

authRoutes.get('/login', (req,res,next)=>{
  res.render('auth/login-view.ejs', {errorMessage: req.flash('error')});
});

//changes..says that the authentication is done by passport and its using the
//local strategy
authRoutes.post("/login",
 passport.authenticate("local", {
  successReturnToOrRedirect: "/", //instead of successRediret (which takes you to home no matter where you were).. successReturnToOrRedirect takes you to the last page you were on.
  failureRedirect: "/login",
  failureFlash: true, //get flash messages from login fail.
  successFlash: 'You have been logged in, user', //get flash messages from login success
  passReqToCallback: true
}));

//Get route for logout
//simply destroys the session
//does not destroy the cookie
//it clears all the information associated with the session (ie. currentUser)
authRoutes.get('/logout',(req,res,next)=>{
  req.logout(); //Instead of destroy().. it now works for all different strategies (google,facebook,etc.)
  req.flash('success', 'You have logged out.');
    res.redirect('/');
});

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/login');
    }
  };
}

authRoutes.get('/admin', checkRoles('ADMIN'), (req, res) => {
  res.render('admin/admin-panel', {user: req.user});
});

authRoutes.get('/dashboard', checkRoles('MEMBER'), (req, res, next)=>{
  res.render('auth/members-panel');
});

module.exports = authRoutes;
