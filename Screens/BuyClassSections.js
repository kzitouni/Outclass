import React, { Component, useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
  RefreshControl,
} from 'react-native';
import Amplify, { Analytics } from 'aws-amplify';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import { Ionicons } from '@expo/vector-icons';
import { API, graphqlOperation } from 'aws-amplify';
import EStyleSheet from 'react-native-extended-stylesheet';
import aws_exports from './aws_exports';

Amplify.configure(aws_exports);
const entireScreenWidth = Dimensions.get('window').width;
const rem = entireScreenWidth / 380;
EStyleSheet.build({ $rem: rem });
const extractKey = ({ SectM }) => SectM;
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
const lowest = `query ListSortPrice($CIndex:String)
{listlowestprice
  (CIndex:$CIndex, limit:1)
  {
  items{
    Price
  }
}}`;

var indi;
var getPrice;

const BuyClassSections = (props) => {
const [data, setData] = useState([])
const [SectM, setSectM] = useState([])
const [lowprices, setLowprices] = useState([])
const [ind, setInd] = useState(indi)

useEffect(() => {
  fetchData();
  Lowprice();
  Analytics.record({majort: props.navigation.state.params.major})
  Analytics.record(props.navigation.state.params.major)
})
const recordfunc = () => {
  Analytics.record(props.navigation.state.params.major)
}
const Lowprice = async () => {
  try {
    const lowprice = await API.graphql(
      graphqlOperation(lowest, {
        CIndex: getPrice,
      })
    );
    setLowprices(lowprice.data.listlowestprice.items)
  } catch (err) {
    console.log('error creating ', err);
  }
};

const fetchData = async () => {
  var i = null;

  try {
    const response = await fetch(
      `https://rutgersnmajors.s3.amazonaws.com/Major${
        props.navigation.state.params.major
      }.json`
    );
    const json = await response.json();
    setData(json)
    var Full = [];
    var j = 0;
    for (i = 0; i < json.length; i++) {
      for (j = 0; j < json[i].SectM.length; j++) {
        Full.push(json[i].SectM[j].Index);
      }
    }
    var SectMN = [];
    var Comb = [];
    var n = 0;
    var Fin = [];

    for (i = 0; i < json.length; i++) {
      for (j = 0; j < json[i].SectM.length; j++) {
        var lowprices = await API.graphql(
          graphqlOperation(lowest, {
            CIndex: Full[n],
          })
        );
        console.log('jo', lowprices.data.listlowestprice.items[0]);
        Comb.concat(lowprices.data.listlowestprice.items[0]);
        Comb.push(json[i].SectM[j], lowprices.data.listlowestprice.items[0]);
        Comb = Object.assign([], ...Comb);
        SectMN.push(Comb);
        Comb = [];
        n = n + 1;
      }
      console.log('iw', SectMN);
    }

    console.log('yis', Fin);
  } catch (err) {
    console.log('error creating restaurant...', err);
  }
};
const renderItem = ({ item, index }) => {
  let items = [];
  if (item.SectM) {
    items = item.SectM.map(row => {
      indi = row.Index;

      return (
        <View style={styles.classes}>
          {row.Index === null ? (
            <View style={{ flex: 10 }}>
              <Text style={styles.noSection}>All sections are open</Text>
              <Text style={styles.noSection}>register on WebReg</Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BuyClassInfo', {
                  index: row.Index,
                  teacher: row.Teacher,
                  section: row.Sect,
                  day1: row.Day1,
                  time1: row.Time1,
                  day2: row.Day2,
                  time2: row.Time2,
                  time4: row.Time4,
                  time5: row.Time5,
                  day3: row.Day3,
                  day4: row.Day4,
                  day5: row.Day5,
                  time3: row.Time3,
                  classname: item.ClassName,
                  classmajor: item.Major,
                  classnum: item.CourseID,
                })
              }>
              <View style={styles.classboxes}>
                <Text style={styles.classteach}>Prof: {row.Teacher}</Text>

                <Text style={styles.classdate}>
                  {row.Day1} {row.Time1}
                </Text>
                <Text style={styles.classdate}>
                  {row.Day2} {row.Time2}
                </Text>
                  <Text style={styles.classind}>Index: {row.Index}</Text>
              </View>
            </TouchableOpacity>
          )}
          <View>
            {lowprices.map((dank, index) => (
              <View key={index}>
                <Text> {dank.Price}</Text>
              </View>
            ))}
          </View>
          <View style={styles.sellprice} />
        </View>
      );
    });
  }

  return (
    <View style={styles.background}>
      <Collapse>
        <CollapseHeader>
          <View style={styles.classnamesbox}>
            <Text style={styles.classnamestext}>{item.ClassName}</Text>
          </View>
        </CollapseHeader>
        <CollapseBody>{items}</CollapseBody>
      </Collapse>
    </View>
  );
};
props.navigation.getParam({ major: 'major' });
return (
  <View style={styles.container}>
    <ScrollView>
      <FlatList
        style={styles.container}
        data={data}
        renderItem={renderItem()}
        keyExtractor={extractKey}
        refreshControl={
          <RefreshControl
            onRefresh={() => handleRefresh}
            refreshing={refreshing}
          />
        }
      />
      <View style={styles.empty} />
    </ScrollView>
  </View>
);
}

