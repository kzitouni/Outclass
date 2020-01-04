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
