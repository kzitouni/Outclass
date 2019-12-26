import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
  Alert,
  AsyncStorage
} from "react-native";
import DropdownAlert from "react-native-dropdownalert";
import { API, graphqlOperation } from "aws-amplify";
import Icon from "react-native-vector-icons/Ionicons";
import EStyleSheet from "react-native-extended-stylesheet";
var ind;
const netidCheck = `query Checknetd($userNetID: String){
 listLoginModals(Type:"Login", limit:1, userNetID:$userNetID){
 items{
 userNetID
 }
 }
}`;

const netidget = `query listl($userNetID: String){
 listLoginModals(filter:{Type:{notContains:"Login"}}, userNetID:$userNetID ){
 items{
 ClassN 
 MTime
 ClassNum
 Type
 Major
 stat
 Sect
 Price
 }
 } 
}`;
const highestoffer = `
query highestoffer($IndexOf: String){listhighestoffer(CognitoID: $IndexOf)
{
 items{
 SortPrice
 Price
 CognitoID
 }
}}`;
const versioncheck = `query version($Version:String){versioncheck(filter:{Type:{contains:$Version}}){
 items{
 CIndex
 main
 mainmes
 iphone
 android
 }
}}`;
const refreshlambda = `query NetICred($userNetID: String) {
 listNetIDCred(Type:"Login", userNetID:$userNetID){
 result{
 Index
 userNetID
 errorMessage
 message
 
 }
 }
}`;
const lowest = `query ListSortPrice($CIndex:String)
{listlowestprice
 (CIndex:$CIndex, limit:1, filter:{stat:{contains:"true"}})
 {
 items{ 
 Price

 } 
}}`;
const deletestatuse = `mutation deletestatuse($userNetID: String){deletestatuse(input:{Type:"Login", Statuse:" ", userNetID:$userNetID})
{
 Type
 Statuse
}}`;
const listoffers = `query listoffers($userNetID:String){listyouroffers(filter:{CognitoID:{contains:".O"}}, userNetID:$userNetID)
{items{ 
 CognitoID
 Price
 Type 
 CIndex
 ClassN
 Prof
 OIndex
}}}`;
const errorget = `query errorget($userNetID: String){getError(filter:{Type:{contains:"Login"}}, userNetID:$userNetID)
{items{
 userNetID
 Statuse
}}}`;

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
var classind;

