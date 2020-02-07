import React from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Share } from 'react-native';
import common_styles, { style_objects } from '../../common/styles/common_styles';
import SubjectItem from '../subjects/components/subject_component';
import { Icon } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from '../../common/components/swipable';
import AsyncStorage from '@react-native-community/async-storage';
import SectionButton from './components/sectionButton';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            loading: false,
            search_string: '',
            userInfo: null,
        };
    }

    async componentDidMount() {
        await this.get_user_data();
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'الصفحة الرئيسية',
            headerRight: () => (
                <TouchableNativeFeedback containerStyle={{ marginRight: 20 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Icon name='menu' containerStyle={{}} size={22} type='MaterialCommunityIcons' color={common_styles.colors.main_light_color} />
                </TouchableNativeFeedback>
            ),
        };
    };

    async get_user_data() {
        this.setState({ loading: true });
        let userInfo = await AsyncStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        this.setState({ userInfo: userInfo, loading: false })

    }

    render() {
        const sections = [
            {
                label: 'المواد الدراسية',
                icon: 'book',
            },
            {
                label: 'المواد الدراسية',
                icon: 'book',
            },
            {
                label: 'المواد الدراسية',
                icon: 'book',
            },
            {
                label: 'المواد الدراسية',
                icon: 'book',
            },
            {
                label: 'المواد الدراسية',
                icon: 'book',
            },
            {
                label: 'المواد الدراسية',
                icon: 'book',
            },
            {
                label: 'المواد الدراسية',
                icon: 'book',
            },
            {
                label: 'المواد الدراسية',
                icon: 'book',
            },
        ]
        const { loading } = this.state;
        if (loading != true)
            return (
                <View style={{ flex: 1 }}>
                    <View style={style_objects.headerBar}>
                        <View style={{}}>
                            <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                                <Icon name='menu' size={22} type='MaterialCommunityIcons' color={common_styles.colors.main_light_color} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: common_styles.colors.main_back_color_d1 }}>
                        <FlatList
                            horizontal
                            contentContainerStyle={{direction:'ltr'}}
                            data={sections}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <SectionButton label={item.label} icon={item.icon} />
                            )}
                        />
                        <View style={{backgroundColor:common_styles.colors.main_back_color_d2}}>
                            <SectionButton label='المواد الدراسية' icon='book' />
                        </View>
                    </View>
                    <View style={styles.main_container}>

                    </View>
                </View>
            );
        else {
            return (
                <View style={{ flex: 1 }}>
                    <View style={style_objects.headerBar}>
                        <View style={{}}>
                            <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                                <Icon name='menu' size={22} type='MaterialCommunityIcons' color={common_styles.colors.main_light_color} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.main_container,]}>
                        <ActivityIndicator
                            size='large'
                        />
                    </View>
                </View>
            );
        }
    }
};

const styles = StyleSheet.create({
    main_container: {
        ...style_objects.main_container,
    },

});