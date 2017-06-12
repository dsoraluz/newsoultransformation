const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Mongoose = require('mongoose');

const User = require('../models/user-model.js');
const Plan = require('../models/plan-model.js');

const authRoutes = express.Router();

const nodemailer = require('nodemailer');

//Get route for signup
authRoutes.get('/signup',(req, res, next)=>{
  res.render('auth/main-signup-view.ejs');
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
    res.render('auth/main-signup-view',{
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
      res.render('auth/main-signup-view.ejs',{
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
      phone: req.body.phone,
      address: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
      },
      language: req.body.language,
      referredBy: req.body.referredBy,
      role: "MEMBER",
      descendedFrom: adminId,
      descendants: [],
      points: 0
    };


    //Create userInfo with hashed password
    const theUser = new User(userInfo);

    //Save user to database
    theUser.save((err)=>{
      if(err){
        res.render('auth/main-signup-view', {
          errorMessage: 'There was a problem saving. Try again later.'
        });
        return;
      } else {
        req.flash('success','You have been registered. Try loggin in.');
        // res.redirect('/');
      }

      addDescendant(adminId, theUser);


      let id = theUser.id;

      let toFirstName = req.body.firstName;
      let toLastName = req.body.lastName;
      let email = req.body.email;

      let userMessage = req.body.userMessage;


      // Create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USERNAME, //User Email address
          pass: process.env.GMAIL_PASSWORD
        }
      });

      // Setup email data with unicode symbols
      let mailOptions = {
        // Sender address
        from: `New Soul Transformation <soultrahsformation@gmail.com>`,
        // List of receivers
        to: `${email}`,
        // Subject Line
        subject: `${toFirstName}, Welcome to New Soul Transformation!!`,
        // Plain text body
        html: `<h2> WELCOME! </h2> \n <p>${toFirstName}, <br/><br/> Send your friends the following link </p> \n <a href="${process.env.SITE_URL}/signup/${id}">  <h3>SIGNUP LINK</h3> </a>`
      };

      // Send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info)=>{
        if (error){
          res.send(500);
          console.log(error);
          return;
        }else {
          console.log('Message %s sent: %s', info.messageId, info.response);
          transporter.close();
          res.redirect('/');
        }
      });
    });

  });
});

function addDescendant(adminId, newUser){
  console.log("new user", newUser);

  const userUpdates = {
    descendants: newUser
  };

  User.findByIdAndUpdate(adminId, userUpdates, (err, newDescendant)=>{
    if(err){
      next(err);
      return;
    }
    console.log("new descendant created");
  });
}

authRoutes.get('/login', (req,res,next)=>{
  res.render('auth/login-view.ejs', {errorMessage: req.flash('error')});
});

//changes..says that the authentication is done by passport and its using the
//local strategy
authRoutes.post("/login",
 passport.authenticate("local", {
  successReturnToOrRedirect: "/dashboard", //instead of successRediret (which takes you to home no matter where you were).. successReturnToOrRedirect takes you to the last page you were on.
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
  let plans;

  Plan.find((err, results)=>{
    if(err){
      next(err);
      return;
    }
    res.render('auth/members-panel', {plans: results});

  });


});

// authRoutes.get('/:id', (req,res,next)=>{
//     const planId = req.params.id;
//
//     Plan.findBYId(ongoose.Types.ObjectId(planId), (err, result)=>{
//       if(err){
//         next(err);
//         return;
//       }
//       res.render('auth/plan-details', {plan: result});
//     });
//   });


  // User.find({'_id': req.user.descendedFrom}, (err, teamLeader)=>{
  //   if (err){
  //     next(err);
  //     return;
  //   }
  //   console.log(plans);
  //   res.render('auth/members-panel', {leader: teamLeader[0], plans: plans});
  // });

module.exports = authRoutes;
