
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
      marks: [],
     
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
        label: 'Az',
        value: 4
      },
      {
        label: 'A-',
        value: 3.75
      },
      {
        label: 'B+',
        value: 3.5
      },
      {
        label: 'B',
        value: 3
      },
      {
        label: 'B-',
        value: 2.75
      },
      {
        label: 'C+',
        value: 2.5
      },
      {
        label: 'C',
        value: 2
      },
      {
        label: 'C-',
        value: 1.75
      },
      {
        label: 'D+',
        value: 1.5
      },
      {
        label: 'D',
        value: 1
      },
      {
        label: 'D-',
        value: 0.75
      },
      {
        label: 'F',
        value: 0
      },
    ]
    const subHours=[1,2,3]
    
    return (
      <View>
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

        <FlatList
        data={[1,1,1]}
        renderItem={({item})=>
        <View style={styles.container}>
          <Image style={{ width: 25, height: 25, margin: 10 }} source={require('./icons/brain.png')} />
          <Picker style={{ width: 300, textAlignVertical: 'center' }} selectedValue={this.state.m1} onValueChange={(text) => this.setState({ m1: text })} >
          {markOptions.map((item, index) => {
              return (<Picker.Item label={item.label} value={item.value} key={index}/>) 
          })}
          </Picker> 
           

        </View>
      }
        />
        <TouchableOpacity >
          <Text style={styles.buttons}>Calculate</Text>
        </TouchableOpacity>
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


export default App;
