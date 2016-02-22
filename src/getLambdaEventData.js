var getEmailType, getEventName, getEventRecords, getReferenceId, getLocal, getUserId, getSenderEmail, getSubject, getContent,
    getReceiverEmail, getUserId, getSenderName, getReceiverName, getMergeVars, _;

_ = require('lodash');

getEventRecords = function(event, next) {
    var eventRecords = (event.Records) ? event.Records : '';
    if ( typeof eventRecords === 'undefined' || eventRecords === '') {
        next("Invalid Records");
    } else {
        return eventRecords;
    }
}

getEventName = function(record, next) {
    var EventType = (record.eventName) ? record.eventName : '';
    if ( typeof EventType === 'undefined' || EventType === '') {
        next("Event name is not valid");
    } else {
        return EventType;
    }
}
getEmailType = function(record, next) {
    var EmailType = (record.dynamodb.NewImage.EmailType.S) ? record.dynamodb.NewImage.EmailType.S : '';
    if ( typeof EmailType === 'undefined' || EmailType === '') {
        next("EmailType is not valid");
    } else {
        return EmailType;
    }
}

getLocal = function(record, next) {
    var local = (record.dynamodb.NewImage.Local.S) ? record.dynamodb.NewImage.Local.S : '';
    if ( typeof local === 'undefined' || local === '') {
        next("local is not valid");
    } else {
        return local;
    }
}

getReferenceId = function(record, next) {
    var ReferenceId = (record.dynamodb.NewImage.ReferenceId.N) ? record.dynamodb.NewImage.ReferenceId.N : '';
    if ( typeof ReferenceId === 'undefined' || ReferenceId === '') {
        next("ReferenceId is not valid");
    } else {
        return ReferenceId;
    }
}

getUserId = function(record, next) {
    var UserId = (record.dynamodb.NewImage.UserId.N) ? record.dynamodb.NewImage.UserId.N : '';
    if ( typeof UserId === 'undefined' || UserId === '') {
        next("UserId is not valid");
    } else {
        return UserId;
    }
}

getSenderEmail = function(record, next) {
    var SenderEmail = (record.dynamodb.NewImage.From.S) ? record.dynamodb.NewImage.From.S : '';
    if ( typeof SenderEmail === 'undefined' || SenderEmail === '') {
        next("SenderEmail is not valid");
    } else {
        return SenderEmail;
    }
}

getSenderName = function(record, next) {
    var SenderName = (record.dynamodb.NewImage.SenderName.S) ? record.dynamodb.NewImage.SenderName.S : '';
    if ( typeof SenderName === 'undefined' || SenderName === '') {
        next("SenderName is not valid");
    } else {
        return SenderName;
    }
}

getReceiverName = function(record, next) {
    var ReceiverName = (record.dynamodb.NewImage.ReceiverName.S) ? record.dynamodb.NewImage.ReceiverName.S : '';
    if ( typeof ReceiverName === 'undefined' || ReceiverName === '') {
        next("ReceiverName is not valid");
    } else {
        return ReceiverName;
    }
}

getReceiverEmail = function(record, next) {
    var ReceiverEmail = (record.dynamodb.NewImage.To.S) ? record.dynamodb.NewImage.To.S : '';
    if ( typeof ReceiverEmail === 'undefined' || ReceiverEmail === '') {
        next("ReceiverEmail is not valid");
    } else {
        return ReceiverEmail;
    }
}

getSubject = function(record, next) {
    var subject = (record.dynamodb.NewImage.Subject.S) ? record.dynamodb.NewImage.Subject.S : '';
    if ( typeof subject === 'undefined' || subject === '') {
        next("subject is not valid");
    } else {
        return subject;
    }
}

getContent = function(record, next) {
    var content = (record.dynamodb.NewImage.Content.S) ? record.dynamodb.NewImage.Content.S : '';
    if ( typeof content === 'undefined' || content === '') {
        next("content is not valid");
    } else {
        return content;
    }
}

getMergeVars = function(record, next) {
    var MergeVars = (record.dynamodb.NewImage.MergeVars) ? record.dynamodb.NewImage.MergeVars.M : '';
    if ( typeof MergeVars === 'undefined' || MergeVars === '') {
        next("MergeVars is not valid");
    } else {
       return MergeVars;
    }
}

module.exports = {
    getEventRecords: getEventRecords,
    getEventName: getEventName,
    getEmailType:getEmailType,
    getLocal:getLocal,
    getReferenceId:getReferenceId,
    getSubject:getSubject,
    getContent:getContent,
    getSenderEmail:getSenderEmail,
    getSenderName:getSenderName,
    getReceiverEmail:getReceiverEmail,
    getReceiverName:getReceiverName,
    getUserId:getUserId,
    getMergeVars: getMergeVars
};
