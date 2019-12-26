import React, { Component } from 'react';
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import EStyleSheet from 'react-native-extended-stylesheet';
const entireScreenWidth = Dimensions.get('window').width;
const rem = entireScreenWidth / 380;
import DropdownAlert from 'react-native-dropdownalert';
EStyleSheet.build({ $rem: rem });
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const updatepass = `mutation updatepass($passNetID:String, $userNetID:String){
  UpdateNetIDpass(input:{Type:"Login", passNetID:$passNetID, userNetID:$userNetID})
  {
    stat
    passNetID
  }
}`;

const netid = `query Checketid($userNetID: String){
  listLoginModals(Type:"Login", limit:1, userNetID:$userNetID){
    items{
      userNetID
      Funds
    }
  }
}`;

export default class UpdateNetIDpass extends Component {

  rerender = () => this.forceUpdate();

  state = {
    NetID: '',
    passNetID: '',
    userNetID: '',
    Name: '',
    Password: '',
    Terms: '',
    logins: '',
    names: [],
    netID: [],
  };
  componentWillMount() {
    this.netID();
  }
  netID = async () => {
    try {
      const netID = await API.graphql(graphqlOperation(netid, {userNetID: this.props.navigation.state.params.use}));
      this.setState({ netID: netID.data.listLoginModals.items });
    } catch (err) {
      console.log('error creating restaurant...', err);
    }
  };
  Passupdate = async () => {
    try {
      await API.graphql(graphqlOperation(updatepass, {passNetID: this.state.passNetID, userNetID: this.props.navigation.state.params.use}));
      console.log('item created!');
      this.dropDownAlertRef.alertWithType(
        'success',
        'Success',
        'Class Succesfully Listed'
      );
    } catch (err) {
      console.log('error creating login...', err);
       this.dropDownAlertRef.alertWithType(
        'error',
        'Error',
        err.errors[0].message
      );
    }
  };

  // change state then user types into input
  onChange = (key, value) => {
    this.setState({ [key]: value });
  };

  // onClickab(){
  //   this.props.navigation.navigate('HomeScreen');
  //   this.CreateUser();
  // }
  //   async componentDidMount() {
  //     const names = await API.graphql(graphqlOperation(getLoginModal, {NetID: this.state.userNetID, Password: this.state.passNetID}));
  //     this.setState({
  //       names: names.data.getLoginModal.items
  //     })
  //   } catch (err) {
  //     console.log('error fetching names...', err)
  //   }

  render() {
    const { navigation } = this.props;
    const use = navigation.getParam('use', ' ');
    return (
      <DismissKeyboard>
      <View>
        <View style={styles.container}>
          <Text
            style={styles.enterpasstxt}>
            {' '}
            Enter Your New Password{' '}
          </Text>
          <View
            style={styles.netcont}> 
            {this.state.netID.map(dat => (
              <View item={dat} key={dat.id}>
                <Text style={styles.netIdTxt}>NetID: {dat.userNetID}</Text>
              </View>
            ))}
          </View>
          <View style={styles.txtinputcont}>
            <TextInput
              placeholder="Enter your Password"  
              style={styles.txtinputstyle}
              onChangeText={v => this.onChange('passNetID', v)}
              value={this.state.passNetID}
            />
          </View>
          <View style={styles.buttoncont}>
          <TouchableOpacity style={styles.button} onPress={()=> this.Passupdate()}>
            <Text style={styles.buttontext}>Update</Text> 
          </TouchableOpacity>
</View> 
          {/* {this.state.data.map((dat, index)=>(
        <Text
          key={index}>{dat.UserID}
        </Text>
                )) } */}
                </View>
     <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        </View>
      </DismissKeyboard>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: "50rem",
    padding: "20rem",
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: '30rem',
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
  netIdTxt: {
    fontSize: "16rem",
    fontWeight: 'bold',
    color: 'black',
  },
  txtinputstyle: {
 width: '50%',   
  height: "50rem", 
   margin: "10rem",
  backgroundColor: '#ffffff', 
   borderRadius: "5rem",
   borderWidth: "1rem",
    borderColor: '#D3D3D3',
    padding:"10rem"
  },
  netcont:{
   justifyContent: 'center',
  flexDirection: 'row',
   marginBottom: '2%',
   marginTop:'10%'
            },
  enterpasstxt:{
   justifyContent: 'center',
   textAlign:'center',
     flexDirection: 'row',
     marginBottom: '2%',
     fontSize:"20rem" 
  },
  buttoncont:{justifyContent:'center', 
  alignItems:'center'},
  txtinputcont:{
justifyContent: 'center', 
flexDirection: 'row'
  }
});
