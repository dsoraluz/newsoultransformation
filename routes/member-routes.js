const express = require('express');
const User = require('../models/user-model');
const ensure = require('connect-ensure-login');
const bcrypt = require('bcrypt');
const Paypal = require('../controllers/paypal');

//Allows us to send email via express application.
const nodemailer = require('nodemailer');

const memberRoutes = express.Router();

memberRoutes.get('/signup/:id', (req, res, next)=>{

  res.render('auth/member-specific-signup.ejs');

});

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

memberRoutes.post('/signup/:id', (req, res, next)=>{

});

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
    html: `<h2> Here is something you might like... </h2> \n <p>${toFirstName}, <br/><br/> ${userMessage} </p> \n <a href="localhost:3000/signup/${id}">  <h3>SIGNUP LINK</h3> </a>`
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
