var Paypal = require('../paypal');
var should = require('chai').should();
describe('Braintree Token', function () {
	var testToken;
	before(function (done) {
		Paypal.getClientToken(function (token) {
			testToken = token;
			done();
		});
	});
	it('Braintree Service is up and running token received', function () {
		testToken.should.be.a('string');
	});
});


describe('Braintree Plans', function () {
	var testPlans;
	before(function (done) {
		Paypal.getPlansAvailable(function (plans) {
			testPlans = plans;
			done();
		});
	});
	it('Braintree Service is up and running plans received', function () {
		testPlans.should.be.a('array');
	});
});
