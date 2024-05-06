import {ActivityIndicator, View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../Styles/Colors';
import dimen from '../Styles/Dimen';
import AppText from './AppText';
import {MyImage} from './MyImageButton';

export const Loader = (props) => props.loading ? (
    <View style={{
        justifyContent: 'center', alignItems: 'center', position: 'absolute',
        left: 0,
        right: 0,
        opacity: 0.4,
        backgroundColor: 'black',
        top: 0,
        bottom: 0,
    }}>
        <ActivityIndicator size="large" color={Colors.primary_color}/>
    </View>
) : (<View/>);
export const EmptyList = (props) => {


    return (

        <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', margin: dimen.app_padding}}>
            {props.text === undefined &&
            <AppText style={{fontSize: 15, color: Colors.normal_text_color}}>No Items. Tap to reload.</AppText>}
            {props.text !== undefined &&
            <AppText style={{fontSize: 15, color: Colors.normal_text_color}}>{props.text}</AppText>}
            {props.reload !== undefined &&
            <TouchableOpacity onPress={() => props.reload()}>
                <MyImage
                    source={require('../Asset/reload.png')}
                    tintColor={Colors.primary_color}
                    imageContainerStyle={{width: 30, height: 30, marginTop: dimen.app_padding}}/>
            </TouchableOpacity>
            }
        </View>
    );
};

export const StatusBox = (props) => {
    if (props.active === 1) {
        return (
            <View style={styles.boxContainer}>
                <View style={styles.statusBoxActive}/>
                <View style={styles.statusBoxNonActive}/>
                <View style={styles.statusBoxNonActive}/>
            </View>
        );
    } else if (props.active === 2) {
        return (
            <View style={styles.boxContainer}>
                <View style={styles.statusBoxActive}/>
                <View style={styles.statusBoxActive}/>
                <View style={styles.statusBoxNonActive}/>
            </View>
        );
    } else if (props.active === 3) {
        return (
            <View style={styles.boxContainer}>
                <View style={styles.statusBoxActive}/>
                <View style={styles.statusBoxActive}/>
                <View style={styles.statusBoxActive}/>
            </View>
        );
    } else {
        return (<View></View>);
    }
};


const styles = StyleSheet.create({

    boxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    statusBoxActive: {
        width: 30,
        height: 10,
        backgroundColor: Colors.primary_color,
        marginLeft: 10,
        borderRadius: 3,
    },
    statusBoxNonActive: {
        width: 30,
        height: 10,
        backgroundColor: Colors.signup_input_text_background_color,
        marginLeft: 10,
        borderRadius: 3,
    },
});

