exports.handler = function(event, context) {
    console.log("inside the handler of email sender");
    //console.log(JSON.stringify(event, null, 2));

    require('dotenv').load();
    var apiRequest, getLambdaEventData, async, dynamodbRequest, _, MandrillApiRequest, SendEmail, records, eventHandler;

    getLambdaEventData = require('./src/getLambdaEventData');
    dynamodbRequest = require('./src/dynamodbRequests');
    MandrilApiRequest = require('./src/api/MandrilApiRequest');
    async = require('async');
    _ = require('lodash');
    eventHandler = require('./src/eventHandler');

    SendEmail = function(record, callback) {
        async.waterfall([
                function getEventData(next) {

                    EventType = getLambdaEventData.getEventName(record, next);
                    eventHandler.handleEventType(EventType, record, next, callback);

                }, function getEmailType( record , next) {

                    EmailType = getLambdaEventData.getEmailType(record, next);
                    eventHandler.handleEmailType(EmailType, record, next, callback);

                }, function formEmailObject(record, EmailType, next) {

                    EmailObject = {
                        'From': getLambdaEventData.getSenderEmail(record, next),
                        'FromName': getLambdaEventData.getSenderName(record, next),
                        'To': getLambdaEventData.getReceiverEmail(record, next),
                        'ReceiverName': getLambdaEventData.getReceiverName(record, next),
                        'Subject': getLambdaEventData.getSubject(record, next),
                        "Content": getLambdaEventData.getContent(record, next),
                        "ReferenceId": getLambdaEventData.getReferenceId(record, next),
                        "EmailType": getLambdaEventData.getEmailType(record, next),
                        "Local": getLambdaEventData.getLocal(record, next),
                        "UserId": getLambdaEventData.getUserId(record, next),
                        "MergeVars":getLambdaEventData.getMergeVars(record, next)
                    }
                    next(null, EmailObject);

                }, function sendMailFromMandril(EmailObject, next) {

                    MandrilApiRequest.sendMail(EmailObject, next);

                }, function putRowsInDynamoDB(EmailObject, emailResult, next) {

                    EmailObject.Result = emailResult;
                    dynamodbRequest.putRecord(EmailObject, next);

                } ], function(err) {
                if (err) {
                    console.error(
                        err
                    );
                    callback(err);
                } else {
                    callback();
                }
            }
        );
    }

    records = getLambdaEventData.getEventRecords(event);
    async.forEachOfSeries(records, function(record, key, callback) {
        SendEmail(record, callback);
    }, function(err) {
        if (err) {
            context.done(err);
        } else {
            context.done(null, "success");
        }
    });
}
