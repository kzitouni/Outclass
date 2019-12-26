import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage
} from "react-native";
import Expo from "expo";
import Icon from "react-native-vector-icons/Ionicons";
import { API, graphqlOperation, Analytics } from "aws-amplify";
import Stripe from "react-native-stripe-api";
import { TextInputMask } from "react-native-masked-text";
import EStyleSheet from "react-native-extended-stylesheet";
const entireScreenWidth = Dimensions.get("window").width;
const rem = entireScreenWidth / 380;
EStyleSheet.build({ $rem: rem });
import DropdownAlert from "react-native-dropdownalert";
var tokeni;
var price;
var useridO;
var passO;
var cognitoid;
var sortprice;
const lowest = `query ListSortPrice($CIndex:String)
{listlowestprice
  (CIndex:$CIndex, limit:1)
  {
  items{
    Price
    CognitoID
    userNetID
    passNetID
    SortPrice
  }
}}`;
const transaction = `mutation Transaction ( $CogO: String, $SortPrice: String, $index: String, $useridO:String, $passO:String, $amount: String, $stripeToken: String, $userNetID: String){
  ProcessTransaction(input:{Type: "Login", CogO: $CogO, SortPrice: $SortPrice, index: $index, useridO: $useridO, passO: $passO, amount: $amount, stripeToken: $stripeToken, userNetID: $userNetID})
  {
    status
    pass 
    userid
    index
    stripeToken 
  }
  
}`;
const addoffer = `mutation addoffer($Prof: String, $ClassN: String, $Price: String, $CIndex: String, $stripeToken: String, $userNetID: String)
{createOffer(input:{Prof: $Prof, ClassN: $ClassN, Price:$Price,CIndex:$CIndex, stripeToken:$stripeToken, Type:"Login", userNetID: $userNetID })
{CognitoID
Type
CogID
customerid}}`;
const highestoffer = `query highestoffer($CognitoID: String){listhighestoffer(CognitoID:$CognitoID, limit:1)
{
  items{
    SortPrice
    Price
    CognitoID
  }
}}`;
const stripe = `query getstripetok{getStripetoken(CognitoID:"stripeToken"){
  items{
    Token
  }
}}`;
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
export default BuyClassInfo = (props) => {
  BuyClassInfo.navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.classname,
      headerStyle: {
        backgroundColor: "#44aafc"
      },
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20
      },
      headerBackTitle: "Back"
    };
  };
  const [number, setNumber] = useState("");
  const [exp_month, setExp_month] = useState("");
  const [exp_year, setExp_year] = useState("");
  const [cvc, setCvc] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [useridO, setUseridO] = useState("");
  const [passO, setPassO] = useState("");
  const [login, setLogin] = useState([]);
  const [logins, setLogins] = useState([]);
  const [lowprices, setLowprices] = useState([]);
  const [trans, setTrans] = useState([]);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [content, setContent] = useState(false);
  const [buybutton, setBuybutton] = useState(false);
  const [Price, setPrice] = useState("");
  const [tokeni, setTokeni] = useState("");
  const [highoff, setHighoff] = useState([]);
  const [buttonColor, setButtonColor] = useState("");
  const [buttonColor1, setButtonColor1] = useState("");
  const [buttenabled, setButtenabled] = useState(true);
  const [buttenabled1, setButtenabled1] = useState(true)
  const [tap, setTap] = useState(0)
  const [getstripe, setGetstripe] = useState([])
  const [user, setUser] = useState("")
  const [makeoff, setMakeoff] = useState("")

  const onButtonPress = () => {
    setButtonColor("orange")
    setButtenabled(false)
  };
  const onButtonPress1 = () => {
    setButtonColor1("orange")
    setButtenabled1(false)
  };

  componentHideAndShow = () => {
    setBuybutton(prevState => !prevState)
  };

  const passData = async () => {
    try {
      const trans = await API.graphql(
        graphqlOperation(transaction, {
          index: props.navigation.state.params.index,
          useridO: useridO,
          passO: passO,
          amount: price,
          stripeToken: tokeni,
          CogO: cognitoid,
          SortPrice: sortprice,
          userNetID: user
        })
      );
      setTrans(trans.data.listLoginModals)
      dropDownAlertRef.alertWithType(
        "success",
        "Success",
        "Class Transfer is Pending. Can take between 3-5minutes"
      );
    } catch (Error) {
      console.log("error creating restaurant...", Error);
    }
  };
  const transfunc = () => {
    passData();
    setModalVisible(false);
  };
  useEffect(async () => {
    try {
      console.log(tokeni);
      setUser( await AsyncStorage.getItem("userNetID") )
      Analytics.record({ indext: props.navigation.state.params.index });
      Analytics.record(props.navigation.state.params.index);

      const lowprices = await API.graphql(
        graphqlOperation(lowest, {
          CIndex: props.navigation.state.params.index
        })
      );
      setLowprices(lowprices.data.listlowestprice.items)
      const highoff = await API.graphql(
        graphqlOperation(highestoffer, {
          CognitoID: props.navigation.state.params.index
        })
      );
      setHighoff(highoff.data.listhighestoffer.items)
      props.navigation.getParam({ classname: "classname" });
      
      const getstripe = await API.graphql(graphqlOperation(stripe));
      setGetstripe(getstripe.data.getStripetoken.items)
    } catch (err) {
      console.log("error creating restaurant...", err);
    }
  }, []);

  const payme = () => {
    try {
      const apiKey = "pk_live_1QAfg6KxxsuGvlB6r6qVsxqi00xpDAfIUq";
      const client = new Stripe(apiKey);
      client.createToken({
        number: number,
        exp_month: exp_month,
        exp_year: exp_year,
        cvc: cvc,
        address_zip: "12345"
      })
      .then(response => {
        setTokeni(response.id);
      });
    } catch (err) {
      console.log("error creating card...", err);
    }
  };

  const makeoffer = async () => {
    try {
      const makeoff = await API.graphql(
        graphqlOperation(addoffer, {
          Prof: "uknown",
          ClassN: props.navigation.state.params.classname,
          Price: Price,
          CIndex: props.navigation.state.params.index,
          stripeToken: tokeni,
          userNetID: user
        })
      );
      setMakeoff(makeoff.data.createOffer)
    } catch (Error) {
      console.log("error creating restaurant...", Error);
      dropDownAlertRef.alertWithType("error", "Error", Error.errors[0].message);
    }
  };
  const stripetok = async () => {
    try {
      const getstripe = await API.graphql(graphqlOperation(stripe));
      setGetstripe(getstripe.data.getStripetoken.items)
    } catch (Error) {
      console.log("error creating restaurant...", Error);
      dropDownAlertRef.alertWithType("error", "Error", Error.errors[0].message);
    }
  };

  const yourFunction = () => {
    payme();
    onButtonPress();
  };
  const yourFunction1 = () => {
    payme();
    onButtonPress1();
  };
  const func = () => {
    makeoffer();
    SetModalVisible1(false);
  };
  const { navigation } = props;
  const index = navigation.getParam("index", " ");
  const time1 = navigation.getParam("time1", " ");
  const time2 = navigation.getParam("time2", " ");
  const time3 = navigation.getParam("time3", " ");
  const time4 = navigation.getParam("time4", " ");
  const time5 = navigation.getParam("time5", " ");
  const teacher = navigation.getParam("teacher", " ");
  const day1 = navigation.getParam("day1", " ");
  const day2 = navigation.getParam("day2", " ");
  const day3 = navigation.getParam("day3", " ");
  const day4 = navigation.getParam("day4", " ");
  const day5 = navigation.getParam("day5", " ");
  const classmajor = navigation.getParam("classmajor", " ");
  const classnum = navigation.getParam("classnum", " ");
  {
    highoff.map((info, index) => (
      <View key={index}>{(info.Price)}</View>
    ));
  }
  {
    lowprices.map((info, index) => (
      <View key={index}>
        {(price = info.Price)} {(useridO = info.userNetID)}
        {(passO = info.passNetID)}
        {(cognitoid = info.CognitoID)}
        {(sortprice = info.SortPrice)}
      </View>
    ));
  }
  {
    getstripe.map((info, index) => (
      <View key={index}>{(token = info.Token)}</View>
    ));
  }
  return (
    <View style={styles.background}>
      <Modal
        transparent={true}
        visible={modalVisible2}
        animationType={"slide"}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <View style={styles.confHead}>
              <View style={styles.confHeadCont}>
                <Text style={styles.confInTTxtM}>Buy with Confidence</Text>
                <Text style={styles.confInTTxt}>
                  {"Asend guarantees every transaction is secure"}
                </Text>
              </View>
              <View style={styles.headX}>
                <TouchableOpacity onPress={() => setModalVisible2(false)}>
                  <View style={styles.exit}>
                    <Text style={styles.xMark}>
                      <Icon
                        name="ios-close"
                        size={35}
                        style={styles.iosclose}
                      />
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.confM}>
              <View style={styles.confCont}>
                <View style={styles.confInS}>
                  <Icon
                    name="ios-cash"
                    size={28}
                    color={"#44aafc"}
                    style={styles.confInSTxt}
                  />
                </View>
                <View style={styles.confInT}>
                  <Text style={styles.confInTTxtM}>Secure Transaction</Text>
                  <Text style={styles.confInTTxt}>
                    {"You're only charged when the class is in your account"}
                  </Text>
                </View>
              </View>
              <View style={styles.confCont}>
                <View style={styles.confInS}>
                  <Icon
                    name="ios-cloud-done"
                    size={28}
                    color={"#44aafc"}
                    style={styles.confInSTxt}
                  />
                </View>
                <View style={styles.confInT}>
                  <Text style={styles.confInTTxtM}>Quick, Simple Process</Text>
                  <Text style={styles.confInTTxt}>
                    Transfering classes is automated so you dont need to do
                    anything
                  </Text>
                </View>
              </View>
              <View style={styles.confCont}>
                <View style={styles.confInS}>
                  <Icon
                    name="ios-chatbubbles"
                    color={"#44aafc"}
                    size={28}
                    style={styles.confInSTxt}
                  />
                </View>
                <View style={styles.confInT}>
                  <Text style={styles.confInTTxtM}>Asend Customer Support</Text>
                  <Text style={styles.confInTTxt}>
                    Customer sevice is alway here if you need help
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Button onPress={() => closeModal3()} title="Close modal" />
          <DropdownAlert ref={ref => (dropDownAlertRef = ref)} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible1}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <ScrollView>
          <DismissKeyboard>
            <View style={styles.container}>
              <View style={styles.headX}>
                <TouchableOpacity onPress={() => setModalVisible1(false)}>
                  <View style={styles.exit}>
                    <Icon name="ios-close" size={35} style={styles.xMark} />
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={styles.paymenttxt}>Input Payment Information</Text>
              <View style={styles.creditinput}>
                <TextInputMask
                  type={"credit-card"}
                  options={{
                    obfuscated: false
                  }}
                  placeholder={"Card number"}
                  value={number}
                  onChangeText={number => setNumber(number)}
                  style={styles.cardnumberinput}
                  placeholderTextColor={""}
                  underlineColorAndroid="transparent"
                />
                <Icon name="ios-card" size={28} style={styles.cardicon} />
              </View>
              <View style={styles.monthview}>
                <TextInputMask
                  type={"datetime"}
                  options={{
                    format: "MM"
                  }}
                  placeholder={"Month"}
                  value={exp_month}
                  onChangeText={exp_month => setExp_month(exp_month)}
                  style={styles.expmonthinput}
                  placeholderTextColor={""}
                  underlineColorAndroid="transparent"
                />
                <Icon
                  name="ios-calendar"
                  size={28}
                  color={"#f2f2f2	"}
                  style={styles.calendaricon}
                />
                <TextInputMask
                  type={"datetime"}
                  options={{
                    format: "YY"
                  }}
                  placeholder={"Year"}
                  value={exp_year}
                  onChangeText={exp_year => setExp_year(exp_year )}
                  style={styles.expyearinput}
                  placeholderTextColor={""}
                  underlineColorAndroid="transparent"
                />
                <Icon
                  name="ios-calendar"
                  size={28}
                  style={styles.calendaricon2}
                />
                <TextInputMask
                  type={"datetime"}
                  options={{
                    format: "YYYY"
                  }}
                  placeholder={"cvc"}
                  value={cvc}
                  onChangeText={cvc => setCvc(cvc)}
                  style={styles.cvctextinput}
                  placeholderTextColor={""}
                  underlineColorAndroid="transparent"
                />
                <Icon name="ios-lock" size={28} style={styles.lockicon} />
              </View>
              <View style={styles.checkDisp}>
                <View>
                  <TouchableOpacity
                    style={styles.checkbutton}
                    onPress={() => {
                      payme();
                      {
                        number.length > 15 &&
                        exp_month.length > 1 &&
                        exp_year.length > 1 &&
                        cvc.length > 2 &&
                        tokeni != null &&
                        typeof tokeni != undefined
                          ? (setTap(tap + 1))
                          : Alert.alert("Incorrect Payment Information");
                      }

                      {
                        tap > 1 ? yourFunction1() : null;
                      }
                    }}
                  >
                    <Text style={styles.buyTxt}>Check</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.tapTxt}>Double Tap</Text>
              </View>
              <View>
                <View
                  style={styles.modalbuybuttonfalse}
                  backgroundColor={buttonColor1}
                >
                  <TouchableOpacity
                    style={styles.modalbuybuttonfalse}
                    onPress={() => func()}
                    disabled={buttenabled1}
                  >
                    <View style={styles.compofftext}>
                      <Text style={styles.buyTxt}>Complete Offer</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </DismissKeyboard>
        </ScrollView>
      </Modal>
      <Modal
        animationType="slide"
        ransparent={true}
        visible={modalVisible3}
      >
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <ScrollView>
            <DismissKeyboard>
              <View style={styles.container}>
                <View style={styles.headX}>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <View style={styles.exit}>
                      <Icon name="ios-close" size={35} style={styles.xMark} />
                    </View>
                  </TouchableOpacity>
                </View>
                <Text style={styles.inputpaymentinfo}>
                  Input Payment Information
                </Text>
                <View style={styles.creditcont}>
                  <TextInputMask
                    type={"credit-card"}
                    options={{
                      obfuscated: false
                    }}
                    placeholder={"Card number"}
                    value={number}
                    onChangeText={number => setNumber(number)}
                    style={styles.cardnumberinput2}
                    placeholderTextColor={""}
                    underlineColorAndroid="transparent"
                  />
                  <Icon name="ios-card" size={28} style={styles.cardicon2} />
                </View>
                <View style={styles.monthtextinput}>
                  <TextInputMask
                    type={"datetime"}
                    options={{
                      format: "MM"
                    }}
                    placeholder={"Month"}
                    value={exp_month}
                    onChangeText={exp_month => setExp_month(exp_month)}
                    style={styles.monthinput}
                    placeholderTextColor={""}
                    underlineColorAndroid="transparent"
                  />
                  <Icon
                    name="ios-calendar"
                    size={28}
                    color={"#f2f2f2"}
                    style={styles.calendaricon3}
                  />
                  <TextInputMask
                    type={"datetime"}
                    options={{
                      format: "YY"
                    }}
                    placeholder={"Year"}
                    value={exp_year}
                    onChangeText={exp_year => setExp_year(exp_year)}
                    style={styles.yeartextinput}
                    placeholderTextColor={""}
                    underlineColorAndroid="transparent"
                  />
                  <Icon
                    name="ios-calendar"
                    size={28}
                    style={{ position: "absolute", top: 8, left: 202 }}
                  />
                  <TextInputMask
                    type={"datetime"}
                    options={{
                      format: "YYYY"
                    }}
                    placeholder={"cvc"}
                    value={cvc}
                    onChangeText={cvc => setCvc(cvc)}
                    style={styles.cvctextinput2}
                    placeholderTextColor={""}
                    underlineColorAndroid="transparent"
                  />
                  <Icon
                    name="ios-lock"
                    size={28}
                    style={{ position: "absolute", top: 8, left: 312 }}
                  />
                </View>
                <View style={styles.checkDisp}>
                  <View>
                    <TouchableOpacity
                      style={styles.checkbutton}
                      onPress={() => {
                        payme();
                        {
                          number.length > 15 &&
                          exp_month.length > 1 &&
                          exp_year.length > 1 &&
                          cvc.length > 2
                            ? (tap = tap + 1)
                            : Alert.alert("Incorrect Payment Information");
                        }
                        {
                          tap > 1 ? yourFunction() : null;
                        }
                      }}
                    >
                      <Text style={styles.buyTxt}>Check</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.tapTxt}>Double Tap</Text>
                </View>
                <View>
                  <View
                    style={styles.modalbuybuttonfalse}
                    backgroundColor={buttonColor}
                  >
                    <TouchableOpacity
                      style={styles.modalbuybuttonfalse}
                      onPress={() => transfunc()}
                      disabled={buttenabled}
                    >
                      <View style={styles.comppurchtext}>
                        <Text style={styles.buyTxt}>Complete Purchase</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </DismissKeyboard>
          </ScrollView>
        </Modal>
        <DismissKeyboard>
          <View style={styles.offerContainer}>
            <View style={styles.offerExit}>
              <TouchableOpacity onPress={() => setModalVisible3(false)}>
                <Icon name="ios-close" size={35} style={styles.xMark} />
              </TouchableOpacity>
            </View>
            <View style={styles.offerHead}>
              <View style={styles.offerHeadCont}>
                <Text style={styles.offerInTTxtM}>TOP OFFER</Text>
                {highoff.map((danke, index) => (
                  <Text style={styles.offerInTTxt}>${danke.Price}</Text>
                ))}
              </View>

              <View style={styles.offerHeadCont}>
                <Text style={styles.offerInTTxtM}>LOWEST PRICE</Text>
                {lowprices.map((dak, index) => (
                  <View key={index}>
                    <Text style={styles.offerInTTxt}>${dak.Price}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.offerMess}>
              <View style={styles.offerMessCont}>
                <Text style={styles.offerMeTTxtM}>CANCEL ANYTIME</Text>
                <Text style={styles.offerMeTTxt}>
                  You wont be charged unless your offer is accepted by a seller
                </Text>
              </View>
            </View>

            <View style={styles.underLine} />

            <View style={styles.sellBox}>
              <View style={styles.sell}>
                <View style={styles.sellCont}>
                  <View style={styles.sellContT}>
                    <Text style={styles.sellHeader}>Make Offer</Text>
                    <Text style={styles.sellTxtM}>(min.$5/max.$999)</Text>
                  </View>
                  <View style={styles.sellContP}>
                    <TextInput
                      style={styles.sellTxt}
                      onChangeText={v => setPrice(v)}
                      value={Price.replace(/^0+/, "")}
                      keyboardType="number-pad"
                      placeholder="$"
                      maxLength={3}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.underLine} />
            <TouchableOpacity
              style={styles.nextcont}
              onPress={() => {
                setModalVisible1(true);
                setModalVisible3(false);
              }}
              disabled={
                Price.length === 0 ||
                Price < 5 ||
                Price == "0"
              }
            >
              <View>
                <Text style={styles.offerNextTxt}>Next</Text>
              </View>
            </TouchableOpacity>
          </View>
        </DismissKeyboard>
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <ScrollView>
          <DismissKeyboard>
            <View style={styles.container}>
              <View style={styles.headX}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <View style={styles.exit}>
                    <Icon name="ios-close" size={35} style={styles.xMark} />
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={styles.inputpaytext}>Input Payment Information</Text>
              <View style={styles.creditcont}>
                <TextInputMask
                  type={"credit-card"}
                  options={{
                    obfuscated: false
                  }}
                  placeholder={"Card number"}
                  value={number}
                  onChangeText={number => setNumber(number)}
                  style={styles.cardnumberinput}
                  placeholderTextColor={""}
                  underlineColorAndroid="transparent"
                />
                <Icon
                  name="ios-card"
                  size={28}
                  color={"rgba(255, 255, 255, 0.7"}
                  style={styles.cardicon}
                />
              </View>
              <View style={styles.monthcont}>
                <TextInputMask
                  type={"datetime"}
                  options={{
                    format: "MM"
                  }}
                  placeholder={"Month"}
                  value={exp_month}
                  onChangeText={exp_month => setExp_month(exp_month)}
                  style={styles.expmonthinput}
                  placeholderTextColor={""}
                  underlineColorAndroid="transparent"
                />
                <Icon
                  name="ios-calendar"
                  size={28}
                  color={"#f2f2f2	"}
                  style={styles.calendaricon}
                />
                <TextInputMask
                  type={"datetime"}
                  options={{
                    format: "YY"
                  }}
                  placeholder={"Year"}
                  value={exp_year}
                  onChangeText={exp_year => setExp_year(exp_year)}
                  style={styles.yeartextinput}
                  placeholderTextColor={""}
                  underlineColorAndroid="transparent"
                />
                <Icon
                  name="ios-calendar"
                  size={28}
                  style={styles.calendaricon2}
                />
                <TextInputMask
                  type={"datetime"}
                  options={{
                    format: "YYYY"
                  }}
                  placeholder={"cvc"}
                  value={cvc}
                  onChangeText={cvc => setCvc(cvc)}
                  style={styles.cvctextinput}
                  placeholderTextColor={""}
                  underlineColorAndroid="transparent"
                />
                <Icon name="ios-lock" size={28} style={styles.lockicon} />
              </View>
              <View style={styles.checkDisp}>
                <View>
                  <TouchableOpacity
                    style={styles.checkbutton}
                    onPress={() => {
                      payme();

                      {
                        number.length > 15 &&
                        exp_month.length > 1 &&
                        exp_year.length > 1 &&
                        cvc.length > 2
                          ? (setTap(tap + 1))
                          : Alert.alert("Incorrect Payment Information");
                      }
                      {
                        tap > 1 ? yourFunction() : null;
                      }
                    }}
                  >
                    <Text style={styles.buyTxt}>Check</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.tapTxt}>Double Tap</Text>
              </View>
              <View>
                <View
                  style={styles.modalbuybuttonfalse}
                  backgroundColor={buttonColor}
                >
                  <TouchableOpacity
                    style={styles.modalbuybuttonfalse}
                    onPress={() => transfunc()}
                    disabled={buttenabled}
                  >
                    <View style={styles.comppurchtext}>
                      <Text style={styles.buyTxt}>Complete Purchase</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </DismissKeyboard>
        </ScrollView>
      </Modal>
      <View>
        <View style={styles.infobox}>
          <View style={styles.infoContM}>
            <View style={styles.infoDesc}>
              <View style={styles.infoContH}>
                <Text style={styles.infoHeader}>Description</Text>
              </View>
              <View style={styles.infoCont}>
                <Text style={styles.infoTxtM}>Class ID :</Text>
                <Text style={styles.infoTxt}>{classnum}</Text>
                <Text style={styles.infoTxtM}>Professor :</Text>
                <Text style={styles.infoTxt}>{teacher}</Text>
              </View>

              <View style={styles.infoCont}>
                <Text style={styles.infoTxtM}>Index :</Text>
                <Text style={styles.infoTxt}>{index}</Text>
                <Text style={styles.infoTxtM}>Section :</Text>
                <Text style={styles.infoTxt}>{classmajor}</Text>
              </View>
              <View style={styles.infoCont}>
                <Text style={styles.infoTxtM}>Time :</Text>
                <View style={styles.infoContTime}>
                  <Text style={styles.infoTxtTime}>
                    {day1} {time1}
                  </Text>
                  <Text style={styles.infoTxtTime}>
                    {day2} {time2}
                  </Text>
                </View>
                <View style={styles.infoContTime}>
                  <Text style={styles.infoTxtTime}>
                    {day3} {time3}
                  </Text>
                  <Text style={styles.infoTxtTime}>
                    {day4} {time4}
                  </Text>
                </View>
                <View style={styles.infoContTime}>
                  <Text style={styles.infoTxtTimeL}>
                    {day5} {time5}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.check}>
              <View style={styles.underLine} />
              <View style={styles.checkCont}>
                <TouchableOpacity onPress={() => setModalVisible2(true)}>
                  <Text style={styles.checkTxt}>Buy with Confidence</Text>
                </TouchableOpacity>
                {lowprices.map((dak, index) => (
                  <View style={styles.priceCCont} key={index}>
                    {dak.Price !== " " || dak.Price !== null ? (
                      <Text style={styles.priceTxt}>${dak.Price}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
              <View style={styles.underLine} />
              <View style={styles.checkCont}>
                <TouchableOpacity onPress={() => setModalVisible3(true)}>
                  <Text style={styles.checkTxt}>Make an Offer</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.underLine} />
            </View>

            <View style={styles.notsellcont}>
              <Text style={styles.notsellingtxt}>
                This class is currently not listed.
              </Text>
              <Text style={styles.notsellingtxt}>
                {" "}
                You should make an offer!
              </Text>
            </View>

            {lowprices.map((dak, index) => (
              <View key={index}>
                {dak.Price !== " " && dak.Price !== null ? (
                  <View style={styles.buybuttcont}>
                    <View style={styles.buyButton}>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(true);
                        }}
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%"
                        }}
                      >
                        <Text style={styles.buyTxt}>Buy Class </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View>
            <View />
          </View>
          <View />
        </View>
      </View>
      <DropdownAlert ref={ref => (dropDownAlertRef = ref)} />
    </View>
  );
};
const styles = EStyleSheet.create({
  paymenttxt: {
    fontSize: "18rem",
    fontWeight: "900",
    textAlign: "center"
  },
  sellBox: {
    //backgroundColor: '#ffffff',
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "12%"
    //borderTopWidth: '0.5rem',
    //borderBottomWidth: '0.5rem',
    //borderColor: '#e8e8e8',
    //backgroundColor: 'orange',
    //marginBottom: 100,
  },
  inputpaymentinfo: {
    fontSize: "18rem",
    fontWeight: "900",
    textAlign: "center"
  },
  creditinput: { marginTop: "40rem" },
  sell: {
    flexDirection: "column",
    width: "100%",
    height: "100%"
    //backgroundColor: 'yellow',
  },
  sellHeader: {
    color: "black",
    textAlign: "left",
    fontSize: "15rem",
    // textShadowRadius: '8rem',
    // textShadowColor: 'grey',
    // shadowOpacity: '0.1rem',
    marginTop: "10rem"
  },
  sellCont: {
    flexDirection: "row",
    marginTop: "10rem"
    //backgroundColor: 'pink',
  },
  compofftext: {
    alignItems: "center",
    justifyContent: "center",
    bottom: "15rem"
  },
  sellContP: {
    marginTop: "12rem",
    marginRight: "15rem",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    height: "45rem"
  },
  yeartextinput: {
    height: "45rem",
    width: "100rem",
    borderRadius: "10rem",
    fontSize: "16rem",
    left: "20rem",
    paddingLeft: "45rem",
    backgroundColor: "#f2f2f2",
    color: "black",
    marginHorizontal: "25rem"
  },
  buybuttcont: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  monthtextinput: { marginTop: "10rem", right: "40rem", flexDirection: "row" },
  monthinput: {
    height: "45rem",
    width: "100rem",
    left: "50rem",
    borderRadius: "10rem",
    fontSize: "16rem",
    paddingLeft: "45rem",
    backgroundColor: "#f2f2f2",
    color: "black",
    marginHorizontal: "25rem"
  },
  cardnumberinput: {
    height: "45rem",
    width: "250rem",
    borderRadius: "10rem",
    fontSize: "16rem",
    paddingLeft: "45rem",
    backgroundColor: "#f2f2f2",
    color: "black",
    marginHorizontal: "50rem"
  },
  inputpaytext: {
    fontSize: "18rem",
    fontWeight: "900",
    textAlign: "center"
  },
  cardnumberinput2: {
    height: "45rem",
    width: "250rem",
    borderRadius: "10rem",
    fontSize: "16rem",
    paddingLeft: "45rem",
    backgroundColor: "#f2f2f2",
    color: "black",
    marginHorizontal: "50rem"
  },
  nextcont: {
    marginTop: "15rem",
    height: "8%",
    width: "90%",
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    // boarderRadius: '5rem',
    left: "0rem",
    right: "0rem"
  },
  notsellingtxt: {
    fontSize: "15rem",
    fontWeight: "500"
  },
  cardicon: { position: "absolute", top: "8rem", left: "60rem" },
  cardicon2: { position: "absolute", top: "8rem", left: "60rem" },

  expmonthinput: {
    height: "45rem",
    width: "100rem",
    left: "50rem",
    borderRadius: "10rem",
    fontSize: "16rem",
    paddingLeft: "45rem",
    backgroundColor: "#f2f2f2",
    color: "black",
    marginHorizontal: "25rem"
  },
  notsellcont: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    top: "32rem"
  },
  confinstxt: {
    height: "28rem",
    width: "28rem"
  },
  expyearinput: {
    height: "45rem",
    width: "100rem",
    borderRadius: "10rem",
    fontSize: "16rem",
    left: "20rem",
    paddingLeft: "45rem",
    backgroundColor: "#f2f2f2",
    color: "black",
    marginHorizontal: "25rem"
  },
  sellContT: {
    flex: 1,
    marginLeft: "15rem",
    // alignItems: 'left',
    justifyContent: "flex-start"
  },
  soldContT: {
    flex: 1,
    marginTop: "5rem",
    marginLeft: "15rem",
    // alignItems: 'left',
    justifyContent: "flex-start"
  },
  comppurchtext: {
    alignItems: "center",
    justifyContent: "center",
    bottom: "15rem"
  },
  cvctextinput2: {
    height: "45rem",
    width: "100rem",
    borderRadius: "10rem",
    fontSize: "16rem",
    left: "20rem",
    paddingLeft: "45rem",
    backgroundColor: "#f2f2f2",
    color: "black",
    marginHorizontal: "25rem"
  },
  cvctextinput: {
    height: "45rem",
    width: "100rem",
    borderRadius: "10rem",
    fontSize: "16rem",
    backgroundColor: "#f2f2f2",
    color: "black",
    marginHorizontal: "5rem",
    textAlign: "center"
    // backgroundColor: "red",
  },
  monthview: { marginTop: "10rem", right: "40rem", flexDirection: "row" },
  sellTxtM: {
    marginTop: "10rem",
    color: "grey",
    textAlign: "left",
    fontSize: "13rem"
    // textShadowRadius: '8rem',
    // textShadowColor: 'grey',
    // shadowOpacity: '0.1rem',
  },
  sellTxt: {
    color: "black",
    textAlign: "right",
    fontSize: "25rem",
    fontWeight: "bold",
    // textShadowRadius: '8rem',
    // textShadowColor: 'grey',
    // shadowOpacity: '0.1rem',
    width: "200rem"
  },
  centering: {
    alignItems: "center"
  },
  underLine: {
    alignItems: "center",
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: "1rem",
    width: "94%"
  },
  monthcont: { marginTop: "10rem", right: "50rem", flexDirection: "row" },
  creditcont: { marginTop: "40rem" },
  check: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    height: "100rem",
    width: "100%"
    // backgroundColor: 'red',
  },
  checkTxt: {
    fontSize: "16rem",
    fontWeight: "bold",
    color: "#44aafc",
    textAlign: "left"
  },
  orderCont: {
    flexDirection: "row"
  },
  checkCont: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    height: "50rem",
    width: "100%"
    // backgroundColor: 'orange',
  },
  offerContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    flexDirection: "column",
    alignItems: "center"
  },
  offerExit: {
    marginTop: 35,
    height: "5%",
    width: "90%",
    //backgroundColor: 'yellow',
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  offerMess: {
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: 'red',
    height: "15%",
    width: "200rem"
    //backgroundColor: 'blue',
  },
  lockicon: { position: "absolute", top: "8rem", left: "312rem" },
  calendaricon: { position: "absolute", top: "8rem", left: "80rem" },
  calendaricon2: { position: "absolute", top: "8rem", left: "202rem" },
  calendaricon3: { position: "absolute", top: "8rem", left: "80rem" },
  offerMessCont: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
    // hieght: '100%',
    //backgroundColor: 'red',
    //height: '100%',
    //width: '80%',
    //backgroundColor:'blue',
  },
  offerMeTTxtM: {
    textAlign: "center",
    fontSize: "13rem",
    color: "black",
    fontWeight: "bold"
    //backgroundColor:'green',
    //marginBottom: 15,
  },
  offerMeTTxt: {
    textAlign: "center",
    marginTop: "15rem",
    fontSize: "10rem",
    color: "grey"
    //backgroundColor:'orange',
  },
  offerHead: {
    marginTop: "5rem",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: 'red',
    height: "15%",
    width: "100%"
    //marginTop: 10,
    //backgroundColor: 'red',
  },
  offerHeadCont: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "50%",
    height: "100%",
    //backgroundColor: 'blue',
    //height: '100%',
    //width: '80%',
    marginBottom: "15rem"
    //backgroundColor:'blue',
  },
  offerInTTxtM: {
    fontSize: "16rem",
    color: "black"
    //backgroundColor:'green',
    //marginBottom: 15,
  },
  offerInTTxt: {
    marginTop: "15rem",
    fontSize: "28rem",
    color: "black",
    fontWeight: "500"
    //backgroundColor:'orange',
  },
  offerNext: {
    height: "8%",
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: "0rem",
    right: "0rem"
  },
  offerNextTxt: {
    fontSize: "18rem",
    color: "#ffffff"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    //opacity: 0.2,
    // backgroundColor: 'grey',
    backgroundColor: "rgba(128, 128, 128, .8)"
  },
  iosclose: {
    fontSize: "35rem"
  },
  priceCCont: {
    marginRight: "20rem",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    //backgroundColor: 'brown',
    flex: 1
  },
  priceTxt: {
    color: "black",
    fontWeight: "bold",
    fontSize: "22rem",
    // alignItems: 'right',
    textAlign: "right"
  },
  innerContainer: {
    alignItems: "flex-start",
    marginTop: "17%",
    height: "100%",
    backgroundColor: "#f0f0f0"
  },
  confHead: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: 'red',
    height: "15%",
    width: "100%"
    //marginTop: 10,
    //backgroundColor: 'red',
  },
  headX: {
    justifyContent: "flex-end",
    alignItems: "flex-end"

    //backgroundColor: 'green',
  },
  exit: {
    justifyContent: "flex-end",
    alignItems: "center",
    //backgroundColor: 'pink',
    height: "50rem",
    width: "50rem",
    marginTop: "5rem"
    //marginLeft: 50,
  },
  xMark: {
    fontSize: "27rem",
    color: "black",
    textAlign: "center"
  },
  confHeadCont: {
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: 'blue',
    height: "100%",
    width: "80%",
    marginLeft: "25rem"
    //backgroundColor:'blue',
  },
  confM: {
    flexDirection: "column",
    marginTop: "10rem",
    height: "50%",
    width: "100%",
    backgroundColor: "#ffffff",
    borderTopWidth: "0.5rem",
    borderBottomWidth: "0.5rem",
    borderColor: "#d6d6d6"
  },
  confCont: {
    flexDirection: "row",
    marginTop: "20rem",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "80rem"
    //backgroundColor: 'red',
  },
  submitoffertxt: {
    fontWeight: "500",
    textAlign: "center",
    marginTop: "20rem"
  },
  confInS: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
    marginLeft: "2%",
    height: "80%"
    //marginBottom: "8rem",
    //backgroundColor: 'blue',
  },
  confInT: {
    flexDirection: "column",
    width: "70%",
    height: "80%"
    //backgroundColor: 'green',
  },
  confInTTxtM: {
    fontSize: "16rem",
    fontWeight: "bold",
    color: "black"
  },

  confInTTxt: {
    marginTop: "5rem",
    fontSize: "14rem",
    color: "grey"
  },
  background: {
    backgroundColor: "#f0f0f0",
    width: "100%",
    height: "100%"
  },
  infobox: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "340rem",
    borderTopWidth: "0.5rem",
    borderBottomWidth: "0.5rem",
    borderColor: "grey"
  },
  infoDesc: {
    //backgroundColor: 'blue',
    height: "43%"
  },
  infoContM: {
    flexDirection: "column",
    height: "100%",
    width: "92%"
    //backgroundColor: 'yellow',
  },
  infoContH: {
    marginTop: "14rem",
    flexDirection: "row",
    // alignItems: 'left',
    justifyContent: "flex-start",
    height: "38rem"
    //backgroundColor: 'green',
  },
  infoCont: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-start",
    height: "22rem"
    //backgroundColor:'red',
  },
  infoContTime: {
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "22rem",
    marginRight: "10rem"
    //backgroundColor:'yellow',
  },
  infoHeader: {
    flex: 1,
    color: "black",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "15rem"
    // textShadowRadius: '8rem',
    //  textShadowColor: 'grey',
    // shadowOpacity: '0.1rem',
  },
  infoTxtM: {
    width: "18%",
    color: "grey",
    textAlign: "left",
    fontSize: "11rem"
    // textShadowRadius: '8rem',
    //  textShadowColor: 'grey',
    // shadowOpacity: '0.1rem',
    //backgroundColor: 'green',
  },
  infoTxt: {
    width: "26%",
    color: "grey",
    textAlign: "left",
    fontSize: "11rem"
    // textShadowRadius: '8rem',
    //  textShadowColor: 'grey',
    // shadowOpacity: '0.1rem',
    //backgroundColor: 'blue',
  },
  infoTxtTime: {
    width: "100%",
    color: "grey",
    textAlign: "left",
    fontSize: "11rem"
    // textShadowRadius: '8rem',
    //  textShadowColor: 'grey',
    // shadowOpacity: '0.1rem',
    // backgroundColor: 'pink',
  },
  buyTxtM: {
    fontSize: "16rem",
    fontWeight: "bold",
    color: "black"
  },
  infoTxtTimeL: {
    width: "70%",
    height: "30rem",
    color: "grey",
    textAlign: "left",
    flexWrap: "wrap",
    fontSize: "11rem"
    // textShadowRadius: '8rem',
    //  textShadowColor: 'grey',
    // shadowOpacity:'0.1rem',
    //backgroundColor: 'pink',
  },
  buyButton: {
    // marginTop: '5rem',
    height: "50rem",
    width: "90%",
    backgroundColor: "orange",
    bottom: "5rem",
    //backgroundColor: '#44aafc',
    borderRadius: "5rem",
    alignItems: "center",
    justifyContent: "center"
  },
  checkDisp: {
    marginTop: "20rem",
    width: "100%",
    height: "50rem",
    //left: '20rem',
    //backgroundColor: 'red',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  tapTxt: {
    flex: 1,
    fontSize: "14rem",
    marginTop: "10rem",
    fontWeight: "700",
    marginLeft: "25rem",
    width: "200rem",
    height: "30rem",
    //backgroundColor: 'blue',
    textAlign: "left"
  },
  checkbutton: {
    //marginTop: '25rem',
    height: "35rem",
    width: "70rem",
    left: "20rem",
    backgroundColor: "orange",
    //backgroundColor: '#44aafc',
    borderRadius: "12rem",
    alignItems: "center",
    justifyContent: "center"
  },
  modalbuybutton: {
    marginTop: "30rem",
    height: "50rem",
    width: "90%",
    left: "20rem",
    backgroundColor: "orange",
    //backgroundColor: '#44aafc',
    borderRadius: "5rem",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  modalbuybuttonfalse: {
    marginTop: "30rem",
    height: "50rem",
    width: "90%",
    left: "20rem",
    //backgroundColor: '#44aafc',
    borderRadius: "5rem",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  currnotSelling: {
    color: "#44aafc",
    fontWeight: "bold",
    fontSize: "20rem",
    textAlign: "center"
  },
  buyTxt: {
    color: "white",
    //fontWeight: 'bold',
    fontSize: "18rem",
    textAlign: "center"
  },
  priceMP: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green"
  }
});
