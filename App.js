import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  FlatList,
  Dimensions,
  ScrollView
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {Icon} from 'react-native-elements';
import PDFView from 'react-native-view-pdf';

const resources = {
  // file: Platform.OS === 'ios' ? 'test-pdf.pdf' : '/sdcard/Download/test-pdf.pdf',
  url: 'http://www.africau.edu/images/default/sample.pdf',
  // base64: 'JVBERi0xLjMKJcfs...',
};

const testbanks = () => (
  <ScrollView style={[styles.scene, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
    <View style={styles.notebook_item}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{marginRight:10}}>تيست بانك كاسيت طيز</Text>
        <Icon color='blue' name='pdffile1' size={17} type='antdesign' />
      </View>
      <Text style={styles.notebook_item_author_name}>الشرقاوي</Text>
    </View>
  </ScrollView>
);
const notebooks = () => (
  <ScrollView style={[styles.scene, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
    <TouchableNativeFeedback onPress={()=>alert('hi')}>
    <View style={styles.notebook_item}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{marginRight:10}}>تيست بانك كاسيت طيز</Text>
        <Icon color='blue' name='pdffile1' size={17} type='antdesign' />
      </View>
      <Text style={styles.notebook_item_author_name}>الشرقاوي</Text>
    </View>
    </TouchableNativeFeedback>
  </ScrollView>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      routes: [
        { key: 'testbanks', title: 'اسئلة سنوات' },
        { key: 'notebooks', title: 'دوسيات' },
      ],
    };
  }

  render() {
      const resourceType = 'url';

    return (
      <View style={styles.main_container}>
        <View style={{ flex: 1,display:'none' }}>
          {/* Some Controls to change PDF resource */}
          <PDFView
            fadeInDuration={250.0}
            style={{ flex: 1 }}
            resource={resources[resourceType]}
            resourceType={resourceType}
            onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
            onError={() => console.log('Cannot render PDF', error)}
          />
        </View>
        <View style={[styles.header_container,{display:'flex'}]}>
          <Text style={styles.subject_title}>الذكاء الاصطناعي</Text>
          <View style={styles.header_specs_container}>
            <Text style={styles.header_specs}>سنه ثالثه</Text>
            <Text style={styles.header_specs}>1902342</Text>
            <Text style={styles.header_specs}>حفظ</Text>
          </View>
        </View>
        <View style={[styles.content_container,{display:'flex'}]}>
          <View style={styles.desc_container}>
            <Text style={styles.desc_container_text}>
              لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور
              أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد
              أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات .
            </Text>
          </View>
          <View style={styles.tabs_container}>
            <TabView
              renderTabBar={props => 
              <TabBar 
              activeColor="#fff"
              inactiveColor="rgba(0,0,0,0.4)"
              style={{backgroundColor:'#1e88e5',elevation:0}}
              indicatorStyle={{ backgroundColor: '#fff',height:3}}
              {...props} 
              />}
              swipeEnabled={true}
              navigationState={this.state}
              renderScene={SceneMap({
                testbanks: testbanks,
                notebooks: notebooks,
              })}
              onIndexChange={index => this.setState({ index })}
              initialLayout={{ width: Dimensions.get('window').width }}
            />
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  content_container: {
    padding: 15,
    flex: 1,
    backgroundColor:'rgba(0,0,0,0.04)'
  },
  header_container: {
    backgroundColor: '#1e88e5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%'
  },
  subject_title: {
    fontSize: 20,
    color:'#fff',
    padding: 5,
    fontWeight: 'bold'
  },
  header_specs_container: {
    display:'none',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  header_specs: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 30,
    marginHorizontal: 2.5
  },
  desc_container: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 6,
    marginBottom: 15
  },
  desc_container_text: {
  },
  tabs_container: {
    flex: 1,
    borderRadius: 6,
    overflow: 'hidden'
  },
  scene: {
    flex: 1,
  },
  notebook_item:{
    flexDirection:'row-reverse',
    justifyContent:'space-between',
    alignItems:'center',
    padding:10,
    backgroundColor:'rgba(255,255,255,0.85)',
    borderBottomWidth:1,
    borderColor:'rgba(0,0,0,0.085)',
  },
  notebook_item_author_name:{
    color:'#fff',
    backgroundColor:'#1e88e5',
    fontSize:12,
    borderRadius:20,
    paddingVertical:4,
    paddingHorizontal:7,
  }
});

export default App;