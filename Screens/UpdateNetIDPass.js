import React, { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
  TextInput
} from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import EStyleSheet from "react-native-extended-stylesheet";
const entireScreenWidth = Dimensions.get("window").width;
const rem = entireScreenWidth / 380;
import DropdownAlert from "react-native-dropdownalert";
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

export default UpdateNetIDpass = props => {
  const [passNetID, setPassNetID] = useState("");
  const [netID, setNetID] = useState([]);

  useEffect(() => {
    GetnetID();
  }, []);

  const GetnetID = async () => {
    try {
      const netID = await API.graphql(
        graphqlOperation(netid, {
          userNetID: props.navigation.state.params.use
        })
      );
      setNetID(netID.data.listLoginModals.items);
    } catch (err) {
      console.log("error creating restaurant...", err);
    }
  };
  const Passupdate = async () => {
    try {
      await API.graphql(
        graphqlOperation(updatepass, {
          passNetID: passNetID,
          userNetID: props.navigation.state.params.use
        })
      );
      console.log("item created!");
      dropDownAlertRef.alertWithType(
        "success",
        "Success",
        "Class Succesfully Listed"
      );
    } catch (err) {
      console.log("error creating login...", err);
      dropDownAlertRef.alertWithType("error", "Error", err.errors[0].message);
    }
  };
  return (
    <DismissKeyboard>
      <View>
        <View style={styles.container}>
          <Text style={styles.enterpasstxt}> Enter Your New Password </Text>
          <View style={styles.netcont}>
            {netID.map((dat, ind) => (
              <View item={dat} key={ind}>
                <Text style={styles.netIdTxt}>NetID: {dat.userNetID}</Text>
              </View>
            ))}
          </View>
          <View style={styles.txtinputcont}>
            <TextInput
              placeholder="Enter your Password"
              style={styles.txtinputstyle}
              onChangeText={v => setPassNetID(v)}
              value={passNetID}
            />
          </View>
          <View style={styles.buttoncont}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Passupdate()}
            >
              <Text style={styles.buttontext}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
        <DropdownAlert ref={ref => (dropDownAlertRef = ref)} />
      </View>
    </DismissKeyboard>
  );
};

const styles = EStyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: "50rem",
    padding: "20rem",
    backgroundColor: "#ffffff"
  },
  button: {
    marginTop: "30rem",
    height: "50rem",
    width: "90%",
    backgroundColor: "orange",
    //backgroundColor: '#44aafc',
    borderRadius: "5rem",
    alignItems: "center",
    justifyContent: "center"
  },
  buttontext: {
    fontSize: "20rem",
    textAlign: "center",
    color: "white",
    fontWeight: "500"
  },
  netIdTxt: {
    fontSize: "16rem",
    fontWeight: "bold",
    color: "black"
  },
  txtinputstyle: {
    width: "50%",
    height: "50rem",
    margin: "10rem",
    backgroundColor: "#ffffff",
    borderRadius: "5rem",
    borderWidth: "1rem",
    borderColor: "#D3D3D3",
    padding: "10rem"
  },
  netcont: {
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: "2%",
    marginTop: "10%"
  },
  enterpasstxt: {
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "row",
    marginBottom: "2%",
    fontSize: "20rem"
  },
  buttoncont: { justifyContent: "center", alignItems: "center" },
  txtinputcont: {
    justifyContent: "center",
    flexDirection: "row"
  }
});
