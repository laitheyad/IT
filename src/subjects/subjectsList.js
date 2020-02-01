import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  // Button
} from 'react-native';
import common_styles, { style_objects } from '../../common/styles/common_styles';
import SubjectItem from './components/subject_component';
import { Icon } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer'
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

class SubjectsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      searched_subjects: [],
      loading: false,
      search_string: '',
    };
    this.search = this.search.bind(this);
    this._get_all_subjects = this._get_all_subjects.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'المواد الدراسية',
      headerRight: () => (
        <TouchableNativeFeedback containerStyle={{ marginRight: 20 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Icon name='menu' containerStyle={{}} size={22} type='MaterialCommunityIcons' color={common_styles.colors.main_light_color} />
        </TouchableNativeFeedback>
      ),
    };
  };

  async _get_all_subjects() {
    this.setState({ loading: true });
    try {
      await fetch('http://laitheyad1.pythonanywhere.com/subjects/')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ subjects: responseJson }, () => console.log(this.state.subjects))
        });
    }
    catch (error) {
      console.log(error);
    }
    this.setState({ loading: false });
  }

  componentDidMount() {
    this._get_all_subjects();
  }

  async search(text) {
    this.setState({ search_string: text, loading: true }, async () => {
      try {
        await fetch('http://laitheyad1.pythonanywhere.com/subjects/?search=' + text)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({ subjects: responseJson }, () => console.log('search_results', this.state.subjects))
          });
      }
      catch (error) {
        console.error(error);
      }
      this.setState({ loading: false })
    })
  }

  local_search(text) {
    this.setState({ search_string: text });
    const subjects_list = this.state.subjects,
      searched_subjects_list = [];
    for (let i = 0; i < subjects_list.length; i++) {
      if (subjects_list[i].name.includes(text)) {
        searched_subjects_list.push(subjects_list[i]);
      }
    }
    this.setState({ searched_subjects: searched_subjects_list })
  }

  render() {
    const { loading, search_string } = this.state;
    return (
      <View style={styles.main_container}>
        <View style={styles.search_container}>
          {
            this.state.search_string.length > 0 ?
              <Icon name='cancel' onPress={()=>this.local_search('')} type='MaterialIcons' color={common_styles.colors.main_color} />
              :
              <Icon name='search' type='FontAwesome' color='rgba(0,0,0,0.15)' />

          }
          <TextInput placeholder='ابحث عن اسم المادة . .' style={{ padding: 0, flex: 1, textAlign: 'right' }} value={search_string} onChangeText={(text) => this.local_search(text)} />
        </View>
        <ActivityIndicator style={{ display: loading ? 'flex' : 'none' }} animating={this.state.loading} size={24} color={common_styles.colors.main_color} />
        <FlatList
          data={this.state.searched_subjects.length > 0 ? this.state.searched_subjects : this.state.subjects}
          renderItem={({ item }) =>
            <SubjectItem {...this.props} pk={item.pk} name={item.name} major={item.major} level={item.level} />
          }
          keyExtractor={(item) => item.pk.toString()}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  main_container: {
    ...style_objects.main_container
  },
  search_container: {
    // backgroundColor: common_styles.colors.main_back_color
    backgroundColor: '#ecf0f1',
    borderRadius: 50,
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 13,
    opacity: 0.95,
  }
});

export default SubjectsList;