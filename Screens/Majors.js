import React, { Component, useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  AsyncStorage
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
const entireScreenWidth = Dimensions.get('window').width;
 const rem = entireScreenWidth / 380 
 EStyleSheet.build({$rem: rem }); 
 Text.defaultProps = Text.defaultProps || {};
 Text.defaultProps.allowFontScaling = false;
 const Majors = (props) => {
//  const [user, setUser] = useState("")
//     useEffect(async () => {
//       setUser(await AsyncStorage.getItem('userNetID'))
//     }, [])
    return (
      <View style={styles.background}>
          <View style={styles.majorcont}>
            
            <ScrollView
          style={styles.scroll}>
            <View style={styles.majorview}>
            <TouchableOpacity 
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '120',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>BIOLOGY (120)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '198',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>COMPUTER SCIENCE (198)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '548',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>INFORMATION SYSTEMS (548)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '510',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>HISTORY, GENERAL (510)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '620',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>MANAGEMENT (620)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '830',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>PSYCHOLOGY (830)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '623',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>
                MANAGEMENT SCIENCE AND INFO SYSTEMS (623)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '355',
                }) 
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>ENGLISH: COMP & WRITING (355)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '640',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>MATHEMATICS (640)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '202',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>CRIMINAL JUSTICE (202)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '799',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>SUPPLY CHAIN MANAGEMENT (799)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '010',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>ACCOUNTING (010)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '160',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>CHEMISTRY (160)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '460',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>GEOLOGICAL SCIENCES (460)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '512',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>HISTORY, AMERICAN (512)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '910',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>SOCIAL WORK (910)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '220',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>ECONOMICS (220)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '390',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>FINANCE (390)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '920',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>SOCIOLOGY (920)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '080',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>ART (080)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '082',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>ART HISTORY (082)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '083',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>ARTS,CULTURE AND MEDIA (083)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '544',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>INFORMATION TECHNOLOGY (544)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '350',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>ENGLISH (350)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '705',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>NURSING (705)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '086',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>JOURNALISM (086)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '730',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>PHILOSOPHY (730)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '750',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>PHYSICS (750)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '085',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>GRAPHIC DESIGN (085)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '014',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>
                AFRICAN AMERICAN AND AFRICAN STUDIES (014)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '011',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>ADMINISTRATIVE STUDIES (011)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '050',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>AMERICAN STUDIES (050)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '070',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>ANTHROPOLOGY (070)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '074',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>ARABIC LANGUAGES (074)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '090',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>ARTS AND SCIENCES (090)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '134',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>BUSINESS OF FASHION (134)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '165',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>CHINESE (165)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '200',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>CREATIVE WRITING (200)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '300',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>EDUCATION (300)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '352',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>
                ENGLISH - AMERICAN LITERATURE (352)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '382',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>ENTREPRENEURSHIP (382)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '375',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>ENVIRONMENTAL SCIENCES (375)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '393',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>FINANCIAL PLANNING (393)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '420',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>FRENCH (420)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '088',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>THEATER (088)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '522',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>
                INTERNATIONAL BUSINESS AND BUSINESS (522)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '988',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>WOMENS & GENDER STUDIES (988)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '089',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>VIDEO PRODUCTION (089)</Text>
            </TouchableOpacity>
 
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '630',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>MARKETING (630)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '834',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>PUBLIC ADMINISTRATION (834)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '087',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>MUSIC (087)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '790',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>POLITICAL SCIENCE (790)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '526',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>
                HONORS LIVING-LEARNING COMMUNITY (526)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '595',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>
                LATINO AND HISPANIC CARIBBEAN STUDIES (595)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '940',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>SPANISH (940)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '851',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>REAL ESTATE (851)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '615',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>LINGUISTICS (615)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '525',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>HONORS PROGRAM (525)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '812',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>
                PORTUGUESE AND LUSOPHONE WORLD STUDIES (812)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '600',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>LAW - NEWARK (600)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '520',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>HOME ECONOMICS (520)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '565',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>JAPANESE (565)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '560',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>ITALIAN (560)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassSections', {
                  major: '580',
                })
              }
              style={styles.Body}>
              <Text style={styles.TextBody}>LATIN (580)</Text>
            </TouchableOpacity>
            </View>
            </ScrollView>
          </View>
      </View>
    );
 }

 export default Majors
// export default class Majors extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       inputUsername: '', 
//       inputPassword: '',
//       Username: '',    
//       Password: '',
//       user:'',
//       confirmPassword: '',
//       modalVisible: false,
//     };
//   }

const styles = EStyleSheet.create({
  background: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    height: '100%',
  },
  scroll: {
    width: '100%',
    // alignItems: 'center',
    //marginTop: 20,  
  },
  headerText: {
    color: '#ffffff', 
    fontSize: "20rem", 
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  majorcont: {
    width: '100%', 
    // backgroundColor:'red',
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',  
  },majorview:{
justifyContent:'center',
alignItems:'center'
  },
  Body: {
    marginTop: "10rem",
    height: "80rem",
    width: "330rem",
    backgroundColor: '#ffffff',
    borderColor: '#D3D3D3',
    borderWidth: "1rem",
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: "5rem",
  },
  TextBody: {
    marginLeft: "15rem",
    color: '#44aafc',    
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: "17rem",
    flexWrap: 'wrap',
  },
});
