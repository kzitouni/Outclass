import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';
import { API, graphqlOperation } from 'aws-amplify'; 
const deleteoffer = `mutation DeletOffer($OIndex: String, $userNetID: String){deleteOffer(input:{OIndex:$OIndex, userNetID:$userNetID})
{Type
ClassN
CogID
CognitoID}}`;

export default DeletePage = (props) => {
  const { navigation } = props;   
  const index = navigation.getParam('index', ' '); 
  const user = navigation.getParam('user', ' ');

  const deloffer = async () => {
    try {
      deleteOffer = await API.graphql(
        graphqlOperation(deleteoffer, {
          OIndex: props.navigation.state.params.index,
          userNetID: props.navigation.state.params.user
        })
      )
    } catch (err) {
        console.log('error', err);
      } 
    }
  useEffect(() => {
    deloffer()
    props.navigation.navigate('SchedScreen')
  }, [])  

    return ( 
      <View style={{flex: 1, justifyContent: 'center',flexDirection: 'row', justifyContent: 'space-around'}}>
        <ActivityIndicator size="large"/>
      </View>   
    ); 
  } 

  /*
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
  Dimensions,
  Flatlist,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Amplify, { API, graphqlOperation } from 'aws-amplify'; 
const deleteoffer = `mutation DeletOffer($OIndex: String, $userNetID: String){deleteOffer(input:{OIndex:$OIndex, userNetID:$userNetID})
{Type
ClassN
CogID
CognitoID}}`;

export default class DeletePage extends React.Component {
      deloffer = async () => {try {
    const deleteOffer = await API.graphql(
      graphqlOperation(deleteoffer, {
        OIndex: this.props.navigation.state.params.index,
        userNetID: this.props.navigation.state.params.user
      })
    )
  } catch (err) {
      console.log('error', err);
    } 
  }
  componentWillMount(){
this.deloffer()
      this.props.navigation.navigate('SchedScreen')

  }   
  render() { 
    const { navigation } = this.props;   
    const index = navigation.getParam('index', ' '); 
    const user = navigation.getParam('user', ' ');

    return ( 
      <View style={{flex: 1, justifyContent: 'center',flexDirection: 'row', justifyContent: 'space-around'}}>
<ActivityIndicator size="large"/>
</View>   ); 
  } 
}
*/