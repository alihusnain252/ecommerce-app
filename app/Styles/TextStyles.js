import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import Colors from './Colors';
import dimen from "./Dimen";

const TextStyles = StyleSheet.create({
    inputstyle: {
      height: 50,
      // margin:dimen.small_padding,
      padding:15,
      borderRadius:10,
      borderColor:Colors.border_color,
        backgroundColor:Colors.home_widget_background_color,
      borderWidth: 1,
      fontSize: dimen.textinputfontsize
    },
    stericStyle: {color:'red',marginLeft: 5},
    stericContainer: {flexDirection:'row',},
    settingHeadingStyle: {fontFamily:'roboto-bold',marginLeft:dimen.small_padding, fontSize:dimen.textinputfontsize , },

    buttonStyle: {
      alignSelf:'stretch',
      alignItems:'center',
      backgroundColor:Colors.primary_color,
      padding:15,
      borderRadius:25,

    },
    allTripsHeaderDot:{
        width: 8,
        height: 8,
        // padding: 1,
        borderRadius: 4,
        position: 'absolute',
        resizeMode: 'contain',
        backgroundColor: 'red',
        top: 15,
        left: 15,
        // left: 0,
        // bottom: 0,
    },
    smallButtonView: {
        borderRadius:15,
        borderWidth:2,
        borderColor:Colors.primary_color,
        backgroundColor:Colors.home_widget_background_color
    },
    smallButtonText: {
        fontSize: 11,
        fontFamily:'roboto-bold',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:2,
        paddingBottom:2
    },
    buttonTextStyle: {
      color:Colors.button_text_color,
      fontSize:dimen.buttonfont,
    },
    videoContainer: {
      flex:1,
      color:'white',
      backgroundColor: 'white',
      height: 90,
      marginTop:30,

    },

});


export default  TextStyles;
