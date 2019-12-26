import React, {Component} from 'react';
import { StyleSheet, View, Text, AsyncStorage, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import {Container} from 'native-base';
import AppIntroSlider from 'react-native-app-intro-slider';


const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 360,
  }})
const slides = [
  {
    key: 'somethun',
    title: 'Schedule',
    text: 'Here you can see your schedule and list any of your classes by clicking on one',
    image: require('./Screen1Tut.png'),
    imageStyle: styles.image,
    backgroundColor: '#59b2ab',
      
  },
  {
    key: 'somethun-dos',
    title: 'Listing a Class',
    text: 'After clicking on a class you will see this page with further info.  List the class by selecting the Sell This Class button.',
    image: require('./Images/Screen3Tut.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Buy a Class',
    text: 'Here you can search for any class your looking for by clicking on the major and then clicking the class and section.',
    image: require('./Images/Screen2Tut.png'),
    imageStyle: styles.image,
    backgroundColor: '#22bcb5',
  }
];

export default class TutorialScreenSettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      loading: false,
      //To show the main page of the app
    };
  }

  

  _onDone = () => {
    // After user finished the intro slides. Show real app through
    // navigation or simply by controlling state
    AsyncStorage.setItem('first_time', 'true').then(() => {
      this.setState({ showRealApp: true });
        this.props.navigation.navigate('Buy');
    });
  };
    
  _onSkip = () => {
    // After user skip the intro slides. Show real app through
    // navigation or simply by controlling state
    AsyncStorage.setItem('first_time', 'true').then(() => {
      this.setState({ showRealApp: true });
        this.props.navigation.navigate('Buy');
    });
  };

  render() {
    if (this.state.loading) return <ActivityIndicator size="large" />

    //If false show the Intro Slides
    if (this.state.showRealApp) {
      //Real Application
      return (
      this.props.navigation.navigate('Buy')
      );
    } else {
      //Intro slides
      return (
        <Container>
          <AppIntroSlider
            slides={slides}
            //comming from the JsonArray below
            onDone={this._onDone}
            //Handler for the done On last slide
            showSkipButton={false}
            onSkip={this._onSkip}
            showPrevButton={false}
            
            doneLabel="Done"
          />
        </Container>
      );
    }
  }
}

