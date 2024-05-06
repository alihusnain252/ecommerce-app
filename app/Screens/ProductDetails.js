import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image,Alert, ScrollView,KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import AppText from '../Components/AppText';
import MyBackgroundImage from '../Components/MyBackgroundImage';
import TopBar from '../Components/TopBar';
import dimen, {deviceWidth} from '../Styles/Dimen';
import Colors from '../Styles/Colors';
import MyImageButton, {MyImage} from '../Components/MyImageButton';
import MyTextButton from '../Components/MyTextButton';
import { clearAllData, console_log, errorAlert, getObject, saveObject, successAlert} from '../Classes/auth';
import {TextInput} from 'react-native-gesture-handler';
import {GeneralStyles} from '../Styles/GeneralStyles';
import {Keys} from '../Classes/Keys';


export const ProductDetails = ({route, navigation}) => {

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState('1');

    useEffect(() => {
        let {product} = route.params;
        // console_log(product.image);
        setProduct(product);
    }, []);

    const addToCart = () => {
        let q = parseInt(quantity);
        if (q === undefined || q < 1) {
            errorAlert('Invalid quantity');
            return;
        }
        getObject(Keys.cart_key)
            .then(res => {
                if (res.status) {
                    let pro = res.data.find(item => item.product.id === product.id);
                    if (pro !== undefined) {
                        pro.quantity = parseInt(pro.quantity) + parseInt(quantity);
                        saveObject(Keys.cart_key, res.data);
                        actionAlert('Successfully added',()=>navigation.pop(),'Thank you');

                    } else {
                        saveObject(Keys.cart_key, res.data.concat([{product: product, quantity: parseInt(quantity)}]));
                        actionAlert('Successfully added',()=>navigation.pop(),'Thank you');

                    }

                } else {
                    saveObject(Keys.cart_key, [{product: product, quantity: parseInt(quantity)}]);
                    actionAlert('Successfully added',()=>navigation.pop(),'Thank you');
                }
            });
    };


    const actionAlert = () => {
        Alert.alert(
            'Alert',
            "Successfully added",
            [
                {
                    text: 'Continue Shoping',
                    onPress: () => navigation.pop(),
                },
                {
                    text: 'Checkout',
                    onPress: () => navigation.navigate('Cart'),
                },

            ],
            {cancelable: false});
    };


    const buyNow = () => {
        navigation.navigate('Cart')
    };

    return (
        <MyBackgroundImage isBottom={true}>
            <TopBar title={'Product Details'} backButton={() => navigation.pop()}/>
            {product !== null &&
            <ScrollView style={{}}>
                <View style={{flex: 1}}>
                    <Image source={{uri: product.image}}
                           style={styles.imageStyle}
                    />
                    <View style={styles.productDetailContainer}>

                        <AppText style={styles.nameText}>
                            {product.name}
                        </AppText>

                        <View style={[styles.detailContainer, {flexDirection: 'row'}]}>
                            <AppText style={styles.detailHeadingText}>
                                Price Per Box:{' '}
                            </AppText>
                            <AppText style={styles.addressText}>
                                {'£' + product.price_per_box}
                            </AppText>
                        </View>
                        <View style={[styles.detailContainer, {flexDirection: 'row'}]}>
                            <AppText style={styles.detailHeadingText}>
                                Quantity Per Box:{' '}
                            </AppText>
                            <AppText style={styles.addressText}>
                                {product.items_per_box}
                            </AppText>
                        </View>

                        <View style={styles.detailContainer}>
                            <AppText style={styles.detailHeadingText}>
                                Categories:{' '}
                            </AppText>
                            <AppText style={styles.addressText}>
                                {product.categories}
                            </AppText>
                        </View>

                        <View style={styles.detailContainer}>
                            <AppText style={styles.detailHeadingText}>
                                Heat Rating:{' '}
                            </AppText>
                            <AppText style={styles.addressText}>
                                {product.heat_of_product}
                            </AppText>
                        </View>


                        <View style={[styles.detailContainer]}>
                            <AppText style={styles.detailHeadingText}>
                                Description:{' '}
                            </AppText>
                            <AppText style={styles.addressText}>
                                {product.description}
                            </AppText>
                        </View>
                    </View>
                </View>
            </ScrollView>
            }


            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={{}}
                enabled={Platform.OS == 'ios' }
            >
                <View style={styles.bottomButtonsContainer}>
                    <View style={styles.quantityContainer}>
                        <AppText style={{flex: 1, fontSize: 18}}>Quantity: </AppText>
                        <View style={{flex: 1}}>
                            <TextInput onChangeText={(text) => setQuantity(text)}
                                       value={quantity}
                                       placeholder={'Quantity'}
                                       autoCapitalize='none'
                                       returnKeyLabel={'done'}
                                       keyboardType={'number-pad'}
                                       style={styles.quantityFieldStyle}/>
                        </View>

                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                        <View style={{flex: 1}}>
                            <MyTextButton
                                buttonText={'ADD TO CART'}
                                buttonTextStyle={{color: Colors.normal_text_color}}
                                onPress={addToCart}
                                buttonContainerStyle={{
                                    margin: dimen.app_padding,
                                    padding: dimen.app_padding,
                                    backgroundColor: Colors.panic_switch_bg_color,
                                }}
                            />
                        </View>

                    </View>
                </View>
            </KeyboardAvoidingView>


            {/*<View style={styles.bottomButtonsContainer}>*/}
            {/*    <View style={styles.quantityContainer}>*/}
            {/*        <AppText style={{flex: 1, fontSize: 18}}>Quantity: </AppText>*/}
            {/*        <View style={{flex: 1}}>*/}
            {/*            <TextInput onChangeText={(text) => setQuantity(text)}*/}
            {/*                       value={quantity}*/}
            {/*                       placeholder={'Quantity'}*/}
            {/*                       autoCapitalize='none'*/}
            {/*                       keyboardType={'numeric'}*/}
            {/*                       style={styles.quantityFieldStyle}/>*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>*/}
            {/*        <View style={{flex:1,}}>*/}
            {/*            <MyTextButton*/}
            {/*                buttonText={'ADD TO CART'}*/}
            {/*                buttonTextStyle={{color: Colors.normal_text_color}}*/}
            {/*                onPress={addToCart}*/}
            {/*                buttonContainerStyle={{margin: dimen.app_padding, padding: dimen.app_padding,backgroundColor:Colors.panic_switch_bg_color,}}*/}
            {/*            />*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*</View>*/}
        </MyBackgroundImage>
    );

};