var price;
const entireScreenWidth = Dimensions.get("window").width;
const rem = entireScreenWidth / 380;
EStyleSheet.build({ $rem: rem });
const SchedScreen = props => {
    //const [schedinfo, setSchedinfo] = useState([])
//   const [lowprices, setLowprices] = useState([]);
  const [ind, setInd] = useState("");
  const [price, setPrice] = useState(price);

  const [text, setText] = useState([]);
  const [All, setAlll] = useState([]);
  const [youroffers, setYouroffers] = useState([]);
  // const [offers, setOffers] = useState([])
  const [isVisible, setIsVisible] = useState(false);
  const [version, setVersion] = useState([]);
  const [isVisible1, setIsVisible1] = useState(false);
  const [netidcheck, setNetidcheck] = useState([]);
  const [pressed, setPressed] = useState(false);
  const [errormes, setErrormes] = useState([]);
  const [message, setMessage] = useState(false);

  const navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Your Schedule",

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
  const queryData = async () => {
    try {
      const netidcheck = await API.graphql(graphqlOperation(netidCheck));
      setNetidcheck(netidcheck.data.listLoginModals.items);
      // this.setState({ netidcheck: netidcheck.data.listLoginModals.items });
    } catch (err) {
      console.log("error creating restaurant...", err);
    }
  };
  const componentHideAndShow = prevState => {
    setMessage(!prevState);
    // this.setState(previousState => ({ message: !previousState.message }));
  };
  const sched = async () => {
    var i = null;
    var getPrice = null;
    var allP = [];
    var Comb = [];
    var All = [];
    try {
      const schedinfo = await API.graphql(
        graphqlOperation(netidget, {
          //userNetID: this.props.navigation.state.params.use
          userNetID: "az331"
        })
      );
      console.log('Dataaaa', schedinfo)
      //setSchedinfo(schedinfo.data.listLoginModals.items);
      var classn = schedinfo.data.listLoginModals.items.length;
      console.log('The Data',classn)
      for (i = 0; i < classn; i++) {
        getPrice = schedinfo.data.listLoginModals.items[i].Type;
        var highoffer = await API.graphql(
          graphqlOperation(highestoffer, {
            IndexOf: getPrice
          })
        );
        var lowP = await API.graphql(
          graphqlOperation(lowest, {
            CIndex: getPrice
          })
        );
        console.log("low p",lowP)
        if (
          typeof highoffer.data.listhighestoffer.items[0] == "undefined" ||
          highoffer == " "
        ) {
          highoffer = "-";
        } else {
          highoffer = highoffer.data.listhighestoffer.items[0].Price.toString();
        }
        if ( 
          typeof lowP.data.listlowestprice.items[0] == "undefined" ||
          lowP == " "
        ) {
          lowP = "-";
        } else {
          lowP = lowP.data.listlowestprice.items[0].Price.toString();
        }
        if (lowP == " ") {
          lowP = "-";
        }
        allP.push({ lowP, highoffer });
        Comb.push(schedinfo.data.listLoginModals.items[i], allP[i]);
        Comb = Object.assign({}, ...Comb);
        All.push(Comb);
        Comb = [];
      }

      console.log("All Donzos", All);

      return All;
    } catch (err) {
      dropDownAlertRef.alertWithType("error", "Error", err.errors[0].message);
      console.log("error creating restaurant...", err);
    }
  };
  const setModalVisible = visible => {
    setIsVisible(visible);
  };
  const setModalVisible1 = visible => {
    setIsVisible1(visible);
  };
  const yourfunc = () => {
    setModalVisible(false);
    props.navigation.navigate("DeletePage", {
      index: classind
    });
  };
  const highoffer = async () => {
    try {
      const highoffer = await API.graphql(
        graphqlOperation(highestoffer, {
          IndexOf: getPrice
        })
      );
    } catch (err) {
      console.log("error", err);
    }
  };
  const verscheck = async () => {
    try {
      const version = await API.graphql(
        graphqlOperation(versioncheck, {
          Version: "App" + Math.floor(Math.random() * Math.floor(9))
        })
      );
      setVersion(version.data.versioncheck.items);
    } catch (err) {
      console.log("error", err);
    }
  };
  const lambdaRefresh = async () => {
    try {
      const refresh = await API.graphql(
        graphqlOperation(refreshlambda, {
          userNetID: props.navigation.state.params.use
        })
      );
      dropDownAlertRef.alertWithType("success", "Schedule has been updated.");
    } catch (err) {
      console.log("error", err);
      dropDownAlertRef.alertWithType("error", "Error", err.errors[0].message);
    }
  };
  const offers = async () => {
    try {
      const yourofferss = await API.graphql(
        graphqlOperation(listoffers, {
          userNetID: "az331"
        })
      ); 
      setYouroffers(yourofferss.data.listyouroffers.items);
      console.log(youroffers[0])
      return youroffers;
    } catch (err) {
      console.log("error offer", err, youroffers, "your offers");
    }
  };
  const errormessage = async () => {
    try {
      const errormes = await API.graphql( 
        graphqlOperation(errorget, {
          userNetID: "az331"
        })
      ); 
      setErrormes(errormes.data.getError.items);
      return errormes;
    } catch (err) {
      console.log("error", err);
    }
  };
  const lowprices = async () => {
    try {
      console.log(ind);
      props.navigation.getParam({ classname: "classname" });
    } catch (err) {
      console.log("error", err);
    }
  };
  const updatepage = () => {
    lambdaRefresh();
    sched();
    offers();
    setPressed(true);
  };
  useEffect(() => {
    AsyncStorage.setItem("userToken", "abc");
    props.navigation.getParam({ use: "use" });
    offers();
    lowprices();
    routeSubscription = props.navigation.addListener(
      "willFocus",
      setAll(),
     // offer(),
      sched(), 
      offers(),
      verscheck()
    );
    // const { navigation } = props;
    // focusListener = navigation.addListener("didFocus", () => {
    //   offers(), pressed, errormessage()
    // });
    // routeSubscription = props.navigation.addListener(
    //   "willFocus",
    //   sched(),
    //   setPressed(false),
    // );
    return routeSubscription.remove();
  }, []);
  const clickfunc = () => {
    delstat();
    errormessage();
  };
  const delstat = async () => {
    try {
    } catch (err) {
      console.log("error", err);
    }
  };

  const errortimefunc = () => {
    Alert.alert(statuse, " ", [{ text: "Ok", onPress: () => delstat() }], {
      cancelable: true
    });
  };

  const setAll = () => {
    sched().then(All => {
      setAlll(All);
    });
  };
  const offer = ""
//   const offer = () => {
//     offers().then(youroffers => {
//       setYouroffers(youroffers);
//     });
//   };
  const mesa = () => {
    errormessage().then(errormes => {
      setErrormes(errormes);
    });
  };
  // {
  //   youroffers.map(dat => (
  //     <View item={dat} key={dat.id}>
  //       {(classind = dat.OIndex)}
  //     </View>
  //   ));
  // }
  // {
  //   errormes.map(datk => (
  //     <View>
  //       {" "}
  //       item={datk} key={datk.id}>{(statuse = datk.Statuse)}
  //     </View>
  //   ));
  // }
  const { navigation } = props;
  const use = navigation.getParam("use", " ");
  const appversion = 1.3;
  console.log(ind);
  return (
    <View style={styles.background}>
      {version.map(info => (
        <View>
          <Text>
            {appversion < info.android
              ? props.navigation.navigate("UpdateApp")
              : null}
            {info.main == "yes"
              ? props.navigation.navigate("Maintenance", {
                  message: info.mainmes
                })
              : null}{" "}
          </Text>
        </View> 
      ))}
      <Modal visible={isVisible} onRequestClose={() => console.log("closed")}>
        <View>
          <Text>Please update your app.</Text>
        </View>
      </Modal>
      <Modal transparent={true} visible={isVisible} onRequestClose={() => console.log("closed")}>
        <View style={styles.offerAccCont}>
          <View style={styles.offerAccBox}>
            <View style={styles.offerAccTCont}>
              <Text style={styles.offermodaltext}>
                Are you sure you want to delete your offer?
              </Text>
            </View>
            {youroffers.map(dats => (
              <View style={styles.modcontclose}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <View style={styles.modcancelview}>
                    <Text style={{ textAlign: "left" }}>Cancel</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("DeletePage", {
                      index: dats.CIndex
                    })
                  }
                >
                  <View style={styles.yesview}>
                    <Text style={{ textAlign: "left", color: "#44aafc" }}>
                      Yes
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </Modal>
      <View style={styles.center}>
        <ScrollView style={{ height: "100%" }}>
          <View style={styles.container}>
            <View style={styles.youroffercont}>
              <Text style={styles.falltxt}>Fall 2019 </Text>
              {errormes.map(dake =>
                dake.Statuse == " " ||
                dake.Statuse == null ||
                typeof dake.Statuse == undefined ? (
                  <Text style={styles.falltxtL}> </Text>
                ) : dake.Statuse == "Pending" ? (
                  <Text style={styles.falltxtL}>Status: Pending</Text>
                ) : (
                  Alert.alert(
                    dake.Statuse,
                    " ",
                    [{ text: "Ok", onPress: () => clickfunc() }],
                    { cancelable: true }
                  )
                )
              )}
              <View
                style={{ alignItems: "flex-end", justifyContent: "flex-end" }}
              >
                {pressed == false ? (
                  <TouchableOpacity onPress={() => updatepage()}>
                    <Icon
                      style={{ color: "#44aafc" }}
                      name={"ios-refresh"}
                      size={25}
                    />
                  </TouchableOpacity>
                ) : (
                  <Icon
                    style={{ color: "#44aafc" }}
                    name={"ios-refresh"}
                    size={25}
                  />
                )}
              </View>
            </View>
          </View>
          {text}

          {All.map(dat => (
            <View item={dat} key={dat.id}>
              <View style={styles.schedbox}>
                <Modal
                  transparent={true}
                  visible={isVisible1}
                  onRequestClose={() => console.log("closed")}
                >
                  <View>
                    <Text>Please update your app.</Text>
                  </View>
                </Modal>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("SellClassInfo", {
                      classname: dat.ClassN,
                      classindex: dat.Type,
                      classtime: dat.MTime,
                      classnum: dat.ClassNum,
                      classmajor: dat.Major,
                      section: dat.Sect,
                      classstat: dat.stat,
                      highoffer: dat.highoffer,
                      lowestprice: dat.lowP,
                      user: use
                    })
                  }
                  style={styles.schedtxt}
                >
                  {dat.Price === " " || dat.Price === null ? (
                    <View style={styles.ordercont}>
                      <View style={styles.checkcont} />
                      <View style={styles.infocont}>
                        <Text style={styles.classtxt}>{dat.ClassN}</Text>
                        <Text style={styles.classinfo}>{dat.MTime}</Text>
                        <Text style={styles.classinfo}>Index:{dat.Type} </Text>
                      </View>
                      <View style={styles.priceCont}>
                        <View style={styles.priceBox}>
                          <View style={styles.priceBoxP}>
                            <View style={styles.pricePM}>
                              <Text style={styles.pricePTxtM}>Top Offer </Text>
                            </View>
                            <View style={styles.priceP}>
                              <Text style={styles.pricePTxt}>
                                {dat.highoffer}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.priceBoxM} />
                          <View style={styles.priceBoxP}>
                            <View style={styles.pricePM}>
                              <Text style={styles.pricePTxtM}>Low Price</Text>
                            </View>
                            <View style={styles.priceP}>
                              <Text style={styles.pricePTxtL}>{dat.lowP}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.ordercont}>
                      <View style={styles.checkcont}>
                        <Icon
                          name="ios-checkmark"
                          size={40}
                          color={"rgba(255, 255, 255, 0.7"}
                          style={{ position: "absolute", color: "#ff9900" }}
                        />
                      </View>
                      <View style={styles.infocont}>
                        <Text style={styles.classtxt}>{dat.ClassN}</Text>
                        <Text style={styles.classinfo}>{dat.MTime}</Text>
                        <Text style={styles.classinfo}>Index:{dat.Type}</Text>
                      </View>
                      <View style={styles.priceCont}>
                        <View style={styles.priceBox}>
                          <View style={styles.priceBoxP}>
                            <View style={styles.pricePM}>
                              <Text style={styles.pricePTxtM}>Top Offer</Text>
                            </View>
                            <View style={styles.priceP}>
                              <Text style={styles.pricePTxt}>
                                {dat.highoffer}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.priceBoxM} />
                          <View style={styles.priceBoxP}>
                            <View style={styles.pricePM}>
                              <Text style={styles.pricePTxtM}>Low Price</Text>
                            </View>
                            <View style={styles.priceP}>
                              <Text style={styles.pricePTxtL}>{dat.lowP}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <View style={styles.youroffercont}>
            <Text style={styles.yourofferstxt}>Your Offers</Text>
          </View>
          <View>
            {youroffers.map(da => (
              <View item={da} key={da.id}>
                <View style={styles.schedbox}>
                  <View style={styles.ordercont}>
                    <View style={styles.checkcont}>
                      <TouchableHighlight
                        style={styles.center}
                        onPress={() =>
                          Alert.alert(
                            "Are you sure you want to delete this offer",
                            " ", // <- this part is optional, you can pass an empty string
                            [
                              {
                                text: "Cancel",
                                onPress: () =>
                                  props.navigation.navigate("SchedScreen")
                              },
                              {
                                text: "Yes",
                                onPress: () =>
                                  props.navigation.navigate("DeletePage", {
                                    index: da.OIndex,
                                    user: use
                                  })
                              }
                            ],
                            { cancelable: false }
                          )
                        }
                      >
                        <View style={styles.trashview}>
                          <Icon
                            name="ios-trash"
                            size={30}
                            style={{ color: "#44aafc" }}
                          />
                        </View>
                      </TouchableHighlight>
                    </View>
                    <View style={styles.infocont}>
                      <Text style={styles.classtxt}>{da.ClassN}</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.classinfo}>Index:{da.OIndex}</Text>
                      </View>
                    </View>
                    <View style={styles.priceCont}>
                      <View style={styles.priceBox}>
                        <View style={styles.priceboxourprice} />
                        <View style={styles.priceBoxP}>
                          <View style={styles.pricePM}>
                            <Text style={styles.pricePTxtM}>Your Price</Text>
                          </View>
                          <View style={styles.priceP}>
                            <Text style={styles.pricePTxtL}>{da.Price}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.empty} />
        </ScrollView>
      </View>
      <DropdownAlert ref={ref => (dropDownAlertRef = ref)} />
    </View>
  );
};
export default SchedScreen;

const styles = EStyleSheet.create({
  background: {
    backgroundColor: "#f0f0f0",
    width: "100%",
    height: "100%"
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    flexDirection: "column",
    position: "relative",
    // top: animatedTagTop,
    // opacity: animatedOpacity,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "40rem"
  },
  headertxt: {
    color: "white",
    textAlign: "center",
    fontSize: "17rem",
    fontWeight: "bold",
    bottom: "10rem"
  },
  schedbox: {
    flexDirection: "row",
    marginTop: "10rem",
    backgroundColor: "#ffffff",
    borderRadius: "5rem",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "350rem",
    height: "80rem",
    textAlign: "center",
    flex: 1,
    borderColor: "#D3D3D3",
    borderWidth: "0.5rem"
  },
  youroffercont: {
    flexDirection: "row",
    marginTop: "10rem",
    backgroundColor: "#ffffff",
    borderRadius: "5rem",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "flex-start",
    width: "350rem",
    height: "35rem",
    textAlign: "center",
    flex: 1,
    borderColor: "#D3D3D3",
    borderWidth: "0.5rem"
  },
  yourofferconta: {
    flexDirection: "row",
    marginTop: "10rem",
    backgroundColor: "#ffffff",
    borderRadius: "5rem",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "flex-start",
    width: "150rem",
    height: "35rem",
    textAlign: "center",
    flex: 1,
    borderColor: "#D3D3D3",
    borderWidth: "0.5rem"
  },
  ordercont: {
    flexDirection: "row"
  },
  schedtxt: {
    flex: 1,
    justifyContent: "center"
  },
  falltxt: {
    width: "20%",
    textAlign: "left",
    marginLeft: "15rem",
    fontSize: "16rem",
    color: "#44aafc",
    fontWeight: "700"
  },
  falltxtL: {
    width: "65%",
    textAlign: "left",
    marginLeft: "15rem",
    fontSize: "16rem",
    color: "#44aafc",
    fontWeight: "700"
  },
  classtxt: {
    color: "#212121",
    fontWeight: "bold",
    fontSize: "12rem",
    textAlign: "left"
  },
  classinfo: {
    color: "grey",
    fontSize: "10rem",
    textAlign: "left"
  },
  checkcont: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "10%"
  },
  infocont: {
    alignItems: "flex-start",
    justifyContent: "center",
    height: "100%",
    flexDirection: "column",
    width: "58%"
  },
  priceCont: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "30%"
  },
  priceBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "80%",
    backgroundColor: "white",
    borderColor: "#e3e3e3",
    borderWidth: "1rem"
  },
  priceBoxP: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "47rem",
    height: "100%"
  },
  pricePM: {
    marginTop: "5%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "20%"
  },
  priceP: {
    marginTop: "5%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "65%"
  },
  priceBoxM: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    borderColor: "#e3e3e3",
    borderBottomWidth: "1rem",
    borderTopWidth: "1rem",
    borderLeftWidth: "1rem"
  },
  priceboxourprice: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    borderColor: "#e3e3e3",
    borderBottomWidth: "1rem",
    borderTopWidth: "1rem"
  },
  pricePTxtM: {
    textAlign: "center",
    fontSize: "8rem",
    color: "black"
  },
  pricePTxt: {
    textAlign: "center",
    fontSize: "15rem",
    color: "#ff9900",
    fontWeight: "bold"
  },
  yourofferstxt: {
    textAlign: "left",
    marginLeft: "20rem",
    fontSize: "16rem",
    color: "#44aafc",
    fontWeight: "700"
  },
  pricePTxtLowPrice: {
    textAlign: "right",

    fontSize: "15rem",
    backgroundColor: "blue",
    color: "black",
    fontWeight: "bold"
  },
  pricePTxtL: {
    textAlign: "center",
    fontSize: "15rem",
    color: "#44aafc",
    fontWeight: "bold"
  },
  sellprice: {
    color: "#44aafc",
    fontWeight: "bold",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25rem"
  },
  modcancelview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
    borderTopWidth: "0.3rem",
    height: "100%",
    width: "103rem",
    borderTopWidth: "0.5rem"
  },
  yesview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
    borderTopWidth: "0.3rem",
    height: "100%",
    width: "103rem",
    borderTopWidth: "0.5rem"
  },
  trashview: {
    alignItems: "center",
    justifyContent: "center"
  },
  modcontclose: {
    marginTop: "25rem",
    flexDirection: "row",
    width: "100%",
    height: "40rem",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  nsellprice: {
    color: "grey",
    fontWeight: "bold",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25rem"
  },
  empty: {
    width: "50rem",
    height: "20rem"
  },
  acceptofferbutton: {
    marginTop: "8rem",
    height: "40rem",
    width: "150rem",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#44aafc",
    borderRadius: "5rem"
  },
  offerAccCont: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.3)"
  },
  offerAccBox: {
    width: "55%",
    height: "20%",
    backgroundColor: "#ffffff",
    borderRadius: "5rem",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  offerAccTCont: {
    marginTop: "30rem",
    width: "80%",
    alignItems: "center",
    justifyContent: "center"
  },
  offermodaltext: {
    textAlign: "center",
    fontSize: "15rem",
    color: "#44aafc",
    fontWeight: "700"
  }
});