export default BuyClassSections
// export default class BuyClassSections extends Component {
//   state = {
//     data: [],
//     SectM: [],
//     lowprices: [],
//     ind: indi,
//   };

//   componentWillMount() {
//     this.fetchData();
//     this.lowprices();
//     Analytics.record({majort: this.props.navigation.state.params.major})
//     Analytics.record(this.props.navigation.state.params.major)
//   }
// recordfunc(){
//   Analytics.record(this.props.navigation.state.params.major)
// }
//   lowprices = async () => {
//     try {
//       const lowprices = await API.graphql(
//         graphqlOperation(lowest, {
//           CIndex: getPrice,
//         })
//       );
//       this.setState({ lowprices: lowprices.data.listlowestprice.items });
//       console.log('success');
//     } catch (err) {
//       console.log('error creating ', err);
//     }
//   };
//   fetchData = async () => {
//     var i = null;
//     var getPrice = null;
//     var allP = [];
//     try {
//       const response = await fetch(
//         `https://rutgersnmajors.s3.amazonaws.com/Major${
//           this.props.navigation.state.params.major
//         }.json`
//       );
//       const json = await response.json();
//       this.setState({ data: json });
//       var Full = [];
//       var j = 0;
//       for (i = 0; i < json.length; i++) {
//         for (j = 0; j < json[i].SectM.length; j++) {
//           Full.push(json[i].SectM[j].Index);
//         }
//       }
//       var SectMN = [];
//       var Comb = [];
//       var n = 0;
//       var Fin = [];
//       var ClassP = [];
//       var ClassNN = [];
//       var CourseIDN = [];
//       var MajorN = [];

//       for (i = 0; i < json.length; i++) {
//         for (j = 0; j < json[i].SectM.length; j++) {
//           var lowprices = await API.graphql(
//             graphqlOperation(lowest, {
//               CIndex: Full[n],
//             })
//           );
//           console.log('jo', lowprices.data.listlowestprice.items[0]);
//           Comb.concat(lowprices.data.listlowestprice.items[0]);
//           Comb.push(json[i].SectM[j], lowprices.data.listlowestprice.items[0]);
//           Comb = Object.assign([], ...Comb);
//           SectMN.push(Comb);
//           Comb = [];
//           n = n + 1;
//         }
//         console.log('iw', SectMN);
//       }

//       console.log('yis', Fin);
//     } catch (err) {
//       console.log('error creating restaurant...', err);
//     }
//   };

//   renderItem = ({ item, index }) => {
//     let items = [];
//     if (item.SectM) {
//       items = item.SectM.map(row => {
//         indi = row.Index;

