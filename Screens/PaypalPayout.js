import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import DropdownAlert from 'react-native-dropdownalert';

// You can import from local files

// or any pure javascript modules available in npm
import EStyleSheet from 'react-native-extended-stylesheet';
import { API, graphqlOperation } from 'aws-amplify';
// import t from 'tcomb-form-native';
import gql from 'graphql-tag';
const entireScreenWidth = Dimensions.get('window').width;
const rem = entireScreenWidth / 380;
EStyleSheet.build({ $rem: rem });
const netid = `query Checketid($userNetID: String){
  listLoginModals(Type:"Login", limit:1, userNetID:$userNetID){
    items{
      userNetID
      Funds
    }
  }
}`;
const paypalpayout = `mutation paypalPayout($type: String, $contact: String, $userNetID: String)
{payout(input:{type: $type, Type:"Login", contact: $contact, userNetID: $userNetID})
{status
}}
`;
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
export default class PaypalPayout extends React.Component {
  componentWillMount() {
    this.netID();
    this.props.navigation.getParam({ funds: 'funds' });
  }
  netID = async () => {
    try {
      const netID = await API.graphql(graphqlOperation(netid, {
        userNetID: this.props.navigation.state.params.use
      }));
      this.setState({ netID: netID.data.listLoginModals.items });
    } catch (err) {
      console.log('error creating restaurant...', err);
    }
  };
  state = {
    NetID: '',
    passNetID: '',
    userNetID: '',
    Name: '',
    Phone: '',
    confirmPhone: '',
    email: '',
    confirmEmail: '',
    Terms: '',
    logins: '',
    names: [],
    netID: [],
    buttonColor: '#D3D3D3',
    buttonColor1: '#D3D3D3',
    type: '',
    content: 'false',
    disable: false
  };
  paypalphone = async () => {
    try {
      const paypalphone = await API.graphql(
        graphqlOperation(paypalpayout, {
          type: "PHONE",
          contact: this.state.Phone,
          userNetID: this.props.navigation.state.params.use
        })
      );
      console.log('success');
      this.dropDownAlertRef.alertWithType('success', 'Phone Payout went through');
    } catch (err) {
      this.dropDownAlertRef.alertWithType(
        'error',
        'Error',
      );
      console.log('error creating ', err);
    }
  };
  paypalemail = async () => {
    try {
      const paypalemail = await API.graphql(
        graphqlOperation(paypalpayout, {
          type: "EMAIL",
          contact: this.state.email,
          userNetID: this.props.navigation.state.params.use
        })
      );
      console.log('success');
      this.dropDownAlertRef.alertWithType('success', 'Email Payout went through');
    } catch (err) {
      this.dropDownAlertRef.alertWithType(
        'error',
        'Error',
      );
      console.log('error creating ', err);
    }
  };
  handleSubmit = () => {
    const { Phone, confirmPhone } = this.state;
    // perform all neccassary validations
    if (Phone !== confirmPhone) {
      alert("Phones don't match");
    } else {
      this.paypalphone();
    }
  };
  handleEmailSubmit = () => {
    const { email, confirmEmail } = this.state;
    // perform all neccassary validations
    if (email !== confirmEmail) {
      alert("Email's don't match");
    } else {
      this.paypalemail();
    }
  };
  onButtonPress = () => {
    this.setState({ buttonColor: '#44aafc' });
    this.setState({ buttonColor1: '#D3D3D3' });
    this.setState({ type: 'EMAIL' });
    this.componentHideAndShow();
  };
  onButtonPress1 = () => {
    this.setState({ buttonColor: '#D3D3D3' });
    this.setState({ buttonColor1: '#44aafc' });
    this.setState({ type: 'PHONE' });
  };
  componentHideAndShow = () => {
    this.setState(previousState => ({ content: !previousState.content }));
  };
  render() { 
    const { navigation } = this.props;
    const use = navigation.getParam('use', ' ');
    return (
      
      <KeyboardAvoidingView style={{flex:1}} behavior="padding" enabled>  
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageCont}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://tutorialscreen2.s3.amazonaws.com/PaypalLogo.jpg',
            }}
          />
          <Image
            style={styles.image}
            source={{
              uri: 'https://tutorialscreen2.s3.amazonaws.com/GPayLogo.jpg',
            }}
          />
        </View>
        
          <DismissKeyboard> 
            <View style={{ width: '100%', alignItems: 'center' }}>
              <View style={styles.currearnCont}>
                <Text style={styles.currEarnText}>Payout Total:</Text>
                {this.state.netID.map(dat => ( 
                  <View item={dat} key={dat.id}> 
                    <Text style={styles.currEarnText}>${dat.Funds} </Text> 
                    {dat.Funds == null || dat.Funds == 0 || dat.Funds == '0' || dat.Funds == ' ' || typeof dat.Funds == undefined ? 
                  this.setState.disable == true : null}
                  </View>
                ))}
               
              </View>
              <View style={styles.payOutTCont}>
                <Text style={styles.payOutTxtM}>*Important Message</Text> 
                <Text style={styles.payOutTxt}>
                  {
                    "Once payment is sent you have 14 days to claim it or it will be returned. This is Google Pay's Policy"
                  }
                </Text>
              </View>
              <View style={styles.payOutCont}>
                <TouchableOpacity
                  style={styles.leftbutton}
                  onPress={() => {
                    this.onButtonPress();
                  }}>
                  <View
                    style={styles.phonecont}
                    backgroundColor={this.state.buttonColor}>
                    <Text style={styles.buttontext}>Phone Number</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  
                  onPress={() => {
                    this.onButtonPress1();
                  }}>
                  <View
                    style={styles.emailcont}
                    backgroundColor={this.state.buttonColor1}>
                    <Text style={styles.buttontext}>Email</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {this.state.buttonColor == '#44aafc' ? (
                <View>
                  <View style={styles.phonetxtcont}>
                    <TextInputMask
                      type={'custom'}
                      options={{
                        mask: '999 999 9999',
                      }}
                      keyboardType="phone-pad"
                      placeholder="Phone Number"
                      maxLength="12"
                      value={this.state.Phone}
                      style={styles.phonetxtinput}
                      onChangeText={Phone => this.setState({ Phone })}
                    />
                  </View>
                  <View style={styles.phonetxtcont}>
                    <TextInputMask
                      type={'custom'}
                      options={{
                        mask: '999 999 9999',
                      }}
                      keyboardType="phone-pad"
                      placeholder="Confirm Phone Number"
                      maxLength="12"
                      value={this.state.confirmPhone}
                      style={styles.phonetxtinput}
                      onChangeText={confirmPhone =>
                        this.setState({ confirmPhone })
                      }
                    />
                  </View>
                  <View>
                    <TouchableOpacity
                      style={styles.submitbutton}
                      disabled={this.state.Phone.length === 0}
                      onPress={() => {
                        this.handleSubmit();
                      }}>
                      <View style={styles.submitcont} backgroundColor="orange">
                        <Text style={styles.buttontext}>Submit</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.empty} />
                  </View>
                </View>
              ) : this.state.buttonColor1 == '#44aafc' ? (
                <View>
                  <View style={styles.textinputview}>
                    <TextInput
                      placeholder="Email"
                      value={this.state.text}
                      style={styles.emailinput}
                      onChangeText={email => this.setState({ email })}
                    />
                  </View>
                  <View style={styles.phonetxtcont}>
                    <TextInput
                      placeholder="Confirm Email "
                      value={this.state.text}
                      style={styles.emailinput}
                      onChangeText={confirmEmail =>
                        this.setState({ confirmEmail })
                      }
                    />
                  </View>
                  <View>
                    <TouchableOpacity
                      style={styles.submitbutton}
                      disabled={this.state.email.length == 0 || this.state.Phone.length == 0 || this.state.disable == true}
                      onPress={() => {
                        this.handleEmailSubmit();
                      }}>
                      <View style={styles.submitcont} backgroundColor="orange">
                        <Text style={styles.buttontext}>Submit</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.empty} />
                  </View>
                </View>
              ) : null}
                        <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />

            </View>
          </DismissKeyboard>
          </View>
          </ScrollView>
          <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    padding:'24rem', 
    backgroundColor: 'white',
    
  },
  phonecont: {
    width: '100%',
    borderRadius: '10rem',
  },

  phonetxtcont: {
    justifyContent: 'flex-start',
    marginLeft: '10rem',
    marginTop: '20rem',
    alignItems: 'center',
    height: '30rem',
    flexDirection: 'row',
    margin: '10rem',
    marginBottom: '10rem',
    borderRadius: '5rem',
    borderWidth: '0.5rem',
    borderColor: '#D3D3D3',
  },
  emailinput: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: '15rem',
    fontSize: '20rem',
    width: '100%',
  },
  textinputview: {
    justifyContent: 'flex-start',
    marginLeft: '10rem',
    marginTop: '20rem',
    alignItems: 'center',
    height: '30rem',
    flexDirection: 'row',
    margin: '10rem',
    marginBottom: '10rem',
    borderRadius: '5rem',
    borderWidth: '0.5rem',
    borderColor: '#D3D3D3',
  },
  submitcont: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10rem',
  },
  phonetxtinput: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: '15rem',
    fontSize: '20rem',
    width: '100%',
  },
  emailcont: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10rem',
  },
  textGetpaid: {
    textAlign: 'center',  
    marginTop: '20rem',
    color: 'black',
    fontWeight: '700',
  },
  imageCont: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'row', 
    //backgroundColor:'pink', 
    height: '100rem',     
    width: '100%',  
  },
  image: { 
    flex: 1, 
    justifyContent: 'center', 
    height: '45rem',             
    width: '15%',       
    alignItems: 'center',
    flexDirection: 'column', 
  },
  paragraph: {
    fontSize: '35rem',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  accountCont: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  leftbutton: {
    marginTop: '5rem',
    height: '50rem',
    width: '30%',
    marginRight: '15%',
    // backgroundColor: 'pink',
    borderRadius: '10rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: '5rem',
    height: '50rem',
    width: '30%',
    backgroundColor: 'orange',
    // backgroundColor: '#44aafc',
    borderRadius: '10rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitbutton: {
    marginTop: '20rem',
    flexDirection: 'row',
    marginLeft: '80rem',
    height: '50rem',
    width: '50%',
    backgroundColor: 'orange',
    // backgroundColor: '#44aafc',
    borderRadius: '10rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttontext: {
    fontSize: '20rem',
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
  },
  currearnCont: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    //backgroundColor: 'blue',
  },
  currEarnText: {
    textAlign: 'center',
    fontSize: '20rem',
    color: '#44aafc',
    fontWeight: '700',
  },
  payOutTCont: {
    //backgroundColor: 'yellow',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payOutTxtM: {
    textAlign: 'center',
    marginTop: '20rem',
    color: 'black',
    fontSize: '14rem',
    fontWeight: '700',
  },
  payOutTxt: {
    textAlign: 'center',
    marginTop: '5rem',
    color: 'black',
    fontWeight: '700',
    fontSize: '10rem',
    width: '80%',
  },
  payOutCont: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: '35rem',
    borderRadius: '10rem',
    flexDirection: 'row',
    // backgroundColor:'red'
  },
  payOutText: {
    fontSize: '20rem',
    padding: '5rem',
    paddingLeft: '10rem',
    paddingRight: '10rem',
    borderRadius: '10rem',
    color: 'white',
    // backgroundColor:'orange'
  },
  spacingView: {
    height: '7%',
  },
  accountOptionsCont: {
    justifyContent: 'flex-end',
    borderColor: '#e3e3e3',
    borderBottomWidth: 1,
    padding: '10rem',
    width: '100%',
  },
  accountOptionsText: {
    fontSize: '18rem',
  },
  empty: {
    height: '100rem',
    width: '10rem',
    backgroundColor: 'white',
  },
});

