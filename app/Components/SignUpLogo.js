import {View, StyleSheet} from 'react-native';
import {MyImage} from './MyImageButton';
import AppText from './AppText';
import React from 'react';
import dimen from '../Styles/Dimen';
import Colors from '../Styles/Colors';
import MyImageButton from './MyImageButton';


const SignUpLogo = () => {

    return (
        <View style={styles.loginorContain}>
            <MyImage source={require('../Asset/logo.png')}
                     imageContainerStyle={styles.loginLogoButtonContainer}/>
            <AppText style={styles.byInstalmentText}>
                By instalment.pk
            </AppText>
        </View>

    );

};
export const SignUpCross = (props) => {

    return (
        <View style={styles.crossContain}>
            <MyImageButton onPress={props.onPress}
                           source={require('../Asset/cros.png')}
                           imageContainerStyle={styles.crossButtonContainer}/>
        </View>
    );
};

export default SignUpLogo;
// export SignUpCross;
const styles = StyleSheet.create({
    loginorContain: {
        marginTop: dimen.app_padding * 2,
        alignItems: 'center',
    },
    byInstalmentText: {
        fontSize: 12,
        alignItems: 'center',
        color: Colors.light_text_login,
    },
    loginLogoButtonContainer: {
        width: 154,
        height: 56,
    },
    crossContain: {
        alignItems: 'flex-end',
    },
    crossButtonContainer: {
        width: 20,
        height: 20,
    },
});
