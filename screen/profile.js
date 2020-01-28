
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Picker,
  AsyncStorage,
} from 'react-native';


class profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      level: '',
      major: ''
    }
    this.saveData = this.saveData.bind(this);
    this.DisplayData=this.DisplayData.bind(this);
  }
  saveData() {
    console.log('in save')
    let obj = {
      name: this.state.name,
      level: this.state.level,
      major: this.state.major
    }
    AsyncStorage.setItem('userInfo', JSON.stringify(obj))
  };
  DisplayData = async () => {
    console.log('in display')

    try {
      let user = await AsyncStorage.getItem('userInfo');
      let parsed = JSON.parse(user);
      alert('name : '+parsed.name+' \nlevel :'+parsed.level+' \nmajor :'+parsed.major);

    } catch (error) {

    }
  }
  render() {
    return (
      <View >
        <TouchableOpacity >
          <Text style={styles.Home} onPress={() => this.props.navigation.pop()} >{this.state.textx}</Text>
        </TouchableOpacity>
        <View style={{ justifyContent: 'center', margin: '10%', alignItems: 'center' }}>
          <Image style={styles.Image} source={require('../icons/account.png')} />
          <View style={styles.container}>
            <Image style={{ width: 35, height: 35, margin: 5 }} value={this.state.name} source={require('./icons/name.png')} />
            <TextInput placeholder='Name . . .' style={{ width: 300, textAlignVertical: 'center', }} onChangeText={(text) => this.setState({ name: text })} />

          </View>
          <View style={styles.container}>
            <Image style={{ width: 25, height: 25, margin: 10 }} source={require('../icons/calendar.png')} />
            <Picker style={{ width: 300, textAlignVertical: 'center' }} selectedValue={this.state.level} onValueChange={(text)=>this.setState({level:text})} >
              <Picker.Item label='year Level ...' value='null' />
              <Picker.Item label='1' value='1' />
              <Picker.Item label='2' value='2' />
              <Picker.Item label='3' value='3' />
              <Picker.Item label='4' value='4' />
            </Picker>
          </View>
          <View style={styles.container}>
            <Image style={{ width: 25, height: 25, margin: 10 }} source={require('../icons/major.png')} />
            <Picker style={{ width: 300, textAlignVertical: 'center' }} selectedValue={this.state.major} onValueChange={(text)=>this.setState({major:text})} >
              <Picker.Item label='Select Major ...' value='null' />
              <Picker.Item label='Computer Science' value='CS' />
              <Picker.Item label='Computer Information System' value='CIS' />
              <Picker.Item label='Busniss Information System' value='BIT' />

            </Picker>
          </View>
          <TouchableOpacity onPress={this.saveData}>
            <Text style={styles.buttons}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.DisplayData}>
            <Text style={styles.buttons}>Show Saved Data</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
};

const styles = StyleSheet.create(
  {
    container: {
      marginTop: '5%',
      width: 350,
      flexDirection: 'row',
      borderColor: '#7b8b8c',
      borderWidth: 1,
      borderRadius: 25,

    },
    Image: {
      marginTop: '10%',
      width: 150,
      height: 150
    },
    buttons: {
      marginTop: 25,
      borderWidth: 2,
      borderColor: '#7b8b7d',
      textAlign: 'center',
      height: 50,
      textAlignVertical: 'center',
      borderRadius: 15,
      fontSize: 15,
      width: 350,
      color: '#3b3d3d'
    },
    Home: {
      backgroundColor: 'white',
      width: 50,
      textAlign: 'center',
      height: 50,
      textAlignVertical: 'center',
      borderRadius: 25,
      marginTop: 10,
      marginLeft: '2%',
      opacity: 0.5,
      fontSize: 20
    }
  }
)


export default profile;
