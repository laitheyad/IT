import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Icon } from 'react-native-elements';
import NotebookFile, { TestbankFile } from './components/fileItem'
import common_styles from '../../common/styles/common_styles';

class SubjectDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      routes: [
        { key: 'testbanks', title: 'اسئلة سنوات' },
        { key: 'notebooks', title: 'دوسيات' },
      ],
      subject_object: null,
      subject_id: null
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', ''),
    };
  };

  componentDidMount() {
    this.setState({ subject_id: this.props.navigation.getParam('subject_id', null) }, async () => {
      if (this.state.subject_id != null) {
        try {
          await fetch('http://laitheyad1.pythonanywhere.com/subjects/' + this.state.subject_id)
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({ subject_object: responseJson }, () => console.log(this.state.subject_object))
            });
        }
        catch (error) {
          console.log(error);
        }
      }
      this.props.navigation.setParams({ title: this.state.subject_object.name });
    });

  }

  render() {
    const { subject_object } = this.state;
    if (this.state.subject_object != null) {
      const testbanks = () => (
        <FlatList
          style={styles.testbanks_container}
          data={subject_object.testbanks}
          renderItem={({ item }) =>
            <TestbankFile object={item} />
          }
          keyExtractor={(item) => item.pk.toString()}
        />
      );

      const notebooks = () => (
        <FlatList
          style={styles.notebooks_container}
          data={subject_object.notebooks}
          renderItem={({ item }) =>
            <NotebookFile object={item} />
          }
          keyExtractor={(item) => item.pk.toString()}
        />
      );

      return (
        <View style={styles.main_container}>
          <View style={styles.subject_number_container}>
            <Text style={styles.subject_number}>{subject_object.subject_number}</Text>
          </View>
          <View style={[styles.content_container, { display: 'flex' }]}>
            <View style={styles.header_container}>
              <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: common_styles.colors.main_color, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 20, }}>
                  <Icon name='fork' containerStyle={{ marginLeft: 2 }} size={14} color={common_styles.colors.main_light_color} type='antdesign' />
                  <Text style={{ color: common_styles.colors.main_light_color, }}>مستوى المادة</Text>
                </View>
                <Text style={{ color: common_styles.colors.main_light_color, marginRight: 5 }}>{subject_object.level}</Text>
              </View>
              <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: common_styles.colors.main_color, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 20, }}>
                  <Icon name='fork' containerStyle={{ marginLeft: 2 }} size={14} color={common_styles.colors.main_light_color} type='antdesign' />
                  <Text style={{ color: common_styles.colors.main_light_color, }}>القسم</Text>
                </View>
                <Text style={{ color: common_styles.colors.main_light_color, marginRight: 5 }}>{subject_object.major.name}</Text>
              </View>
            </View>
            <View style={styles.desc_container}>
              <Text style={styles.desc_container_text}>{subject_object.description}</Text>
            </View>
            <View style={styles.tabs_container}>
              <TabView
                renderTabBar={props =>
                  <TabBar
                    pressColor={common_styles.colors.main_back_color}
                    activeColor={common_styles.colors.main_light_color}
                    inactiveColor={"rgba(0,0,0,0.3)"}
                    style={{ backgroundColor: common_styles.colors.main_color, elevation: 0 }}
                    indicatorStyle={{ backgroundColor: common_styles.colors.main_light_color, height: 3 }}
                    {...props}
                  />
                }
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
    else return (
      <View style={[styles.content_container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size='large' color={common_styles.colors.main_color} />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: common_styles.colors.main_back_color,
    flex: 1
  },
  content_container: {
    backgroundColor: common_styles.colors.main_back_color,
    padding: 15,
    flex: 1,
  },
  subject_number_container:{
    paddingVertical:4,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.2)'
  },
  subject_number:{
    color:common_styles.colors.main_light_color
  },
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  subject_title: {
    fontSize: 19,
    color: common_styles.colors.main_light_color,
    padding: 5,
    fontWeight: 'bold'
  },
  header_specs_container: {
    flexDirection: 'row',
    direction: 'rtl',
    justifyContent: 'flex-end',
    width: '100%'
  },
  header_specs: {
    color: common_styles.colors.main_light_color,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 30,
    marginHorizontal: 2.5
  },
  desc_container: {
    padding: 10,
    backgroundColor: common_styles.colors.main_back_color_light,
    borderRadius: 6,
    marginBottom: 15
  },
  desc_container_text: {
    color: common_styles.colors.main_light_color
  },
  testbanks_container: {
    backgroundColor: common_styles.colors.main_back_color_light
  },
  notebooks_container: {
    backgroundColor: common_styles.colors.main_back_color_light
  },
  tabs_container: {
    flex: 1,
    borderRadius: 6,
    overflow: 'hidden'
  },
  scene: {
    flex: 1,
  },
});

export default SubjectDetailView;