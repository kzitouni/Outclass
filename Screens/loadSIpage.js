import React, { useState, useEffect } from "react";
import { View, StatusBar, AsyncStorage, ActivityIndicator } from "react-native";

export default loadSIpage = props => {
  const [user, setUser] = useState("");

  const _bootstrapAsync = async () => {
    setUser(await AsyncStorage.getItem("userNetID"));
    props.navigation.navigate("SchedScreen", { use: user });
    // this.props.navigation.navigate(userToken ? ('SchedScreen') : 'TutorialScreen');
  };
  useEffect(() => {
    AsyncStorage.setItem("userToken", "abc");
    _bootstrapAsync();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "space-around"
      }}
    >
      <ActivityIndicator size="large" />
      <StatusBar barStyle="default" />
    </View>
  );
};