//         return (
//           <View style={styles.classes}>
//             {row.Index === null ? (
//               <View style={{ flex: 10 }}>
//                 <Text style={styles.noSection}>All sections are open</Text>
//                 <Text style={styles.noSection}>register on WebReg</Text>
//               </View>
//             ) : (
//               <TouchableOpacity
//                 onPress={() =>
//                   this.props.navigation.navigate('BuyClassInfo', {
//                     index: row.Index,
//                     teacher: row.Teacher,
//                     section: row.Sect,
//                     day1: row.Day1,
//                     time1: row.Time1,
//                     day2: row.Day2,
//                     time2: row.Time2,
//                     time4: row.Time4,
//                     time5: row.Time5,
//                     day3: row.Day3,
//                     day4: row.Day4,
//                     day5: row.Day5,
//                     time3: row.Time3,
//                     classname: item.ClassName,
//                     classmajor: item.Major,
//                     classnum: item.CourseID,
//                   })
//                 }>
//                 <View style={styles.classboxes}>
//                   <Text style={styles.classteach}>Prof: {row.Teacher}</Text>

//                   <Text style={styles.classdate}>
//                     {row.Day1} {row.Time1}
//                   </Text>
//                   <Text style={styles.classdate}>
//                     {row.Day2} {row.Time2}
//                   </Text>
//                     <Text style={styles.classind}>Index: {row.Index}</Text>
//                 </View>
//               </TouchableOpacity>
//             )}
//             <View>
//               {this.state.lowprices.map((dank, index) => (
//                 <View key={index}>
//                   <Text> {dank.Price}</Text>
//                 </View>
//               ))}
//             </View>
//             <View style={styles.sellprice} />
//           </View>
//         );
//       });
//     }

//     return (
//       <View style={styles.background}>
//         <Collapse>
//           <CollapseHeader>
//             <View style={styles.classnamesbox}>
//               <Text style={styles.classnamestext}>{item.ClassName}</Text>
//             </View>
//           </CollapseHeader>
//           <CollapseBody>{items}</CollapseBody>
//         </Collapse>
//       </View>
//     );
//   };
//   render() {
//     this.props.navigation.getParam({ major: 'major' });

//     return (
//       <View style={styles.container}>
//         <ScrollView>
//           <FlatList
//             style={styles.container}
//             data={this.state.data}
//             renderItem={this.renderItem}
//             keyExtractor={extractKey}
//             refreshControl={
//               <RefreshControl
//                 onRefresh={() => this.handleRefresh}
//                 refreshing={this.state.refreshing}
//               />
//             }
//           />
//           <View style={styles.empty} />
//         </ScrollView>
//       </View>
//     );
//   }
// }

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    height: '100%',
  },
  classboxes:{ flex: 3,
  width: "250rem" },
  background: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  classnamesbox: {
    marginTop: '15rem',
    height: '55rem',
    width: '330rem',
    backgroundColor: '#ffffff',
    borderColor: '#D3D3D3',
    borderWidth: '1rem',
    justifyContent: 'center',
    // alignItems: 'left',
    borderRadius: '5rem',
  },
  classnamestext: {
    marginLeft: '15rem',
    color: '#44aafc',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: '14rem',
    flexWrap: 'wrap',
  },
  classes: {
    margin: '5rem',
    backgroundColor: 'white',
    borderColor: '#D3D3D3',
    borderWidth: '.5rem',
    borderRadius: '5rem',
    padding: '10rem',
    marginRight: '30rem',
    marginLeft: '30rem',
    flexDirection: 'row',
    height: '70rem',
  },
  headerText: {
    color: '#ffffff',
    fontSize: '20rem',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center', 
    fontWeight: 'bold',
  },
  classteach: {
    color: 'black',   
    textAlign: 'left',
    fontSize: '13rem',
  },
  classdate: {
    color: 'gray',
    textAlign: 'left',
    fontSize: '10rem',
    fontWeight: '200',
  },classind: {
    color: 'gray',
    textAlign: 'left',
    fontSize: '10rem',
    fontWeight: '200',
    bottom: Platform.OS === 'android' ? '3rem' : 0

  },
  sellprice: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  sellpricetextbox: {
    fontSize: '18rem',
  },
  empty: {
    width: '50rem',
    height: '100rem',
  },
  noSection: {
    color: 'orange',
    fontSize: "15rem",
    textAlign: 'center',
  },
});
