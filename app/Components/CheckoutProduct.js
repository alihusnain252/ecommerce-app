import * as React from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';
import AppText from './AppText';
import dimen, {deviceWidth} from '../Styles/Dimen';
import Colors from '../Styles/Colors';
import MyImageButton, {MyImage} from './MyImageButton';
import {console_log} from '../Classes/auth';


export const CheckoutProduct = (props) => {



    return (
        <View >
            <View style={styles.dataContainer}>
                <View style={styles.productDetailContainer}>

                    <AppText style={styles.nameText}>
                        {props.data.product.name}
                    </AppText>
                    <View style={[styles.detailContainer, {flexDirection: 'row'}]}>
                        <AppText style={styles.detailHeadingText}>
                            Price Per Box:{' '}
                        </AppText>
                        <AppText style={styles.addressText}>
                            £{props.data.product.price_per_box}
                        </AppText>
                    </View>
                    <View style={[styles.detailContainer, {flexDirection: 'row'}]}>
                        <AppText style={styles.detailHeadingText}>
                           Box Quantity:{' '}
                        </AppText>
                        <AppText style={styles.addressText}>
                            {props.data.quantity}
                        </AppText>
                    </View>
                    <View style={[styles.detailContainer, {flexDirection: 'row'}]}>
                        <AppText style={styles.detailHeadingText}>
                            Total Amount{'('+props.data.quantity+' x '+ props.data.product.price_per_box + '): '}
                        </AppText>
                        <AppText style={styles.addressText}>
                            £{(parseInt(props.data.quantity) * parseFloat(props.data.product.price_per_box))}
                        </AppText>
                    </View>

                </View>

            </View>

        </View>
    );

};

const styles = StyleSheet.create({


    productDetailContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // backgroundColor:'red',
        marginLeft: dimen.small_padding,
        padding: dimen.small_padding,

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
        fontSize: 18,
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
        // borderWidth: 1,
        // borderColor: Colors.primary_color,
        // borderRadius: 5,
        flex: 1,
        flexDirection: 'row',
        margin: dimen.app_padding,
        marginBottom: 0,
        padding: 0,
        backgroundColor: Colors.bottom_bar_background_color,

    },
    imageContainer: {
        // flex:1,
        // justifyContent: 'space-between',
        // alignItems: 'center',
        width: (deviceWidth / 3) - 50,
        height: (deviceWidth / 2) - 50,

    },
    imageStyle: {
        width: (deviceWidth / 3) - 50,
        height: (deviceWidth / 2) - 50,
        resizeMode: 'contain',

    },
    detailContainer: {
        flex: 1,
        // flexDirection:'row',
        marginTop: 5,
        justifyContent:'center',alignItems: 'center'
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


});


