import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  FlatList,
  Dimensions,
  ScrollView
} from 'react-native';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    try {
      fetch('http://laitheyad1.pythonanywhere.com/subjects/')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ results: responseJson },()=>console.log(this.state.results))
      });
    }
    catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <FlatList
        data={this.state.results}
        renderItem={({item})=>
            <Text>{item.name}</Text>
        }
        keyExtractor={(item,index)=>index.toString()}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
});

export default App;