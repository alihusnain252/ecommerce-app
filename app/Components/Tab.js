import * as React from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Colors from '../Styles/Colors';
import AppText from './AppText';


const Tab = (props) => {
    return (
        <View style={{flex: 1,}}>
            <TouchableWithoutFeedback
                onPress={props.onPress}>
                <View>
                    {(props.id == 0) &&
                    <View style={[styles.tabContainer, props.focused ?styles.focusedBackground:styles.notFocusedBackground]}>
                        <View style={styles.tabIconContainer}>
                            <Image
                                source={require('../Asset/home.png')}
                                tintColor={props.focused ? Colors.primary_color : Colors.non_active_icon_color}
                                style={[styles.tabIconStyle,
                                    props.focused ? {tintColor: Colors.primary_color} : {tintColor: Colors.non_active_icon_color}]}/>
                            {props.focused &&
                            <AppText style={styles.focusedStyle}>
                                Home
                            </AppText>}
                            {!props.focused &&
                            <AppText style={styles.notFocusedStyle}>
                                Home
                            </AppText>}
                        </View>
                    </View>}

                    {(props.id == 1) &&
                    <View style={[styles.tabContainer, props.focused ?styles.focusedBackground:styles.notFocusedBackground]}>
                        <View style={styles.tabIconContainer}>

                            <Image
                                source={require('../Asset/cart.png')}
                                tintColor={props.focused ? Colors.primary_color : Colors.non_active_icon_color}
                                style={[styles.tabIconStyle, props.focused ? {tintColor: Colors.primary_color} : {tintColor: Colors.non_active_icon_color}]}/>
                            {props.focused &&
                            <AppText style={styles.focusedStyle}>
                                Cart
                            </AppText>}
                            {!props.focused &&
                            <AppText style={styles.notFocusedStyle}>
                                Cart
                            </AppText>}
                        </View>
                    </View>}

                    {(props.id == 2) &&
                    <View style={[styles.tabContainer, props.focused ?styles.focusedBackground:styles.notFocusedBackground]}>
                        <View style={styles.tabIconContainer}>
                            <Image
                                source={require('../Asset/user_icon.png')}
                                tintColor={props.focused ? Colors.primary_color : Colors.non_active_icon_color}
                                style={[styles.tabIconStyle, props.focused ? {tintColor: Colors.primary_color} : {tintColor: Colors.non_active_icon_color}]}/>
                            {props.focused &&
                            <AppText style={styles.focusedStyle}>
                                Profile
                            </AppText>}
                            {!props.focused &&
                            <AppText style={styles.notFocusedStyle}>
                                Profile
                            </AppText>}
                        </View>

                    </View>}
                </View>
            </TouchableWithoutFeedback>
        </View>

    );
};
export default Tab;

const styles = StyleSheet.create({
    tabIconStyle: {
        width: 28,
        height: 28,
        padding: 2,
        // flex: 1,flexGrow:1,
        resizeMode: 'contain',
    },
    tabIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },

    tabContainer: {
        justifyContent: 'center', alignItems: 'center', flexGrow: 1,

    },
    focusedStyle: {color: Colors.primary_color, marginTop: 5},
    notFocusedStyle: {color: Colors.normal_text_color, marginTop: 5},

    focusedBackground: {backgroundColor: '#2f2e2a'},
    notFocusedBackground: {},

});


