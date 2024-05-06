import dimen from '../Styles/Dimen';
import TextStyles from '../Styles/TextStyles';
import { TouchableOpacity, View} from 'react-native';
import React from 'react';
import AppText from './AppText';


const MyTextButton = (props) => {
    return (
        <MyTextButtonSimple onPress={props.onPress}
                            buttonText={props.buttonText}
                            buttonContainerStyle={[TextStyles.buttonStyle, props.buttonContainerStyle]}
                            buttonTextStyle={[TextStyles.buttonTextStyle, props.buttonTextStyle]}
        />

    );
};


export const MyTextButtonSimple = (props) => {
    return (
        <View>
            <TouchableOpacity style={[props.buttonContainerStyle]}
                              onPress={props.onPress}>
                <AppText style={[props.buttonTextStyle]}>{props.buttonText}</AppText>
            </TouchableOpacity>
        </View>
    );
};

export default MyTextButton;
