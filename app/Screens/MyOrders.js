import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import MyBackgroundImage from '../Components/MyBackgroundImage';
import TopBar from '../Components/TopBar';
import {FlatList} from 'react-native-gesture-handler';
import dimen from '../Styles/Dimen';
import {MyImage} from '../Components/MyImageButton';
import AppText from '../Components/AppText';
import {ProductCard} from '../Components/ProductCard';
import {
    console_log,
    errorAlert,
    getDataWithoutToken, getDataWithToken,
    getObject,
    isNetConnected,
    parseError,
    saveObject,
} from '../Classes/auth';
import {Keys} from '../Classes/Keys';
import {CartProductCard} from '../Components/CartProductCard';
import Colors from '../Styles/Colors';
import MyTextButton from '../Components/MyTextButton';
import {MyUrls} from '../Classes/MyUrls';
import {Loader} from '../Components/Loader';
import {OrderCard} from '../Components/OrderCard';


export const MyOrders = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [totalAmount, setTotalAmount] = useState('');


    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = () => {
        isNetConnected()
            .then(res => {
                getDataWithToken(MyUrls.get_orders_url, 'GET', '', setIsLoading)
                    .then(res => {
                        if (res.data) {
                            setOrders(res.data);
                        }else if (res.error) {
                            errorAlert(parseError(res.error))
                        } else {
                            errorAlert(res.message);
                        }
                    })
                    .catch(err => errorAlert(err));
            })
            .catch(err => errorAlert(err));
    };



    return (
        <MyBackgroundImage isBottom={false}>
            <TopBar title={'My Orders'} backButton={() => navigation.pop()}/>

            <View style={{flex: 1, justifyContent: 'flex-start', paddingBottom: 20}}>
                <FlatList
                    style={{flex: 1}}
                    data={orders}
                    keyExtractor={(item, index) => item.id.toString()}
                    numColumns={1}
                    bounces={false}
                    renderItem={({item, index}) => (
                        <OrderCard data={item}/>
                    )}

                    ListEmptyComponent={
                        <View style={styles.emptyListContainer}>
                            {/*<MyImage*/}
                            {/*    source={require('../Asset/cart.png')}*/}
                            {/*    imageContainerStyle={{width: 100, height: 100}}*/}
                            {/*/>*/}
                            <AppText style={{fontSize: 22, marginTop: 30}}>No orders</AppText>
                        </View>
                    }
                />
            </View>
            <Loader loading={isLoading}/>
        </MyBackgroundImage>
    );

};

const styles = StyleSheet.create({
    emptyListContainer: {
        flex: 1,
        height: '100%',
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    totalAmountContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: dimen.app_padding,
        padding: dimen.app_padding,
        backgroundColor: Colors.bottom_bar_background_color,

    },
    totalAmountText: {
        fontSize: 16,
        color: Colors.normal_text_color,
    },
});
