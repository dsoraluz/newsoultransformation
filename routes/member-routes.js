const express = require('express');
const User = require('../models/user-model');
const ensure = require('connect-ensure-login');
const bcrypt = require('bcrypt');
const Paypal = require('../controllers/paypal');

//Allows us to send email via express application.
const nodemailer = require('nodemailer');

const memberRoutes = express.Router();


memberRoutes.get('/paypal', (req, res, next)=>{
  var response = {};
	Paypal.getClientToken(function (token) {
		if (token) {
			response.token = token;
			Paypal.getPlansAvailable(function (plans) {
				if (plans) {
					response.plans = plans;
					res.render('auth/paypal', {
						page: 'home',
						data: response
					});
          console.log(plans);
				}
			});
		}
	});
});

/* POST Value for subscription */
memberRoutes.post('/subscribe', function (req, res) {
	var nonce = req.body.payment_method_nonce;
	var plan = req.body.plan;
	if (nonce && plan) {
		Paypal.createSubscription(plan, nonce, function (subscribed) {
			if (subscribed) {
        const userId = req.user.id;
        const points = req.user.points + 40;
        // const pointsLeft = 400 - points;
        let userUpdates = {
          points: points
        };

        User.findByIdAndUpdate(userId, userUpdates, (err, user)=>{
          if(err){
            next(err);
            return;
          }
  				res.render('braintree/subscribed', {
  					page: 'subscribed',
  					data: JSON.stringify(subscribed, null, 3)
  				});
        });
			} else {
				// TODO: Something went wrong report back to user
				res.status(404).send('Service is not avialble at this time');
			}
		});
	} else {
		res.status(401).send('Unauthorized!');
	}
});

memberRoutes.get('/signup/:id', (req, res, next)=>{

  const id = req.params.id;

  res.render('auth/member-specific-signup.ejs', {referrerId: id});

});

memberRoutes.post('/signup/:id', (req, res, next)=>{
  let leaderId = req.params.id;

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
      dateOfBirth: req.body.dateOfBirth,
      phone: req.body.phone,
      address: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
      },
      taxIdSSN: req.body.taxIdSSN,
      language: req.body.language,
      referredBy: req.body.referredBy,
      role: "MEMBER",
      descendedFrom: leaderId,
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
    });

    addDescendant(leaderId, theUser);


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
      html: `<h2> WELCOME! </h2> \n <p>${toFirstName}, <br/><br/> Send your friends the following link </p> \n <a href="localhost:3000/signup/${id}">  <h3>SIGNUP LINK</h3> </a>`
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

function addDescendant(leaderId, newUser){
  console.log("new user", newUser);

  const userUpdates = {
    descendants: newUser
  };

  User.findByIdAndUpdate(leaderId, userUpdates, (err, newDescendant)=>{
    if(err){
      next(err);
      return;
    }
    console.log("new descendant created");
  });
}


memberRoutes.post('/invite/:id', ensure.ensureLoggedIn(), (req, res, next)=>{
  let id = req.params.id;

  let firstName = req.user.firstName;
  let lastName = req.user.lastName;
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
    from: `${firstName} ${lastName} <soultrahsformation@gmail.com>`,
    // List of receivers
    to: `${email}`,
    // Subject Line
    subject: `${toFirstName}, You have an invitaion from ${firstName} ${lastName}!`,
    // Plain text body
    //Base url needs to be put in
    html: `<h2> Here is something you might like... </h2> \n <p>${toFirstName}, <br/><br/> ${userMessage} </p> \n <h3>localhost:3000/signup/${id}</h3>`
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
      res.redirect('/dashboard');
    }
  });
});



module.exports = memberRoutes;