const styles = StyleSheet.create({


    productDetailContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // backgroundColor:'red',
        marginLeft: dimen.small_padding,
        marginRight: dimen.small_padding,
        padding: dimen.app_padding,


    },
    bottomButtonsContainer:{
        backgroundColor: Colors.bottom_bar_background_color,
        padding: dimen.app_padding,
        paddingTop: dimen.app_padding,
        // marginTop: dimen.app_padding,
    },
    timeStatusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: Colors.border_color,
        paddingBottom: dimen.home_item_padding,

    },
    timeText: {
        fontSize: 12,
        color: Colors.normal_text_color,
    },
    nameText: {
        fontSize: 24,
        color: Colors.primary_color,
        fontWeight: 'bold',
    },
    detailHeadingText: {
        fontSize: 14,
        color: Colors.normal_text_color,
        fontWeight: 'bold',
    },
    addressText: {
        fontSize: 13,
        color: Colors.normal_text_color,
        // fontWeight:'bold',
    },
    firstDot: {
        backgroundColor: Colors.primary_color,
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 8,
        marginBottom: 0,
        marginTop: 0,
        marginRight: 8,
    },
    secondDot: {borderColor: Colors.primary_color, borderWidth: 1, backgroundColor: Colors.home_background_color},
    verticalLine: {
        width: 1,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.vertical_line_color,
    },
    dataContainer: {
        borderWidth: 1,
        borderColor: Colors.primary_color,
        borderRadius: 5,
        flex: 1,
        margin: dimen.app_padding,
        padding: dimen.home_item_padding,
    },
    imageContainer: {
        // flex:1,
        justifyContent: 'center',
        alignItems: 'center',

        width: deviceWidth - dimen.app_padding * 4,
        height: deviceWidth - dimen.app_padding * 4,
    },
    imageStyle: {
        width: deviceWidth - dimen.app_padding * 4,
        height: (deviceWidth / 1.5) - dimen.app_padding * 4,
        alignSelf: 'center',
        resizeMode: 'contain',
        // borderWidth:1,
        // borderRadius:dimen.app_padding,
        // borderColor:Colors.primary_color,
        marginTop: dimen.app_padding,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.primary_color,

    },
    detailContainer: {
        flex: 1,
        // flexDirection: 'row',
        marginTop: dimen.small_padding,
    },

    dayText: {
        fontSize: 11,
        color: Colors.normal_text_color,
        fontWeight: 'bold',
        includeFontPadding: false,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    currentAppTextStyle: {
        color: Colors.current_appoint_text_color,
    },
    completedAppTextStyle: {
        color: Colors.completed_appoint_color,
    },
    dateText: {
        fontSize: 22,
        color: Colors.primary_color,
        fontWeight: 'bold',
        includeFontPadding: false,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    monthText: {
        fontSize: 11,
        color: Colors.normal_text_color,
        fontWeight: 'bold',
        includeFontPadding: false,
        textAlignVertical: 'center',
        textAlign: 'center',
    },

    quantityFieldStyle: {
        color: Colors.normal_text_color,
        borderWidth: 1,
        borderColor: Colors.primary_color,
        paddingLeft: 30,
        borderRadius: 25,
        padding: dimen.small_padding,
    },
    quantityContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        margin: dimen.app_padding,
        marginBottom: 0,
        marginTop: 0,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },


});
