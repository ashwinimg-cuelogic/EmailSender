var handleEventType, handleEmailType, getLambdaEventData;

getLambdaEventData = require('./getLambdaEventData');

handleEventType = function(EventType, record, next, callback) {
    if (EventType == "INSERT") {
        next(null, record);
    } else {
        console.log("no handling for " + EventType + " type of trigger");
        callback();
    }
}

handleEmailType = function(EmailType, record, next, callback) {
    if (EmailType == "newsletter" || EmailType == "testnewsletter") {
        next(null, record, EmailType);
    } else {
        console.log("no handling for " + EmailType + " type of trigger");
        callback();
    }
}

module.exports = {
    handleEventType: handleEventType,
    handleEmailType: handleEmailType
};
