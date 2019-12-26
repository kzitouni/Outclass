// import {AppRegistry} from 'react-native';
// import App from './App';
// import {Testing3} from './app.json';

// import Amplify from 'aws-amplify';
// import awsmobile from './Screens/aws-exports';
// import React from 'react';

// var AWS = require('aws-sdk/dist/aws-sdk-react-native');
// export default WithProvider

// Amplify.configure(awsmobile)

// AppRegistry.registerComponent(Testing3, () => App);
import { AppRegistry } from 'react-native';
import App from './App';
import React from 'react';
import ReactDom from 'react-dom';
import Amplify from 'aws-amplify';
import aws_exports from './Screens/aws_exports' 
import AppSyncConfig from './Screens/appsync-config' 
Amplify.configure({aws_exports, AppSyncConfig}) 
AppRegistry.registerComponent('Testing3', () => App);