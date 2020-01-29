import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Picker,
  FlatList,
  Dimensions,
  ScrollView
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import {Icon} from 'react-native-elements'

const testbanks = () => (
  <ScrollView style={[styles.scene, { backgroundColor: 'rgba(0,0,0,0.15)' }]}>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
    <Text>test</Text>
  </ScrollView>
);
const notebooks = () => (
  <ScrollView style={[styles.scene, { backgroundColor: 'rgba(0,0,0,0.15)' }]}>
    <View style={styles.notebook_item}>
      <Icon name='pdffile1' type='antdesign' />
      <Text style={{marginRight:5}}>تيست بانك كاسيت طيز</Text>
    </View>
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
    return (
      <ScrollView style={styles.main_container}>
        <View style={styles.header_container}>
          <Text style={styles.subject_title}>الذكاء الاصطناعي</Text>
          <View style={styles.header_specs_container}>
            <Text style={styles.header_specs}>سنه ثالثه</Text>
            <Text style={styles.header_specs}>1902342</Text>
            <Text style={styles.header_specs}>حفظ</Text>
          </View>
        </View>
        <View style={styles.content_container}>
          <View style={styles.desc_container}>
            <Text style={styles.desc_container_text}>
              لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور

    أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد

    أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات .
            </Text>
          </View>
          <View style={styles.tabs_container}>
            <TabView
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
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  content_container: {
    padding: 20,
    flex: 1
  },
  header_container: {
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%'
  },
  subject_title: {
    fontSize: 20,
    padding: 5,
    fontWeight: 'bold'
  },
  header_specs_container: {
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
    marginBottom: 10
  },
  desc_container_text: {
  },
  tabs_container: {
    flex: 1,
    height: 400,
    borderRadius: 6,
    overflow: 'hidden'
  },
  scene: {
    flex: 1,
  },
  notebook_item:{
    flexDirection:'row-reverse',
    alignItems:'center',
    padding:10,
    backgroundColor:'rgba(0,0,0,0.1)'
  }
});

export default App;