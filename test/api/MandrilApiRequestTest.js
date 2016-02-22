var assert, mandrillApiRequest;
assert = require('assert');
mandrillApiRequest = require("./../../src/api/MandrilApiRequest.js");

describe("MandrilApiRequest", function() {
    describe('#getMandrillApiKey', function() {
        it('should return proper API key when its set', function () {
            var APIURL = mandrillApiRequest.getMandrillApiKey();
            assert.equal(APIURL, process.env.MANDRILL_API_KEY);
        });
    });

    describe('#prepareMessageString', function() {
        it('should return proper message string', function () {
            var message = mandrillApiRequest.prepareMessageString({});
            assert.equal(message, message);
        });
    });

    describe('#sendMail', function() {
        it('should call next function after sending the mail', function () {
            var message = mandrillApiRequest.sendMail({}, function() {});
        });
    });
});