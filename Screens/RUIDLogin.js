import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
  Linking,
  Input,
  TextInput,
  Switch,
  Alert,
  Dimensions,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import { withAuthenticator } from 'aws-amplify-react-native';
import { API, graphqlOperation } from 'aws-amplify';
// import t from 'tcomb-form-native';
import gql from 'graphql-tag';
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

// const createLoginModal = `query GettingNetIDCred($userNetID: String, $passNetID:String){ listNetIDCred(Type: "LoginTest", userNetID: $userNetID, passNetID:$passNetID) {
//   result{
//     ClassNum
//     ClassName
//   }
// }}
// `;

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
export default class RUIDLogin extends Component {
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
  //  componentDidMount() {
  //     this.queryData();
  //   }
  componentDidMount() {
    AsyncStorage.getItem('key')
      .then(wasShown => {
          if(wasShown === null) {  
            AsyncStorage.setItem('key', '"true"')
          }
 
          this.setState({isLoaded: true, wasShown})
       })
   }
  queryData = async () => {
    try {
      const netidcheck = await API.graphql(graphqlOperation(netidCheck));
      this.setState({ netidcheck: netidcheck.data.listLoginModals.items });
    } catch (err) {
      console.log('error creating restaurant...', err);
    }
  };
  setuser = async () => {
    const {Username, Password} = this.state;
 let  value = Username;
 let valuep = Password;
 try {
   await AsyncStorage.setItem('Username', value);
   this.setState({ 'Username': value });  
   await AsyncStorage.setItem('Password', valuep);
   this.setState({ 'Password': valuep }); 
   console.log(value) 
       console.log(valuep) 
       Alert.alert("succesful login")
 } catch (error) {
   console.log('error saving data')
 }
};
  CreateLoginCheck = async () => {
    try {
      await API.graphql(
        graphqlOperation(LoginCheck, {
          userNetID: this.state.userNetID,
          passNetID: this.state.passNetID,
        })
      );
      console.log('item created!');
      const netidcheck = await API.graphql(graphqlOperation(netidCheck, {userNetID: this.state.userNetID}));
      this.setState({ netidcheck: netidcheck.data.listLoginModals.items });
      this.dropDownAlertRef.alertWithType(
        'success',
        'Success',
        'Sign In Successful'
      );
    } catch (err) {
      this.dropDownAlertRef.alertWithType(
        'error',
        'Error',
        err.errors[0].message
      );
    }
  };

  // CreateUser = async () => {
  //   const { userNetID, passNetID } = this.state;
  //   if (userNetID === '') return;
  //   let login = { userNetID };
  //   if (passNetID !== '') {
  //     login = { ...login, passNetID };
  //   }
  //   const updatedLoginArray = [...this.state.logins, login];
  //   this.setState({ logins: updatedLoginArray });
  //   try {
  //     await API.graphql(graphqlOperation(createLoginModal, login));
  //     console.log('item created!');
  //   } catch (err) {
  //     console.log('error creating login...', err);
  //   }
  // };

  // change state then user types into input
  onChange = (key, value) => {
    this.setState({ [key]: value });
  };
  // this.props.navigation.navigate('HomeScreen');
  // componentDidMount() {
  //   AsyncStorage.getItem(this.props.pagekey, (err, result) => {
  //     if (err) {
  //     } else {
  //       if (result == null) {
  //         console.log("null value recieved", result);
  //       } else {
  //         this.props.navigation.navigate('SchedScreen')
  //       }
  //     }    
  //   });
  //   AsyncStorage.setItem(this.props.pagekey, JSON.stringify({"value":"true"}), (err,result) => {
  //           console.log("error");
  //           });
  // }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  onClickab() {
    this.CreateLoginCheck();
    this._onDone();
    // this.queryData();
  }
  _onDone = async () => {
    const {userNetID, passNetID} = this.state;
 let  value = userNetID;
 let valuep = passNetID;
 try {
   await AsyncStorage.setItem('userNetID', value);
   this.setState({ 'userNetID': value });  
   await AsyncStorage.setItem('passNetID', valuep);
   this.setState({ 'passNetID': valuep }); 
   console.log(value) 
       console.log(valuep) 
       this.dropDownAlertRef.alertWithType(
        'success',
        'Success',
        'Attempting to Sign In'
      );
 } catch (error) {
   console.log('error saving data')
 }
  };
  // async componentDidMount() {
  //   const names = await API.graphql(
  //     graphqlOperation(getLoginModal, {
  //       NetID: this.state.userNetID,
  //       Password: this.state.passNetID,
  //     })
  //   );
  //   this.setState({
  //     names: names.data.getLoginModal.items, 
  //   });
  // } 
  catch(err) {
    console.log('error fetching names...', err);
  }

  render() {
    return ( <DismissKeyboard>
      <View>
        <View style={styles.container}>
          <Text style={styles.titletext}>Enter Your Net ID Login</Text>
          <View style={styles.textinput}>
          <TextInput
            onChangeText={v => this.onChange('userNetID', v)}
            value={this.state.userNetID}
            placeholderTextColor="#D3D3D3"
            placeholder="Enter your Net ID "
            autoCapitalize='none'
            style={styles.text}
          />
          </View>
          <View  style={styles.textinput}>
          <TextInput
            onChangeText={v => this.onChange('passNetID', v)}
            value={this.state.passNetID}
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
                ) : (this.props.navigation.navigate('loadSIpage') )}
                <Text>{dat.usernetID}</Text>
              </View>
            ))}
            <TouchableOpacity
              style={styles.button}
              disabled={
                this.state.userNetID.length === 0 ||
                this.state.passNetID.length === 0
              }
              onPress={() => {
                this.onClickab();
              }}>
              <Text style={styles.buttontext}>Sign In!</Text>
            </TouchableOpacity>
          </View>
        </View> 
        <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
      </View>
    </DismissKeyboard>
    )
}
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
    //backgroundColor: '#44aafc',
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