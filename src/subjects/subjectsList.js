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

class SubjectsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      loading: true,
      search_string: '',
      search_results: []
    };
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    try {
      fetch('http://laitheyad1.pythonanywhere.com/subjects/')
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

  async search(text) {
    try {
      await fetch('http://laitheyad1.pythonanywhere.com/subjects/?search=' + text)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ search_results: responseJson }, () => console.log('search_results', this.state.search_results))
        });
    }
    catch (error) {
      console.error(error);
    }
  }

  render() {
    const { loading, search_string } = this.state;
    return (
      <View style={styles.main_container}>
        <View style={{ backgroundColor: '#fff' }}>
          <TextInput value={search_string} onChangeText={(text) => this.search(text)} />
        </View>
        <ActivityIndicator style={{ display: loading ? 'flex' : 'none' }} animating={this.state.loading} size={24} color={common_styles.colors.main_color} />
        <TouchableOpacity onPress={() => this.setState({ loading: !this.state.loading })}><Text>testing</Text></TouchableOpacity>
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
  }
});

export default SubjectsList;