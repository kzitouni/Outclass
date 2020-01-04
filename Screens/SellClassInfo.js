import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import EStyleSheet from 'react-native-extended-stylesheet';
import { API, graphqlOperation, Analytics } from 'aws-amplify';
// import t from 'tcomb-form-native';
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
var price;
var sortprice;
var usernetido;
var passnetido;
var custid;
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;



  const SellClassInfo = (props) => {
  const navigationOptions = ({ navigation }) => {
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
  const [Price, setPrice] = useState('')
  const [SortPrice, setSortPrice] = useState(' ')
  const [classindexnum, setClassindexnum] = useState(props.navigation.state.params.classindex)
  const [logins, setLogins] = useState([])
  const [sellstatus, setSellstatus] = useState([])
  const [notsell, setNotsell] = useState([])
  const [unsell, setUnsell] = useState([])
  const [lowprice, setLowprice] = useState([])
  const [lowprices, setLowprices] = useState([])
  const [content, setContent] = useState(false)
  const [soldlist, setSoldlist] = useState(false)
  const [status, setStatus] = useState([])
  const [classprice, setClassprice] = useState([])
  const [yourclassprice, setYourclassprice] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [highoff, setHighoff] = useState([])
  const [offercog, setOffercog] = useState([])
  const [custi, setCusti] = useState(custid)
  const [soldprice, setSoldprice] = useState([])
  const [soldprices, setSoldprices] = useState([])

  const SellClass = async () => {
    try {
      const SellClass = await API.graphql(
        graphqlOperation(sellClass, {
          classindexnum: props.navigation.state.params.classindex,
          Price: Price,
          userNetID: props.navigation.state.params.user
        })
      );
      // this.setState({ SellClass: SellClass.data.SellClass });
      const status = await API.graphql(
        graphqlOperation(statcheck, {
          Type: props.navigation.state.params.classindex,
          userNetID: props.navigation.state.params.user
        })
      );
      setStatus(status.data.listLoginModals.items)
      const lowprice = await API.graphql(
        graphqlOperation(lowestprice, {
          CIndex: props.navigation.state.params.classindex,
        })
      );
      setLowprice(lowprice.data.listlowestprice.items)
      const lowprices = await API.graphql(
        graphqlOperation(LowPrices, {
          CIndex: props.navigation.state.params.classindex,
        })
      );
      setLowprices(lowprices.data.listlowestprice.items)
      const yourclassprice = await API.graphql(
        graphqlOperation(classprice, {
          Type: props.navigation.state.params.classindex,
          userNetID: props.navigation.state.params.user
        })
      );
        setYourclassprice(yourclassprice.data.listLoginModals.items)
      dropDownAlertRef.alertWithType(
        'success',
        'Success',
        'Class Succesfully Listed'
      );
    } catch (err) {
      dropDownAlertRef.alertWithType(
        'error',
        'Error',
        'Listing not made. Please try again'
      );
    }
  };
  const offeraccept = async () => {
    try {
      const offer = await API.graphql(
        graphqlOperation(acceptoffer, {
          CogO: cogid,
          OIndex: cindex,
          useridO: usernetido,
          passO: passnetido,
          Price: price,
          SortPrice: sortprice,
          pkey: props.navigation.state.params.classindex + '.O',
          customerid: custid,  
          userNetID: props.navigation.state.params.user
        })
      );
      dropDownAlertRef.alertWithType(
        'success',
        'Success',
        'Transaction may take between 3-5 minutes'
      )
    } catch (Error) {
      dropDownAlertRef.alertWithType(
        'error',
        'Error',
        Error.errors[0].message
      )
      console.log('error creating restaurant...', Error);
    }
  };
  // const cognitoinfo = async () => {
  //   try {
  //     const offercog = await API.graphql(
  //       graphqlOperation(coginfo, {
  //         cognitoid: cogid,
  //       })
  //     );
  //     setOffercog(offercog.data.getcoginfo.items)
  //   } catch (Error) {
  //     console.log('error creating restaurant...', Error);
  //   }
  // };
  const acceptofferbut = () => {
   highestoff();
   offeraccept();
  }
  const highestoff = async () => {
    try {
      const highoff = await API.graphql(
        graphqlOperation(highestoffer, {
          CognitoID: props.navigation.state.params.classindex,
        })
      );
      setHighoff(highoff.data.listhighestoffer.items)
    } catch (Error) {
      console.log('error creating restaurant...', Error);
      dropDownAlertRef.alertWithType(
        'error',
        'Error',
        Error.errors[0].message
      );
    }
  };
  const deleteLoginModal = async () => {
    try {
      await API.graphql(graphqlOperation(unsellClass, {classindexnum: classindexnum,SortPrice: SortPrice, userNetID: props.navigation.state.params.user  }));
      const status = await API.graphql(
        graphqlOperation(statcheck, {
          Type: props.navigation.state.params.classindex,
          userNetID: props.navigation.state.params.user
        })
      );
      setStatus(status.data.listLoginModals.items)
      dropDownAlertRef.alertWithType(
        'success',
        'Success',
        'Class Succesfully Unlisted'
      );
    } catch (err) {
      console.log('error creating login...', err);
      dropDownAlertRef.alertWithType(
        'error',
        'Error',
        'Listing did not delete. Please try again.'
      );
    }
  };

  const onChange = (key, value) => {
    setPrice(value)
  };

  const componentHideAndShow = () => {
    setContent(prevState => !prevState.content)
  };
  const componentHideAndShowsold = () => {
    setSoldlist(prevState => !prevState.soldlist)
  };
  useEffect(() => {
    lowpricee()
    Getstatus()
    Getlowprices()
    Getsoldprices()
    highestoff()
    props.navigation.getParam({ classname: 'classname' });
    // props.navigation.addListener('willFocus', status)
    // props.navigation.addListener('willFocus', lowprice)
    // willFocusSubscription = props.navigation.addListener(
    //   'willFocus',
    //   status
    // );
  }, [])

  const lowpricee = async () => {
    try {
      const lowprice = await API.graphql(
        graphqlOperation(lowestprice, {
          CIndex: props.navigation.state.params.classindex,
        })
      );
      setLowprice(lowprice.data.listlowestprice.items)
      const yourclassprice = await API.graphql(
        graphqlOperation(classprice, {
          Type: props.navigation.state.params.classindex, userNetID: props.navigation.state.params.user
        })
      );
      setYourclassprice(yourclassprice.data.listLoginModals.items)
      console.log(yourclassprice.data);
    } catch (err) {
      console.log('error creating restaurant...', err);
    }
  };
  const Getstatus = async () => {
    try {
      const status = await API.graphql(
        graphqlOperation(statcheck, {
          Type: props.navigation.state.params.classindex,
          userNetID: props.navigation.state.params.user
        })
      ); 
      setStatus(status.data.listLoginModals.items)
    } catch (err) {
      console.log('error creating restaurant...', err);
    }
  };
 const unlistFunction = () => {
    deleteLoginModal();
    lowpricee();
    Getlowprices();
  }
  const listFunction = () => {
    SellClass();
  }
  const setModalVisible = (visible) => {
    setIsVisible(visible)
  }
  const Getsoldprices = async () => {
    try {
      const soldprices = await API.graphql(
        graphqlOperation(soldprice, {CognitoID: props.navigation.state.params.classindex})
      );
      setSoldprices(soldprices.data.getsoldclass.items)
    } catch (err) { 
      console.log('error creating restaurant...', err);
    }
  };
  const Getlowprices = async () => {
    try {
      const lowprices = await API.graphql(
        graphqlOperation(LowPrices, {
          CIndex: props.navigation.state.params.classindex,
        })
      );
      setLowprices(lowprices.data.listlowestprice.items)
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

    const classname = props.navigation.getParam('classname', ' ');
    var classindex = props.navigation.getParam('classindex', ' ');
    const classnum = props.navigation.getParam('classnum', ' ');
    const classtime = props.navigation.getParam('classtime', ' ');
    const classmajor = props.navigation.getParam('classmajor', ' ');
    const classstat = props.navigation.getParam('classstat', ' ');
    const highoffer = props.navigation.getParam('highoffer', ' ');
    const lowestprice = props.navigation.getParam('lowestprice', ' ');
    const section = props.navigation.getParam('section', ' ');
    const user = props.navigation.getParam('user', ' ');

    //  highoff.map((dak, index) => (
    //     <View key={index}>
    //       {(cogid = dak.Type)} {(cindex = dak.OIndex)}
    //       {(price = dak.Price)} 
    //       {(cognito = dak.CognitoID)}
    //       {(sortprice = dak.SortPrice)}
    //       {(custid = dak.customerid)}
    //       {(usernetido = dak.userNetID)} {(passnetido = dak.passNetID)}
    //     </View>
    //   ));
    

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
                    {yourclassprice.map(dak => (
                      <View item={dak} key={dak.id}>
                        <Text style={styles.yourPriceTxt}>${dak.Price}</Text>
                      </View>
                    ))}
                  </View>
                  <Text> {classprice.Price}</Text>
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
                        onPress={() => setModalVisible(true)}>
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
                          [{text: 'Cancel', onPress: () => props.navigation.navigate('SellClassInfo')},
                            {text: 'Yes', onPress: () => acceptofferbut()},
                            
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
                      {lowprice.map(dak => (
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
                      <TouchableOpacity onPress={componentHideAndShow}>
                        <View style={styles.viewCont}>
                          <Text style={styles.viewAll}>View All</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {lowprices.map(dak => (
              <View item={dak} key={dak.id}>
                {content ? (
                  <View style={{ width: '100%', backgroundColor: 'white' }}>
                    <Text style={styles.priceTxt}>
                      ${dak.Price}
                    </Text>
                  </View>
                ) : null}
              </View>
            ))}

            {status.map(dake => (
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
                            listFunction();
                          }}
                          style={styles.buyButton}
                          disabled={
                            Price.length === 0 ||
                            Price == null ||
                            typeof Price == undefined ||
                            Price == ' ' ||
                            Price == '' ||
                            Price == '0' ||
                            Price < 5
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
                                onPress={() => componentHideAndShowsold()}>
                                <View style={styles.viewCont}>
                                  <Text style={styles.viewAll}>View All</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                    
                    {soldprices.map(daks => (
              <View item={daks} key={daks.id}> 
                {soldlist ? (
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
                                onPress={() => componentHideAndShowsold()}>
                                <View style={styles.viewCont}>
                                  <Text style={styles.viewAll}>View All</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                    {soldprices.map(dak => (
                      <View item={dak} key={dak.id}>
                        {soldlist ? (
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
                        unlistFunction();
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
        <DropdownAlert ref={ref => (dropDownAlertRef = ref)} />
      </KeyboardAvoidingView>
    );
  }

export default SellClassInfo
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
