import React, {useState, useEffect} from 'react';
import {View, StatusBar,TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import AppText from '../Components/AppText';
import MyBackgroundImage from '../Components/MyBackgroundImage';
import Colors from '../Styles/Colors';
import {MyImage, MyImageBackground} from '../Components/MyImageButton';
import dimen, {deviceHeight} from '../Styles/Dimen';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-gesture-handler';
import {GeneralStyles} from '../Styles/GeneralStyles';
import MyTextButton from '../Components/MyTextButton';
import {AuthContext} from '../../App';
import {
    console_log,
    errorAlert,
    getDataWithoutToken,
    getDataWithToken,
    getObject,
    isNetConnected, parseError,
    saveObject, successAlert,
} from '../Classes/auth';
import {Keys} from '../Classes/Keys';
import {MyUrls} from '../Classes/MyUrls';
import TopBar from '../Components/TopBar';
import {Loader} from '../Components/Loader';


export const PaymentMethod = ({navigation}) => {

    return (
        <MyBackgroundImage isBottom={false}>
            <TopBar title={'Payment Method'} backButton={() => navigation.pop()}/>
            <View style={styles.totalAmountContainer}>
                <AppText style={styles.headingText}>Account Name</AppText>
                <AppText style={styles.valueText}>
                    Smart Foods products Limited
                </AppText>
            </View>

            <View style={styles.totalAmountContainer}>
                <AppText style={styles.headingText}>Payment Details</AppText>
                <AppText style={styles.valueText}>
                    Sort-code: 20-57-76
                </AppText>
            </View>

            <View style={styles.totalAmountContainer}>
                <AppText style={styles.headingText}>Account Number</AppText>
                <AppText style={styles.valueText}>80399345</AppText>
            </View>

        </MyBackgroundImage>
    );

};

const styles = StyleSheet.create({
    secureTextStyle: {
        position: 'absolute',
        bottom: 0,
        color: Colors.button_text_color,
        fontSize: 30,
        margin: dimen.app_padding,
    },
    forgotPasswordStyle: {
        fontSize: 15,
        margin: dimen.app_padding,
        color: Colors.primary_color,
    },
    editContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderWidth: 1,
        alignSelf: 'flex-end',
        borderColor: Colors.primary_color,
        alignItems: 'center',
        margin: dimen.app_padding,
        padding: dimen.small_padding,
    },

    totalAmountContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: dimen.app_padding,
        marginBottom: 0,
        padding: dimen.app_padding,
        backgroundColor: Colors.bottom_bar_background_color,

    },
    totalAmountText: {
        flex: 1,
        fontSize: 16,
        color: Colors.normal_text_color,
    },
    headingText: {
        flex: 1.3,
        fontSize: 16,
        color: Colors.normal_text_color,
    },
    valueText: {
        flex: 1.7,
        fontSize: 16,
        color: Colors.normal_text_color,
    },
    flatListStyle:{
        borderWidth: 1, margin: dimen.app_padding,
        borderColor: Colors.primary_color, paddingBottom: dimen.app_padding,
        borderRadius: 5,
    },



});
