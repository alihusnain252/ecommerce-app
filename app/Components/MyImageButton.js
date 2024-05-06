import dimen from '../Styles/Dimen';
import TextStyles from '../Styles/TextStyles';
import {Image, Text,ImageBackground, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AppText from './AppText';


const MyImageButton = (props) => {

    return (
        <TouchableOpacity
            style={[{width: 60, height: 60}, props.imageContainerStyle]}
            onPress={props.onPress}>

            <Image source={props.source}
                   style={[{width: '100%', height: '100%', resizeMode: 'contain'}, props.imageStyle]}/>
        </TouchableOpacity>
    );
};
export default MyImageButton;
export const MyImage = (props) => {
    return (
        <Image source={props.source}
               // tintColor={props.tintColor !== undefined ? props.tintColor : null}
               style={[{width: '100%', height: '100%', resizeMode: 'contain'},props.tintColor!==undefined?{tintColor:props.tintColor}:{}, props.imageContainerStyle]}/>
    );

};
export const MyImageBackground = (props) => {
    return (
        <ImageBackground source={props.source}
               tintColor={props.tintColor !== undefined ? props.tintColor : null}
               style={[{width: '100%', height: '100%', resizeMode: 'contain',}, props.imageContainerStyle]}>
            {props.children}
        </ImageBackground>
    );

};
