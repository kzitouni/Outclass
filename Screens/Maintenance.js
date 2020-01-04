import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  ActivityIndicator
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


export default Maintenance = () => {
  const [isVisible, setIsVisible] = useState(true)
  const { navigation } = props;
  const message = navigation.getParam('message', ' ');

    return ( 
      <View styles={{justifyContent:'center', alignItems:'center'}}>
          <Modal
          visible={isVisible}
          onRequestClose={() => console.log('Fill')}>
            <View style={styles.container}>
            <View style={styles.container}>
              <Text style={styles.text}>{message}</Text>
              </View>
              </View>
          </Modal>
        <ActivityIndicator size="large"/>
      </View>   
    ); 
  }
  const styles = EStyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    text:{
        fontSize:'30rem',
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center'
    }
})