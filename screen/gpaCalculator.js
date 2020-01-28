
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Picker,
  FlatList
} from 'react-native';
import Modal from 'react-native-modalbox'


class gpaCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Allhours: '',
      fullGPA: '',
      semesterHours: '',
      modalVisible: true,
      m1:null,
      m2:null,
      m3:null,
      m4:null,
      m5:null,
      m6:null,
      m7:null,
      h1:3,
      h2:3,
      h3:3,
      h4:3,
      h5:3,
      h6:3,
      h7:3,
    }
    this.calculate = this.calculate.bind(this);
  }


  calculate(){
   
    let oldGPA = this.state.Allhours * this.state.fullGPA;
    let Allhours = parseInt(this.state.Allhours);
    let newGPA = 0;
    let counter = 0;
    if(this.state.m1 != null ){
      newGPA+=this.state.m1*this.state.h1;
      counter+=this.state.h1;
    }
    if(this.state.m2 != null){
      newGPA+=this.state.m2*this.state.h2;
      counter+=this.state.h2;

    }
    if(this.state.m3 != null ){
      newGPA+=this.state.m3*this.state.h3;
      counter+=this.state.h3

    }
    if(this.state.m4 != null ){
      newGPA+=this.state.m4*this.state.h4;
      counter+=this.state.h4

    }
    if(this.state.m5 != null){
      newGPA+=this.state.m5*this.state.h5;
      counter+=this.state.h5

    }
    if(this.state.m6 != null){
      newGPA+=this.state.m6*this.state.h6;
      counter+=this.state.h6

    }
    if(this.state.m7 != null){
      newGPA+=this.state.m7*this.state.h7;
      counter+=this.state.h7

    }
    let semGPA=newGPA/counter;
    let fullGPA=(oldGPA+newGPA)/(counter+Allhours);
    alert(fullGPA)
  }

  render() {
    const markOptions=
    [
      {
        label: 'اختر العلامه',
        value: null
      },
      {
        label: 'أ',
        value: 4
      },
      {
        label: '-أ',
        value: 3.75
      },
      {
        label: '+ب',
        value: 3.5
      },
      {
        label: 'ب',
        value: 3
      },
      {
        label: '-ب',
        value: 2.75
      },
      {
        label: '+ج',
        value: 2.5
      },
      {
        label: 'ج',
        value: 2
      },
      {
        label: '-ج',
        value: 1.75
      },
      {
        label: '+د',
        value: 1.5
      },
      {
        label: 'د',
        value: 1
      },
      {
        label: '-د',
        value: 0.75
      },
      {
        label: 'هـ',
        value: 0
      },
    ]

    const hoursOptions=[3,2,1]

    return (
      <View style={styles.main_container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.container}>
              <TextInput placeholder="المعدل التراكمي" underlineColorAndroid='transparent' keyboardType={'numeric'}
                value={this.state.fullGPA} style={{ width: 300, textAlign: 'right' }} onChangeText={(text) => this.setState({ fullGPA: parseFloat(text) })} />
            </View>
            <View style={styles.container}>
              <TextInput placeholder="الساعات المقطوعه" underlineColorAndroid='transparent' keyboardType={'numeric'}
                value={this.state.Allhours} style={{ width: 300, textAlign: 'right' }} onChangeText={(text) => this.setState({ Allhours: parseInt(text,10) })} />
            </View>
          </View>
      
        <View style={styles.picker_container}>
          <Picker style={styles.markPicker} selectedValue={this.state.m1} onValueChange={(text) => this.setState({ m1: text })} >
          {markOptions.map((item, index) => {
              return (<Picker.Item label={item.label} value={item.value} key={index}/>) 
          })}
          </Picker>
          <Picker style={styles.hoursPicker} selectedValue={this.state.h1} onValueChange={(text) => this.setState({ h1: text })}>
          {hoursOptions.map((item, index) => {
              return (<Picker.Item  style={{textAlign:'right'}} label={item.toString()} value={item} key={index}/>) 
          })}
          </Picker>
        </View>

        <View style={styles.picker_container}>
          <Picker style={styles.markPicker} selectedValue={this.state.m2} onValueChange={(text) => this.setState({ m2: text })} >
          {markOptions.map((item, index) => {
              return (<Picker.Item label={item.label} value={item.value} key={index}/>) 
          })}
          </Picker>
          <Picker style={styles.hoursPicker} selectedValue={this.state.h2} onValueChange={(text) => this.setState({ h2: text })}>
          {hoursOptions.map((item, index) => {
              return (<Picker.Item label={item.toString()} value={item} key={index}/>) 
          })}
          </Picker>
        </View>

        <View style={styles.picker_container}>
          <Picker style={styles.markPicker} selectedValue={this.state.m3} onValueChange={(text) => this.setState({ m3: text })} >
          {markOptions.map((item, index) => {
              return (<Picker.Item label={item.label} value={item.value} key={index}/>) 
          })}
          </Picker>
          <Picker style={styles.hoursPicker} selectedValue={this.state.h3} onValueChange={(text) => this.setState({ h3: text })}>
          {hoursOptions.map((item, index) => {
              return (<Picker.Item label={item.toString()} value={item} key={index}/>) 
          })}
          </Picker>
        </View>

        <View style={styles.picker_container}>
          <Picker style={styles.markPicker} selectedValue={this.state.m4} onValueChange={(text) => this.setState({ m4: text })} >
          {markOptions.map((item, index) => {
              return (<Picker.Item label={item.label} value={item.value} key={index}/>) 
          })}
          </Picker>
          <Picker style={styles.hoursPicker} selectedValue={this.state.h4} onValueChange={(text) => this.setState({ h4: text })}>
          {hoursOptions.map((item, index) => {
              return (<Picker.Item label={item.toString()} value={item} key={index}/>) 
          })}
          </Picker>
        </View>

        <View style={styles.picker_container}>
          <Picker style={styles.markPicker} selectedValue={this.state.m5} onValueChange={(text) => this.setState({ m5: text })} >
          {markOptions.map((item, index) => {
              return (<Picker.Item label={item.label} value={item.value} key={index}/>) 
          })}
          </Picker>
          <Picker style={styles.hoursPicker} selectedValue={this.state.h5} onValueChange={(text) => this.setState({ h5: text })}>
          {hoursOptions.map((item, index) => {
              return (<Picker.Item label={item.toString()} value={item} key={index}/>) 
          })}
          </Picker>
        </View>

        <View style={styles.picker_container}>
          <Picker style={styles.markPicker} selectedValue={this.state.m6} onValueChange={(text) => this.setState({ m6: text })} >
          {markOptions.map((item, index) => {
              return (<Picker.Item label={item.label} value={item.value} key={index}/>) 
          })}
          </Picker>
          <Picker style={styles.hoursPicker} selectedValue={this.state.h6} onValueChange={(text) => this.setState({ h6: text })}>
          {hoursOptions.map((item, index) => {
              return (<Picker.Item label={item.toString()} value={item} key={index}/>) 
          })}
          </Picker>
        </View>


        <View style={styles.picker_container}>
          <Picker style={styles.markPicker} selectedValue={this.state.m7} onValueChange={(text) => this.setState({ m7: text })} >
          {markOptions.map((item, index) => {
              return (<Picker.Item label={item.label} value={item.value} key={index}/>) 
          })}
          </Picker>
          <Picker style={styles.hoursPicker} selectedValue={this.state.h7} onValueChange={(text) => this.setState({ h7: text })}>
          {hoursOptions.map((item, index) => {
              return (<Picker.Item label={item.toString()} value={item} key={index}/>) 
          })}
          </Picker>
        </View>
        <TouchableOpacity onPress={this.calculate}>
          <Text style={styles.buttons}>Calculate</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create(
  {
    main_container:{
      padding:20
    },
    picker_container: {
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.1)'
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
    },
    markPicker:{
      width:'60%'
    },
    hoursPicker:{
      width:'40%',
    }
  }
)


export default gpaCalculator;
