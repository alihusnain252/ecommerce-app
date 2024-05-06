import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import Colors from './Colors';
import dimen from "./Dimen";

export default StyleSheet.create({
    scrollview:{
        flex:1,
        marginBottom:50
    },

    videoContainer: {
    flex:1,
    color:'white',
    backgroundColor: 'white',
    height: 90
        },
    messageStyle: {
        margin:5,
        marginTop:20,
        color:'black',
    },
    stepcontainer:{
        backgroundColor:'white',
        elevation:5,
        marginTop:10,
        height:280,
        width:'100%',
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        margin:0,
        padding:5,
        borderWidth:0.5,
        borderColor:'grey'},
    stepImageContainer:{
        height:'60%',
        width:'100%',
        flexDirection:"row"},
    stepImage:{
        height:'100%',
        width:'100%',
        backgroundColor:'white',
        resizeMode:"contain"
    },


});


