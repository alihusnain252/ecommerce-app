import {View, StyleSheet, TouchableWithoutFeedback, StatusBar} from 'react-native';
import {useEffect} from 'react';
import {MyImage} from './MyImageButton';
import {TextInput} from 'react-native-gesture-handler';
import MyStrings from '../Classes/MyStrings';
import Colors from '../Styles/Colors';
import React, {useState} from 'react';
import dimen from '../Styles/Dimen';
import {console_log, getObject} from '../Classes/auth';
import AppText from './AppText';
import MyImageButton from './MyImageButton';
import {Keys} from '../Classes/Keys';


const TopBar = (props) => {


    const crossPress = () => {
        props.isCross();
    };

    return (
        <View style={styles.topContainer}>
            <StatusBar backgroundColor={Colors.primary_color} barStyle="dark-content" hidden={false}/>

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <AppText style={styles.topHeading}>{props.title}</AppText>
            </View>
            <View style={styles.locationContainer}>

                {props.isCross !== undefined &&
                <TouchableWithoutFeedback onPress={crossPress}>
                    <View style={{flexDirection: 'row'}}>
                        <AppText style={[styles.locationHeading, {paddingLeft: 10}]}> X </AppText>

                    </View>
                </TouchableWithoutFeedback>
                }
                {props.backButton !== undefined &&
                <TouchableWithoutFeedback onPress={() => props.backButton()}>
                    <View style={styles.backArrowContainer}>
                        <MyImage
                            source={require('../Asset/back_arrow.png')}
                            tintColor={Colors.normal_text_color}
                            imageContainerStyle={styles.backArrowContainerImage}/>
                    </View>
                </TouchableWithoutFeedback>
                }
            </View>
        </View>
    );
};
export default TopBar;


const styles = StyleSheet.create({
    //top bar
    topContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary_color,
    },
    locationButtonContainer: {
        width: 15,
        height: 15,
        marginLeft: 10,
    },
    backArrowContainer: {
        width: 45,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        // backgroundColor: 'red',

    },
    backArrowContainerImage: {
        width: 17,
        height: 17,
        // marginLeft: 10,
        // flexDirection: 'row',
        // justifyContent: 'flex-end',
        // alignItems: 'center',
        // position: 'absolute',
        // left: 0,
        // right: dimen.app_padding,
        // backgroundColor: 'red',

    },
    topHeading: {
        fontSize: 18,
        color: Colors.normal_text_color,
        marginLeft: 5,
        fontWeight: 'bold'
    },
    locationHeading: {
        fontSize: 13,
        color: Colors.button_text_color,
    },
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: dimen.app_padding,
    },
});
