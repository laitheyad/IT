import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, TouchableOpacity, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import common_styles from '../../../common/styles/common_styles';

const TestbankFile = (props) => {
  const { object } = props;
  return (
    <TouchableNativeFeedback onPress={() => Linking.openURL(object.link)}>
      <View style={styles.item_container}>
        <View style={styles.info_container}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10, color: '#414649' }}>{object.name}</Text>
            <Icon color='#5F6368' name='pdffile1' size={17} type='antdesign' />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.notebook_item_author_name}>{object.reference}</Text>
            <Text style={styles.notebook_item_author_name}>{object.type}</Text>
          </View>
        </View>
        <View style={{ marginRight: 10 }}>
          <Icon color={common_styles.colors.main_back_color} name='download' size={17} type='antdesign' />
        </View>
      </View>
    </TouchableNativeFeedback>
  )
}

const NotebookFile = (props) => {
  const { object } = props;
  return (
    <TouchableNativeFeedback onPress={() => Linking.openURL(object.link)}>
      <View style={styles.item_container}>
        <View style={styles.info_container}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10, color: '#414649' }}>{object.name}</Text>
            <Icon color='#5F6368' name='pdffile1' size={17} type='antdesign' />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.notebook_item_author_name}>{object.author}</Text>
          </View>
        </View>
        <View style={{ marginRight: 10 }}>
          <Icon color={common_styles.colors.main_back_color} name='download' size={17} type='antdesign' />
        </View>
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  item_container: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: common_styles.colors.main_light_color,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  notebook_item_author_name: {
    color: '#fff',
    backgroundColor: common_styles.colors.main_color,
    fontSize: 12,
    borderRadius: 20,
    paddingVertical: 4.5,
    paddingHorizontal: 8,
    marginRight: 5
  },
  info_container: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  }
});

export default NotebookFile
export { TestbankFile }