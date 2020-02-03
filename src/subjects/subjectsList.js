import React from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TextInput, } from 'react-native';
import common_styles, { style_objects } from '../../common/styles/common_styles';
import SubjectItem from './components/subject_component';
import { Icon } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from 'react-native-swipeable';
import AsyncStorage from '@react-native-community/async-storage';


const rightContent =
  <TouchableOpacity onPress={() => console.log('s')} style={{ alignItems: 'center', justifyContent: 'center', width: 75, height: '100%' }}>
    <Icon name='plus' type='antdesign' size={18} color={common_styles.colors.main_light_color} />
    <Text style={{ color: common_styles.colors.main_light_color }}>اضافة</Text>
  </TouchableOpacity>

class SubjectsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      searched_subjects: [],
      loading: false,
      search_string: '',
      userInfo: null
    };
    this._get_all_subjects = this._get_all_subjects.bind(this);
  }

  async componentDidMount() {
    await this._get_all_subjects();
    await this.get_user_data();
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

  async get_user_data() {
    let userInfo = await AsyncStorage.getItem('userInfo');
    userInfo = JSON.parse(userInfo);
    this.setState({ userInfo: userInfo })
  }

  async _get_all_subjects() {
    this.setState({ loading: true });
    try {
      await fetch('http://laitheyad1.pythonanywhere.com/subjects/')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ subjects: responseJson, searched_subjects: responseJson })
        });
    }
    catch (error) {
      console.log(error);
    }
    this.setState({ loading: false });
  }

  // async search(text) {
  //   this.setState({ search_string: text, loading: true }, async () => {
  //     try {
  //       await fetch('http://laitheyad1.pythonanywhere.com/subjects/?search=' + text)
  //         .then((response) => response.json())
  //         .then((responseJson) => {
  //           this.setState({ subjects: responseJson }, () => console.log('search_results', this.state.subjects))
  //         });
  //     }
  //     catch (error) {
  //       console.error(error);
  //     }
  //     this.setState({ loading: false })
  //   })
  // }

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

  async add_subject(subject) {
    if (this.state.userInfo != null) {
      let userObject = this.state.userInfo;
      if (userObject.subjects != undefined) {
        userObject.subjects[subject.pk.toString()] = subject;
      }
      else {
        userObject.subjects = {};
        userObject.subjects[subject.pk.toString()] = subject;
      }
      try {
        await AsyncStorage.setItem('userInfo', JSON.stringify(userObject));
        console.log('subject added');
      }
      catch (error) {
        console.log(error);
      }
    }
    else {
      this.props.navigation.navigate('User');
    }
  }

  // async remove_subject(subject) {
  // }

  render() {
    const { loading, search_string } = this.state;
    const No_result_found = () => (
      <View>
        {
          !this.state.loading &&
          <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <Icon name='frowno' color={common_styles.colors.main_back_color_d1} size={45} type='antdesign' />
            <Text style={{ fontSize: 20, textAlign: 'center', color: common_styles.colors.main_back_color_d1, fontWeight: 'bold', marginTop: 4 }}>{'لا يوجد اي مواد\n مطابقة لذلك الأسم.'}</Text>
          </View>
        }
      </View>
    )
    return (
      <View style={styles.main_container}>
        <View style={styles.search_container}>
          {
            this.state.search_string.length > 0 ?
              <Icon name='cancel' onPress={() => this.local_search('')} type='MaterialIcons' color={common_styles.colors.main_color} />
              :
              <Icon name='search' type='FontAwesome' color='rgba(0,0,0,0.15)' />

          }
          <TextInput placeholder='ابحث عن اسم المادة . .' style={{ padding: 0, flex: 1, textAlign: 'right' }} value={search_string} onChangeText={(text) => this.local_search(text)} />
        </View>
        <ActivityIndicator style={{ display: loading ? 'flex' : 'none' }} animating={this.state.loading} size={24} color={common_styles.colors.main_color} />
        <FlatList
          data={this.state.searched_subjects}
          renderItem={({ item }) =>
            <Swipeable style={{ flex: 1, height: '100%', marginTop: 7 }} rightContent={rightContent} onRightActionRelease={() => this.add_subject(item)} rightContentContainerStyle={{ flex: 1 }}>
              <SubjectItem {...this.props} pk={item.pk} name={item.name} major={item.major} level={item.level} />
            </Swipeable>
          }
          keyExtractor={(item) => item.pk.toString()}
          ListEmptyComponent={<No_result_found />}
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