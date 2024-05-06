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
import dimen from '../Styles/Dimen';
import Colors from '../Styles/Colors';
import {MyImage} from './MyImageButton';
import {console_log} from '../Classes/auth';


export const AppointmentCard = (props) => {
    const _onPress = () => {
        props.onPress(props.data);
    };

    if (props.data.status === 'current') {
        return (
            <TouchableWithoutFeedback onPress={_onPress}>
                <View style={styles.mainContainer}>
                    <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
                        <View style={[styles.firstDot]}/>
                        <View style={[styles.verticalLine, props.isLast ? {marginBottom: 15} : {}]}/>
                    </View>

                    <View style={[styles.dataContainer,{backgroundColor:Colors.current_appoint_color}]}>
                        <View style={styles.dateContainer}>
                            <AppText style={[styles.dayText,styles.currentAppTextStyle]}>
                                WED
                            </AppText>
                            <AppText style={[styles.dateText,styles.currentAppTextStyle]}>
                                25
                            </AppText>
                            <AppText style={[styles.monthText,styles.currentAppTextStyle]}>
                                Mar, 2020
                            </AppText>
                        </View>

                        <View style={styles.appDetailContainer}>
                            <View style={styles.timeStatusContainer}>
                                <AppText style={[styles.timeText,styles.currentAppTextStyle]}>
                                    09:00am - 10:00am
                                </AppText>
                                <AppText style={[styles.timeText,styles.currentAppTextStyle]}>
                                    Current
                                </AppText>
                            </View>
                            <AppText style={[styles.nameText,styles.currentAppTextStyle]}>
                                Joe Smith
                            </AppText>
                            <AppText style={[styles.addressText,styles.currentAppTextStyle]}>
                                1025 West Main Street, Tempa Fl 33160
                            </AppText>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    } else if (props.data.status === 'upcoming') {
        return (
            <TouchableWithoutFeedback onPress={_onPress}>
                <View style={styles.mainContainer}>
                    <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
                        <View style={[styles.firstDot]}/>
                        <View style={[styles.verticalLine, props.isLast ? {marginBottom: 15} : {}]}/>
                    </View>

                    <View style={styles.dataContainer}>
                        <View style={styles.dateContainer}>
                            <AppText style={styles.dayText}>
                                WED
                            </AppText>
                            <AppText style={styles.dateText}>
                                25
                            </AppText>
                            <AppText style={styles.monthText}>
                                Mar, 2020
                            </AppText>
                        </View>

                        <View style={styles.appDetailContainer}>
                            <View style={styles.timeStatusContainer}>
                                <AppText style={styles.timeText}>
                                    09:00am - 10:00am
                                </AppText>
                                <AppText style={styles.timeText}>
                                    Upcoming
                                </AppText>
                            </View>
                            <AppText style={styles.nameText}>
                                Joe Smith
                            </AppText>
                            <AppText style={styles.addressText}>
                                1025 West Main Street, Tempa Fl 33160
                            </AppText>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }else if (props.data.status === 'completed') {
        return (
            <TouchableWithoutFeedback onPress={_onPress}>
                <View style={styles.mainContainer}>
                    <View style={{alignItems: 'center', justifyContent: 'flex-start'}}>
                        <View style={[styles.firstDot,{backgroundColor:Colors.completed_appoint_color}]}/>
                        <View style={[styles.verticalLine, props.isLast ? {marginBottom: 15} : {}]}/>
                    </View>

                    <View style={[styles.dataContainer,{borderColor:Colors.completed_appoint_color}]}>
                        <View style={styles.dateContainer}>
                            <AppText style={[styles.dayText,styles.completedAppTextStyle]}>
                                WED
                            </AppText>
                            <AppText style={[styles.dateText,styles.completedAppTextStyle]}>
                                25
                            </AppText>
                            <AppText style={[styles.monthText,styles.completedAppTextStyle]}>
                                Mar, 2020
                            </AppText>
                        </View>

                        <View style={styles.appDetailContainer}>
                            <View style={styles.timeStatusContainer}>
                                <AppText style={[styles.timeText,styles.completedAppTextStyle]}>
                                    09:00am - 10:00am
                                </AppText>
                                <AppText style={[styles.timeText,styles.completedAppTextStyle]}>
                                    Completed
                                </AppText>
                            </View>
                            <AppText style={[styles.nameText,styles.completedAppTextStyle]}>
                                Joe Smith
                            </AppText>
                            <AppText style={[styles.addressText,styles.completedAppTextStyle]}>
                                1025 West Main Street, Tempa Fl 33160
                            </AppText>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
};

const styles = StyleSheet.create({

    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    appDetailContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        // backgroundColor:'red',
        marginLeft: dimen.small_padding,

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
        marginBottom: dimen.app_padding,
        padding: dimen.home_item_padding,
    },
    dateContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dayText: {
        fontSize: 11,
        color: Colors.normal_text_color,
        fontWeight: 'bold',
        includeFontPadding: false,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    currentAppTextStyle:{
        color:Colors.current_appoint_text_color,
    },
    completedAppTextStyle:{
        color:Colors.completed_appoint_color,
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


