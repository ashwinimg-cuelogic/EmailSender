# Email Activity Reporter
This repository contains the node js code for AWS Lambda function to handle the API calls for sending the mail(using mandrill)
 and update the EmailLog table with response.
This function gets invoked when there is an event registered on EmailQueue Table



###Workflow
Workflow of the library:

1. New record is added in EmailQueue table.
2. Triggers the function
3. Function check for the duplicate records (with same userid, referenceid, emailtype = newsletter/codealert, local = local)
4. If duplicate record then don't send mail 
5. else send the mail and Add new record in EmailLog table using dynamoDB


### Version
1.0.0

### deployment steps 
- You need Grunt installed globally:

```sh
    $ npm install -g grunt
```
- Take the clone of the repository

- install npm packages
```sh
    $ npm install
```
- create .env file with the following settings

    *  KORTINGSCODE_API_URL = URL
    *  FLIPIT_API_URL       = URL
    *  API_KEY              = API_KEY
    *  MANDRILL_API_KEY     = MANDRILL_API_KEY

- follow the gruntfile.js for various available test and deply command


