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
    saveObject, simpleAlert, successAlert,
} from '../Classes/auth';
import {Keys} from '../Classes/Keys';
import {MyUrls} from '../Classes/MyUrls';
import TopBar from '../Components/TopBar';
import {Loader} from '../Components/Loader';


export const ChangePassword = ({navigation}) => {

    const [isLoading, setIsLoading] = useState(false);


    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {

    }, []);


    const updateProfile = () => {

        if (oldPassword === '' || password === '' || confirmPassword=== '' ) {
            errorAlert('Please enter all the fields');
            return;
        }


        isNetConnected().then(() => {

            let formData = new FormData();
            formData.append('current-password', oldPassword);
            formData.append('new-password', password);
            formData.append('new-password-confirm', confirmPassword);

            getDataWithToken(MyUrls.update_password_url, 'POST', formData, setIsLoading)
                .then(res => {
                    // console_log(res);

                    if (res.error !== undefined){
                        errorAlert(parseError(res.error))
                    } else {
                        simpleAlert(res.message)
                    }
                });

        });

    };

    return (
        <MyBackgroundImage isBottom={false}>
            <TopBar title={'My Profile'} backButton={() => navigation.pop()}/>

            <ScrollView style={{flex: 1}}>
                <View style={{flex: 1, margin: dimen.app_padding, justifyContent: 'center'}}>

                    <AppText style={loginStyles.headingText}>Old password</AppText>
                    <View style={GeneralStyles.inputContainer}>
                        <TextInput onChangeText={(email) => setOldPassword(email)}
                                   value={oldPassword}
                                   placeholder={'Old password'}
                                   autoCapitalize='none'
                                   secureTextEntry={true}
                                   keyboardType={'default'}
                                   style={GeneralStyles.inputField}/>
                    </View>

                    <AppText style={loginStyles.headingText}>New password</AppText>
                    <View style={[GeneralStyles.inputContainer]}>
                        <TextInput onChangeText={(email) => setPassword(email)}
                                   value={password}
                                   placeholder={'New password'}
                                   autoCapitalize='none'
                                   secureTextEntry={true}
                                   keyboardType={'default'}
                                   style={GeneralStyles.inputField}/>
                    </View>

                    <AppText style={loginStyles.headingText}>Confirm new password</AppText>
                    <View style={[GeneralStyles.inputContainer]}>
                        <TextInput onChangeText={(email) => setConfirmPassword(email)}
                                   value={confirmPassword}
                                   placeholder={'Confirm new password'}
                                   autoCapitalize='none'
                                   secureTextEntry={true}
                                   keyboardType={'default'}
                                   style={GeneralStyles.inputField}/>
                    </View>



                    <MyTextButton
                        buttonText={'Change Password'}
                        onPress={updateProfile}
                        buttonTextStyle={{color: Colors.normal_text_color}}
                        buttonContainerStyle={{marginTop: dimen.app_padding}}
                    />


                </View>
            </ScrollView>

            <Loader loading={isLoading}/>
        </MyBackgroundImage>
    );

};

const loginStyles = StyleSheet.create({
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
    headingText: {
        fontSize: 14,
        color: Colors.normal_text_color,
        marginTop: 10,
        marginBottom: 5,
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


});
