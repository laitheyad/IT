import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput
} from 'react-native';
import common_styles, { style_objects } from '../../common/styles/common_styles';
import SubjectItem from './components/subject_component';
import { Icon } from 'react-native-elements';

class SubjectsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      loading: false,
      search_string: '',
    };
    this.search = this.search.bind(this);
    this._get_all_subjects = this._get_all_subjects.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'المواد الدراسية',
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

  render() {
    const { loading, search_string } = this.state;
    return (
      <View style={styles.main_container}>
        <View style={styles.search_container}>
          <Icon name='search' type='FontAwesome' color={this.state.search_string.length > 0 ? common_styles.colors.main_color : 'rgba(0,0,0,0.15)'} />
          <TextInput placeholder='ابحث عن المادة . . .' style={{ padding: 0, flex: 1, textAlign: 'right' }} value={search_string} onChangeText={(text) => this.search(text)} />
        </View>
        <ActivityIndicator style={{ display: loading ? 'flex' : 'none' }} animating={this.state.loading} size={24} color={common_styles.colors.main_color} />
        <FlatList
          data={this.state.subjects}
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