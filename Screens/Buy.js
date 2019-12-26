import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Button, Dimensions, Linking, AsyncStorage} from 'react-native';

// You can import from local files

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper'; 
import EStyleSheet from 'react-native-extended-stylesheet';
import { API, graphqlOperation, Analytics } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native'
import gql from 'graphql-tag';
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
const entireScreenWidth = Dimensions.get('window').width;
 const rem = entireScreenWidth / 380 
 EStyleSheet.build({$rem: rem }); 
 const netid = `query Checketid($userNetID: String){
  listLoginModals(Type:"Login", limit:1, userNetID:$userNetID){
    items{
      userNetID
      Funds
    }
  }
}`
export default class Buy extends React.Component {

  //  netID = async () => {
  //   try { 
  //     const netID = await API.graphql(graphqlOperation(netid));
  //     this.setState({ netID: netID.data.listLoginModals.items });
  //   } catch (err) {
  //     console.log('error creating restaurant...', err);
  //   }
  // }
  // state = {
  //   netID:[]
  // }
  constructor(props) {
    super(props);
    this.state = {
      user:'',
      fundsget:[]
    };
  }
  logout = async() => {
      await AsyncStorage.clear();
    this.props.navigation.navigate('RUIDLogin')
  }
  componentWillMount = async () => {
    this.setState({
      user: await AsyncStorage.getItem('userNetID')
    })
    this.fundsget();

}

fundsget = async () => {
  try {
    const fundsget = await API.graphql(
      graphqlOperation(netid, {
        userNetID: this.state.user
      })
    );
    this.setState({ fundsget: fundsget.data.listLoginModals.items });
  } catch (Error) {
    console.log('error creating restaurant...', Error);
    this.dropDownAlertRef.alertWithType(
      'error',
      'Error',
      Error.errors[0].message
    );
  }
};

// componentWillMount(){ 
//   this.netID()
// this.routeSubscription = this.props.navigation.addListener(
//   'willFocus',
//   this.netID()
// );

// }

componentDidMount() {
// create route subscription to know when to re-fetch data because the component is mounted even if it is
// not in the view, so react-navigation provides events
console.log('(9999201'); 
Analytics.record({Account: 'Accountpage'});
Analytics.record('Accountpage');

const { navigation } = this.props;
this.focusListener = navigation.addListener("didFocus", () => {
this.fundsget()
});  

}
componentWillUnmount() {
  // cancel route subscription when the component unmounts (if the subscription exists)
  if (this.routeSubscription) {
    this.routeSubscription.remove();
    console.log('euddsjjs'); 
  }
}
  render() {
    return (
      <View style={styles.container}>  
      {this.state.fundsget.map(dat => (
              <View item={dat} key={dat.id} > 
        <View style={styles.currearnCont}>  
        <Text style={styles.currEarnText}>Current Earnings:</Text>  
               <Text style={styles.currEarnText}>{dat.Funds}</Text>
        </View> 
        <View style={styles.payOutCont}>   
        <TouchableOpacity   
            style={styles.button}   
              onPress={() =>   
                      this.props.navigation.navigate('PaypalPayout', {funds: dat.Funds, use: this.state.user})}>
              <Text
                style={styles.buttontext}>
                Pay Out
              </Text>
            </TouchableOpacity>
        
      </View>
        
        <View style={styles.spacingView} />
        <View style={styles.accountOptionsCont}>
        <TouchableOpacity onPress={()=> Linking.openURL('mailto:asendcollegeapp@gmail.com')}>
        <Text style={styles.accountOptionsText}> Contact Us</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.spacingView} />
        <View style={styles.accountOptionsCont}>
        <TouchableOpacity onPress={() => 
                      this.props.navigation.navigate('UpdateNetIDPass', {use: this.state.user})}>
        <Text style={styles.accountOptionsText}> Update NetID Password</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.spacingView} />
        <View style={styles.accountOptionsCont}> 
        <TouchableOpacity onPress={() => Linking.openURL('https://asendpolicy.s3.amazonaws.com/index.html')}>
        <Text style={styles.accountOptionsText}> Terms and Conditions</Text>
        </TouchableOpacity>
        </View> 
        <View style={styles.spacingView} />
        <View style={styles.accountOptionsCont}> 
        <TouchableOpacity onPress={this.logout}>
        <Text style={styles.accountOptionsText}> Log Out</Text>
        </TouchableOpacity>
        </View> 
      </View>))}  
      </View>

    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: '5%',
  }, 
  paragraph: {
    fontSize: "35rem", 
    fontWeight: 'bold',
    textAlign: 'left',
  },
  accountCont:{
    alignItems:'flex-start', 
    justifyContent:'center'
  },
  button:{    
    marginTop: "10rem",  
    height: "50rem",  
    width: '50%',
    backgroundColor: 'orange',
    //backgroundColor: '#44aafc',
    borderRadius: "5rem",
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  buttontext: {
    fontSize: "20rem",
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
  } ,
  currearnCont:{
    alignItems:'center', 
    justifyContent:'center', 
    flexDirection:'row',
    marginTop:20
  },
  currEarnText:{
    textAlign:'center', 
    fontSize:20,
    color:'#44aafc'
  },
  payOutCont:{
    justifyContent:'center', 
    alignItems:'center', 
    marginTop:20,
    borderRadius:10
  },
  payOutText:{ 
    fontSize:20, 
    padding:5, 
    paddingLeft:10, 
    paddingRight:10, 
    borderRadius:10,
    color:'white',
    backgroundColor:'orange'
    
  },
  spacingView:{
    height:'7%'
  },
  accountOptionsCont:{
    justifyContent:'flex-end', 
    borderColor: '#e3e3e3', 
    borderBottomWidth:1, 
    padding:10, 
    width:'100%'
  },
  accountOptionsText:{
    fontSize:"18rem" 
  }
});