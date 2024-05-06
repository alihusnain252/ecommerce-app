import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import Colors from './Colors';
import dimen from './Dimen';

export const GeneralStyles = StyleSheet.create({
    inputContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderColor: Colors.login_field_border_color,
        backgroundColor: Colors.login_field_background_color,
        borderWidth: 1,
        borderRadius: 25,
        paddingRight: dimen.app_padding,
        paddingLeft: dimen.app_padding,
    },

    inputField: {
        marginRight: dimen.login_input_margin,
        marginLeft: dimen.login_input_margin,
        margin: dimen.login_input_margin,
        padding:0,
        fontSize: dimen.login_input_text_font,
        color: Colors.normal_text_color,
        flex: 1,

    },

});

