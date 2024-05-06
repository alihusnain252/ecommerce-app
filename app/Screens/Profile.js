import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableWithoutFeedback} from 'react-native';
import MyBackgroundImage from '../Components/MyBackgroundImage';
import TopBar from '../Components/TopBar';
import Colors from '../Styles/Colors';
import dimen from '../Styles/Dimen';
import AppText from '../Components/AppText';
import {clearAllData, getObject} from '../Classes/auth';
import {Keys} from '../Classes/Keys';


export const MenuItem = (props) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingTop: 5,
                    paddingBottom: 5,
                }}>
                    <View style={{
                        width: 7,
                        height: '100%',
                        backgroundColor: Colors.primary_color,
                        borderTopRightRadius: 3,
                        borderBottomRightRadius: 3,
                    }}/>
                    <AppText style={{padding: 13, fontSize: 13, fontWeight: 'bold'}}>
                        {props.text}
                    </AppText>
                </View>
                <View style={{width: '100%', height: 1, backgroundColor: Colors.border_color}}/>
            </View>
        </TouchableWithoutFeedback>
    );
};

export const Profile = ({navigation}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            checkUserLoginStatus();
        });
        return unsubscribe;
    }, []);

    const checkUserLoginStatus=()=>{
        getObject(Keys.user_data_key).then(res => {
            if (res.status) {
                setUser(true);
            } else {
                setUser(false);
            }
        });
    }
    const logOutPress=()=>{
        clearAllData().then(res=>checkUserLoginStatus())
    }


    return (
        <MyBackgroundImage>
            <TopBar title={'Profile'}/>
            <ScrollView style={{}}>
                {user !== null &&
                <View style={{}}>

                    {!user &&
                    <View>
                        <MenuItem text={'Login'} onPress={() => navigation.navigate('Login')}/>
                        <MenuItem text={'Sign Up'} onPress={() => navigation.navigate('SignUp')}/>
                    </View>}

                    {user &&
                    <View>
                        <MenuItem text={'Profile'} onPress={() => navigation.navigate('MyProfile')}/>
                        <MenuItem text={'My Orders'} onPress={() => navigation.navigate('MyOrders')}/>
                        <MenuItem text={'Payment Method'} onPress={() => navigation.navigate('PaymentMethod')}/>
                        {/*<MenuItem text={'Notifications'} onPress={() => navigation.navigate('SignUp')}/>*/}
                        <MenuItem text={'ChangePassword'} onPress={() => navigation.navigate('ChangePassword')}/>
                        <MenuItem text={'LogOut'} onPress={logOutPress}/>
                    </View>}

                </View>}
            </ScrollView>

        </MyBackgroundImage>
    );

};


const profileStyles = StyleSheet.create({
    profileImageContainer: {
        margin: dimen.app_padding, width: 150, height: 150, borderRadius: 75, borderWidth: 3,
        borderColor: 'white', overflow: 'hidden',
    },
    profileImageStyle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: 'hidden',
        resizeMode: 'cover',

    },
    itemsImageStyle: {
        width: 15,
        height: 15,
        marginRight: 10,
    },
    itemContainerStyle: {flexDirection: 'row', alignItems: 'center', padding: dimen.app_padding},
    itemTextStyle: {color: Colors.button_text_color, fontWeight: 'bold', fontSize: 15},
    dividerLine: {
        height: 1,
        width: '90%',
        backgroundColor: Colors.primary_light_color,
        alignSelf: 'center',
    },


});
