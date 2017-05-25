const express = require('express');
const coinbaseRoutes = express.Router();

const Client = require ('coinbase').Client;

const client = new Client({
  'apiKey': process.env.COINBASE_API_KEY,
  'apiSecret': process.env.COINBASE_API_SECRET
});

coinbaseRoutes.get('/my-coinbase', (req,res,next)=>{
  // let accounts;
  client.getAccounts({}, function(err, accounts) {
    // accounts = this.accounts;
    // accounts.forEach(function(account) {
    //   console.log(account.name + ' balance: ' + account.native_balance.amount);
    // });
    res.render('auth/purchase-position', {accounts: accounts});
  });
});

module.exports = coinbaseRoutes;
