import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  FlatList,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import common_styles, { style_objects } from './common/styles/common_styles';
import TestbankFile from './src/subjects/components/testbank'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: true
    };
  }

  async componentDidMount() {
    try {
      await fetch('http://laitheyad1.pythonanywhere.com/subjects/')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ results: responseJson }, () => console.log(this.state.results))
        });
    }
    catch (error) {
      console.log(error);
    }
    this.setState({loading:false});
  }

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.main_container}>
        <ActivityIndicator style={{ display: loading ? 'flex' : 'none' }} animating={this.state.loading} size={24} color={common_styles.colors.main_color} />
        <TouchableOpacity onPress={() => this.setState({ loading: !this.state.loading })}><Text>testing</Text></TouchableOpacity>
        <FlatList
          data={this.state.results}
          renderItem={({ item }) =>
            <TestbankFile />
          }
          keyExtractor={(item, index) => index.toString()}
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

export default App;