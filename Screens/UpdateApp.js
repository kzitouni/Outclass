import React, { Component, useState, useEffect } from 'react';
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
  Styles,
  ActivityIndicator
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Amplify, { API, graphqlOperation } from 'aws-amplify'; 
import EStyleSheet from 'react-native-extended-stylesheet';
const deleteoffer = `mutation DeleteOffer($OIndex: String){deleteOffer(input:{OIndex:$OIndex})
{Type
ClassN
CogID
CognitoID}}`;

const UpdateApp = () => {
const [isVisible, setIsVisible] = useState(true)
// const setModalVisible = {
//   setIsVisible(visible)
// }
return ( 
  <View styles={{justifyContent:'center', alignItems:'center'}}>
      <Modal
      visible={isVisible}
      onRequestClose={closeModal}>
        <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.text}>Please update your app</Text>
          </View>
          </View>
      </Modal>
<ActivityIndicator size="large"/></View>   ); 
}
export default UpdateApp
// export default class UpdateApp extends React.Component {
//     state = {
//         isVisible: true 
//     }
//  setModalVisible(visible) {
//    this.setState({ isVisible: visible });
//           }
 
//   render() { 
//     return ( 
//       <View styles={{justifyContent:'center', alignItems:'center'}}>
//           <Modal
//           visible={this.state.isVisible1}
//           onRequestClose={this.closeModal}>
//             <View style={styles.container}>
//             <View style={styles.container}>
//               <Text style={styles.text}>Please update your app</Text>
//               </View>
//               </View>
//           </Modal>
// <ActivityIndicator size="large"/></View>   ); 
//   } 
// }
const styles = EStyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    text:{
        fontSize:'30rem',
        textAlign:'center'
    }
})