import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Slider,
  StyleSheet,
  NavigatorIOS,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  Alert,
  TextInput,
  Dimensions,
  Picker,
  Block,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import EStyleSheet from 'react-native-extended-stylesheet';
import { API, graphqlOperation, Analytics } from 'aws-amplify';
// import t from 'tcomb-form-native';
import gql from 'graphql-tag';
const { width: WIDTH } = Dimensions.get('window');

const LowPrices = `query ListSortPice($CIndex: String)
{listlowestprice
  (CIndex:$CIndex,filter:{stat:{contains:"true"}})
  {
  items{
    Price
  CognitoID}
}}`;
const classprice = `query GetStat($Type:String, $userNetID:String){listLoginModals(filter:{Type:{contains:$Type}}, userNetID: $userNetID)
{
  items{
    stat
    Price
  }
}}`;
const lowestprice = `query ListSortPrice($CIndex:String)
{listlowestprice
  (CIndex:$CIndex, limit:1)
  {
  items{
    Price
    CognitoID
  }  
}}`;
const soldprice = `query getsoldprices($CognitoID: String){getsoldclass(CognitoID: $CognitoID)
{items{
  Type
  Price
}}}`
// const notselling = `
// query listl($index: String){
//   listLoginModals(filter:{Type:{contains:$index}} ){
//     items{

//       NotSelling
//     }
//   }
// }`;
const coginfo = `query coginfo($cognitoid: String){getcoginfo(limit:1, CognitoID: $cognitoid) {
  items{
    Type
    userNetID
    passNetID
  }
}}`;
const acceptoffer = `mutation accepoffer ( $CogO: String, $pkey: String, $SortPrice: String, $OIndex: String, $useridO:String, $passO:String, $Price: String, $customerID: String, $userNetID: String){
  OfferTransaction(input:{Type: "Login", CogO: $CogO, pkey: $pkey, SortPrice: $SortPrice, OIndex: $OIndex, useridO: $useridO, passO: $passO, amount: $Price, customerID: $customerID, userNetID: $userNetID})
  {
    status
    pass 
    userid
    index
    message
    errorMessage
    stripeToken 
  }
  
}`;
const sellClass = `mutation CreateSellLine($classindexnum: String, $Price: String, $userNetID: String){SellClass(input: {classindexnum: $classindexnum, Price:$Price, stat:"true", userNetID: $userNetID})
{
  Time
  Type
  SortPrice
  Price
  Status
  Selling
  NotSelling
}}`;
const highestoffer = `query highestoffer($CognitoID: String){listhighestoffer(CognitoID:$CognitoID, limit:1)
{
  items{
    SortPrice
    Price
    Type
    CIndex
    CognitoID
    customerid
    userNetID
    OIndex
    passNetID
  }
}}`;
const unsellClass = `mutation DeleteLine($classindexnum: String, $userNetID: String){deleteLoginModal 
  (input:{classindexnum:$classindexnum, Price:" ", SortPrice:"z", stat: "false", userNetID:$userNetID}){ 
  Type
    CognitoID
    Price
    Selling
    NotSelling
    SortPrice
}}`;
const statcheck = `query GetStat($Type:String, $userNetID: String){listLoginModals(filter:{Type:{contains:$Type}}, userNetID:$userNetID)
{
  items{
    stat
  }
}}`;
// const netidget = `query listl($index: String){
//   listLoginModals(filter:{Type:{contains:$index}} ){
//     items{

