import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import common_styles from '../../../common/styles/common_styles';

export default class MySubjectItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { pk, name, major, level } = this.props;
    return (
      <TouchableNativeFeedback onPress={() => {this.props.navigation.navigate('subject_detail', {
        subject_id: pk
      });
      this.props.hide();
      }}>
        <View style={styles.item_container}>
          <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginRight: 10, color: common_styles.colors.main_light_color, }}>{name}</Text>
              <Icon color='#21303f' name='book' size={18} type='antdesign' />
            </View>
            <TouchableOpacity onPress={() => alert('hi')}>
              <Text style={styles.subject_major}>{major.name}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginRight: 5 }}>
            <Icon color='#21303f' name='left' size={17} type='antdesign' />
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
};

const styles = StyleSheet.create({
  item_container: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 12,
    backgroundColor: common_styles.colors.main_back_color_light,
    borderRadius: 6,
  },
  subject_major: {
    color: '#fff',
    backgroundColor: common_styles.colors.main_color,
    fontSize: 12,
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 7,

  }
});