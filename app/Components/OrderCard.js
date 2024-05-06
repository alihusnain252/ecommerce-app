import React, {useEffect, useState} from 'react';
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
import {FlatList} from 'react-native-gesture-handler';


export const OrderCard = (props) => {

    const [expectedDate, setExpectedDate] = useState('');

    useEffect(() => {
        let date = new Date(props.data.booking_date);
        date.setDate(date.getDate() + 7);
        setExpectedDate(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());

    }, []);


    return (
        <View>
            <View style={styles.dataContainer}>
                <View style={styles.productDetailContainer}>

                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <AppText style={styles.detailHeadingText}>
                            Order Id:{' '}
                        </AppText>
                        <AppText style={styles.addressText}>
                            {props.data.order_id}
                        </AppText>
                    </View>

                    <View style={[styles.detailContainer, {flexDirection: 'row'}]}>
                        <AppText style={styles.detailHeadingText}>
                            Order Status:{' '}
                        </AppText>
                        <AppText style={styles.addressText}>
                            {props.data.order_status}
                        </AppText>
                    </View>

                    <View style={[styles.detailContainer, {flexDirection: 'row'}]}>
                        <AppText style={styles.detailHeadingText}>
                            Expected Delivery:{' '}
                        </AppText>
                        <AppText style={styles.addressText}>
                            {expectedDate}
                        </AppText>
                    </View>


                    <View style={[styles.detailContainer]}>
                        <AppText style={styles.detailHeadingText}>
                            Products:{' '}
                        </AppText>
                        <FlatList
                            style={{flex: 1}}
                            data={props.data.order_detail}
                            keyExtractor={(item, index) => item.id.toString()}
                            numColumns={1}
                            bounces={false}
                            renderItem={({item, index}) => {
                            return(
                                <View style={[{flex: 1,flexDirection:'row'}]}>
                                    <View>
                                        <Image
                                            source={{uri:item.product_detail.image}}
                                               style={{width:50,height:50, resizeMode: 'contain',}}
                                        />
                                    </View>
                                    <View style={{marginLeft: 10,}}>
                                        <AppText style={styles.detailHeadingText}>
                                            {item.name + ' '}
                                        </AppText>
                                        <AppText style={styles.addressText}>
                                            Total({item.quantity + ' X £' + item.amount + ''}): £{parseInt(item.quantity) * parseFloat(item.amount)}
                                        </AppText>
                                    </View>
                                </View>
                            )}}
                        />
                    </View>

                    <View style={[styles.detailContainer, {flexDirection: 'row'}]}>
                        <AppText style={styles.detailHeadingText}>
                            Total Amount:{' '}
                        </AppText>
                        <AppText style={styles.addressText}>
                            £{props.data.total}
                        </AppText>
                    </View>

                </View>


            </View>

        </View>
    );

};

const styles = StyleSheet.create({


    productDetailContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // backgroundColor:'red',
        marginLeft: dimen.small_padding,
        padding: dimen.app_padding,

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
        flexDirection: 'row',
        margin: dimen.app_padding,
        marginBottom: 0,
        padding: dimen.home_item_padding,
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


});


