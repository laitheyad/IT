import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Icon } from 'react-native-elements';
import TestbankFile from './components/testbank'
import NotebookFile from './components/notebook'
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
    });
  }

  render() {
    const {subject_object} = this.state;
    if (this.state.subject_object != null) {
      const testbanks = () => (
        <FlatList
        style={[styles.scene, { backgroundColor: 'rgba(0,0,0,0.05)' }]}
        data={subject_object.testbank}
        renderItem={({item})=>
          <TestbankFile object={item} />
        }
        keyExtractor={(item) => item.pk.toString()}
        />
      );
      
      const notebooks = () => (
        <FlatList
        style={[styles.scene, { backgroundColor: 'rgba(0,0,0,0.05)' }]}
        data={subject_object.notebook}
        renderItem={({item})=>
          <NotebookFile object={item} />
        }
        keyExtractor={(item) => item.pk.toString()}
        />
      );
      return (
        <View style={styles.main_container}>
          <View style={[styles.header_container, { display: 'flex' }]}>
            <Text style={styles.subject_title}>{subject_object.name}</Text>
            <View style={styles.header_specs_container}>
              <Text style={styles.header_specs}>سنه ثالثه</Text>
              <Text style={styles.header_specs}>1902342</Text>
              <Text style={styles.header_specs}>حفظ</Text>
            </View>
          </View>
          <View style={[styles.content_container, { display: 'flex' }]}>
            <View style={styles.desc_container}>
              <Text style={styles.desc_container_text}>{subject_object.description}</Text>
            </View>
            <View style={styles.tabs_container}>
              <TabView
                renderTabBar={props =>
                  <TabBar
                    activeColor="#fff"
                    inactiveColor="rgba(0,0,0,0.3)"
                    style={{ backgroundColor: '#1e88e5', elevation: 0 }}
                    indicatorStyle={{ backgroundColor: '#fff', height: 3 }}
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
    else return (
      <View><Text>fuck off</Text></View>
    )
  }
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  content_container: {
    padding: 15,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.04)'
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
    color: '#fff',
    padding: 5,
    fontWeight: 'bold'
  },
  header_specs_container: {
    display: 'none',
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
  notebook_item: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.085)',
  },
  notebook_item_author_name: {
    color: '#fff',
    backgroundColor: '#1e88e5',
    fontSize: 12,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 7,
  }
});

export default SubjectDetailView;