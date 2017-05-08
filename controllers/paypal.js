var braintree = require('braintree');
var gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId: "hgt5jq5thf78mpv7",
	publicKey: "vj2tz3ry99v545qd",
	privateKey: "e627920b58c8b291fb3130b51d13572c"
});

var controller = {
	getClientToken: function (callback) {
		gateway.clientToken.generate({}, function (err, response) {
			if (err) {
				callback(err);
			}
			if (response.clientToken) {
				callback(response.clientToken);
			} else {
				callback(response);
			}
		});

	},
	getPlansAvailable: function (callback) {
		gateway.plan.all(function (err, response) {
			if (err) {
				callback(err);
			}
			if (response.plans) {
				callback(response.plans);
			} else {
				callback(response);
			}
		});
	},
	createSubscription: function (plan, nonce, callback) {
		gateway.customer.create({
			paymentMethodNonce: nonce
		}, function (err, result) {
			if (result.success) {
				var token = result.customer.paymentMethods[0].token;
				gateway.subscription.create({
					paymentMethodToken: token,
					planId: plan
				}, function (err, result) {
					callback(result);
				});
			} else {
				callback(undefined);
			}
		});
	}
};
module.exports = controller;
