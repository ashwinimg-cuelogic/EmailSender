var AWS, DOC, docClient, awsClient, getRecords, putRecord, _;
_ = require('lodash');
AWS = require("aws-sdk");
DOC = require("dynamodb-doc");
AWS.config.update({ region: "us-west-2" });

awsClient = new AWS.DynamoDB();
docClient = new DOC.DynamoDB(awsClient);

getRecords = function(tableName, conditions, next) {
    console.log(conditions);
    params = {};
    params.TableName = tableName;
    params.KeyConditions =  [];
    _.forEach(conditions, function(condition, key) {
        console.log(condition);
        params.KeyConditions.push(docClient.Condition(condition[0], condition[1], condition[2]));
    })
    //console.log( params.KeyConditions);
    //params.KeyConditions = [
    //    //docClient.Condition("Timestamp", "EQ", 1451290656),
    //    docClient.Condition("Local", "EQ", "be")
    //];

    console.log( params.KeyConditions);
    docClient.query(params, function(err, data) {
        console.log("called");
        console.log(err);
        console.log(data);
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(data);
        }
        next();
    });
}

putRecord = function(emailContentObject, next) {
    params = {};
    params.TableName = "EmailLog";

    params.Item = {
        "From":  emailContentObject.From,
        "To":  emailContentObject.To,
        "Subject":  emailContentObject.Subject,
        "content":  emailContentObject.Content,
        "ReferenceId": parseInt(emailContentObject.ReferenceId),
        "EmailType": emailContentObject.EmailType,
        "Local": emailContentObject.Local,
        "Timestamp": new Date().getTime(),
        "UserId": emailContentObject.UserId,
        "Result": emailContentObject.Result
    };
    docClient.putItem(params, function(err, data) {
        console.log("insert called");
        console.log(data);
        if (err) {
            next(err);
        } else {
            console.log(data);
            next();
        }
    });
}

module.exports = {
    getRecords: getRecords,
    putRecord:putRecord
};
