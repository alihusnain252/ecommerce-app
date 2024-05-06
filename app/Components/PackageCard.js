import {ActivityIndicator, Image, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colors from '../Styles/Colors';
import dimen from '../Styles/Dimen';
import AppText from './AppText';
import {MyImage} from './MyImageButton';
import {console_log} from '../Classes/auth';


export const CheckBox = (props) => {
    return (
        <View>
            {!props.status &&
            <TouchableOpacity onPress={props.setStatus}>
                <View style={[styles.checboxContainer, props.style !== null ? props.style : {}]}>
                </View>
            </TouchableOpacity>
            }
            {props.status &&
            <TouchableOpacity onPress={props.setStatus}>
                <View style={[styles.checkboxContainerSelected, props.style !== null ? props.style : {}]}>
                    <MyImage source={require('../Asset/tick.png')}
                           tintColor={Colors.button_text_color}
                           imageContainerStyle={styles.tickImageStyle}/>
                </View>
            </TouchableOpacity>
            }
        </View>
    );
};

export const PackageCard = (props) => {

    // console_log(props.data);
    const [checkBox, setCheckBox] = useState(props.selectedId === props.data.id);

    useEffect(() => {
        setCheckBox(props.selectedId === props.data.id);
    }, [props.selectedId]);

    return (
        <TouchableWithoutFeedback onPress={() => props.setSelectedPackage(props.data.id)}>
            <View style={{
                borderRadius: dimen.border_radius,
                overflow: 'hidden',
                marginTop: dimen.app_padding,
                borderWidth: 1,
                borderColor: Colors.border_color,
            }}>

                <View style={[{flexDirection: 'row', flex: 1, backgroundColor: '#cbcbcb'},
                    props.data.name === 'Silver' ? {backgroundColor: '#b7c9dd'} :
                        props.data.name === 'Gold' ? {backgroundColor: '#f6ecd3'} :
                            props.data.name === 'Basic' ? {backgroundColor: '#cdedde'} : {}]}>

                    <View style={styles.firstBox}>
                        <CheckBox
                            style={{width: 14, height: 14, borderRadius: 7}}
                            status={checkBox}
                            setStatus={() => {
                            }}
                        />
                    </View>
                    <View style={styles.secondBox}>
                        <AppText>
                            Account Type: {' '}
                        </AppText>
                        <AppText style={{fontWeight: 'bold'}}>
                            {props.data.name}
                        </AppText>
                    </View>

                    <View style={{width: 1, backgroundColor: Colors.border_color, height: '100%'}}/>

                    <View style={styles.thirdBox}>
                        <AppText style={{fontWeight: 'bold', color: '#0f9c56'}}>
                            Rs. {props.data.price}
                        </AppText>
                    </View>
                </View>
                <View style={{height: 1, width: '100%', backgroundColor: Colors.light_border_color}}/>


                <View style={{flexDirection: 'row', flex: 1, backgroundColor: Colors.home_background_color}}>
                    <View style={styles.firstBox}/>

                    <View style={styles.secondBox}>
                        <AppText>
                            Number of Featured Ads
                        </AppText>
                    </View>

                    <View style={{width: 1, backgroundColor: Colors.border_color, height: '100%'}}/>
                    <View style={styles.thirdBox}>
                        <AppText style={{fontWeight: 'bold'}}>
                            {props.data.no_of_feature}
                        </AppText>
                    </View>
                </View>
                <View style={{height: 1, width: '100%', backgroundColor: Colors.light_border_color}}/>
                <View style={{flexDirection: 'row', flex: 1, backgroundColor: Colors.home_background_color}}>
                    <View style={styles.firstBox}/>

                    <View style={styles.secondBox}>
                        <AppText>
                            Push offers Credit
                        </AppText>
                    </View>
                    <View style={{width: 1, backgroundColor: Colors.border_color, height: '100%'}}/>

                    <View style={styles.thirdBox}>
                        <AppText style={{fontWeight: 'bold'}}>
                            {props.data.no_of_post}
                        </AppText>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};


const styles = StyleSheet.create({

    firstBox: {flex: 0.2, margin: 10, marginRight: 0},
    secondBox: {flex: 1.8, flexDirection: 'row', margin: 10},
    thirdBox: {flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 10},


    boxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    statusBoxActive: {
        width: 30,
        height: 10,
        backgroundColor: Colors.primary_color,
        marginLeft: 10,
        borderRadius: 3,
    },
    statusBoxNonActive: {
        width: 30,
        height: 10,
        backgroundColor: Colors.signup_input_text_background_color,
        marginLeft: 10,
        borderRadius: 3,
    },


    checboxContainer: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: Colors.primary_color,
    },
    checkboxContainerSelected: {
        width: 20,
        height: 20,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary_color,
    },
    tickImageStyle: {width: 9, height: 9, alignSelf: 'center', resizeMode: 'contain'},
    checkBoxMainContainer: {marginRight: 5, justifyContent: 'center', alignItems: 'center'},

});

