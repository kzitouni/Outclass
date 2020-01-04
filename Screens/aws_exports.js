const aws_exports = {
   "aws_project_region": "us-east-1",
    'aws_appsync_graphqlEndpoint': 'https://kogmzo44vffwbfl2zwkw3z6rpy.appsync-api.us-east-1.amazonaws.com/graphql',
    'aws_appsync_region': 'us-east-1',
    'aws_appsync_authenticationType': 'API_KEY',
    "ClientDatabasePrefix": "Ascend API_AMAZON_COGNITO_USER_POOLS",
    'aws_appsync_apiKey': 'da2-kzo67gnl3jfffmoqrgqh3c5kfi',
    //  identityPoolId: 'us-east-1:5403c63f-ea59-4eb1-b657-b91796a0259d', 
    //     region: 'us-east-1', 
    //     userPoolId: 'us-east-1_3mQ4e7p9c',
    //     userPoolWebClientId: 'kkp33s51diojpije83q04be35', 
   Analytics: {
         // OPTIONAL - disable Analytics if true
         disabled: false,
         // OPTIONAL - Allow recording session events. Default is true.
         autoSessionRecord: true,
         AWSPinpoint: {
             // OPTIONAL -  Amazon Pinpoint App Client ID
             appId: 'd7b7b51dc96847fe8a86a42e6410dc39',
             // OPTIONAL -  Amazon service region
             region: 'us-east-1',
             // OPTIONAL -  Customized endpoint
             endpointId: 'XXXXXXXXXXXX',
             endpoint: {
               attributes: {
                   // Custom attributes that your app reports to Amazon Pinpoint. You can use these attributes as selection criteria when you create a segment.
                   hobbies: ['indext', 'majort', 'sellclasst', 'Account'],
               },
               channelType: 'APNS', // The channel type. Valid values: APNS, GCM
            }
             
} }
}


export default aws_exports;
 