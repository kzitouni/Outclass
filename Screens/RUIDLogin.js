import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
  Linking,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import { API, graphqlOperation } from 'aws-amplify';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AsyncStorage } from '@aws-amplify/core';
const entireScreenWidth = Dimensions.get('window').width;
const rem = entireScreenWidth / 380;
EStyleSheet.build({ $rem: rem });
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const netidCheck = `query Checknetd($userNetID: String){
  listLoginModals(Type:"Login", limit:1, userNetID:$userNetID){
    items{
      userNetID
    }
  }
}`;

const LoginCheck = `mutation updatelogintime($userNetID: String, $passNetID: String){updatelogintime(input:{Type:"Login", userNetID:$userNetID, passNetID:$passNetID})
{result{
  Major
  message
  errorMessage}
}}`;
export default RUIDLogin = () => {

  const [NetID, setNetID] = useState('')
  const [Password, setPassword] = useState('')
  const [netidcheck, setNetidcheck] = useState([])
  const [schedinfo, setSchedinfo] = useState([])
  const [userNetID, setUserNetID] = useState('')
  const [passNetID, setPassNetID] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [wasShown, setWasShown] = useState(false)
  const [Username, setUsername] = useState('')

  state = {
    NetID: '',
    Name: '',
    Password: '',
    Terms: '',
    logins: '',
    login: [],
    names: [],
    netidcheck: [],
    schedinfo: [],
    userNetID: '',
    passNetID: '',
    isLoaded: false,
      wasShown: false
  };

  useEffect(() => {
    AsyncStorage.getItem('key')
    .then(wasShown => {
        if(wasShown === null) {  
          AsyncStorage.setItem('key', '"true"')
        }
        setIsLoaded(true)
        setWasShown(true)
      })
  }, [])

  const queryData = async () => {
    try {
      const netidcheck = await API.graphql(graphqlOperation(netidCheck));
      setNetID(netidcheck.data.listLoginModals.items)
    } catch (err) {
      console.log('error creating restaurant...', err);
    }
  };
//   const setuser = async () => {
//  let value = Username;
//  let valuep = Password;
//  try {
//    await AsyncStorage.setItem('Username', value);

//    this.setState({ 'Username': value });  
//    await AsyncStorage.setItem('Password', valuep);
//    this.setState({ 'Password': valuep }); 
//    console.log(value) 
//        console.log(valuep) 
//        Alert.alert("succesful login")
//  } catch (error) {
//    console.log('error saving data')
//  }
// };
  const CreateLoginCheck = async () => {
    try {
      await API.graphql(
        graphqlOperation(LoginCheck, {
          userNetID: userNetID,
          passNetID: passNetID,
        })
      );
      const Getnetidcheck = await API.graphql(graphqlOperation(netidCheck, {userNetID: userNetID}));
      setNetidcheck(Getnetidcheck.data.listLoginModals.items)
      dropDownAlertRef.alertWithType(
        'success',
        'Success',
        'Sign In Successful'
      );
    } catch (err) {
      dropDownAlertRef.alertWithType(
        'error',
        'Error',
        err.errors[0].message
      );
    }
  };



  const onClickab = () => {
    CreateLoginCheck();
    _onDone();
  }
  const _onDone = async () => {
  let value = userNetID;
  let valuep = passNetID;
  try {
    await AsyncStorage.setItem('userNetID', value);
    setUserNetID(value)
    await AsyncStorage.setItem('passNetID', valuep);
    setPassNetID(valuep)
    dropDownAlertRef.alertWithType(
      'success',
      'Success',
      'Attempting to Sign In'
    );
  } catch (error) {
    console.log('error saving data')
  }
};
    return ( <DismissKeyboard>
      <View>
        <View style={styles.container}>
          <Text style={styles.titletext}>Enter Your Net ID Login</Text>
          <View style={styles.textinput}>
          <TextInput
            onChangeText={v => setUserNetID(v)}
            value={userNetID}
            placeholderTextColor="#D3D3D3"
            placeholder="Enter your Net ID "
            autoCapitalize='none'
            style={styles.text}
          />
          </View>
          <View  style={styles.textinput}>
          <TextInput
            onChangeText={v => setPassNetID(v)}
            value={passNetID}
            placeholderTextColor="#D3D3D3"
            placeholder="Enter your Net ID Password "
            autoCapitalize='none'
            secureTextEntry={true}
            style={styles.text}
          />
          </View>
          <Text style={styles.termstext}>
            By signing in you are agreeing to the
          </Text>
          <Text
            style={styles.bluelinktext}
            onPress={() => Linking.openURL('https://asendpolicy.s3.amazonaws.com/index.html')}>
            {''}
            Terms and Conditions{' '}
          </Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {this.state.netidcheck.map(dat => (
              <View item={dat} key={dat.id}>
                {dat.userNetID === ' ' ? (
                  Alert.alert('Wrong netID or password provided')
                ) : dat.userNetID === null ? (
                  Alert.alert('Wrong netID or password provided')
                ) : (props.navigation.navigate('loadSIpage') )}
                <Text>{dat.usernetID}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={styles.button}
              disabled={
                userNetID.length === 0 ||
                passNetID.length === 0
              }
              onPress={() => onClickab()}>
              <Text style={styles.buttontext}>Sign In!</Text>
            </TouchableOpacity>
          </View>
        </View> 
        <DropdownAlert ref={ref => (dropDownAlertRef = ref)} />
      </View>
    </DismissKeyboard>
    )
}
const styles = EStyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: '50rem',
    padding: '20rem',
    backgroundColor: '#ffffff',
  },
  titletext: {
    fontSize: '20rem',
    textAlign: 'center',
    color: '#44aafc',
    fontWeight: 'bold',
    marginBottom: '15rem',
  },
  textinput: { 
    width: '90%',
    height: '15%',
    margin: '10rem',
justifyContent:'center',
    backgroundColor: '#fff',
    borderRadius: '5rem',
    borderWidth: '0.5rem',
    borderColor: '#D3D3D3',
  },
  text:{
    marginLeft:'10rem'
  },
  termstext: {
    textAlign: 'center',
    marginTop: '10rem',
    fontWeight: '100',
  },
  bluelinktext: {
    color: 'blue',
    textAlign: 'center',
    fontWeight: '100',
  },
  button: {
    marginTop: '10rem',
    height: '50rem',
    width: '90%',
    backgroundColor: 'orange',
    borderRadius: '5rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttontext: {
    fontSize: '20rem',
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',  
  },
});