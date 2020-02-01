
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
import common_styles, { style_objects } from '../../common/styles/common_styles';
import { Icon } from 'react-native-elements';


export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      level: '',
      major: ''
    }
    this.saveData = this.saveData.bind(this);
    this.DisplayData = this.DisplayData.bind(this);
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
      alert('name : ' + parsed.name + ' \nlevel :' + parsed.level + ' \nmajor :' + parsed.major);

    } catch (error) {

    }
  }
  render() {
    return (
      <View style={styles.main_container}>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Icon reverse iconStyle={{ color: common_styles.colors.main_light_color }} name='user' color={common_styles.colors.main_color} type='antdesign' size={60} />
        </View>
        <View style={styles.field_container}>
          <TextInput placeholder='الأسم' style={styles.input} onChangeText={(text) => this.setState({ name: text })} />
        </View>
        <View style={styles.field_container}>
          <Picker style={styles.input} selectedValue={this.state.level} onValueChange={(text) => this.setState({ level: text })} >
            <Picker.Item label='اختر السنة' value='null' />
            <Picker.Item label='1' value='1' />
            <Picker.Item label='2' value='2' />
            <Picker.Item label='3' value='3' />
            <Picker.Item label='4' value='4' />
          </Picker>
        </View>
        <View style={styles.field_container}>
          <Picker style={styles.input} selectedValue={this.state.major} onValueChange={(text) => this.setState({ major: text })} >
            <Picker.Item label='اختر التخصص' value='null' />
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
    );
  }
};

const styles = StyleSheet.create({
  main_container: {
    ...style_objects.main_container
  },
  field_container: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: common_styles.colors.main_back_color_light,
    marginBottom: 15
  },
  input: {
    direction: 'rtl',
    flex: 1,
    color: common_styles.colors.main_light_color
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
}
)