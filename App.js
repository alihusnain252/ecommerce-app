import React, {useEffect, useState} from 'react';
import {
    View, Text, SafeAreaView, Alert,
} from 'react-native';


import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar, {MyTabBar} from './app/Components/TabBar';
import {Products} from './app/Screens/Products';
import {Cart, Notifications} from './app/Screens/Cart';
import {Profile} from './app/Screens/Profile';
import {console_log, getAndSaveFcm, getObject, saveFcmToken, simpleAlert} from './app/Classes/auth';
import {Keys} from './app/Classes/Keys';
import Colors from './app/Styles/Colors';
import {ProductDetails} from './app/Screens/ProductDetails';
import {Login} from './app/Screens/Login';
import {SignUp} from './app/Screens/SignUp';
import {MyProfile} from './app/Screens/MyProfile';
import {ChangePassword} from './app/Screens/ChangePassword';
import {MyOrders} from './app/Screens/MyOrders';
import {Checkout} from './app/Screens/Checkout';
import {PaymentMethod} from './app/Screens/PaymentMethod';
import crashlytics from '@react-native-firebase/crashlytics';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import messaging from '@react-native-firebase/messaging';
import RNFirebase from '@react-native-firebase/app';
// import {NotificationActionResponse, Notifications} from 'react-native-notifications';

export const NotificationContext = React.createContext();


const configurationOptions = {
    debug: true,
    promptOnMissingPlayServices: true,
};

let firebas = null;
if (!RNFirebase.apps.length) {
    // firebase.initializeApp({});
    firebas = RNFirebase.initializeApp(configurationOptions);
}

export const AuthContext = React.createContext();

const App = () => {

    const [isLogin, setIsLogin] = useState(null);

    useEffect(() => {
        SplashScreen.hide();

        getAndSaveFcm();
        requestUserPermission().then().catch()

        // Listen to whether the token changes
        return messaging().onTokenRefresh(token => {
            saveFcmToken(token);
            // console_log(token)
        });

    }, []);


    async function requestUserPermission() {
        const authorizationStatus = await messaging().requestPermission();

        if (authorizationStatus) {
            console.log('Permission status:', authorizationStatus);
        }
    }

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {

            // console_log(remoteMessage);
            // Notifications.postLocalNotification({
            //   title: remoteMessage.notification.title,
            //   body: remoteMessage.notification.body,
            //   extra: 'data',
            // });
            //
            // // Notifications.events().registerNotificationOpened((notification: Notification, completion: () => void, action: NotificationActionResponse) => {
            // //   // setNewNotification('new Notification');
            // //   // console_log('local notifiction');
            // //   completion();
            // // });

            Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);

        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{setLogin: (value) => setIsLogin(value)}}>
            <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary_color}}>
                <NavigationContainer>

                    <Stack.Navigator headerMode={'none'}>
                        <Stack.Screen name="TabNav" component={TabNav}/>
                        <Stack.Screen name="ProductDetails" component={ProductDetails}/>
                        <Stack.Screen name="Login" component={Login}/>
                        <Stack.Screen name="SignUp" component={SignUp}/>
                        <Stack.Screen name="MyProfile" component={MyProfile}/>
                        <Stack.Screen name="ChangePassword" component={ChangePassword}/>
                        <Stack.Screen name="MyOrders" component={MyOrders}/>
                        <Stack.Screen name="Checkout" component={Checkout}/>
                        <Stack.Screen name="PaymentMethod" component={PaymentMethod}/>
                    </Stack.Navigator>

                </NavigationContainer>
            </SafeAreaView>

        </AuthContext.Provider>
    );
};

export default App;


const TabNav = () => {

    return (
        <Tab.Navigator
            tabBar={props => <TabBar {...props} />}
        >
            <Tab.Screen name="Products" component={ProductStack}/>
            <Tab.Screen name="Cart" component={Cart}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
    );
};

const ProductStack = () => {
    return (
        <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name="Products" component={Products}/>
            <Stack.Screen name="ProductDetails" component={ProductDetails}/>
        </Stack.Navigator>
    );
};
