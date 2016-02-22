var mandrill, getMandrillApiKey, sendMail, mandrillClient, prepareMessageString;

mandrill = require('mandrill-api/mandrill');
_ = require('lodash');

getMandrillApiKey = function() {
    return process.env.MANDRILL_API_KEY;
}

prepareMessageString = function(EmailObject) {
    message = {
        "html": EmailObject.Content,
        "text": "",
        "subject": EmailObject.Subject,
        "from_email": EmailObject.From,
        "from_name": EmailObject.From,
        "to": [ {
            "email": EmailObject.To,
            "name": "",
            "type": "to"
        } ],
        "headers": {
            "Reply-To": EmailObject.From
        },
        "important": false,
        "track_opens": null,
        "track_clicks": null,
        "auto_text": null,
        "auto_html": null,
        "inline_css": true,
        "url_strip_qs": null,
        "preserve_recipients": null,
        "view_content_link": null,
        "bcc_address": "ashwini@web-flight.nl",
        "tracking_domain": null,
        "signing_domain": null,
        "return_path_domain": null,
        "merge": true,
        "merge_language": "mailchimp",
        "global_merge_vars": [ {
            "name": "merge1",
            "content": "merge1 content"
        } ],
        "merge_vars": [ {
            "rcpt": EmailObject.To,
            "vars": [ {
                "name": "merge2",
                "content": "merge2 content"
            } ]
        } ],
        "tags": [
        ],
        "subaccount": null,
        "google_analytics_domains": [
            "flipit.com"
        ],
        "google_analytics_campaign": "",
        "metadata": {
            "website": "www.flipit.com"
        },
        "recipient_metadata": [ {
            "rcpt": EmailObject.To,
            "values": {
                "user_id": EmailObject.UserId
            }
        } ]
    };

    $mergeVars = [];

    if (typeof EmailObject.MergeVars !== "undefined") {
        _.forEach(EmailObject.MergeVars, function(mergeVar, key) {
            $mergeVars.push({ 'name': key, 'content': mergeVar.S });
        });
    }
    message.merge_vars[0]['vars'] = $mergeVars;
    return message;
}

sendMail = function(EmailObject, next) {
    apiKey = getMandrillApiKey();
    mandrillClient = new mandrill.Mandrill(apiKey);
    message = prepareMessageString(EmailObject);
    async = false;
    ip_pool = "Main Pool";
    send_at = new Date().toString();

    mandrillClient.messages.send({
        "message": message,
        "async": async,
        "ip_pool": ip_pool,
        "send_at": send_at
    }, function(result) {
        console.log(result);
        next(null, EmailObject, result);
    }, function(e) {
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        next('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    });
}

module.exports = {
    sendMail: sendMail,
    getMandrillApiKey: getMandrillApiKey,
    prepareMessageString: prepareMessageString
};
