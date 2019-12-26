import React, { Component, useState, useEffect } from 'react';
import {
  View,
  StatusBar,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

const LoadPage = (props) => {
const [user, setUser] = useState("")

const _bootstrapAsync = async () => {
  const userToken = await AsyncStorage.getItem('userToken');
    setUser(await AsyncStorage.getItem('userNetID'))
    ;
    if (userToken) {props.navigation.navigate('SchedScreen', {use: user})}
  else {props.navigation.navigate('TutorialScreen')}
  // this.props.navigation.navigate(userToken ? ('SchedScreen') : 'TutorialScreen');
};
useEffect(() => {
_bootstrapAsync()
}, [])
return ( 
  <View style={{flex: 1, justifyContent: 'center',flexDirection: 'row', justifyContent: 'space-around'}}>
  <ActivityIndicator size="large"/>
  <StatusBar barStyle="default" />
  </View>   ); 
}
export default LoadPage

// export default class LoadPage extends React.Component {
//     constructor(props) {
//         super(props);
//         this._bootstrapAsync();
//         this.state = {
//           user:''
//         };}
        
//   _bootstrapAsync = async () => {
//     const userToken = await AsyncStorage.getItem('userToken');
//       this.setState({
//         user: await AsyncStorage.getItem('userNetID')
//       });
//       if (userToken) {this.props.navigation.navigate('SchedScreen', {use: this.state.user})}
//     else {this.props.navigation.navigate('TutorialScreen')}
//     // this.props.navigation.navigate(userToken ? ('SchedScreen') : 'TutorialScreen');
//   };
//   componentWillMount(){
// this._bootstrapAsync();
//   }
   
//   render() { 
   
//     return ( 
//         <View style={{flex: 1, justifyContent: 'center',flexDirection: 'row', justifyContent: 'space-around'}}>
//         <ActivityIndicator size="large"/>
//         <StatusBar barStyle="default" />
//         </View>   ); 
//   } 
// }