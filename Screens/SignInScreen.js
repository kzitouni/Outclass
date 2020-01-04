import React from 'react';
import Expo from 'expo';
import aws_exports from './aws_exports';
import Amplify from 'aws-amplify';
Amplify.configure(aws_exports);

import { withAuthenticator } from 'aws-amplify-react-native';

const App = props => props.navigation.navigate('LoadPage') 


export default withAuthenticator(App);