import React, {useState} from 'react';
import {View, StatusBar, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
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
    getAndSaveFcm,
    getDataWithoutToken,
    isNetConnected,
    parseError,
    saveObject,
} from '../Classes/auth';
import {Keys} from '../Classes/Keys';
import {MyUrls} from '../Classes/MyUrls';
import TopBar from '../Components/TopBar';
import {Loader} from '../Components/Loader';


export const Login = ({navigation}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const loginPress = () => {
        isNetConnected().then(() => {

            let formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            getDataWithoutToken(MyUrls.login_url, 'POST', formData, setIsLoading)
                .then(res => {
                    // console_log(res)
                    if (res.success !== undefined) {
                        saveObject(Keys.token_key, res.success.token);
                        saveObject(Keys.user_data_key, res.success.data).then(res => navigation.pop());
                        getAndSaveFcm()

                    }
                    if (res.error !== undefined) {
                        errorAlert(parseError(res.error));
                    }
                    if (res.message) {
                        errorAlert(res.message);
                    }


                });

        });

    };

    return (
        <MyBackgroundImage isBottom={false}>
            <TopBar title={'Login'} backButton={() => navigation.pop()}/>

            <View style={{flex: 1, margin: dimen.app_padding, justifyContent: 'center'}}>

                <View style={GeneralStyles.inputContainer}>
                    <TextInput onChangeText={(email) => setEmail(email)}
                               value={email}
                               placeholder={'Enter your email'}
                               autoCapitalize='none'
                               keyboardType={'email-address'}
                               style={GeneralStyles.inputField}/>
                </View>
                <View style={[GeneralStyles.inputContainer, {marginTop: dimen.app_padding}]}>
                    <TextInput onChangeText={(email) => setPassword(email)}
                               value={password}
                               placeholder={'Password'}
                               autoCapitalize='none'
                               secureTextEntry={true}
                               keyboardType={'default'}
                               style={GeneralStyles.inputField}/>
                </View>

                {/*<AppText style={loginStyles.forgotPasswordStyle}>*/}
                {/*    I forgot my password*/}
                {/*</AppText>*/}

                <MyTextButton
                    buttonText={'Login'}
                    onPress={loginPress}
                    buttonTextStyle={{color: Colors.normal_text_color}}
                    buttonContainerStyle={{marginTop:dimen.app_padding}}
                />


                <TouchableOpacity onPress={()=>navigation.replace('SignUp')}>
                    <AppText style={loginStyles.forgotPasswordStyle}>
                        Don't have an account? Sign Up
                    </AppText>
                </TouchableOpacity>


            </View>

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
        fontSize: 18,
        margin: dimen.app_padding,
        color: Colors.normal_text_color,
    },

});
