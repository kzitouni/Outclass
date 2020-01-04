import React, { Component } from "react";
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
  FlatList
} from "react-native";
import Expo from "expo";
import { createSwitchNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import { API, graphqlOperation } from "aws-amplify";
// import t from 'tcomb-form-native';
import gql from "graphql-tag";
const { width: WIDTH } = Dimensions.get("window");

export default AccountInfo = (props) => {
  const { navigation } = props;
  const index = navigation.getParam("index", "NO-ID");
  const time1 = navigation.getParam("time1", "NO-ID");
  const teacher = navigation.getParam("teacher", "NO-ID");
  const section = navigation.getParam("section", "NO-ID");
  const day1 = navigation.getParam("day1", "NO-ID");
  return (
    <View style={{ marginTop: 15 }}>
      <View style={styles.title}>
        <Text style={styles.titleText}> classname </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <View
          style={{
            margin: 5,
            backgroundColor: "rgba(240,240,240,1)",
            padding: 10,
            borderRadius: 10,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            height: 200,
            marginLeft: 35,
            marginRight: 35
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              left: 15
            }}
          >
            <Text style={styles.titleSubTextLeft}> INDEX </Text>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                left: 15
              }}
            >
              <Text style={styles.titleSubTextRight}> Section </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "flex-end",
                right: 10
              }}
            >
              <Text style={styles.titleSubTextRight}> PROFESSOR </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              top: 10,
              left: 15
            }}
          >
            <Text style={styles.titleSubTextLeftNumbers}> {index}</Text>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                left: 20
              }}
            >
              <Text style={styles.titleSubTextRightNumbers}> {section} </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "flex-end",
                right: 15
              }}
            >
              <Text style={styles.titleSubTextRightNumbers}> {teacher} </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginTop: 60 }}>
              <Text
                style={{
                  color: "red",
                  fontSize: 30,
                  textAlign: "center",
                  marginTop: 10,
                  marginLeft: 80,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                Price:{" "}
              </Text>
            </View>
            <View></View>
          </View>

          <TouchableOpacity>
            <View style={styles.header}>
              <Text style={styles.headerText}> Buy This Class </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 5,
    marginLeft: 65,
    height: 40,
    width: 250,
    //backgroundColor:'White',
    justifyContent: "center"
  },
  titleText: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  },
  titleSubTextLeft: {
    color: "black",
    textAlign: "left",
    fontSize: 15,

    textShadowRadius: 10,
    textShadowColor: "grey",
    shadowOpacity: 0.1
  },
  titleSubTextLeftNumbers: {
    color: "black",
    textAlign: "left",
    fontSize: 15,

    textShadowRadius: 10,
    textShadowColor: "grey",
    shadowOpacity: 0.1
  },
  titleSubTextRight: {
    color: "black",
    textAlign: "left",
    fontSize: 15,
    textShadowRadius: 10,
    textShadowColor: "grey",
    shadowOpacity: 0.1
  },
  titleSubTextRightNumbers: {
    color: "black",
    textAlign: "left",
    fontSize: 15
  },
  header: {
    marginTop: 70,
    marginLeft: 10,
    height: 40,
    width: 250,
    backgroundColor: "#7afd7a",
    borderColor: "black",
    borderRadius: 10,
    justifyContent: "center"
  },
  headerText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    textShadowRadius: 5,
    textShadowColor: "red"
  },
  Title: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
    textShadowColor: "black",
    textShadowRadius: 5
  },

  PurchaseTitle: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
    top: 40
  },
  BackTitle: {
    fontSize: 25,
    color: "red",
    textAlignVertical: "center",
    top: 20,
    marginLeft: 10
  },
  RightTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  },
  inputIcon: {
    color: "red",
    position: "absolute",
    top: 0,
    left: 80
  },
  sliderText: {
    textAlign: "center",
    fontSize: 20
  },
  input: {
    width: WIDTH - 220,
    height: 70,
    borderRadius: 2,
    fontSize: 30,

    paddingLeft: 45,
    borderWidth: 1,
    borderColor: "black",
    color: "black",
    marginHorizontal: 110
  },
  pickerinput: {
    marginHorizontal: 110,
    marginTop: 20,
    width: 150,
    height: 50
  },
  listButton: {
    marginTop: 200,
    marginLeft: 65,
    height: 40,
    width: 250,
    backgroundColor: "rgba(240,240,240,1)",
    borderColor: "#D3D3D3",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center"
  }
});
