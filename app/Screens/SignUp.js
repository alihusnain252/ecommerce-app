import React, {useState} from 'react';
import {View, StatusBar, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
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


export const SignUp = ({navigation}) => {

    const [isLoading, setIsLoading] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [shopName, setShopName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const {setLogin} = React.useContext(AuthContext);


    const signUpPress = () => {

        if(firstName==='' || lastName===''|| shopName===''||email==='',phone===''||address===''||password===''||confirmPassword===''){
            errorAlert('Please enter all the fields')
            return
        }


        isNetConnected().then(() => {

            let formData = new FormData();
            formData.append('first_name', firstName);
            formData.append('last_name', lastName);
            formData.append('shop_name', shopName);
            formData.append('email', email);
            formData.append('phone_number', phone);
            formData.append('address', address);
            formData.append('password', password);
            formData.append('password_confirmation', confirmPassword);
            formData.append('fcm_token', 'fcm token');

            getDataWithoutToken(MyUrls.register_url, 'POST', formData, setIsLoading)
                .then(res => {
                    console_log(res)

                    if (res.error !== undefined) {
                        errorAlert(parseError(res.error));
                    } else if (res.data !== undefined) {
                        saveObject(Keys.token_key, res.token);
                        saveObject(Keys.user_data_key, res.data).then(() => navigation.pop());
                        getAndSaveFcm()
                    }

                })
                .catch(err=>errorAlert(err))

        });

    };

    return (
        <MyBackgroundImage isBottom={false}>
            <TopBar title={'Sign Up'} backButton={() => navigation.pop()}/>

            <ScrollView style={{flex: 1}}>
                <View style={{flex: 1, margin: dimen.app_padding, justifyContent: 'center'}}>

                    <View style={GeneralStyles.inputContainer}>
                        <TextInput onChangeText={(email) => setFirstName(email)}
                                   value={firstName}
                                   placeholder={'First name'}
                                   autoCapitalize='none'
                                   keyboardType={'email-address'}
                                   style={GeneralStyles.inputField}/>
                    </View>
                    <View style={[GeneralStyles.inputContainer, {marginTop: dimen.app_padding}]}>
                        <TextInput onChangeText={(email) => setLastName(email)}
                                   value={lastName}
                                   placeholder={'Last name'}
                                   autoCapitalize='none'
                                   keyboardType={'default'}
                                   style={GeneralStyles.inputField}/>
                    </View>
                    <View style={[GeneralStyles.inputContainer, {marginTop: dimen.app_padding}]}>
                        <TextInput onChangeText={(email) => setShopName(email)}
                                   value={shopName}
                                   placeholder={'Shop name'}
                                   autoCapitalize='none'
                                   keyboardType={'default'}
                                   style={GeneralStyles.inputField}/>
                    </View>
                    <View style={[GeneralStyles.inputContainer, {marginTop: dimen.app_padding}]}>
                        <TextInput onChangeText={(email) => setEmail(email)}
                                   value={email}
                                   placeholder={'Email'}
                                   autoCapitalize='none'
                                   keyboardType={'default'}
                                   style={GeneralStyles.inputField}/>
                    </View>
                    <View style={[GeneralStyles.inputContainer, {marginTop: dimen.app_padding}]}>
                        <TextInput onChangeText={(email) => setPhone(email)}
                                   value={phone}
                                   placeholder={'Phone'}
                                   autoCapitalize='none'
                                   keyboardType={'numeric'}
                                   style={GeneralStyles.inputField}/>
                    </View>
                    <View style={[GeneralStyles.inputContainer, {marginTop: dimen.app_padding}]}>
                        <TextInput onChangeText={(email) => setAddress(email)}
                                   value={address}
                                   placeholder={'Address'}
                                   autoCapitalize='none'
                                   multiline={true}
                                   keyboardType={'default'}
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
                    <View style={[GeneralStyles.inputContainer, {marginTop: dimen.app_padding}]}>
                        <TextInput onChangeText={(email) => setConfirmPassword(email)}
                                   value={confirmPassword}
                                   placeholder={'Confirm password'}
                                   autoCapitalize='none'
                                   secureTextEntry={true}
                                   keyboardType={'default'}
                                   style={GeneralStyles.inputField}/>
                    </View>



                    <MyTextButton
                        buttonText={'Sign Up'}
                        onPress={signUpPress}
                        buttonTextStyle={{color:Colors.normal_text_color}}
                        buttonContainerStyle={{marginTop:dimen.app_padding}}
                    />

                    <TouchableOpacity onPress={()=>navigation.replace('Login')}>
                        <AppText style={loginStyles.forgotPasswordStyle}>
                            Already have an account? Log in
                        </AppText>
                    </TouchableOpacity>


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

});
