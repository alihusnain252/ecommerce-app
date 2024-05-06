import React, {useState, useEffect} from 'react';

import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import AppText from './AppText';
import dimen from '../Styles/Dimen';
import Colors from '../Styles/Colors';
import {MyImage} from './MyImageButton';
import MyImageButton from './MyImageButton';
import {console_log} from '../Classes/auth';


export const WishListCard = (props) => {
    const [wish, setWish] = useState(true);
    const _onPress = () => {
        props.updateWishList(props.data);
        // setWish(!wish);
    };

    const callNowPress = () => {
        props.callNowPress(props.data);
        // setWish(!wish);
    };

    let productImage=null;
    if (props.data.get_all_offere_detail !==null)
     productImage = props.data.get_all_offere_detail.offere_master.product.product_image[0].product_image


    return (
        <View style={styles.containerStyle}>

            <View style={styles.upperContainer}>
                <View style={styles.imageContainer}>
                    <MyImage
                        // source={require('../Asset/vendor.png')}
                        source={productImage!==undefined && productImage!==null?{uri:productImage}:require('../Asset/vendor.png')}
                        imageContainerStyle={styles.imageStyle}
                    />
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.paymentInfoContainer}>
                        <View style={[styles.amountContainer, {flex: 1, flexGrow: 1}]}>
                            <AppText style={styles.amountTextHeading}>
                                Monthly
                            </AppText>
                            <AppText style={styles.amountTextSubHeading}>
                                {parseFloat(props.data.get_all_offere_detail.installment)}
                            </AppText>
                        </View>
                        <View style={[styles.amountContainer, {flex: .5, flexShrink: 1}]}>
                            <AppText style={styles.amountTextHeading}>
                                Month
                            </AppText>
                            <AppText style={styles.amountTextSubHeading}>
                                {parseFloat(props.data.get_all_offere_detail.month)}
                            </AppText>
                        </View>
                        <View style={[styles.amountContainer, {flex: .5, flexGrow: 1}]}>
                            <AppText style={styles.amountTextHeading}>
                                Advance
                            </AppText>
                            <AppText style={styles.amountTextSubHeading}>
                                {parseFloat(props.data.get_all_offere_detail.Advance)}
                            </AppText>
                        </View>
                        <View style={[styles.amountContainer, {flex: 1.5, flexGrow: 1}]}>
                            <AppText style={styles.amountTextHeading}>
                                Total Amount
                            </AppText>
                            <AppText style={styles.amountTextSubHeading}>
                                {parseFloat(props.data.get_all_offere_detail.total_price)}
                            </AppText>
                        </View>
                    </View>
                    <View style={styles.vendorInfoContainer}>
                        <View style={styles.vendorAddressContainer}>
                            <View style={styles.cashPriceContainer}>
                                <AppText style={styles.cashPriceTextStyle}>Cash Price: </AppText>
                                <AppText style={styles.cashPriceTextStyle}>
                                    {parseFloat(props.data.get_all_offere_detail.total_price)}
                                </AppText>
                            </View>
                            <View style={styles.cashPriceContainer}>
                                <AppText style={styles.cashPriceTextStyle}>Offer valid till: </AppText>
                                <AppText style={styles.cashPriceTextStyle}>
                                    {props.data.get_all_offere_detail.offere_valid_date}
                                </AppText>
                            </View>
                            <View>
                                <AppText numberOfLines={2}>
                                    {props.data.get_all_offere_detail.offere_master.vendor.base_address}
                                </AppText>
                            </View>
                        </View>
                        <View style={styles.callButtonContainer}>
                            <View style={styles.wishlistContainer}>
                                {wish &&
                                <MyImageButton onPress={_onPress}
                                               imageContainerStyle={styles.wishlistButtonStyle}
                                               source={require('../Asset/wish_fill.png')}
                                />
                                }
                                {!wish &&
                                <MyImageButton onPress={_onPress}
                                               imageContainerStyle={styles.wishlistButtonStyle}
                                               source={require('../Asset/wish_empty.png')}
                                />
                                }
                            </View>
                            <TouchableOpacity onPress={callNowPress} style={styles.callNowButtonContainer}>
                                <AppText style={styles.callNowButtonStyle}>Call Now </AppText>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>

            <View style={styles.horizontalLine}/>

            <View style={styles.lowerContainer}>

                <View style={styles.companyContainer}>
                    <AppText style={styles.bottomTextHeading} numberOfLines={1}>
                        { props.data.get_all_offere_detail.offere_master.product.product_name}
                    </AppText>
                    {/*<AppText style={styles.bottomTextSubHeading} numberOfLines={1}>*/}
                    {/*    Company*/}
                    {/*</AppText>*/}
                </View>

                <View style={styles.verticalLine}/>

                <View style={styles.othercompanyContainer}>
                    <AppText style={styles.bottomTextHeading} numberOfLines={1}>
                        {props.data.get_all_offere_detail.offere_master.vendor.company_name}

                    </AppText>
                    <AppText style={styles.bottomTextSubHeading} numberOfLines={1}>
                        {props.data.get_all_offere_detail.offere_master.vendor.first_name +' '}
                        {props.data.get_all_offere_detail.offere_master.vendor.last_name}

                    </AppText>
                </View>

                {/*<View style={styles.verticalLine}/>*/}

                {/*<View style={styles.othercompanyContainer}>*/}
                {/*    <AppText style={styles.bottomTextHeading} numberOfLines={1}>*/}
                {/*        Active Since*/}
                {/*    </AppText>*/}
                {/*    <AppText style={styles.bottomTextSubHeading} numberOfLines={1}>*/}
                {/*        20-12-19*/}
                {/*    </AppText>*/}
                {/*</View>*/}

            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        // borderWidth: 1,borderColor: 'black'
        margin: dimen.home_item_padding,
        borderColor: Colors.light_border_color,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: Colors.home_widget_background_color,
    },
    upperContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,

    },
    lowerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',

    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.light_border_color,
        borderRadius: 5,
        borderWidth: 1,
        overflow: 'hidden',
        padding: 5,
    },
    infoContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: Colors.light_border_color,
        // borderRadius: 5,
        // borderWidth:1,
        overflow: 'hidden',
        paddingLeft: 5,
        paddingRight: 5,
    },
    horizontalLine: {backgroundColor: Colors.light_border_color, flex: 1, height: 1},
    verticalLine: {backgroundColor: Colors.light_border_color, width: 1},
    companyContainer: {
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexGrow: 1,
        margin: 5,

    },
    othercompanyContainer: {
        flex:0.5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexShrink: 1,
        marginLeft: 10,
        margin: 5,


    },

    paymentInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    vendorInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:5,

    },
    callButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 1,
        width: '45%',
        height: '100%',
    },
    vendorAddressContainer: {
        justifyContent: 'center',
        alignItems: 'stretch',
        flexGrow: 1,
        width: '55%',
        height: '100%',
        marginRight: 10,

    },
    cashPriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cashPriceTextStyle: {
        color: Colors.normal_text_color,
        fontSize: 11,
        // borderWidth: 1,
        // borderColor: Colors.light_border_color,
        // borderRadius: 3,
        // width: '100%',
        paddingTop: 2,
        // backgroundColor:'red'

    },
    wishlistContainer: {
        // height: 40,
        // width: 40,
        // flex:1,
        backgroundColor: Colors.border_color,
        justifyContent: 'center',
        alignItems: 'center',
        width: '32%',
        height: '100%',
        borderRadius: 5,
        overflow: 'hidden',

    },
    callNowButtonContainer: {
        // height: 40,
        // flex:1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        width: '62%',
        height: '100%',
        borderRadius: 5,
        overflow: 'hidden',


    },
    callNowButtonStyle: {
        fontSize: 9,
        fontWeight: 'bold',
        margin: 5,
        color: Colors.button_text_color,
        // paddingTop:10,
        // paddingBottom:10,
    },
    wishlistButtonStyle: {
        width: 20,
        height: 20,

        // padding: 10,
    },

    amountContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginRight: 5,
    },

    nameContainer: {
        flex: 1.3,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
    },
    moreContainer: {
        flex: 0.4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    offerContainer: {
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,

    },
    moreTextStyle: {
        color: Colors.primary_color,
        fontSize: 10,
        borderBottomWidth: 1,
        borderColor: Colors.primary_color,
    },
    amountTextHeading: {
        color: Colors.primary_color,
        fontSize: 9,
        // textAlign:'center',
        // padding:10,
    },
    amountTextSubHeading: {
        color: Colors.highlight_text_color,
        fontSize: 9,
        borderWidth: 1,
        borderColor: Colors.light_border_color,
        borderRadius: 3,
        width: '100%',
        padding: 4,

    },


    bottomTextHeading: {
        color: Colors.primary_color,
        fontSize: 10,
        // textAlign:'center',
        // padding:10,
    },
    bottomTextSubHeading: {
        color: Colors.light_text_login,
        fontSize: 10,
        // textAlign:'center',
        // padding:10,
    },
    newOfferTextStyle: {
        color: 'red',
        fontSize: 10,
        textAlign: 'center',
        // padding:10,
    },
    imageStyle: {
        flex: 1,
        // width: 30,
        height: 40,
        resizeMode: 'contain',
        padding: 5,
        // margin: dimen.app_padding,

    },
    arrowImageStyle: {
        width: 10,
        height: 10,
        resizeMode: 'contain',
        marginLeft: 5,
        // margin: dimen.app_padding,

    },
    textContainer: {
        paddingTop: 10,
        paddingBottom: 5,
        // paddingRight:10,
    },
    textStyle: {
        fontSize: 10,
        color: Colors.primary_color,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },
    buttonContainer: {
        backgroundColor: Colors.primary_color,
        borderRadius: 10,
        width: '80%',
        // marginLeft:10,
        // marginRight:10,

    },
    buttonTextStyle: {
        fontSize: 13,
        color: Colors.button_text_color,
        textAlign: 'center',
        // backgroundColor:'red',
        margin: 3,
    },


});