//       SellStatus
//       Selling
//     }
//   }
// }`;
// const { Price} = this.state;
// const isEnabled = Price.length > 0;
const entireScreenWidth = Dimensions.get('window').width;
const rem = entireScreenWidth / 380;
EStyleSheet.build({ $rem: rem });
var cogid;
var cindex;
var cognito;
var price;
var sortprice;
var usernetido;
var passnetido;
var custid;
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
export default class SellClassInfo extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.classname,
      headerStyle: {
        backgroundColor: '#44aafc',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20, 
      },
      headerBackTitle: 'Back',
    };
  };
  state = {
    Price: '',
    SortPrice: ' ',
    classstat: '',
    classindexnum: this.props.navigation.state.params.classindex,
    logins: [],
    sellstatus: [],
    notsell: [],
    unsell: [],
    lowprice: [],
    lowprices: [],
    content: false,
    soldlist: false,
    status: [],
    classprice: [],
    yourclassprice: [],
    isVisible: false,
    highoff: [],
    offercog: [],
    custi: custid,
    soldprice:[],
    soldprices:[],
  };
  SellClass = async () => {
    try {
      const SellClass = await API.graphql(
        graphqlOperation(sellClass, {
          classindexnum: this.props.navigation.state.params.classindex,
          Price: this.state.Price,
          userNetID: this.props.navigation.state.params.user
        })
      );
      this.setState({ SellClass: SellClass.data.SellClass });
      const status = await API.graphql(
        graphqlOperation(statcheck, {
          Type: this.props.navigation.state.params.classindex,
          userNetID: this.props.navigation.state.params.user
        })
      );
      this.setState({ status: status.data.listLoginModals.items });
      const lowprice = await API.graphql(
        graphqlOperation(lowestprice, {
          CIndex: this.props.navigation.state.params.classindex,
        })
      );
      this.setState({ lowprice: lowprice.data.listlowestprice.items });
      const lowprices = await API.graphql(
        graphqlOperation(LowPrices, {
          CIndex: this.props.navigation.state.params.classindex,
        })
      );
      this.setState({ lowprices: lowprices.data.listlowestprice.items });
      const yourclassprice = await API.graphql(
        graphqlOperation(classprice, {
          Type: this.props.navigation.state.params.classindex,
          userNetID: this.props.navigation.state.params.user
        })
      );
      this.setState({
        yourclassprice: yourclassprice.data.listLoginModals.items,
      });
      this.dropDownAlertRef.alertWithType(
        'success',
        'Success',
        'Class Succesfully Listed'
      );
    } catch (err) {
      console.log('error creating restaurant...', err);
      this.dropDownAlertRef.alertWithType(
        'error',
        'Error',
        'Listing not made. Please try again'
      );
    }
  };
  offeraccept = async () => {
    try {
      const offer = await API.graphql(
        graphqlOperation(acceptoffer, {
          CogO: cogid,
          OIndex: cindex,
          useridO: usernetido,
          passO: passnetido,
          Price: price,
          SortPrice: sortprice,
          pkey: this.props.navigation.state.params.classindex + '.O',
          customerid: custid,  
          userNetID: this.props.navigation.state.params.user
        })
      );
      this.setState({ offer: offer.data.listLoginModals });
      this.dropDownAlertRef.alertWithType(
        'success',
        'Success',
        'Transaction may take between 3-5 minutes'
      )
    } catch (Error) {
      this.dropDownAlertRef.alertWithType(
        'error',
        'Error',
        Error.errors[0].message
      )
      console.log('error creating restaurant...', Error);
    }
  };
  cognitoinfo = async () => {
    try {
      const offercog = await API.graphql(
        graphqlOperation(coginfo, {
          cognitoid: cogid,
        })
      );
      this.setState({ offercog: offercog.data.getcoginfo.items });
    } catch (Error) {
      console.log('error creating restaurant...', Error);
    }
  };
  acceptofferbut() {
    this.cognitoinfo();
    this.highestoff();
    this.offeraccept();
  }
  highestoff = async () => {
    try {
      const highoff = await API.graphql(
        graphqlOperation(highestoffer, {
          CognitoID: this.props.navigation.state.params.classindex,
        })
      );
      this.setState({ highoff: highoff.data.listhighestoffer.items });
    } catch (Error) {
      console.log('error creating restaurant...', Error);
      this.dropDownAlertRef.alertWithType(
        'error',
        'Error',
        Error.errors[0].message
      );
    }
  };
  deleteLoginModal = async () => {
    // const { classindexnum, SortPrice } = this.state;
    // if (classindexnum === '') return;
    // let notsell = { classindexnum };
    // if (SortPrice !== '') {
    //   notsell = { ...notsell, SortPrice };
    // }
    // const notsellarray = [...this.state.unsell, notsell];
    // this.setState({ unsell: notsellarray });
    try {
      await API.graphql(graphqlOperation(unsellClass, {classindexnum: this.state.classindexnum,SortPrice: this.state.SortPrice, userNetID: this.props.navigation.state.params.user  }));
      console.log('item created!');
      const status = await API.graphql(
        graphqlOperation(statcheck, {
          Type: this.props.navigation.state.params.classindex,
          userNetID: this.props.navigation.state.params.user
        })
      );
      this.setState({ status: status.data.listLoginModals.items });
      this.dropDownAlertRef.alertWithType(
        'success',
        'Success',
        'Class Succesfully Unlisted'
      );
    } catch (err) {
      console.log('error creating login...', err);
      this.dropDownAlertRef.alertWithType(
        'error',
        'Error',
        'Listing did not delete. Please try again.'
      );
    }
  };

  onChange = (key, value) => {
    this.setState({ [key]: value });
  };

  componentHideAndShow = () => {
    this.setState(previousState => ({ content: !previousState.content }));
  };
  componentHideAndShowsold = () => {
    this.setState(previousState => ({ soldlist: !previousState.soldlist }));
  };
  componentWillMount() {
    this.lowprice();
    this.status();
    this.lowprices();
    this.soldprices();
    this.cognitoinfo();
    this.highestoff();
    this.props.navigation.getParam({ classname: 'classname' });

    //this.cognitoinfo();
    // this.highestoffer();
    this.props.navigation.addListener('willFocus', this.status);
    this.props.navigation.addListener('willFocus', this.lowprice);
    Analytics.record(this.props.navigation.state.params.classindex + 'sell')
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      this.status,  Analytics.record(this.props.navigation.state.params.classindex + 'sell')

    );
  }
  lowprice = async () => {
    try {
      const lowprice = await API.graphql(
        graphqlOperation(lowestprice, {
          CIndex: this.props.navigation.state.params.classindex,
        })
      );
      this.setState({ lowprice: lowprice.data.listlowestprice.items });
      const yourclassprice = await API.graphql(
        graphqlOperation(classprice, {
          Type: this.props.navigation.state.params.classindex, userNetID: this.props.navigation.state.params.user
        })
      );
      this.setState({
        yourclassprice: yourclassprice.data.listLoginModals.items,
      });
      console.log(yourclassprice.data);
    } catch (err) {
      console.log('error creating restaurant...', err);
    }
  };
  status = async () => {
    try {
      const status = await API.graphql(
        graphqlOperation(statcheck, {
          Type: this.props.navigation.state.params.classindex,
          userNetID: this.props.navigation.state.params.user
        })
      );
      this.setState({ status: status.data.listLoginModals.items });
    } catch (err) {
      console.log('error creating restaurant...', err);
    }
  };
  unlistFunction() {
    this.deleteLoginModal();
    this.lowprice();
    this.lowprices();
  }
  listFunction() {
    this.SellClass();
  }
  setModalVisible(visible) {
    this.setState({ isVisible: visible });
  }
  soldprices = async () => {
    try {
      const soldprices = await API.graphql(
        graphqlOperation(soldprice, {CognitoID: this.props.navigation.state.params.classindex})
      );
      this.setState({ soldprices: soldprices.data.getsoldclass.items });
    } catch (err) { 
      console.log('error creating restaurant...', err);
    }
  };
  lowprices = async () => {
    try {
      const lowprices = await API.graphql(
        graphqlOperation(LowPrices, {
          CIndex: this.props.navigation.state.params.classindex,
        })
      );
      this.setState({ lowprices: lowprices.data.listlowestprice.items });
    } catch (err) {
      console.log('error creating restaurant...', err);
    }
  };
  // async componentWillMount() {
  //   try {
  //     // const sellstatus = await API.graphql(
  //     //   graphqlOperation(netidget, {
  //     //     index: this.props.navigation.state.params.classindex,
  //     //   })
  //     // );
  //     // this.setState({ sellstatus: sellstatus.data.listLoginModals.items });
  //     // const notsell = await API.graphql(
  //     //   graphqlOperation(notselling, {
  //     //     index: this.props.navigation.state.params.classindex,
  //     //   })
  //     // );
  //     // this.setState({ notsell: notsell.data.listLoginModals.items });

  //     const lowprices = await API.graphql(
  //       graphqlOperation(LowPrices, {
  //         CIndex: this.props.navigation.state.params.classindex,
  //       })
  //     );
  //     this.setState({ lowprices: lowprices.data.listlowestprice.items });
  //   } catch (err) {
  //     console.log('error creating restaurant...', err);
  //   }
  // }

  render() {
    const { navigation } = this.props;
    const classname = navigation.getParam('classname', ' ');
    var classindex = navigation.getParam('classindex', ' ');
    const classnum = navigation.getParam('classnum', ' ');
    const classtime = navigation.getParam('classtime', ' ');
    const classmajor = navigation.getParam('classmajor', ' ');
    const classstat = navigation.getParam('classstat', ' ');
    const highoffer = navigation.getParam('highoffer', ' ');
    const lowestprice = navigation.getParam('lowestprice', ' ');
    const section = navigation.getParam('section', ' ');
    const user = navigation.getParam('user', ' ');

    {
      this.state.highoff.map((dak, index) => (
        <View key={index}>
          {(cogid = dak.Type)} {(cindex = dak.OIndex)}
          {(price = dak.Price)} 
          {(cognito = dak.CognitoID)}
          {(sortprice = dak.SortPrice)}
          {(custid = dak.customerid)}
          {(usernetido = dak.userNetID)} {(passnetido = dak.passNetID)}
        </View>
      ));
    }

    return (
      <KeyboardAvoidingView behavior="position" enabled>
      
        <View style={styles.background}>
          <ScrollView>
            <View style={styles.infobox}>
              <View style={styles.infoContM}>
                <View style={styles.infoContH}>
                  <Text style={styles.infoHeader}>Description</Text>
                  <Text
                    style={styles.yourPriceTxtwords}>  
                    Your Price:
                  </Text>
                  <View>
                    {this.state.yourclassprice.map(dak => (
                      <View item={dak} key={dak.id}>
                        <Text style={styles.yourPriceTxt}>${dak.Price}</Text>
                      </View>
                    ))}
                  </View>
                  <Text> {this.state.classprice.Price}</Text>
                </View>
                <View style={styles.infoCont}>
                  <Text style={styles.infoTxtM}>Class ID :</Text>
                  <Text style={styles.infoTxt}>{classnum}</Text>
                  <Text style={styles.infoTxtM}>Time :</Text>
                  <Text style={styles.infoTxt}>MW 8:30-9:50</Text>
                </View>

                <View style={styles.infoCont}>
                  <Text style={styles.infoTxtM}>Index :</Text>
                  <Text style={styles.infoTxt}>{classindex}</Text>
                  <Text style={styles.infoTxtM}>Section :</Text>
                  <Text style={styles.infoTxt}>{section}</Text>
                </View>
              </View>
            </View>

            <View style={styles.spaceBet}>
              <View style={styles.listBoxO}>
                <View style={styles.list}>
                  <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.listCont}>
                      <View style={styles.soldContT}>
                        <Text style={styles.sellHeader}>TOP OFFER</Text>
                      </View>
                      <View style={styles.listContP}>
                        <Text style={styles.listTxt}>${highoffer}</Text>
                      </View>
                    </View> 
                    <View style={styles.underLineT}/> 
                    {highoffer == null || 
                    highoffer == '-' ||
                    typeof highoffer == undefined ? (
                      <TouchableOpacity  
                        style={{ justifyContent: 'center', alignItems: 'center' }} 
                        disabled={
                          highoffer == null ||
                          highoffer == '-' ||
                          typeof highoffer == undefined
                        }
                        onPress={() => this.setModalVisible(true)}>
                        <View style={styles.offerGrey}> 
                          <Text style={styles.offerATxt}>Accept Offer</Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.offermodel} 
                       onPress={() => Alert.alert(
                          'Tap Yes to accept offer',
                          ' ', // <- this part is optional, you can pass an empty string
                          [{text: 'Cancel', onPress: () => this.props.navigation.navigate('SellClassInfo')},
                            {text: 'Yes', onPress: () => this.acceptofferbut()},
                            
                          ],
                          {cancelable: true},
                        )}>
                        <View style={styles.acceptofferbutton}>
                          <Text
                            style={styles.offerATxt}> 
                            Accept Offer
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    <View>
                              <Text style={styles.sellFee}>
                                Selling Fee 30%
                              </Text>
                            </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.spaceBet}>
              <View style={styles.listBox}>
                <View style={styles.list}>
                  <View style={styles.listCont}>
                    <View style={styles.listContT}>
                      <Text style={styles.sellHeader}>LOWEST PRICE</Text>
                    </View>

                    <View style={styles.listContP}>
                      {this.state.lowprice.map(dak => (
                        <View item={dak} key={dak.id}>
                          <Text style={styles.listTxt}>${dak.Price}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View
                      style={styles.underLineT}
                    />

                    <View>
                      <TouchableOpacity onPress={this.componentHideAndShow}>
                        <View style={styles.viewCont}>
                          <Text style={styles.viewAll}>View All</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {this.state.lowprices.map(dak => (
              <View item={dak} key={dak.id}>
                {this.state.content ? (
                  <View style={{ width: '100%', backgroundColor: 'white' }}>
                    <Text style={styles.priceTxt}>
                      ${dak.Price}
                    </Text>
                  </View>
                ) : null}
              </View>
            ))}

            {this.state.status.map(dake => (
              <View item={dake} key={dake.id}>
                {dake.stat === 'false' || dake.stat === null ? (
                  <View>
                    <View style={styles.spaceBet}>
                      <View style={styles.sellBox}>
                        <View style={styles.sell}>
                          <View style={styles.sellCont}>
                            <View style={styles.sellContT}>
                              <Text style={styles.sellHeader}>SET PRICE</Text>
                              <Text style={styles.sellTxtM}>
                                (min.$5/max.$999)
                              </Text>
                            </View>
                            <View style={styles.sellContP}>
                              <TextInput
                                style={styles.sellTxt}
                                onChangeText={v => this.onChange('Price', v)}
                                value={this.state.Price.replace(/^0+/, '')}
                                keyboardType="number-pad"
                                placeholder="$"
                                maxLength={3}
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <View style={styles.underLine}/>
                            <View>
                              <Text style={styles.sellFee}>
                                Selling Fee 30%
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.listFunction();
                          }}
                          style={styles.buyButton}
                          disabled={
                            this.state.Price.length === 0 ||
                            this.state.Price == null ||
                            typeof this.state.Price == undefined ||
                            this.state.Price == ' ' ||
                            this.state.Price == '' ||
                            this.state.Price == '0' ||
                            this.state.Price < 5
                          }>
                          <View>
                            <Text style={styles.buyTxt}>List</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.spaceBet}>
                      <View style={styles.listBox}>
                        <View style={styles.list}>
                          <View style={styles.listCont}>
                            <View style={styles.soldContT}>
                              <Text style={styles.sellHeader}>
                                SOLD CLASSES
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <View style={styles.underLineT}/>
                            <View>
                              <TouchableOpacity
                                onPress={this.componentHideAndShowsold}>
                                <View style={styles.viewCont}>
                                  <Text style={styles.viewAll}>View All</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                    
                    {this.state.soldprices.map(daks => (
              <View item={daks} key={daks.id}> 
                {this.state.soldlist ? (
                  <View style={{ width: '100%', backgroundColor: 'white' }}>
                    <Text style={styles.priceTxt}>
                      ${daks.Price}
                    </Text>   
                  </View>
                ) : null}
              </View>
            ))}
                  </View>
                ) : dake.stat === 'true' ? (
                  <View>
                    <View style={styles.spaceBet}>
                      <View style={styles.listBox}>
                        <View style={styles.list}>
                          <View style={styles.listCont}>
                            <View style={styles.soldContT}>
                              <Text style={styles.sellHeader}>
                                SOLD CLASSES
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <View style={styles.underLineT}/>
                            <View>
                              <TouchableOpacity
                                onPress={this.componentHideAndShowsold}>
                                <View style={styles.viewCont}>
                                  <Text style={styles.viewAll}>View All</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                    {this.state.soldprices.map(dak => (
                      <View item={dak} key={dak.id}>
                        {this.state.soldlist ? (
                          <View
                         style={{ width: '100%', backgroundColor: 'white' }}>
                          <Text style={styles.soldClassesPriceTxt}> 
                              ${dak.Price}
                            </Text>
                          </View>
                        ) : null}
                      </View>
                    ))}
                    <TouchableOpacity
                      onPress={() => {
                        this.unlistFunction();
                      }}
                      style={styles.unlistbuyButton}>
                      <View>
                        <Text style={styles.buyTxt}>Unlist</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            ))}

            <View style={styles.empty} />
          </ScrollView>
        </View>
        <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = EStyleSheet.create({
  soldClassesPriceTxt: {
     fontSize: "20rem", 
     textAlign: 'center',
  },
  acceptOfferAccept: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'right',
    height: '100%',    
    width: '103rem', 
    borderLeftWidth: '0.3rem',
    borderTopWidth: '0.5rem',
  },
  acceptOfferCancle: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    borderTopWidth: '0.3rem', 
    height: '100%',
    width: '103rem', 
    borderTopWidth: '0.5rem',
  },
  acceptOfferConf: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'right', 
    height: '100%',    
    width: '103rem', 
    borderLeftWidth: '0.3rem',
    borderTopWidth: '0.5rem',
  },
  confirmAOffer: {
    marginTop: '25rem',
    flexDirection: 'row', 
    width: '100%',
    height: '30%', 
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  
  priceTxt: {
    fontSize: "20rem", 
    textAlign: 'center' 
  },
  yourPriceTxt: {
    textAlign: 'center',
    marginLeft: '5rem',
    fontWeight: '700',
    fontSize: '14rem', 
  },
  yourPriceTxtwords: {
    textAlign: 'center',
    marginLeft: '70rem',
    fontWeight: '700',
    fontSize: '14rem', 
  },
    underLine: { 
    borderBottomColor: '#d2d2d2',
    borderBottomWidth: '1rem',
    width: '92%',
  },
  underLineT: {
    marginTop: '10rem',
    borderBottomColor: '#d2d2d2',
    borderBottomWidth: '1rem',
    width: '92%',
  },
  offerATxt: { 
    textAlign: 'center',
    //backgroundColor: '#44aafc',
    fontWeight: 'bold',
    fontSize:'15rem',
    color: 'white',
    borderRadius: "10rem",
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerAButton: {
    marginTop: "10rem",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: "10rem",
    width: '100%', 
  },
  offermodel: {
    marginTop: "10rem",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: "10rem",
    width: '100%',
    //backgroundColor:'red',
  },
  offerGrey: {
      marginTop: "8rem",
      height: "40rem",  
      width: "150rem",
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#cccccc',
      borderRadius: "5rem",
  },
  offerAccCont: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.3)',
  },
  offerAccBox: {
    width: '55%',
    height: '20%',
    backgroundColor: '#ffffff',
    borderRadius: "5rem",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  offerAccTCont: {
    marginTop: "30rem",
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    height: '40rem',
    justifyContent: 'center',
    backgroundColor: '#44aafc',
  },
  background: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    height: '100%',
  },
  spaceBet: {
    marginTop: '20rem',
  },
  headerTxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: "15rem",
    fontWeight: 'bold',
  },
  buyButton: {
    marginTop: '10rem',
    height: '50rem',
    width: '90%',
    backgroundColor: 'orange',
    //backgroundColor: '#44aafc',
    borderRadius: '5rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptofferbutton: {
    marginTop: "8rem",
    height: "40rem",
    width: "150rem",
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#44aafc',
    borderRadius: "5rem",
  },
  unlistbuyButton: {
    marginTop: '10rem',
    height: '50rem',
    width: '90%',
    left: "20rem",
    backgroundColor: 'orange',
    //backgroundColor: '#44aafc',
    borderRadius: '5rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infobox: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '140rem',
    borderTopWidth: '0.5rem',
    borderBottomWidth: '0.5rem',
    borderColor: '#e8e8e8',
  },
  infoContM: {
    flexDirection: 'column',
    marginTop: '25rem',
    marginLeft: '40rem',
    height: '100%',
    width: '100%',
  },
  infoContH: {
    marginTop: '8rem',
    flexDirection: 'row',
    height: '38rem',
    //backgroundColor: 'blue',
  },
  infoCont: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: '22rem',
    marginTop: "5rem",
    //backgroundColor: 'red',
  },
  infoHeader: {
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '15rem',

  },
  infoTxtM: {
    width: '18%',
    color: 'black',
    textAlign: 'left',
    fontSize: '11rem',

    //backgroundColor: 'red',
  },
  infoTxt: {
    width: '26%',
    color: 'black',
    textAlign: 'left',
    fontSize: '11rem',

    //backgroundColor: 'blue',
  },

  sellBox: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100rem',
    borderTopWidth: '0.5rem',
    borderBottomWidth: '0.5rem',
    borderColor: '#e8e8e8',
  },
  sell: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    //backgroundColor: 'yellow',
  },
  sellHeader: {
    color: 'black',
    textAlign: 'left',
    fontSize: '15rem',

    marginTop: "10rem",
  },
  sellCont: {
    flexDirection: 'row',
    marginTop: '10rem',
    //backgroundColor: 'pink',
  },
  buyTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20rem',
    // textAlign: 'flex-start',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sellContP: {
    marginTop: '12rem',
    marginRight: '20rem',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: '45rem',
  },
  sellContT: {
    flex: 1,
    marginLeft: '15rem',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  soldContT: {
    flex: 1,
    marginTop: '5rem',
    marginLeft: '15rem',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  sellTxtM: {
    marginTop: '10rem',
    color: 'grey',
    textAlign: 'left',
    fontSize: '13rem',
 
  },
  sellTxt: {
    color: 'black',
    textAlign: 'right',
    fontSize: '25rem',
    fontWeight: 'bold',

    width: '200rem',
  },
  sellFee: {
    marginTop: '8rem',
    color: 'grey',
    textAlign: 'center',
    fontSize: '12rem',

  },
  listBoxO: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '130rem',
    borderTopWidth: '0.5rem',
    borderBottomWidth: '0.5rem',
    borderColor: '#e8e8e8',
  },
  listBox: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '80rem',
    borderTopWidth: '0.5rem',
    borderBottomWidth: '0.5rem',
    borderColor: '#e8e8e8',
  },
  listCont: {
    flexDirection: 'row',
    //backgroundColor: 'green',
    alignItems: 'flex-end',
  },
  listContP: {
    flex: 1,
    //marginTop: 12,
    marginRight: '15rem',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: '30rem',
    //backgroundColor: 'blue',
  },
  listTxt: {
    color: 'black',
    textAlign: 'left',
    fontSize: '20rem',
 
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    fontWeight: 'bold',
    //backgroundColor: 'blue',
  },
  sellButtonBox: {
    marginTop: '20rem',
    flexDirection: 'column',
    backgroundColor: 'orange',
    borderRadius: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    height: '50rem',
  },
  empty: {
    width: '50rem',
    height: '50rem',
  },
  list: {
    flexDirection: 'column',

    width: '100%',
    height: '100%',
    //backgroundColor: 'yellow',
  },
  listContT: {
    marginLeft: '15rem',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    //backgroundColor: 'orange',
  },
  viewAll: {
    color: '#44aafc',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '15rem',

  },
  viewCont: {
    marginTop: '5rem',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#83c4f7',
    //borderWidth: 2,
    borderRadius: '5rem',
    height: '25rem',
    width: '80rem',
  },
  offermodaltext: {
    textAlign: 'center',
    fontSize: "14rem",
    color: '#44aafc',
    fontWeight: '700',
  },
  /*
  <View style={{
                alignItems: 'center', 
                justifyContent: 'center',
                }}>
        <View style={styles.sellButtonBox}></View>
        </View>
        */
});
