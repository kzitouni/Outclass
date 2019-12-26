import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, StyleSheet, Text, View } from 'react-native';
import Expo from 'expo'; 
import Icon from '@expo/vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons'; 
import { ScreenOrientation } from 'expo';
import { 
  createSwitchNavigator,  
  createAppContainer,  
  createBottomTabNavigator,   
  createDrawerNavigator,   
  createStackNavigator,          
  Header,         
  headerTitle,         
  SafeAreaView,   
} from 'react-navigation';  
import Buy from './Screens/Buy'; 
import loadSIpage from './Screens/loadSIpage';
import UpdateApp from './Screens/UpdateApp';
import Majors from './Screens/Majors'; 
import SchedScreen from './Screens/SchedScreen'; 
import SellClassInfo from './Screens/SellClassInfo';
import SignInScreen from './Screens/SignInScreen'; 
import Amplify from 'aws-amplify';
import aws_exports from './Screens/aws_exports';
import AppSyncConfig from './Screens/appsync-config';
import RUIDLogin from './Screens/RUIDLogin';
import BuyClassSections from './Screens/BuyClassSections';
import BuyClassInfo from './Screens/BuyClassInfo';
import UpdateNetIDPass from './Screens/UpdateNetIDPass';
import PaypalPayout from './Screens/PaypalPayout';
import DeletePage from './Screens/DeletePage';
import index from './index';
import Maintenance from './Screens/Maintenance';
import LoadPage from './Screens/LoadPage';
import TutorialScreen from './Screens/TutorialScreen'
Amplify.configure(aws_exports);

class App extends Component {
  render() {
    return <AppContainer />;
  }
}
export default App;
const MajorsStack = createStackNavigator({
  Majors: {
    screen: Majors,
    navigationOptions: () => ({
      title: 'Majors',
      headerStyle: {
        backgroundColor: '#44aafc',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      },
      headerBackTitle: 'Back',
      headerTruncatedBackTitle: `Back`,
    }),
  },
  BuyClassSections: {
    screen: BuyClassSections,
    navigationOptions: () => ({
      title: 'Classes',
      headerStyle: {
        backgroundColor: '#44aafc',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      },
      headerBackTitle: 'Back',
      headerTruncatedBackTitle: `Back`,
    }),
  },
  BuyClassInfo: {
    screen: BuyClassInfo,
  },
});

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
}

const SchedScreenStack = createStackNavigator({
  SchedScreen: {
    screen: SchedScreen,
  },
  DeletePage:{
    screen: DeletePage
  }, 
  UpdateApp:{
    screen: UpdateApp
  },
  Maintenance:{
    screen: Maintenance
  },
  SellClassInfo: {
    screen: SellClassInfo
  },
  BuyClassSections: {
    screen: BuyClassSections
  },
  BuyClassInfo: {
    screen: BuyClassInfo
  }
});
const BuyStack = createStackNavigator({
  Buy: {
    screen: Buy,
    navigationOptions: () => ({
      title: 'Account',
      headerStyle: {
        backgroundColor: '#44aafc',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      },
      headerBackTitle: 'Back',
      headerTruncatedBackTitle: `Back`,
    }),
  },
  UpdateNetIDPass: {
    screen: UpdateNetIDPass,
    navigationOptions: () => ({
      title: 'Password Update',
      headerStyle: {
        backgroundColor: '#44aafc',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      },
      headerBackTitle: 'Back',
      headerTruncatedBackTitle: `Back`,
    }),
  },
  PaypalPayout: {
    screen: PaypalPayout,
    navigationOptions: () => ({
      title: 'Payout',
      headerStyle: {
        backgroundColor: '#44aafc',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
      },
      headerBackTitle: 'Back',
      headerTruncatedBackTitle: `Back`,
    }),
  },
});

const DashboardTabNavigator = createBottomTabNavigator(
  {
    SchedScreenStack: {
      screen: SchedScreenStack,
      navigationOptions: {
        tabBarLabel: 'Sell',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-cart" color={tintColor} size={25} />
        ),
      },
    },
    MajorsStack: {
      screen: MajorsStack,
      navigationOptions: {
        tabBarLabel: 'Buy',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-pricetag" color={tintColor} size={25} />
        ),
      },
    },
    BuyStack: {
      screen: BuyStack,
      navigationOptions: {
        tabBarLabel: 'Account',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-person" color={tintColor} size={25} />
        ),
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: (
          <View>
            <Text>routeName</Text>{' '}
          </View>
        ),
      };
    },
  }
);
const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator,
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: <Text>Hellow</Text>,
      };
    },
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  // SignInScreen: { screen: SignInScreen },
  LoadPage: { screen: LoadPage},
  RUIDLogin: { screen: RUIDLogin},
  TutorialScreen:{ screen: TutorialScreen},
  loadSIpage: {screen: loadSIpage}, 
  Dashboard: { screen: DashboardTabNavigator },
});

const AppContainer = createAppContainer(AppSwitchNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
