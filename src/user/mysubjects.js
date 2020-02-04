import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import common_styles, { style_objects } from '../../common/styles/common_styles';
import Button from '../../common/components/button';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';
import SubjectItem from '../subjects/components/subject_component';
import Modal from 'react-native-modalbox'

export default class MySubjectsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
        }
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    componentDidMount() {
    }

    show(subjects) {
        this.setState({ subjects: subjects }, () => {
            this.refs.mysubjects.open();
            console.log('check hereeee',this.state.subjects)
        })
    }

    hide() {
        this.refs.mysubjects.close();
    }

    render() {
        return (
            <Modal
                ref='mysubjects'
                backdrop={true}
                coverScreen={true}
                style={{ ...style_objects.main_container }}
            >
                <View>
                    <Text>جدول موادك الدراسية</Text>
                </View>
                <TouchableOpacity style={{ position: 'absolute', top: 20, right: 20, zIndex: 50 }} onPress={this.hide}>
                    <Icon name='close' containerStyle={{}} size={22} type='AntDesign' color={common_styles.colors.main_light_color} />
                </TouchableOpacity>
                {
                    Object.values(this.state.subjects).length > 0 &&
                    <FlatList
                        style={{ marginBottom: 10 }}
                        data={Object.values(this.state.subjects)}
                        renderItem={({ item }) =>
                            <View style={{ marginBottom: 5 }}>
                                <SubjectItem {...this.props} pk={item.pk} name={item.name} major={item.major} level={item.level} />
                            </View>
                        }
                        keyExtractor={(item,index)=>index.toString()}
                    />
                }
            </Modal>

        );
    }
};

const styles = StyleSheet.create({
    main_container: {
        ...style_objects.main_container,
    },
})