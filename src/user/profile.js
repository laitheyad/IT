import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native';
import common_styles, { style_objects } from '../../common/styles/common_styles';
import Button from '../../common/components/button';
import AsyncStorage from '@react-native-community/async-storage';
import { DrawerActions } from 'react-navigation-drawer'
import { Icon } from 'react-native-elements';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      level: '',
      major: ''
    }
    this.saveUserInfo = this.saveUserInfo.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  async saveUserInfo() {
    console.log('in saveUserInfo')
    let userObject = {
      name: this.state.name,
      level: this.state.level,
      major: this.state.major
    }
    await AsyncStorage.setItem('userInfo', JSON.stringify(userObject))
    this.props.navigation.navigate('subjectsList');
  };

  async getUserInfo() {
    console.log('in getUserInfo')
    try {
      let userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo != null) {
        let userInfoObject = JSON.parse(userInfo);
        this.setState({
          name: userInfoObject.name,
          major: userInfoObject.major,
          level: userInfoObject.level
        })
      }
      else {
        console.log('not a user')
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TouchableOpacity style={{ position: 'absolute', top: 20, right: 20 }} onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
          <Icon name='menu' containerStyle={{}} size={22} type='MaterialCommunityIcons' color={common_styles.colors.main_light_color} />
        </TouchableOpacity>
        <View>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <Icon reverse iconStyle={{ color: common_styles.colors.main_light_color }} name='user' color={common_styles.colors.main_color} type='antdesign' size={60} />
          </View>
          <View style={styles.field_container}>
            <TextInput value={this.state.name} placeholder='الأسم' style={styles.input} onChangeText={(text) => this.setState({ name: text })} />
            <Icon color={common_styles.colors.main_light_color} containerStyle={styles.field_icon_container} name='idcard' type='antdesign' />
          </View>
          <View style={styles.picker_container}>
            <Picker mode='dropdown' itemStyle={{ color: 'red' }} prompt='السنة الدراسية' style={styles.input} selectedValue={this.state.level} onValueChange={(text) => this.setState({ level: text })} >
              <Picker.Item label='السنة الدراسية ..' value={null} />
              <Picker.Item label='أولى' value={1} />
              <Picker.Item label='ثانية' value={2} />
              <Picker.Item label='ثالثه' value={3} />
              <Picker.Item label='رابعه' value={4} />
            </Picker>
            <Icon color={common_styles.colors.main_light_color} containerStyle={styles.field_icon_container} name='rocket1' type='antdesign' />
          </View>
          <View style={styles.picker_container}>
            <Picker mode='dropdown' style={styles.input} selectedValue={this.state.major} onValueChange={(text) => this.setState({ major: text })} >
              <Picker.Item label='التخصص ..' value={null} />
              <Picker.Item label='علم حاسوب' value='CS' />
              <Picker.Item label='أنظمة معلومات حاسوبية' value='CIS' />
              <Picker.Item label='تكنولوجيا معلومات الأعمال' value='BIT' />
            </Picker>
            <Icon color={common_styles.colors.main_light_color} containerStyle={styles.field_icon_container} name='book' type='antdesign' />
          </View>
        </View>
        <Button label='حفظ' icon='save' onPress={this.saveUserInfo} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  main_container: {
    ...style_objects.main_container,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  field_container: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: common_styles.colors.main_back_color_light,
    marginBottom: 15,
    paddingHorizontal: 13,
    direction: 'rtl',
  },
  field_icon_container: {
    position: 'absolute',
    height: '100%', backgroundColor: common_styles.colors.main_color,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10
  },
  picker_container: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: common_styles.colors.main_back_color_light,
    marginBottom: 15,
    direction: 'rtl',
  },
  input: {
    flex: 1,
    textAlign: 'right',
    color: common_styles.colors.main_light_color,
  },
  buttons: {
  },
})