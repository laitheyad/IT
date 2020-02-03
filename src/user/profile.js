import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  TouchableNativeFeedback,
  FlatList,
  TouchableOpacity
} from 'react-native';
import common_styles, { style_objects } from '../../common/styles/common_styles';
import Button from '../../common/components/button';
import AsyncStorage from '@react-native-community/async-storage';
import { DrawerActions } from 'react-navigation-drawer'
import { Icon } from 'react-native-elements';
import SubjectItem from '../subjects/components/subject_component';
import MySubjectsModal from './mysubjects';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      level: '',
      major: '',
      subjects: {},
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
      major: this.state.major,
      subjects: this.state.subjects
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
          level: userInfoObject.level,
          subjects: userInfoObject.subjects
        })
        console.log('user object:', userInfo)
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
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
            <Icon reverse iconStyle={{ color: common_styles.colors.main_light_color }} name='user' color={common_styles.colors.main_color} type='antdesign' size={50} />
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
          <TouchableOpacity disabled={Object.values(this.state.subjects).length>0?false:true} style={styles.subjects_header} onPress={()=>this.refs.mysubjects.show(this.state.subjects)}>
            <View>
              <View style={{position:'absolute',zIndex:2,top:-15,left:-15,padding:4,paddingHorizontal:6,borderRadius:20,backgroundColor:'#27ae60',justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:common_styles.colors.main_light_color,fontSize:11}}>{Object.keys(this.state.subjects).length}</Text>
              </View>
              <Text style={{ color: common_styles.colors.main_light_color }}>جدولك الدراسي</Text>
            </View>
          </TouchableOpacity>
          
          {/* <FlatList
            style={{ marginBottom: 10 }}
            data={Object.values(this.state.subjects)}
            renderItem={({ item }) =>
              <View style={{ marginBottom: 5 }}>
                <SubjectItem {...this.props} pk={item.pk} name={item.name} major={item.major} level={item.level} />
              </View>
            }
            // keyExtractor={(item) => item.pk.toString()}
          // ListEmptyComponent={<No_result_found />}
          /> */}
        </View>
        <Button label='حفظ' icon='save' onPress={this.saveUserInfo} />
        <MySubjectsModal  ref='mysubjects' />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  main_container: {
    ...style_objects.main_container,
  },
  field_container: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: common_styles.colors.main_back_color_light,
    marginBottom: 10,
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
    marginBottom: 10,
    direction: 'rtl',
  },
  input: {
    flex: 1,
    textAlign: 'right',
    color: common_styles.colors.main_light_color,
  },
  subjects_header: {
    width: '100%',
    backgroundColor: common_styles.colors.main_color,
    paddingVertical: 10,
    textAlign: 'center',
    color: common_styles.colors.main_light_color,
    marginBottom: -1,
    zIndex: 2,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
  },
})