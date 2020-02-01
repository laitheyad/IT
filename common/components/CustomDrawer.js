import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Image,
} from 'react-native';
import common_styles, { style_objects } from '../styles/common_styles';
import { Icon } from 'react-native-elements';
import { DrawerItems } from 'react-navigation-drawer';
import { SafeAreaView } from 'react-navigation';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

export default class CustomDrawer extends React.Component {
    render() {
        const { theme, user } = this.props;
        const ripple = TouchableNativeFeedback.Ripple('#adacac', false);
        return (
            <ScrollView contentContainerStyle={styles.main_container}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never', }} style={{flex:1}}>
                    <View style={{justifyContent:'center',alignItems:'center',backgroundColor:common_styles.colors.main_back_color_d1}}>
                        {/* <Icon reverse iconStyle={{ color: common_styles.colors.main_light_color }} name='user' color={common_styles.colors.main_color} type='antdesign' size={60} /> */}
                    </View>
                    <DrawerItems itemsContainerStyle={styles.itemsContainerStyle} itemStyle={styles.itemStyle} activeBackgroundColor={common_styles.colors.main_color} inactiveLabelStyle={styles.inactiveLabelStyle} activeLabelStyle={styles.activeLabelStyle} labelStyle={styles.labelStyle} {...this.props} />
                </SafeAreaView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        ...style_objects.main_container,
        padding: 0,
        marginTop: 0
    },
    itemsContainerStyle:{
        marginTop:-5
    },
    itemStyle: {
        justifyContent: 'flex-end',
        margin:0
    },
    labelStyle: {
        color: common_styles.colors.main_light_color,
        fontWeight:'normal'
    },
    activeLabelStyle: {
        fontWeight:'bold'
    },
    inactiveLabelStyle: {
        // color: 'rgba(0,0,0,0.35)'
    }
})