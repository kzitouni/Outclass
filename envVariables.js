'use strict';

module.exports.handler = async (event, context, callback) => {
const response = {
      statusCode: 200,
    body: JSON.stringify({
     variable: 'the value of this variable is '
    }),
  };
callback(null, response);
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
