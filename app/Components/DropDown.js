import {ActivityIndicator, View, StyleSheet, TouchableOpacity} from 'react-native';
import React,{useState,useEffect} from 'react';
import Colors from '../Styles/Colors';
import dimen from '../Styles/Dimen';
import {MyImage} from './MyImageButton';
import {Picker} from '@react-native-community/picker';
import {console_log} from '../Classes/auth';


export const DropDownBackup = (props) => {

    let dropDownItems = props.itemsArray.map((s, i) => {
        return <Picker.Item key={i} value={s} label={s.title}/>;
    });

    const [sValue,setSValue]=useState(props.selectedItem);

    useEffect(()=>{

        setSValue(props.selectedItem)
    },[props.selectedItem])

    return (
        <View style={[styles.dropDownMainContainer, props.style]}>
            <Picker
                style={[{flex: 1, backgroundColor: Colors.signup_input_text_background_color}]}
                mode={'dialog'}
                onValueChange={(value, index) => {
                    console_log('value change' + JSON.stringify(value));

                    props.setSelectedItems(value);
                    // setSValue(value)
                    if (props.onSelection !== undefined) {
                        // props.onSelection(value);

                    }
                }}
                selectedValue={props.selectedItem}
                // selectedValue={sValue}
                itemStyle={{backgroundColor: Colors.primary_color}}
            >
                {dropDownItems}
            </Picker>
            <MyImage source={require('../Asset/down.png')}
                     tintColor={Colors.primary_color}
                     imageContainerStyle={styles.dropdownStyle}/>
        </View>
    );
};

export const DropDown = (props) => {

    let dropDownItems = props.itemsArray.map((s, i) => {
        return <Picker.Item key={i} value={s} label={s.title}/>;
    });

    return (
        <View style={[styles.dropDownMainContainer, props.style]}>
            <Picker
                style={[{flex: 1, backgroundColor: Colors.signup_input_text_background_color}]}
                // prompt={'Select Value'}
                mode={'dialog'}

                onValueChange={(value, index) => {
                    props.setSelectedItems(value);
                    if (props.onSelection !== undefined) {
                        props.onSelection(value);
                    }
                }}

                selectedValue={props.selectedItem}


                itemStyle={{backgroundColor: Colors.primary_color}}
            >

                {dropDownItems}


            </Picker>


            <MyImage source={require('../Asset/down.png')}
                     tintColor={Colors.primary_color}
                     imageContainerStyle={styles.dropdownStyle}/>
        </View>
    );
};
export const DropDownTime = (props) => {

    let dropDownItems = props.itemsArray.map((s, i) => {
        return <Picker.Item style={{backgroundColor: 'pink'}} key={i} value={s} label={s.title}/>;
    });

    return (
        <View style={[styles.timedropDownMainContainer, props.style]}>
            <Picker
                style={[{width: 90, height: 20, marginTop: dimen.app_padding, marginBottom: dimen.app_padding}]}
                // prompt={'Select Value'}
                mode={'dialog'}
                onValueChange={(value, index) => {
                    props.setSelectedItems(value);
                    if (props.onSelection !== undefined) {
                        props.onSelection(value);
                    }
                }}
                selectedValue={props.selectedItem}
                itemStyle={{backgroundColor: 'yellow'}}
            >
                {dropDownItems}
            </Picker>
            {/*<MyImage source={require('../Asset/down.png')}*/}
            {/*         imageContainerStyle={styles.dropdownStyle}/>*/}
        </View>
    );
};


const styles = StyleSheet.create({
    dropDownMainContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderColor: Colors.primary_color,
        backgroundColor: Colors.signup_input_text_background_color,
        // borderWidth: 1,
        borderRadius: dimen.login_border_radius,
        paddingRight: dimen.app_padding,
        paddingLeft: dimen.app_padding,
        marginTop: 10,

    },
    dropdownStyle: {
        width: 14,
        height: 14,
    },

    usernameContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderColor: Colors.primary_color,
        backgroundColor: Colors.home_widget_background_color,
        borderWidth: 1,
        borderRadius: dimen.login_border_radius,
        paddingRight: dimen.app_padding,
        paddingLeft: dimen.app_padding,
    },

    timedropDownMainContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // borderColor: Colors.primary_color,
        // backgroundColor: Colors.image_background_color,
        // borderWidth: 1,
        // borderRadius: dimen.login_border_radius,
        // paddingRight: dimen.app_padding,
        // paddingLeft: dimen.app_padding,
        // marginTop: 10,

    },
    timedropdownStyle: {
        width: 14,
        height: 14,
    },

    timeusernameContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderColor: Colors.primary_color,
        backgroundColor: Colors.home_widget_background_color,
        borderWidth: 1,
        // borderRadius: dimen.login_border_radius,
        // paddingRight: dimen.app_padding,
        // paddingLeft: dimen.app_padding,
    },
});

