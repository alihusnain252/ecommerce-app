import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import MyBackgroundImage from '../Components/MyBackgroundImage';
import TopBar from '../Components/TopBar';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import dimen from '../Styles/Dimen';
import {MyImage} from '../Components/MyImageButton';
import AppText from '../Components/AppText';
import {ProductCard} from '../Components/ProductCard';
import {
    actionAlert,
    clearAllData, clearKey,
    console_log,
    errorAlert,
    getDataWithoutToken,
    getDataWithToken,
    getObject,
    isNetConnected,
    saveObject, successAlert,
} from '../Classes/auth';
import {Keys} from '../Classes/Keys';
import {CartProductCard} from '../Components/CartProductCard';
import Colors from '../Styles/Colors';
import MyTextButton from '../Components/MyTextButton';
import {CheckoutProduct} from '../Components/CheckoutProduct';
import {MyUrls} from '../Classes/MyUrls';
import {Loader} from '../Components/Loader';
import {GeneralStyles} from '../Styles/GeneralStyles';


export const Checkout = ({navigation}) => {

    const [isLoading, setIsLoading] = useState(false);

    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState('');


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [shopName, setShopName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [deliveryCharges, setDeliveryCharges] = useState('');

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

    useEffect(() => {
        getCartItems();
        getObject(Keys.delivery_charges_key)
            .then(res=>{
                if(res.status){
                    setDeliveryCharges(res.data)
                }else {
                    setDeliveryCharges('8.99')
                }
            })
    }, []);
    const getCartItems = () => {
        getObject(Keys.cart_key)
            .then(res => {
                if (res.status) {
                    setCartItems(res.data);
                    calculateTotalAmount(res.data);
                }
            });
    };
    const calculateTotalAmount = (cItems) => {
        let sum = 0;
        cItems.forEach(item => {
            sum = sum + parseFloat(item.product.price_per_box) * parseInt(item.quantity);
        });
        setTotalAmount(sum);
    };
    const placeOrder = () => {
        let orderItems = cartItems.map(ite => {
            return {
                product_id: ite.product.id, quantity: ite.quantity,
            };
        });

        let order = {
            first_name: firstName,
            last_name: lastName,
            shop_name: shopName,
            email_address: email,
            phone_number: phone,
            address: address,
            delivery_charges: deliveryCharges,
            total:totalAmount+parseFloat(deliveryCharges),
            products: orderItems,
        };


        // console_log(order);

        let formData = new FormData();
        formData.append('finalOrder', JSON.stringify(order));

        isNetConnected()
            .then(res => {
                getDataWithToken(MyUrls.place_order_url, 'POST', formData, setIsLoading)
                    .then(res => {
                        console_log(res);
                        if (res.status){
                            actionAlert('Order placed successfully',()=>{
                                clearKey(Keys.cart_key)
                                    .then(res=>navigation.pop())
                                    .catch(err=>console_log(err))
                            },'Thank you'
                            )
                        }
                    })
                    .catch(err => errorAlert(err));

            })
            .catch(err => errorAlert(err));


    };


    const UserInfo = (props) => {
        return (
            <View style={styles.totalAmountContainer}>
                <AppText style={styles.headingText}>{props.title}</AppText>
                <AppText style={styles.valueText}>{props.value}</AppText>
            </View>
        );
    };
    return (
        <MyBackgroundImage isBottom={false}>
            <TopBar title={'Checkout'} backButton={() => navigation.pop()}/>

            <ScrollView style={{flex: 1}}>
                <View style={{justifyContent: 'flex-start', paddingBottom: 0}}>

                    <FlatList
                        style={styles.flatListStyle}
                        data={cartItems}
                        keyExtractor={(item, index) => item.product.id.toString()}
                        numColumns={1}
                        bounces={false}
                        renderItem={({item, index}) => (
                            <CheckoutProduct data={item}/>
                        )}
                        // ListFooterComponent={
                        //     () => {
                        //         if (totalAmount !== '') {
                        //             return (
                        //                 <View style={styles.totalAmountContainer}>
                        //                     <AppText style={styles.totalAmountText}>Total Amount</AppText>
                        //                     <AppText style={styles.totalAmountText}>{totalAmount}$</AppText>
                        //                 </View>);
                        //         } else {
                        //             return (<View></View>);
                        //         }
                        //     }
                        // }
                    />
                    <UserInfo title={'Delivery Charges'} value={'£'+deliveryCharges}/>
                    <UserInfo title={'Total Amount'} value={'£'+(parseFloat(totalAmount)+ parseFloat(deliveryCharges)).toFixed(2)}/>
                    <UserInfo title={'Name'} value={firstName + ' ' + lastName}/>
                    <UserInfo title={'Shop name'} value={shopName}/>
                    <UserInfo title={'Email'} value={email}/>
                    <UserInfo title={'Phone'} value={phone}/>

                    <View style={[styles.totalAmountContainer,{flexDirection: 'column'}]}>
                        <AppText style={styles.headingText}>Address</AppText>
                        <View style={[{flex:2,marginTop: 5,backgroundColor: Colors.home_widget_background_color}]}>
                            <TextInput onChangeText={(email) => setAddress(email)}
                                       value={address}
                                       placeholder={'Address'}
                                       multiline={true}
                                       autoCapitalize='none'
                                       keyboardType={'default'}
                                       style={GeneralStyles.inputField}/>
                        </View>
                    </View>


                    <MyTextButton
                        buttonText={'PLACE ORDER'}
                        buttonTextStyle={{color: Colors.normal_text_color}}
                        onPress={placeOrder}
                        buttonContainerStyle={{margin: dimen.app_padding, padding: dimen.app_padding}}
                    />
                </View>
            </ScrollView>


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
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: dimen.app_padding,
        marginBottom: 0,
        padding: dimen.app_padding,
        backgroundColor: Colors.bottom_bar_background_color,

    },
    totalAmountText: {
        flex: 1,
        fontSize: 16,
        color: Colors.normal_text_color,
    },
    headingText: {
        flex: 1.3,
        fontSize: 16,
        color: Colors.normal_text_color,
    },
    valueText: {
        flex: 1.7,
        fontSize: 16,
        color: Colors.normal_text_color,
    },
    flatListStyle:{
        borderWidth: 1, margin: dimen.app_padding,
        borderColor: Colors.primary_color, paddingBottom: dimen.app_padding,
        borderRadius: 5,
    },
});
