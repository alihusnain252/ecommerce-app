import React, {useState, useEffect} from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';
import AppText from './AppText';
import dimen from '../Styles/Dimen';
import Colors from '../Styles/Colors';
import {MyImage} from './MyImageButton';
import {console_log} from '../Classes/auth';
import MyTextButton from './MyTextButton';
import {CheckBox} from './PackageCard';


export const VendorOffersCard = (props) => {

        const [selected, setSelected] = useState(false);
        useEffect(() => {
            setSelectedStatus(props.selectAll);
        }, [props.selectAll]);

        const _onPress = () => {
            props.editOfferPress(props.data);
        };
        const selectPress = (selected) => {
            props.onSelection(props.data, selected);
        };

        const setSelectedStatus = (selectStatus) => {
            setSelected(selectStatus);
            selectPress(selectStatus);
        };

        return (
            <View onPress={_onPress}>
                <View style={styles.mainContainer}>
                    <View style={styles.topButtonContainer}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {props.requestId !== 0 &&
                            <CheckBox status={selected} setStatus={() => setSelectedStatus(!selected)}
                                      style={styles.selectChecboxStyle}/>}

                            <View style={styles.isFeaturedMainContainer}>
                                {props.data.featured === '1' &&
                                <View style={styles.isFeaturedContainer}>
                                    <Image source={require('../Asset/tick.png')}
                                           tintColor={Colors.primary_color}
                                           style={styles.checboxStyle}/>
                                    <AppText style={styles.featuredTextStyle}>Featured</AppText>
                                </View>}
                                {props.data.post_on_instalment === '1' &&
                                <View style={[styles.isFeaturedContainer, {marginLeft: dimen.home_item_padding}]}>
                                    <Image source={require('../Asset/tick.png')}
                                           tintColor={Colors.primary_color}
                                           style={styles.checboxStyle}/>
                                    <AppText style={styles.featuredTextStyle}>Posted on: </AppText>
                                    <AppText style={styles.featuredInstalmentTextStyle}>instalment.pk</AppText>
                                </View>}
                            </View>
                        </View>

                        <MyTextButton
                            onPress={_onPress}
                            buttonText={'Edit'}
                            buttonTextStyle={{fontSize: 12}}
                            buttonContainerStyle={{padding: 5, paddingLeft: 15, paddingRight: 15}}/>
                    </View>
                    <View style={styles.containerStyle}>
                        <View style={styles.offerValueContainer}>
                            <AppText style={styles.headingTextStyle}>Advance</AppText>
                            <View style={styles.offerValueCenterBorder}/>
                            <AppText style={styles.nonHeadingTextStyle}>{parseFloat(props.data.Advance)}</AppText>
                        </View>
                        <View style={styles.offerValueVerticalBorder}/>
                        <View style={styles.offerValueContainer}>
                            <AppText style={styles.headingTextStyle}>Months</AppText>
                            <View style={styles.offerValueCenterBorder}/>
                            <AppText style={styles.nonHeadingTextStyle}>{parseFloat(props.data.month)}</AppText>
                        </View>
                        <View style={styles.offerValueVerticalBorder}/>
                        <View style={styles.offerValueContainer}>
                            <AppText style={styles.headingTextStyle}>Instalment</AppText>
                            <View style={styles.offerValueCenterBorder}/>
                            <AppText style={styles.nonHeadingTextStyle}>{parseFloat(props.data.installment)}</AppText>
                        </View>
                        <View style={styles.offerValueVerticalBorder}/>
                        <View style={styles.offerValueContainer}>
                            <AppText style={styles.headingTextStyle}>Total</AppText>
                            <View style={styles.offerValueCenterBorder}/>
                            <AppText style={styles.nonHeadingTextStyle}>{parseFloat(props.data.total_price)}</AppText>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
;

const styles = StyleSheet.create({
    mainContainer: {
        marginLeft: dimen.app_padding,
        marginRight: dimen.app_padding,
        marginTop: dimen.app_padding,
        marginBottom: dimen.home_item_padding,
    },
    topButtonContainer: {flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'},
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        marginTop: dimen.home_item_padding,
        borderColor: Colors.light_border_color,
        borderRadius: dimen.app_padding,
        borderWidth: 1,
        // padding: 5,
        backgroundColor: Colors.home_widget_background_color,
    },
    offerValueContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    offerValueCenterBorder: {height: 1, width: '100%', backgroundColor: Colors.border_color},
    offerValueVerticalBorder: {width: 1, height: '100%', backgroundColor: Colors.border_color},
    headingTextStyle: {
        fontSize: 10,
        fontWeight: 'bold',
        margin: dimen.app_padding - dimen.home_item_padding,
    },
    nonHeadingTextStyle: {
        fontSize: 10,
        // fontWeight: 'bold',
        margin: dimen.app_padding - dimen.home_item_padding,
    },


    imageContainer: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.light_border_color,
        borderRadius: dimen.app_padding,
        borderWidth: 1,
        overflow: 'hidden',
        padding: 5,


    },
    nameContainer: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 7,
    },
    moreContainer: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    offerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 7,
        paddingLeft: 0,
        // backgroundColor:'yellow'

    },
    moreTextStyle: {
        color: Colors.primary_color,
        fontSize: 10,
        borderBottomWidth: 1,
        borderColor: Colors.primary_color,
    },
    nameHeadingTextStyle: {
        color: Colors.normal_text_color,
        fontSize: 12,
        fontWeight: 'bold',
    },
    nameTextStyle: {
        color: Colors.normal_text_color,
        fontSize: 12,
    },
    offersTextStyle: {
        color: Colors.normal_text_color,
        fontSize: 11,
        // fontWeight: 'bold'
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
        height: 100,
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


    isFeaturedMainContainer: {
        // flex:1,
        // paddingTop:dimen.app_padding,
        // paddingBottom:dimen.app_padding,
        marginLeft: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    isFeaturedContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    featuredTextStyle: {
        fontSize: 10,
        fontWeight: 'bold',
        color: Colors.normal_text_color,
        marginLeft: dimen.home_item_padding,
    },
    featuredInstalmentTextStyle: {
        fontSize: 10,
        fontWeight: 'bold',
        color: Colors.primary_color,
        marginLeft: dimen.home_item_padding,
    },
    checboxStyle: {
        width: 10,
        height: 10,
    },

    selectChecboxStyle: {
        width: 20,
        height: 20,
    },

});


