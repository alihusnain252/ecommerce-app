import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import MyBackgroundImage from '../Components/MyBackgroundImage';
import TopBar from '../Components/TopBar';
import {FlatList} from 'react-native-gesture-handler';
import dimen from '../Styles/Dimen';
import {MyImage} from '../Components/MyImageButton';
import AppText from '../Components/AppText';
import {ProductCard} from '../Components/ProductCard';
import {console_log, getObject, saveObject} from '../Classes/auth';
import {Keys} from '../Classes/Keys';
import {CartProductCard} from '../Components/CartProductCard';
import Colors from '../Styles/Colors';
import MyTextButton from '../Components/MyTextButton';


export const Cart = ({navigation}) => {
    const [appointments, setAppointments] = useState([{id: 1}, {id: 2}]);
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState('');


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getCartItems();
        });
        return unsubscribe;
    }, []);

    const getCartItems = () => {
        getObject(Keys.cart_key)
            .then(res => {
                if (res.status) {
                    setCartItems(res.data);
                    calculateTotalAmount(res.data);
                } else {
                    setCartItems([]);
                    calculateTotalAmount([]);
                }
            });
    };
    const onPress = () => {

    };
    const crossPress = (item) => {
        // console_log(item)
        let fCart = (cartItems.filter((cItem) => cItem.product.id !== item.product.id));
        saveObject(Keys.cart_key, fCart);
        setCartItems(fCart);
        calculateTotalAmount((fCart));
    };
    const calculateTotalAmount = (cItems) => {
        let sum = 0;
        cItems.forEach(item => {
            sum = sum + parseFloat(item.product.price_per_box) * parseInt(item.quantity);
        });
        setTotalAmount(sum);
    };
    const placeOrder = () => {
        getObject(Keys.user_data_key)
            .then(res=>{
                if (res.status){
                    navigation.navigate('Checkout');
                }else {
                    navigation.navigate('Login')
                }
            })
    };

    return (
        <MyBackgroundImage isBottom={true}>
            <TopBar title={'Shopping Cart'} icon={require('../Asset/notification.png')}/>

            <View style={{flex: 1, justifyContent: 'flex-start', paddingBottom: 20}}>

                <FlatList
                    style={{flex: 1}}
                    data={cartItems}
                    keyExtractor={(item, index) => item.product.id.toString()}
                    numColumns={1}
                    bounces={false}
                    renderItem={({item, index}) => (
                        <CartProductCard data={item}
                                         onPress={onPress}
                                         crossPress={crossPress}
                        />
                    )}
                    ListFooterComponent={
                        () => {
                            if (cartItems.length > 0) {
                                return (
                                    <View style={styles.totalAmountContainer}>
                                        <AppText style={styles.totalAmountText}>Total Amount</AppText>
                                        <AppText style={styles.totalAmountText}>£{totalAmount}</AppText>
                                    </View>);
                            } else {
                                return (<View></View>);
                            }
                        }
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyListContainer}>
                            <MyImage
                                source={require('../Asset/cart.png')}
                                imageContainerStyle={{width: 100, height: 100}}
                            />
                            <AppText style={{fontSize: 22, marginTop: 30}}>Your Cart is Empty</AppText>
                        </View>
                    }
                />
                {cartItems.length > 0 &&
                <MyTextButton
                    buttonText={'CHECKOUT'}
                    buttonTextStyle={{color: Colors.normal_text_color}}
                    onPress={placeOrder}
                    buttonContainerStyle={{margin: dimen.app_padding, marginBottom: 0, padding: dimen.app_padding}}
                />}
            </View>


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
