import React from 'react';
import {StyleSheet,Text,View,TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

export default class TestbankFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){   
  }

  render() {
    return (
        <TouchableOpacity style={styles.notebook_item} onPress={()=>alert('hi')}>
            <View style={{flexDirection:'row-reverse',alignItems:'center',justifyContent:'space-between',flex:1}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{marginRight:10,color:'#414649'}}>تيست بانك كاسيت طيز</Text>
                <Icon color='#5F6368' name='pdffile1' size={17} type='antdesign' />
                </View>
                <View>
                    <Text style={styles.notebook_item_author_name}>الشرقاوي</Text>
                </View>
            </View>
            <View style={{marginRight:10}}>
                <Icon color='rgba(0,0,0,0.8)' name='download' size={17} type='antdesign' />
            </View>
        </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  notebook_item:{
    flexDirection:'row-reverse',
    justifyContent:'space-between',
    alignItems:'center',
    padding:10,
    backgroundColor:'#ecf0f1',
    borderBottomWidth:1,
    borderColor:'#34495e',
  },
  notebook_item_author_name:{
    color:'#fff',
    backgroundColor:'#1e88e5',
    fontSize:12,
    borderRadius:20,
    paddingVertical:4,
    paddingHorizontal:7,
  }
});