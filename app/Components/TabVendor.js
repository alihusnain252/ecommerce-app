import * as React from 'react';
import {Image,Text,Animated, StyleSheet, TouchableOpacity,TouchableNativeFeedback, TouchableWithoutFeedback, View} from 'react-native';
import AppText from './AppText';
import Colors from '../Styles/Colors';
import {useState} from 'react';
import {useEffect} from 'react';
import {console_log, console_log_message} from '../Classes/auth';


const TabVendor = (props) => {
    return (
        <View style={[props.focused ? styles.acctiveTab : styles.deActiveTab, {flex: 1}]}>
            <TouchableNativeFeedback
                onPress={props.onPress}>
                <View>

                    {(props.id == 0) &&
                    <View style={[styles.tabcontainer]}>
                        <View style={styles.tabIconContainer}>
                            <Image
                                source={props.focused ? require('../Asset/products_active.png') : require('../Asset/products_non_active.png')}
                                style={styles.tabiconstyle}/>
                        </View>
                        {props.focused && <AppText style={  styles.activeTabTextStyle }>
                            Products</AppText>}
                        {!props.focused && <AppText style={styles.tabTextStyle}>
                            Products</AppText>}
                    </View>}

                    {(props.id == 1) &&
                    <View style={[styles.tabcontainer]}>
                        <View style={styles.tabIconContainer}>

                            <Image
                                source={props.focused ? require('../Asset/offers_active.png') : require('../Asset/offers_non_active.png')}
                                style={styles.tabiconstyle}/>
                        </View>
                        {props.focused && <AppText style={  styles.activeTabTextStyle }>
                            Requests</AppText>}
                        {!props.focused && <AppText style={styles.tabTextStyle}>
                            Requests</AppText>}
                    </View>}

                    {(props.id == 2) &&
                    <View style={[styles.tabcontainer]}>
                        <View style={styles.tabIconContainer}>

                            <Image
                                source={props.focused ? require('../Asset/wishlist_active.png') : require('../Asset/wishlist_non_active.png')}
                                style={styles.tabiconstyle}/>
                        </View>
                        {props.focused && <AppText style={  styles.activeTabTextStyle }>
                            Insights</AppText>}
                        {!props.focused && <AppText style={styles.tabTextStyle}>
                            Insights</AppText>}
                    </View>}

                    {(props.id == 3) &&
                    <View style={[styles.tabcontainer]}>
                        <View style={styles.tabIconContainer}>
                            <Image
                                source={props.focused ? require('../Asset/menu_active.png') : require('../Asset/menu_non_active.png')}
                                style={styles.tabiconstyle}/>
                        </View>
                        {props.focused && <AppText style={  styles.activeTabTextStyle }>
                            Menu</AppText>}
                        {!props.focused && <AppText style={styles.tabTextStyle}>
                            Menu</AppText>}
                    </View>}


                </View>
            </TouchableNativeFeedback>
        </View>

    );
};
export default TabVendor;

const styles = StyleSheet.create({
    tabiconstyle: {
        width: 28,
        height: 28,
        padding: 2,
        // flex: 1,flexGrow:1,
        resizeMode: 'contain',
    },
    tabIconContainer: {
        justifyContent:'center',
        alignItems:'center',
        height: '70%',
    },
    tabTextStyle: {
        width: '100%',
        height: '30%',
        textAlign: 'center',
        fontSize: 13,
        color: Colors.bottom_menu_text_color,

    },
    activeTabTextStyle: {
        width: '100%',
        height: '30%',
        textAlign: 'center',
        fontSize: 14,
        color: Colors.primary_color,


    },
    newMessageIcon: {
        width: 6,
        height: 6,
        // padding: 1,
        borderRadius: 3,
        position: 'absolute',
        resizeMode: 'contain',
        backgroundColor: 'red',
        top: 0,
        right: 0,
        // left: 0,
        // bottom: 0,
    },
    tabcontainer: {
        justifyContent: 'center', alignItems: 'center', flexGrow: 1, padding: 2,

    },
    acctiveTab: {backgroundColor: Colors.home_widget_background_color},
    deActiveTab: {backgroundColor: Colors.home_widget_background_color},

});


