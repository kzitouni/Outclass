// import React, {Component} from 'react';
// import {Button, StyleSheet, NavigatorIOS, Text, View, FlatList,TouchableOpacity} from 'react-native';
// import Expo from 'expo';
// import {createSwitchNavigator,navigate, navigation} from 'react-navigation';
// import Amplify, {Auth} from 'aws-amplify';
// import appsync_config from './appsync-config'; 
// import awsmobile from './aws-exports';
// import {withAuthenticator} from 'aws-amplify-react-native';

// import AppSync from 'aws-appsync'; 

// Amplify.configure(awsmobile);



// class SignInScreen extends React.Component {
//   render() {
//     return (
//       this.props.navigation.navigate('TutorialScreen')
//     );
//   }
// }

// export default withAuthenticator(SignInScreen);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import React from 'react';
import {Button, StyleSheet} from 'react-native';
import Expo from 'expo';
import aws_exports from './aws_exports';
import Amplify from 'aws-amplify';
Amplify.configure(aws_exports);

import { withAuthenticator } from 'aws-amplify-react-native';

class App extends React.Component {
 
  render() {

    return (
       this.props.navigation.navigate('LoadPage') )
  };
 
  }

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});