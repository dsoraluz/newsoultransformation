const express = require('express');
const User = require('../models/user-model');
const ensure = require('connect-ensure-login');
const bcrypt = require('bcrypt');

//Allows us to send email via express application.
const nodemailer = require('nodemailer');

const memberRoutes = express.Router();

memberRoutes.get('/signup/:id', (req, res, next)=>{

  res.render('auth/member-specific-signup.ejs');

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
