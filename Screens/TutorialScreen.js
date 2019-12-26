import React, {Component, useState, useEffect} from 'react';
import { StyleSheet, View, Text, AsyncStorage, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import {Container} from 'native-base';
import AppIntroSlider from 'react-native-app-intro-slider';
import EStyleSheet from 'react-native-extended-stylesheet';


const styles = EStyleSheet.create({
  image: {
    width: "250rem",
    height: "450rem",
    marginBottom:"20rem"
  },
text: {
  fontWeight:'bold',
  fontSize:"21rem",
  color:'#fff',
  marginBottom:"30rem"
},
title: {
  marginTop:"10rem",
  fontWeight:'bold',
  color:'#fff'
}})
const slides = [
  {
    key: 'somethun-uno',
    title: '',
    titleStyle: styles.title,
    text: 'Asend is a market place for college students to buy and sell closed classes',
    textStyle: styles.text,
    image: {
      uri: 'https://tutorialscreen2.s3.amazonaws.com/SchedTut.jpg'
    }, 
    imageStyle: styles.image,
    backgroundColor: '#7fdbff',
      
  },{ 
    key: 'somethun',
    title: '',
    titleStyle: styles.title,
    text: 'In order to get started, you need to enter your school sign-in information',
    textStyle: styles.text,
    image: {
      uri: 'https://tutorialscreen2.s3.amazonaws.com/SignInTut.jpg'
    },
    imageStyle: styles.image,
    backgroundColor: '#7fdbff',
  },
  {
    key: 'somethun-dos',
    title: '',
    titleStyle: styles.title,
    text: 'From your schedule, you can list classes and accept offers',
    textStyle: styles.text,
    image: {uri: 'https://tutorialscreen2.s3.amazonaws.com/ListTut.jpg'},
    imageStyle: styles.image,
    backgroundColor: '#7fdbff',
  },
  {
    key: 'somethun1',
    title: '',
    titleStyle: styles.title,
    text: 'You can buy any listed class or make an offer',
    textStyle: styles.text,
    image: {uri: 'https://tutorialscreen2.s3.amazonaws.com/BuyClassTut.jpg'},
    imageStyle: styles.image,
    backgroundColor: '#7fdbff',
  },
  {
    key: 'Payout',
    titleStyle: styles.title,
    text: 'Payouts are made simple all we need is your email or phone number',
    textStyle: styles.text,
    image: {uri: 'https://tutorialscreen2.s3.amazonaws.com/PayoutTut.jpg'},
    imageStyle: styles.image,
    backgroundColor: '#7fdbff',
  } 
];

const TutorialScreen = (props) => {
  const [showRealApp, setShowRealApp] = useState(false)
  const [loading, setLoading] = useState(false)


  const _onDone = async () => {
    props.navigation.navigate('RUIDLogin')
  }
  const _onSkip = () => {
    AsyncStorage.setItem('first_time', 'true').then(() => {
      setShowRealApp(true);
      props.navigation.navigate('HomeScreen');
  })
}
const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('first_time');
    if(value !== null) {
      props.navigation.navigate('RUIDLogin')
    }
    else (null)
  } catch (error) {
    return null
  }
}

const _bootstrapAsync = async () => {
  const userToken = await AsyncStorage.getItem('userToken');

  // This will switch to the App screen or Auth screen and this loading
  // screen will be unmounted and thrown away.
  props.navigation.navigate(userToken ? 'SchedScreen' : 'TutorialScreen');
};
if (loading) return <ActivityIndicator size="large" />

    //If false show the Intro Slides
    else if (showRealApp) {
      //Real Application
      return (
      props.navigation.navigate('RUIDLogin')
      );
    } else {
      //Intro slides
      return (
        <Container>
          <AppIntroSlider
            slides={slides}
            //comming from the JsonArray below
            onDone={_onDone}
            //Handler for the done On last slide
            showSkipButton={false}
            onSkip={this._onSkip}
            showPrevButton={false}
            
            doneLabel="Done"
          />
        </Container>)
}
}

export default TutorialScreen

