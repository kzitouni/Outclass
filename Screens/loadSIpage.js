import React, { Component } from 'react';
import {
  View,
  FormInput,
  Text,
  TextInput,
  Button,
  ScrollView,
  Modal, 
  TouchableOpacity, 
  FlatList,
  StyleSheet,
  StatusBar,
  AsyncStorage,
  Dimensions,
  Flatlist,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

export default class loadSIpage extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
        this.state = {
          user:''
        };}
        
        _bootstrapAsync = async () => {
              this.setState({
                user: await AsyncStorage.getItem('userNetID')
              });
              this.props.navigation.navigate('SchedScreen', {use: this.state.user})
            // this.props.navigation.navigate(userToken ? ('SchedScreen') : 'TutorialScreen');
          };
  componentWillMount(){
 AsyncStorage.setItem('userToken', 'abc');
 this._bootstrapAsync();
  }
   
  render() { 
   
    return ( 
        <View style={{flex: 1, justifyContent: 'center',flexDirection: 'row', justifyContent: 'space-around'}} >
        <ActivityIndicator size="large" />
        <StatusBar barStyle="default" />
        </View>   ); 
  } 
}