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
    saveObject, successAlert,
} from '../Classes/auth';
import {Keys} from '../Classes/Keys';
import {MyUrls} from '../Classes/MyUrls';
import TopBar from '../Components/TopBar';
import {Loader} from '../Components/Loader';


export const MyProfile = ({navigation}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [edit, setEdit] = useState(false);


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [shopName, setShopName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        getObject(Keys.user_data_key)
            .then(res => {
                if (res.status) {
                    setFirstName(res.data.first_name);
                    setLastName(res.data.last_name);
                    setShopName(res.data.shop_name);
                    setEmail(res.data.email);
                    setPhone(res.data.phone_number);
                    setAddress(res.data.address);
                }
            });
    }, []);


    const updateProfile = () => {

        if (firstName === '' || lastName === '' || shopName === '' || email === '', phone === '' || address === '' ) {
            errorAlert('Please enter all the fields');
            return;
        }


        isNetConnected().then(() => {

            let formData = new FormData();
            formData.append('first_name', firstName);
            formData.append('last_name', lastName);
            formData.append('shop_name', shopName);
            formData.append('email', email);
            formData.append('phone_number', phone);
            formData.append('address', address);

            getDataWithToken(MyUrls.update_profile_url, 'POST', formData, setIsLoading)
                .then(res => {
                    if (res.error !== undefined){
                        errorAlert(parseError(res.error))
                    } else if(res.data!==undefined){
                        saveObject(Keys.user_data_key, res.data)
                        successAlert(res.message)
                        setEdit(false)
                    }
                });

        });

    };
    const editPress=()=>{
        setEdit(!edit)
    }

    return (
        <MyBackgroundImage isBottom={false}>
            <TopBar title={'My Profile'} backButton={() => navigation.pop()}/>

            <ScrollView style={{flex: 1}}>
                <View style={{flex: 1, margin: dimen.app_padding, justifyContent: 'center'}}>

                    <TouchableOpacity onPress={editPress}>
                        <View style={loginStyles.editContainer}>
                            {!edit &&<AppText style={{fontSize: 16, color: Colors.primary_color}}>Edit</AppText>}
                            {edit && <AppText style={{fontSize: 16, color: Colors.primary_color}}>Cancel Edit</AppText>}
                            <MyImage source={require('../Asset/edit.png')}
                                     imageContainerStyle={{width: 15, height: 15, marginLeft: 5}}
                                     tintColor={Colors.primary_color}/>
                        </View>
                    </TouchableOpacity>

                    <AppText style={loginStyles.headingText}>First name</AppText>
                    <View style={GeneralStyles.inputContainer}>
                        <TextInput onChangeText={(email) => setFirstName(email)}
                                   value={firstName}
                                   placeholder={'First name'}
                                   autoCapitalize='none'
                                   editable={edit}
                                   keyboardType={'email-address'}
                                   style={GeneralStyles.inputField}/>
                    </View>

                    <AppText style={loginStyles.headingText}>Last name</AppText>
                    <View style={[GeneralStyles.inputContainer]}>
                        <TextInput onChangeText={(email) => setLastName(email)}
                                   value={lastName}
                                   placeholder={'Last name'}
                                   autoCapitalize='none'
                                   editable={edit}
                                   keyboardType={'default'}
                                   style={GeneralStyles.inputField}/>
                    </View>

                    <AppText style={loginStyles.headingText}>Shop name</AppText>
                    <View style={[GeneralStyles.inputContainer]}>
                        <TextInput onChangeText={(email) => setShopName(email)}
                                   value={shopName}
                                   placeholder={'Business name'}
                                   autoCapitalize='none'
                                   editable={edit}
                                   keyboardType={'default'}
                                   style={GeneralStyles.inputField}/>
                    </View>

                    <AppText style={loginStyles.headingText}>Email</AppText>
                    <View style={[GeneralStyles.inputContainer]}>
                        <TextInput onChangeText={(email) => setEmail(email)}
                                   value={email}
                                   placeholder={'Email'}
                                   autoCapitalize='none'
                                   editable={false}
                                   keyboardType={'default'}
                                   style={[GeneralStyles.inputField,{color:Colors.non_active_icon_color}]}/>
                    </View>

                    <AppText style={loginStyles.headingText}>Phone</AppText>
                    <View style={[GeneralStyles.inputContainer]}>
                        <TextInput onChangeText={(email) => setPhone(email)}
                                   value={phone}
                                   placeholder={'Phone'}
                                   autoCapitalize='none'
                                   editable={false}
                                   keyboardType={'numeric'}
                                   style={[GeneralStyles.inputField,{color:Colors.non_active_icon_color}]}/>
                    </View>

                    <AppText style={loginStyles.headingText}>Address</AppText>
                    <View style={[GeneralStyles.inputContainer]}>
                        <TextInput onChangeText={(email) => setAddress(email)}
                                   value={address}
                                   placeholder={'Address'}
                                   autoCapitalize='none'
                                   editable={edit}
                                   keyboardType={'default'}
                                   style={[GeneralStyles.inputField]}/>
                    </View>


                    {edit &&
                    <MyTextButton
                        buttonText={'Update'}
                        onPress={updateProfile}
                        buttonTextStyle={{color: Colors.normal_text_color}}
                        buttonContainerStyle={{marginTop: dimen.app_padding}}
                    />}


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
