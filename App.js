
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Picker,
  Modal,
  FlatList
} from 'react-native';


class App extends React.Component {
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
      h1:null,
      h2:null,
      h3:null,
      h5:null,
      h6:null,
      h7:null,
    }
    this.modalView = this.modalView.bind(this);
  }

  modalView() {
    if (this.state.modalVisible == true)
      this.setState({ modalVisible: false })
    else
      this.setState({ modalVisible: true })
  }

  calculate(){
    let old = this.state.Allhours * this.state.fullGPA;
    let gpa = 0;
  }

  render() {
    const markOptions=
    [
      {
        label: 'اختر العلامه',
        value: 4
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

    const hoursOptions=['عدد الساعات',1,2,3]
    
    return (
      <View style={styles.main_container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
          <View style={{ justifyContent: 'center', margin: '5%', alignItems: 'center' }}>
            <View style={styles.container}>
              <TextInput placeholder="المعدل التراكمي" underlineColorAndroid='transparent' keyboardType={'numeric'}
                value={this.state.fullGPA} style={{ width: 300, textAlignVertical: 'center' }} onChangeText={(text) => this.setState({ fullGPA: text })} />
            </View>
            <View style={styles.container}>
              <TextInput placeholder="الساعات المقطوعه" underlineColorAndroid='transparent' keyboardType={'numeric'}
                value={this.state.semesterHours} style={{ width: 300, textAlignVertical: 'center' }} onChangeText={(text) => this.setState({ Allhours: text })} />
            </View>
            <View style={styles.container}>
              <TextInput placeholder="الساعات الفصليه" underlineColorAndroid='transparent' keyboardType={'numeric'}
                value={this.state.semesterHours} style={{ width: 300, textAlignVertical: 'center' }} onChangeText={(text) => this.setState({ semesterHours: text })} />
            </View>
            <TouchableOpacity onPress={this.modalView} >
              <Text style={styles.buttons}>Next</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity onPress={this.modalView}>
          <Text style={styles.buttons}>Edit</Text>
        </TouchableOpacity>

        <View style={styles.picker_container}>
          <Picker style={styles.markPicker} selectedValue={this.state.m1} onValueChange={(text) => this.setState({ m1: text })} >
          {markOptions.map((item, index) => {
              return (<Picker.Item label={item.label} value={item.value} key={index}/>) 
          })}
          </Picker>
          <Picker style={styles.hoursPicker} selectedValue={this.state.h1} onValueChange={(text) => this.setState({ h1: text })}>
          {hoursOptions.map((item, index) => {
              return (<Picker.Item label={item.toString()} value={item} key={index}/>) 
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
        <TouchableOpacity >
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
      width:'40%'
    }
  }
)


export default App;
