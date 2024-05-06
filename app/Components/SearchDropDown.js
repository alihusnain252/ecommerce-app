import {
    View,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback, BackHandler,
    TouchableOpacity, Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colors from '../Styles/Colors';
import dimen from '../Styles/Dimen';
import AppText from './AppText';
import MyImageButton, {MyImage} from './MyImageButton';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {console_log} from '../Classes/auth';
import MyTextButton from './MyTextButton';
import {InputFieldStyle} from '../Styles/TextStyles';
import {EmptyList} from './Loader';
import {CheckBox} from './PackageCard';
import {Keys} from '../Classes/Keys';
import {productDetailsStyle} from '../Classes/MyStrings';


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const dialogWidth = (deviceWidth - dimen.app_padding * 2);
const dialogHeight = (deviceHeight - dimen.app_padding * 4);

//drop down view for opening dropdown
export const DropDownView = (props) => {

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: Colors.signup_input_text_background_color,
                backgroundColor: Colors.signup_input_text_background_color,
                borderWidth: 1,
                borderRadius: dimen.login_border_radius,
                paddingRight: dimen.app_padding,
                paddingLeft: dimen.app_padding - dimen.home_item_padding,
                marginTop: 10,
                justifyContent: 'space-between',
            }}>
                <AppText style={{
                    padding: 8,
                    paddingTop: dimen.app_padding,
                    paddingBottom: dimen.app_padding,
                    marginLeft: 10,
                    fontSize: 16,
                }}>
                    {props.text}
                </AppText>
                <MyImage source={require('../Asset/down.png')}
                         tintColor={Colors.primary_color}
                         imageContainerStyle={{width: 14, height: 14}}/>
            </View>
        </TouchableWithoutFeedback>
    );
};
export const DropDownSmallView = (props) => {

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={{
                // flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: Colors.border_color,
                backgroundColor: Colors.signup_input_text_background_color,
                borderWidth: 1,

                borderRadius: dimen.login_input_border_radius_font,
                paddingRight: dimen.small_padding,
                paddingLeft: dimen.small_padding,
                padding:0,
                marginTop: 10,
                marginLeft: 5,
                justifyContent: 'space-between',
            }}>
                <AppText style={{
                    padding: 10,
                    paddingLeft: 0,
                    paddingBottom: dimen.small_padding,
                    marginRight: 10,
                    fontSize: 16,
                }}>
                    {props.text}
                </AppText>
                <MyImage source={require('../Asset/down.png')}
                         tintColor={Colors.primary_color}
                         imageContainerStyle={{width: 14, height: 14}}/>
            </View>
        </TouchableWithoutFeedback>
    );
};
const DropDownHeader = (props) => {
    return (
        <View style={dropDownHeaderStyle.crossContain}>
            <AppText style={dropDownHeaderStyle.filterTitleStyle}>{props.title}</AppText>
            <MyImageButton onPress={() => props.closeDialog()}
                           source={require('../Asset/cros.png')}
                           imageContainerStyle={dropDownHeaderStyle.crossButtonContainer}/>
        </View>
    );
};


//single select drop down search and simple
const CustomDropDownItem = (props) => {
    const itemPress = () => {
        props.onPress(props.data);
    };

    return (
        <TouchableWithoutFeedback onPress={itemPress}>
            <View style={{
                flexDirection: 'row', alignItems: 'center', paddingTop: dimen.app_padding - dimen.home_item_padding,
                paddingBottom: dimen.app_padding - dimen.home_item_padding,
            }}>
                <AppText style={styles.itemTextStyle}>
                    {props.data.title}
                </AppText>
                {/*{props.selectedItem && props.selectedItem.id === props.data.id &&*/}
                {/*<View style={{flex: 1, alignItems: 'flex-end'}}>*/}
                {/*    <MyImage source={require('../Asset/tick.png')}*/}
                {/*             imageContainerStyle={{width: 20, height: 20}}/>*/}
                {/*</View>*/}
                {/*}*/}
            </View>
        </TouchableWithoutFeedback>
    );
};
export const CustomDropDown = (props) => {

    const closeDialog = () => {
        props.setShow(false);
    };
    useEffect(() => {
        const backAction = () => {
            if (props.show) {
                props.setShow(false);
                return true;
            } else {
                return false;
            }
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [props.show]);

    const requestItemPress = (item) => {
        props.setSelectedItem(item);
        closeDialog();
    };

    if (!props.show) {
        return (<View></View>);
    } else {
        return (
            <View style={customDropDownStyle.mainContainer}>
                <View style={customDropDownStyle.itemsContainer}>
                    <View style={customDropDownStyle.crossContain}>
                        <AppText style={customDropDownStyle.filterTitleStyle}>{props.title}</AppText>
                        <MyImageButton onPress={closeDialog}
                                       source={require('../Asset/cros.png')}
                                       imageContainerStyle={customDropDownStyle.crossButtonContainer}/>
                    </View>
                    <View style={{padding: dimen.app_padding, paddingTop: 0}}>
                        <FlatList
                            style={{marginTop: 10}}
                            data={props.data}
                            extraData={props.data}
                            keyExtractor={(item, index) => item.id.toString()}
                            numColumns={1}
                            bounces={false}
                            renderItem={({item}) =>
                                <CustomDropDownItem data={item}
                                                    onPress={requestItemPress}
                                                    selectedItem={props.selectedItem}/>
                            }
                            ListEmptyComponent={<EmptyList text={'No item'}/>}
                        />
                    </View>
                </View>
            </View>
        );
    }
};
export const CustomDropDownSearchable = (props) => {
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        const backAction = () => {
            if (props.show) {
                props.setShow(false);
                return true;
            } else {
                return false;
            }
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [props.show]);

    const closeDialog = () => {
        props.setShow(false);
    };
    const dropDownItemPress = (item) => {
        props.setSelectedItem(item);
        closeDialog();
    };


    if (!props.show) {
        return (<View></View>);
    } else {
        return (
            <View style={dropDownSearchable.mainContainer}>
                <View style={dropDownSearchable.itemsContainer}>
                    <View style={{flex: 1}}>
                        <View style={dropDownSearchable.crossContain}>
                            <AppText style={dropDownSearchable.filterTitleStyle}>{props.title}</AppText>
                            <MyImageButton onPress={closeDialog}
                                           source={require('../Asset/cros.png')}
                                           imageContainerStyle={dropDownSearchable.crossButtonContainer}/>
                        </View>

                        <View style={dropDownSearchable.searchInputContainer}>
                            <TextInput onChangeText={(email) => {
                                setSearchText(email);
                                props.setFilterData(props.data.filter((item) => item.title.toLowerCase().includes(email.toLowerCase())));
                            }}
                                       value={searchText}
                                       placeholder={'Search here'}
                                       autoCapitalize='none'
                                       style={styles.inputField}/>
                        </View>

                        <FlatList
                            style={{margin: dimen.app_padding}}
                            data={props.filterData}
                            extraData={props.filterData}
                            keyExtractor={(item, index) => item.id.toString()}
                            numColumns={1}
                            bounces={false}
                            renderItem={({item}) =>
                                <CustomDropDownItem data={item}
                                                    onPress={dropDownItemPress}
                                                    selectedItem={props.selectedItem}/>
                            }

                            ListEmptyComponent={<EmptyList text={'No item found.'}/>}
                        />
                    </View>
                </View>

            </View>
        );
    }
};


//multi select drop down
const DropDownItem = (props) => {
    const [status, setStatus] = useState(props.status);

    return (
        <TouchableWithoutFeedback onPress={() => {
            setStatus(!status);
            props.setSelectedItem(props.data, !status);
        }}>
            <View style={styles.dropdownItemContainer}>
                {props.data.id !== 0 &&
                <CheckBox status={status} setStatus={() => {
                    setStatus(!status);
                    props.setSelectedItem(props.data, !status);
                }}/>}
                <AppText style={styles.itemTextStyle}>{props.data.title}</AppText>
            </View>
        </TouchableWithoutFeedback>
    );
};
export const SearchDropDown = (props) => {
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        const backAction = () => {
            if (props.show) {
                props.setShow(false);
                return true;
            } else {
                return false;
            }
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [props.show]);

    const closeDialog = () => {
        props.setShow(false);
    };
    const setSelectedItem = (item, status) => {
        props.setSelectedItems(item, status);
    };
    const setCheckBoxStatus = (item) => {
        let status = false;
        props.selectedItem.forEach(i => {
            if (i.id === item.id) {
                status = true;
            }
        });
        return status;
    };


    if (!props.show) {
        return (<View></View>);
    } else {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.itemsContainer}>
                    <View style={{flex: 1}}>
                        <DropDownHeader title={props.title} closeDialog={closeDialog}/>
                        {props.isSearchable &&
                        <View style={styles.searchInputContainer}>
                            <TextInput onChangeText={(email) => {
                                setSearchText(email);
                                props.setFiltered(props.itemsArrayOrignal.filter((item) => item.title.toLowerCase().includes(email.toLowerCase())));
                            }}
                                       value={searchText}
                                       placeholder={'Search here'}
                                       autoCapitalize='none'
                                // maxLength={11}
                                // keyboardType={'phone-pad'}
                                       style={styles.inputField}/>
                        </View>}

                        <FlatList
                            style={{margin: dimen.app_padding}}
                            data={props.itemsArray}
                            extraData={props.itemsArray}
                            keyExtractor={(item, index) => item.id.toString()}
                            numColumns={1}
                            bounces={false}
                            renderItem={({item}) =>
                                <DropDownItem
                                    data={item}
                                    setSelectedItem={setSelectedItem}
                                    status={setCheckBoxStatus(item)}
                                />
                            }
                            ListEmptyComponent={<EmptyList text={'No item found.'}/>}
                        />
                    </View>
                    <View style={{
                        flex: 0.1,
                        alignItems: 'stretch',
                        margin: dimen.app_padding,
                        marginTop: 0,
                        justifyContent: 'center',
                    }}>
                        <MyTextButton
                            onPress={closeDialog}
                            buttonText={'Done'}
                            buttonContainerStyle={{margin: 0}}
                        />
                    </View>
                </View>
            </View>
        );
    }
};
export const SubAreaSearchDropDown = (props) => {
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        const backAction = () => {
            if (props.show) {
                props.setShow(false);
                return true;
            } else {
                return false;
            }
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [props.show]);

    const closeDialog = () => {
        props.setShow(false);
    };
    const setSelectedItem = (item, status) => {
        props.setSelectedItems(item, status);
        // closeDialog();
    };

    const setCheckBoxStatus = (item) => {
        let status = false;
        props.selectedItem.forEach(i => {
            if (i.id === item.id) {
                status = true;
            }
        });
        return status;
    };


    if (!props.show) {
        return (<View></View>);
    } else {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.itemsContainer}>
                    <View style={{flex: 1}}>
                        <DropDownHeader title={props.title} closeDialog={closeDialog}/>
                        {props.isSearchable &&
                        <View style={styles.searchInputContainer}>
                            <TextInput onChangeText={(email) => {
                                setSearchText(email);
                                props.setFiltered(props.itemsArrayOrignal.filter((item) => item.title.toLowerCase().includes(email.toLowerCase())));
                            }}
                                       value={searchText}
                                       placeholder={'Search here'}
                                       autoCapitalize='none'
                                // maxLength={11}
                                // keyboardType={'phone-pad'}
                                       style={styles.inputField}/>
                        </View>}

                        <FlatList
                            style={{margin: dimen.app_padding}}
                            data={props.itemsArray}
                            extraData={props.itemsArray}
                            keyExtractor={(item, index) => item.id.toString()}
                            numColumns={1}
                            bounces={false}
                            renderItem={({item}) =>
                                <DropDownItem
                                    data={item}
                                    setSelectedItem={setSelectedItem}
                                    status={setCheckBoxStatus(item)}
                                />
                            }
                            ListEmptyComponent={<EmptyList text={'No items'}/>}
                        />
                    </View>

                    <View style={{
                        flex: 0.1,
                        alignItems: 'stretch',
                        // paddingTop: dimen.app_padding,
                        margin: dimen.app_padding,
                        marginTop: 0,

                        justifyContent: 'center',
                        // backgroundColor:'red',
                    }}>
                        <MyTextButton
                            onPress={closeDialog}
                            buttonText={'Done'}
                            buttonContainerStyle={{margin: 0}}
                        />
                    </View>

                </View>

            </View>
        );
    }
};



export const ReviewItems = (props) => {

    const closeDialog = () => {
        props.setShow(false);
    };

    if (!props.show) {
        return (<View></View>);
    } else {
        return (
            <View style={reviewStyles.mainContainer}>

                <View style={reviewStyles.itemsContainer}>
                    <AppText style={{textAlign: 'center', fontSize: 22,fontWeight:'bold', color: Colors.primary_color}}>
                        Mugshot
                    </AppText>
                    <View style={{width:deviceWidth-60,height:deviceWidth-60,justifyContent:'center',alignItems:'flex-start'}}>
                        <MyImage onPress={closeDialog}
                                 source={require('../Asset/mugshot.png')}
                                 imageContainerStyle={{}}/>
                    </View>
                    <AppText style={{fontSize: 14,marginTop:dimen.app_padding,color: Colors.primary_color}}>
                        Arrested on 13/08-2014 in murder case
                    </AppText>


                    <View style={reviewStyles.crossContain}>
                        <MyImageButton onPress={closeDialog}
                                       source={require('../Asset/cros.png')}
                                       imageContainerStyle={reviewStyles.crossButtonContainer}/>
                    </View>

                </View>
            </View>
        );
    }
};


export const ThankYouDialog = (props) => {

    const closeDialog = () => {
        props.setShow(false);
    };

    if (!props.show) {
        return (<View></View>);
    } else {
        return (
            <View style={thankStyles.mainContainer}>
                <View style={thankStyles.itemsContainer}>
                    {/*<View style={thankStyles.crossContain}>*/}
                    {/*    <MyImageButton onPress={closeDialog}*/}
                    {/*                   source={require('../Asset/cros.png')}*/}
                    {/*                   imageContainerStyle={thankStyles.crossButtonContainer}/>*/}
                    {/*</View>*/}

                    <AppText style={{textAlign: 'center', fontSize: 25, color: Colors.primary_color}}>
                        {props.text}
                    </AppText>
                    <View style={{}}>
                        <MyTextButton onPress={closeDialog}
                                      buttonText={'Continue Booking'}
                            // buttonTextStyle={{color:Colors.primary_color}}
                                      buttonContainerStyle={[{marginTop: 30}]}/>
                    </View>


                </View>
            </View>
        );
    }
};
export const SortDialog = (props) => {

    const closeDialog = () => {
        props.setShow(false);
    };

    const newArrivalSort = () => {
        props.sortProducts(Keys.sort_new_arrival);
        props.setSelectedSort(Keys.sort_new_arrival);
        closeDialog();
    };

    const popularSort = () => {
        props.sortProducts(Keys.sort_popular);
        props.setSelectedSort(Keys.sort_popular);
        closeDialog();
    };

    if (!props.show) {
        return (<View></View>);
    } else {
        return (
            <View style={sortStyles.mainContainer}>
                <View style={sortStyles.itemsContainer}>
                    <View style={sortStyles.crossContain}>
                        <AppText style={filterStyles.filterTitleStyle}>Sort By</AppText>
                        <MyImageButton onPress={closeDialog}
                                       source={require('../Asset/cros.png')}
                                       imageContainerStyle={sortStyles.crossButtonContainer}/>
                    </View>
                    <View style={{padding: dimen.app_padding, paddingTop: 0}}>
                        <TouchableWithoutFeedback onPress={newArrivalSort}>
                            <View style={sortStyles.sortItemContainerStyle}>
                                <AppText style={sortStyles.sortItemStyle}>
                                    New Arrivals
                                </AppText>
                                {props.selectedSort === Keys.sort_new_arrival &&
                                <MyImage source={require('../Asset/tick.png')}
                                         imageContainerStyle={{width: 15, height: 15}}/>}
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={popularSort}>
                            <View style={sortStyles.sortItemContainerStyle}>
                                <AppText style={sortStyles.sortItemStyle}>
                                    Popular
                                </AppText>
                                {props.selectedSort === Keys.sort_popular &&
                                <MyImage source={require('../Asset/tick.png')} style={{width: 15, height: 15}}/>}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>


                </View>
            </View>
        );
    }
};


const RequestFilterItem = (props) => {
    const itemPress = () => {
        props.onPress(props.data);
    };

    return (
        <TouchableWithoutFeedback onPress={itemPress}>
            <View style={styles.dropdownItemContainer}>
                <AppText style={styles.itemTextStyle}>
                    {props.data.title}
                </AppText>
                {props.selectedItem.id === props.data.id &&
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <MyImage source={require('../Asset/tick.png')}
                             imageContainerStyle={sortStyles.crossButtonContainer}/>
                </View>
                }
            </View>
        </TouchableWithoutFeedback>
    );
};
export const FilterRequests = (props) => {

    const closeDialog = () => {
        props.setShow(false);
    };

    const requestItemPress = (item) => {
        props.setSelectedFilterItem(item);
        closeDialog();
    };

    if (!props.show) {
        return (<View></View>);
    } else {
        return (
            <View style={sortStyles.mainContainer}>
                <View style={sortStyles.itemsContainer}>
                    <View style={sortStyles.crossContain}>
                        <AppText style={filterStyles.filterTitleStyle}>Filter By</AppText>
                        <MyImageButton onPress={closeDialog}
                                       source={require('../Asset/cros.png')}
                                       imageContainerStyle={sortStyles.crossButtonContainer}/>
                    </View>
                    <View style={{padding: dimen.app_padding, paddingTop: 0}}>
                        <FlatList
                            style={{marginTop: 10}}
                            data={props.data}
                            extraData={props.data}
                            keyExtractor={(item, index) => item.id.toString()}
                            numColumns={1}
                            bounces={false}
                            renderItem={({item}) =>
                                <RequestFilterItem data={item}
                                                   onPress={requestItemPress}
                                                   selectedItem={props.selectedfilterItem}/>
                            }
                            ListEmptyComponent={<EmptyList text={'No item found.'}/>}
                        />
                    </View>


                </View>
            </View>
        );
    }
};

export const OfferConfirmationDialog = (props) => {

    const closeDialog = () => {
        props.setShow(false);
    };

    useEffect(() => {
        const backAction = () => {
            if (props.show) {
                props.setShow(false);
                return true;
            } else {
                return false;
            }
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [props.show]);


    const sendOfferPress = () => {
        props.getOfferPress();
        closeDialog();
    };

    const cancelPress = () => {
        closeDialog();
    };

    if (!props.show) {
        return (<View></View>);
    } else {
        return (
            <View style={offerConfirmationStyle.mainContainer}>
                <View style={offerConfirmationStyle.itemsContainer}>
                    <View style={{backgroundColor: Colors.primary_color}}>
                        <AppText style={{
                            backgroundColor: Colors.primary_color, fontSize: 18, marginBottom: 0,
                            padding: 10, textAlign: 'center',
                            color: Colors.button_text_color,
                        }}>
                            Confirmation
                        </AppText>
                    </View>
                    <View style={{backgroundColor: Colors.home_widget_background_color}}>
                        <AppText style={{fontSize: 14, margin: dimen.app_padding, color: Colors.normal_text_color}}>
                            Your offer will be sent to all vendors in your area. Do you really want to get an offer?
                        </AppText>
                        <View style={{
                            margin: dimen.app_padding,
                            // marginTop: dimen.app_padding * 2,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                        }}>
                            <View style={{flex: 1, marginRight: 5}}>
                                <MyTextButton
                                    onPress={cancelPress}
                                    buttonText={'Cancel'}
                                    buttonTextStyle={{fontSize: 14}}
                                    buttonContainerStyle={{padding: 10}}/>
                            </View>
                            <View style={{flex: 1, marginLeft: 5}}>
                                <MyTextButton
                                    onPress={sendOfferPress}
                                    buttonText={'Get Offer'}
                                    buttonTextStyle={{fontSize: 14}}
                                    buttonContainerStyle={{padding: 10}}/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
};
export const AlertView = (props) => {

    useEffect(() => {
        const backAction = () => {
            if (props.show) {
                props.setShow(false);
                return true;
            } else {
                return false;
            }
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [props.show]);

    const closeDialog = () => {
        props.setShow(false);
    };

    const okayPress = () => {
        if (props.okayPress !== undefined) {
            props.okayPress();
        }
        closeDialog();
    };

    const cancelPress = () => {
        closeDialog();
    };

    if (!props.show) {
        return (<View></View>);
    } else {
        return (
            <View style={alertViewStyle.mainContainer}>
                <View style={alertViewStyle.itemsContainer}>
                    <View style={{backgroundColor: Colors.primary_color}}>
                        <AppText style={alertViewStyle.titleStyle}>
                            {props.title}
                        </AppText>
                    </View>
                    <View style={alertViewStyle.messageContainer}>
                        <AppText style={alertViewStyle.messageTextStyle}>
                            {props.message}
                        </AppText>
                        <View style={alertViewStyle.buttonContainerStyle}>
                            {/*<View style={{flex: 1, marginRight: 5}}>*/}
                            {/*    <MyTextButton*/}
                            {/*        onPress={cancelPress}*/}
                            {/*        buttonText={'Cancel'}*/}
                            {/*        buttonTextStyle={{fontSize: 14}}*/}
                            {/*        buttonContainerStyle={{padding: 10}}/>*/}
                            {/*</View>*/}
                            <View style={{marginLeft: 0}}>
                                <MyTextButton
                                    onPress={okayPress}
                                    buttonText={'Okay'}
                                    buttonTextStyle={{fontSize: 14}}
                                    buttonContainerStyle={{padding: 7, paddingLeft: 15, paddingRight: 15}}/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
};


const FeaturesTitle = (props) => {
    return (
        <TouchableWithoutFeedback onPress={() => props.setSelectedKey(props.data.id)}>
            <View style={[filterStyles.keyAttributesStyle,
                props.selectedKey === props.data.id ? {backgroundColor: Colors.home_widget_background_color} : {}]}>
                <AppText style={{fontSize: 12}}>{props.data.title}</AppText>
            </View>
        </TouchableWithoutFeedback>
    );
};
const FeatureValueCard = (props) => {

    const [boxStatus, setBoxStatus] = useState(false);
    const _onPress = () => {
        if (!boxStatus) {//if add selected then count is previous length + 1 else -1
            props.setFilterCount(props.selectedItems.length + 1);
        } else {
            props.setFilterCount(props.selectedItems.length - 1);
        }

        props.setSelectedFilterData(props.data, props.parentId, !boxStatus);
    };

    useEffect(() => {
        if (props.selectedItems) {
            props.selectedItems.forEach(sItem => {
                if (sItem.id === props.parentId && sItem.item.id === props.data.id) {
                    setBoxStatus(true);
                }
            });
        }
    }, [props.parentId]);
    useEffect(() => {
        if (props.clearFilter) {
            setBoxStatus(false);
            props.setClearFilter(false);
        }
    }, [props.clearFilter]);


    return (
        <TouchableWithoutFeedback>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: dimen.app_padding,
                marginTop: 5,
                marginBottom: 5,
            }}>
                <CheckBox style={{width: 17, height: 17, marginRight: 10}}
                          status={boxStatus}
                          setStatus={() => {
                              setBoxStatus(!boxStatus);
                              _onPress();
                          }}
                />
                <AppText style={{fontSize: 15}}>{props.data.title.toUpperCase()}</AppText>
            </View>
        </TouchableWithoutFeedback>
    );
};

export const FilterView = (props) => {

    const [filterCount, setFilterCount] = useState(0);
    const [shouldClearFilter, setShouldClearFilter] = useState(false);
    const [selectedKey, setSelectedKey] = useState(0);
    const [selectedSubItems, setSelectedSubItems] = useState([]);


    useEffect(() => {
        if (props.data.length > 0) {
            setSelectedSubItems(props.data[0].values);
        }
    }, [props.data]);

    useEffect(() => {
        setFilterCount(props.filterCount);
    }, [props.filterCount]);

    useEffect(() => {
        const backAction = () => {
            if (props.show) {
                props.setShow(false);
                return true;
            } else {
                return false;
            }
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [props.show]);

    const closeDialog = () => {
        props.setShow(false);
    };


    if (!props.show) {
        return (<View></View>);
    } else {
        return (
            <View style={filterStyles.mainContainer}>
                <View style={filterStyles.itemsContainer}>
                    <View style={{flexGrow: 1}}>
                        <View style={filterStyles.crossContain}>
                            <AppText
                                shouldClearFilter={shouldClearFilter}
                                style={filterStyles.filterTitleStyle}>
                                Filters {filterCount > 0 ? '(' + filterCount + ')' : ''}
                            </AppText>
                            <MyImageButton onPress={() => {
                                props.clearFilters();
                                setShouldClearFilter(!shouldClearFilter);
                                setFilterCount(0);
                                closeDialog();
                            }}
                                           source={require('../Asset/cros.png')}
                                           imageContainerStyle={filterStyles.crossButtonContainer}/>
                        </View>


                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'stretch',
                            justifyContent: 'flex-start',
                        }}>
                            <View style={[{flex: 1, backgroundColor: Colors.filter_keys_background}]}>
                                <FlatList
                                    style={{marginTop: 0}}
                                    data={props.data}
                                    keyExtractor={(item, index) => item.id.toString()}
                                    numColumns={1}
                                    bounces={false}
                                    renderItem={({item}) => (
                                        <FeaturesTitle selectedKey={selectedKey}
                                                       setSelectedKey={(id) => {
                                                           setSelectedKey(id);
                                                           // console_log('setSelected key  '+id)
                                                           props.data.forEach(item => {
                                                               if (item.id === id) {
                                                                   console_log('selected values ' + JSON.stringify(item.values));
                                                                   setSelectedSubItems(item.values);
                                                               }
                                                           });
                                                       }}
                                                       data={item}/>
                                    )}

                                    ListEmptyComponent={<EmptyList text={'No item found.'}/>}
                                />

                            </View>
                            <View style={[{flex: 2}]}>
                                <FlatList
                                    style={{marginTop: 0}}
                                    data={selectedSubItems}
                                    keyExtractor={(item, index) => item.id.toString()}
                                    numColumns={1}
                                    // extraData={shouldClearFilter}
                                    bounces={false}
                                    renderItem={({item}) => {
                                        // console_log('selected key:  '+selectedKey);
                                        let pid = selectedKey;
                                        return (
                                            <FeatureValueCard data={item}
                                                              selectedItems={props.selectedItems}
                                                              clearFilter={shouldClearFilter}
                                                              setClearFilter={setShouldClearFilter}
                                                              setSelectedFilterData={props.setSelectedFilterData}
                                                              parentId={pid}
                                                              setFilterCount={setFilterCount}
                                            />
                                        );
                                    }}

                                    ListEmptyComponent={<EmptyList text={'No item found.'}/>}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={filterStyles.filterButtonContainerStyle}>
                        <TouchableOpacity onPress={() => {
                            props.clearFilters();
                            setShouldClearFilter(!shouldClearFilter);
                            setFilterCount(0);
                        }}
                                          activeOpacity={1}
                                          style={[filterStyles.buttonContainerStyle, {
                                              flex: 1,
                                              backgroundColor: '#bdbdbd',
                                          }]}>
                            <AppText style={{color: Colors.normal_text_color}}>RESET</AppText>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => {
                            props.applyFilters();
                            closeDialog();
                        }}
                                          activeOpacity={1}
                                          style={[filterStyles.buttonContainerStyle, {
                                              flex: 2,
                                              backgroundColor: Colors.primary_color,
                                          }]}>
                            <AppText style={{color: Colors.button_text_color}}>APPLY FILTERS</AppText>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
};

export const ProductDetailsView = (props) => {


    useEffect(() => {
        const backAction = () => {
            if (props.show) {
                props.setShow(false);
                return true;
            } else {
                return false;
            }
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [props.show]);

    const closeDialog = () => {
        props.setShow(false);
    };


    if (!props.show) {
        return (<View></View>);
    } else {
        return (
            <View style={productDetailsStyles.mainContainer}>
                <View style={productDetailsStyles.itemsContainer}>
                    <View style={{flexGrow: 1}}>
                        <DropDownHeader title={'Product Details'} closeDialog={closeDialog}/>


                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'stretch',
                            justifyContent: 'flex-start',
                        }}>

                            <WebView style={{flex: 1, height: 300}}
                                     source={{
                                         html: '<!DOCTYPE html>\n' +
                                             '<html>\n' +
                                             '<head>' +
                                             '<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=yes"/>' +
                                             '<style>' + productDetailsStyle + '</style>' +
                                             '</head>' +
                                             '<body>\n' +
                                             '\n' +
                                             props.data +
                                             '\n' +
                                             '</body>\n' +
                                             '</html>',
                                     }}
                                     scalesPageToFit={true}
                                     scrollEnabled={false}
                            />


                        </View>
                    </View>
                </View>
            </View>
        );
    }
};

const ProductFeatureItem = (props) => {
    console_log(props.data);
    return (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: Colors.border_color,
        }}>
            <View style={{flex: 1, padding: dimen.app_padding}}>
                <AppText
                    style={{fontSize: 12, color: Colors.primary_color, fontWeight: 'bold'}}>{props.data.key}:</AppText>
            </View>
            <View style={{flex: 2, padding: dimen.app_padding}}>
                <AppText style={{fontSize: 12, color: Colors.normal_text_color}}>{props.data.value}</AppText>
            </View>
        </View>
    );
};
export const ProductFeatureDetails = (props) => {
    const [itemsDetails, setItemsDetails] = useState([{id: 1}, {id: 2}]);


    useEffect(() => {
        const backAction = () => {
            if (props.show) {
                props.setShow(false);
                return true;
            } else {
                return false;
            }
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [props.show]);

    const closeDialog = () => {
        props.setShow(false);
    };


    if (!props.show) {
        return (<View></View>);
    } else {
        return (
            <View style={productFeatureStyles.mainContainer}>
                <View style={productFeatureStyles.itemsContainer}>
                    <View style={{flexGrow: 1}}>
                        <View style={productFeatureStyles.crossContain}>
                            <AppText
                                style={productFeatureStyles.filterTitleStyle}>Features</AppText>
                            <MyImageButton onPress={closeDialog}
                                           source={require('../Asset/cros.png')}
                                           imageContainerStyle={productFeatureStyles.crossButtonContainer}/>
                        </View>

                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'stretch',
                            justifyContent: 'flex-start',
                        }}>
                            <View style={[{flex: 1, backgroundColor: Colors.home_widget_background_color}]}>
                                <FlatList
                                    style={{marginTop: 0}}
                                    data={props.data}
                                    keyExtractor={(item, index) => item.id.toString()}
                                    numColumns={1}
                                    bounces={false}
                                    renderItem={({item}) => (
                                        <ProductFeatureItem
                                            data={item}/>
                                    )}

                                    ListEmptyComponent={<EmptyList text={'No item found.'}/>}
                                />
                            </View>
                        </View>
                    </View>

                </View>

            </View>
        );
    }
};


const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center', alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        opacity: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        // backgroundColor: Colors.home_widget_background_color,
        top: 0,
        bottom: 0,
        zIndex: 5,
    },
    itemsContainer: {
        width: dialogWidth,
        height: dialogHeight,
        backgroundColor: Colors.home_widget_background_color,
        // padding: dimen.app_padding,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        borderRadius: 2,
        // marginTop: 70,
        // marginBottom: 70
    },
    searchInputContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // flexGrow: 1,
        borderColor: Colors.primary_color,
        // backgroundColor: Colors.app_background_color,
        borderWidth: 1,
        borderRadius: dimen.login_border_radius,
        paddingRight: dimen.app_padding,
        paddingLeft: dimen.app_padding,
        margin: dimen.app_padding,
    },

    itemTextStyle: {
        fontSize: 16,
        marginLeft: dimen.home_item_padding,
        // padding: dimen.app_padding,

    },
    inputField: {
        fontSize: 16,
        flexGrow: 1,
        // padding: dimen.app_padding,

    },
    dropdownItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: dimen.app_padding - dimen.home_item_padding,
        paddingBottom: dimen.app_padding - dimen.home_item_padding,
    },

    crossContain: {
        alignItems: 'flex-end',
        marginBottom: dimen.app_padding,
    },
    crossButtonContainer: {
        width: 20,
        height: 20,
    },


});
const dropDownSearchable = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center', alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        opacity: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        // backgroundColor: Colors.home_widget_background_color,
        top: 0,
        bottom: 0,
        zIndex: 5,
    },
    itemsContainer: {
        width: dialogWidth,
        height: dialogHeight,
        backgroundColor: Colors.home_widget_background_color,
        // padding: dimen.app_padding,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        borderRadius: 2,
        // marginTop: 70,
        // marginBottom: 70
    },
    searchInputContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // flexGrow: 1,
        borderColor: Colors.primary_color,
        margin: dimen.app_padding,
        // backgroundColor: Colors.app_background_color,
        borderWidth: 1,
        borderRadius: dimen.login_border_radius,
        paddingRight: dimen.app_padding,
        paddingLeft: dimen.app_padding,
    },

    itemTextStyle: {
        fontSize: 16,
        marginLeft: dimen.home_item_padding,
        // padding: dimen.app_padding,

    },
    inputField: {
        fontSize: 16,
        flexGrow: 1,
        // padding: dimen.app_padding,

    },
    dropdownItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: dimen.app_padding - dimen.home_item_padding,
        paddingBottom: dimen.app_padding - dimen.home_item_padding,
    },

    filterTitleStyle: {
        fontSize: 15,
    },
    crossContain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: dimen.app_padding,
        padding: dimen.app_padding,
        backgroundColor: '#fafafa',
    },
    crossButtonContainer: {
        width: 20,
        height: 20,
    },


});
const filterStyles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'flex-end', alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        opacity: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        // backgroundColor: Colors.home_widget_background_color,
        top: 0,
        // bottom: dimen.bottom_margin_for_bottom_menu,
        bottom: 0,
        zIndex: 10,
    },
    itemsContainer: {
        width: deviceWidth,
        height: deviceHeight - dimen.app_padding * 12,
        backgroundColor: Colors.home_widget_background_color,
        // padding: dimen.app_padding,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        borderRadius: 2,
        // marginTop: 70,
        // marginBottom: 70
    },
    searchInputContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // flexGrow: 1,
        borderColor: Colors.primary_color,
        // backgroundColor: Colors.app_background_color,
        borderWidth: 1,
        borderRadius: dimen.login_border_radius,
        paddingRight: dimen.app_padding,
        paddingLeft: dimen.app_padding,
    },

    itemTextStyle: {
        fontSize: 16,
        marginLeft: dimen.home_item_padding,
        // padding: dimen.app_padding,

    },
    inputField: {
        fontSize: 16,
        flexGrow: 1,
        // padding: dimen.app_padding,

    },
    dropdownItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: dimen.app_padding - dimen.home_item_padding,
        paddingBottom: dimen.app_padding - dimen.home_item_padding,
    },

    crossContain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: dimen.app_padding,
        padding: dimen.app_padding,
        backgroundColor: '#fafafa',
    },
    crossButtonContainer: {
        width: 20,
        height: 20,
    },
    filterTitleStyle: {
        fontSize: 15,
    },

    buttonContainerStyle: {
        alignItems: 'center',
        paddingTop: dimen.app_padding,
        paddingBottom: dimen.app_padding,
        justifyContent: 'center',
    },
    filterButtonContainerStyle: {
        // flex: 1,
        flexShrink: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        // paddingTop: dimen.app_padding,
        justifyContent: 'center',
    },
    keyAttributesStyle: {
        paddingTop: 15, paddingBottom: 15, paddingLeft: 10, paddingRight: 10,
        borderBottomWidth: 1,
        borderColor: Colors.border_color,

    },


});
const productFeatureStyles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'flex-end', alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        opacity: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        // backgroundColor: Colors.home_widget_background_color,
        top: 0,
        // bottom: dimen.bottom_margin_for_bottom_menu,
        bottom: 0,
        zIndex: 10,
    },
    itemsContainer: {
        width: deviceWidth,
        height: deviceHeight - dimen.app_padding * 12,
        backgroundColor: Colors.home_widget_background_color,
        // padding: dimen.app_padding,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        borderRadius: 2,
        // marginTop: 70,
        // marginBottom: 70
    },
    searchInputContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // flexGrow: 1,
        borderColor: Colors.primary_color,
        // backgroundColor: Colors.app_background_color,
        borderWidth: 1,
        borderRadius: dimen.login_border_radius,
        paddingRight: dimen.app_padding,
        paddingLeft: dimen.app_padding,
    },

    itemTextStyle: {
        fontSize: 16,
        marginLeft: dimen.home_item_padding,
        // padding: dimen.app_padding,

    },
    inputField: {
        fontSize: 16,
        flexGrow: 1,
        // padding: dimen.app_padding,

    },
    dropdownItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: dimen.app_padding - dimen.home_item_padding,
        paddingBottom: dimen.app_padding - dimen.home_item_padding,
    },

    crossContain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: dimen.app_padding,
        padding: dimen.app_padding,
        backgroundColor: Colors.home_widget_background_color,
        borderBottomWidth: 1, borderBottomColor: Colors.border_color,
    },
    crossButtonContainer: {
        width: 20,
        height: 20,
    },
    filterTitleStyle: {
        fontSize: 16,
        color: Colors.primary_color,
        fontWeight: 'bold',
    },

    buttonContainerStyle: {
        alignItems: 'center',
        paddingTop: dimen.app_padding,
        paddingBottom: dimen.app_padding,
        justifyContent: 'center',
    },
    filterButtonContainerStyle: {
        // flex: 1,
        flexShrink: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        // paddingTop: dimen.app_padding,
        justifyContent: 'center',
    },
    keyAttributesStyle: {
        paddingTop: 15, paddingBottom: 15, paddingLeft: 10, paddingRight: 10,
        borderBottomWidth: 1,
        borderColor: Colors.border_color,

    },


});
const productDetailsStyles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'flex-end', alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        opacity: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        // backgroundColor: Colors.home_widget_background_color,
        top: 0,
        // bottom: dimen.bottom_margin_for_bottom_menu,
        bottom: 0,
        zIndex: 10,
    },
    itemsContainer: {
        width: deviceWidth,
        height: deviceHeight - dimen.app_padding * 12,
        backgroundColor: Colors.home_widget_background_color,
        // padding: dimen.app_padding,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        borderRadius: 2,
        // marginTop: 70,
        // marginBottom: 70
    },
    searchInputContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // flexGrow: 1,
        borderColor: Colors.primary_color,
        // backgroundColor: Colors.app_background_color,
        borderWidth: 1,
        borderRadius: dimen.login_border_radius,
        paddingRight: dimen.app_padding,
        paddingLeft: dimen.app_padding,
    },

    itemTextStyle: {
        fontSize: 16,
        marginLeft: dimen.home_item_padding,
        // padding: dimen.app_padding,

    },
    inputField: {
        fontSize: 16,
        flexGrow: 1,
        // padding: dimen.app_padding,

    },
    dropdownItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: dimen.app_padding - dimen.home_item_padding,
        paddingBottom: dimen.app_padding - dimen.home_item_padding,
    },

    crossContain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: dimen.app_padding,
        padding: dimen.app_padding,
        backgroundColor: '#fafafa',
    },
    crossButtonContainer: {
        width: 20,
        height: 20,
    },
    filterTitleStyle: {
        fontSize: 17,
    },

    buttonContainerStyle: {
        alignItems: 'center',
        paddingTop: dimen.app_padding,
        paddingBottom: dimen.app_padding,
        justifyContent: 'center',
    },
    filterButtonContainerStyle: {
        // flex: 1,
        flexShrink: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        // paddingTop: dimen.app_padding,
        justifyContent: 'center',
    },
    keyAttributesStyle: {
        paddingTop: 15, paddingBottom: 15, paddingLeft: 10, paddingRight: 10,
        borderBottomWidth: 1,
        borderColor: Colors.border_color,

    },


});
const reviewStyles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center', alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        opacity: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        // backgroundColor: Colors.home_widget_background_color,
        top: 0,
        bottom: 0,
        zIndex: 5,
    },
    itemsContainer: {
        // flex:1,
        // flexShrink:1,
        width: deviceWidth - dimen.app_padding * 2,
        // height: deviceWidth,
        backgroundColor: Colors.home_widget_background_color,
        padding: dimen.app_padding,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        borderRadius: 15,
        marginTop: 70,
        marginBottom: 70
    },
    crossButtonContainer: {
        width: 26,
        height: 26,
        backgroundColor:Colors.home_widget_background_color,
        overflow:'hidden',
        borderRadius:13,
    },
    crossContain: {
        alignItems: 'flex-end',
        marginBottom: dimen.app_padding,
        position:'absolute',
        top:-30,
        right:0,
    },



});const thankStyles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center', alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        opacity: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        // backgroundColor: Colors.home_widget_background_color,
        top: 0,
        bottom: 0,
        zIndex: 5,
    },
    itemsContainer: {
        width: deviceWidth - dimen.app_padding * 2,
        // height: deviceWidth,
        backgroundColor: Colors.home_widget_background_color,
        padding: dimen.app_padding,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        borderRadius: 2,
        // marginTop: 70,
        // marginBottom: 70
    },
    searchInputContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // flexGrow: 1,
        borderColor: Colors.primary_color,
        // backgroundColor: Colors.app_background_color,
        borderWidth: 1,
        // borderRadius: dimen.login_border_radius,
        paddingRight: dimen.app_padding,
        paddingLeft: dimen.app_padding,
    },

    itemTextStyle: {
        fontSize: 16,
        // padding: dimen.app_padding,

    },
    inputField: {
        fontSize: 16,
        flexGrow: 1,
        // padding: dimen.app_padding,

    },
    dropdownItemContainer: {
        paddingTop: dimen.app_padding,
        paddingBottom: dimen.app_padding,
    },

    crossContain: {
        alignItems: 'flex-end',
        marginBottom: dimen.app_padding,
    },
    crossButtonContainer: {
        width: 20,
        height: 20,
    },


});
const offerConfirmationStyle = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center', alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        opacity: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        // backgroundColor: Colors.home_widget_background_color,
        top: 0,
        bottom: 0,
        zIndex: 5,
    },

    itemsContainer: {
        width: deviceWidth - dimen.app_padding * 4,
        // height: deviceWidth,
        // backgroundColor: Colors.home_widget_background_color,
        // padding: dimen.app_padding,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        borderRadius: 7,
        overflow: 'hidden',
        // marginTop: 70,
        // marginBottom: 70
    },
    sortItemStyle: {
        // padding: 10,
        // paddingLeft: 0,
        // backgroundColor:'red',
        fontSize: 16,
        color: Colors.normal_text_color,

    },
    sortItemContainerStyle: {
        // flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 0,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: Colors.border_color,
    },
    filterTitleStyle: {
        fontSize: 15,
    },
    searchInputContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // flexGrow: 1,
        borderColor: Colors.primary_color,
        // backgroundColor: Colors.app_background_color,
        borderWidth: 1,
        // borderRadius: dimen.login_border_radius,
        paddingRight: dimen.app_padding,
        paddingLeft: dimen.app_padding,
    },

    itemTextStyle: {
        fontSize: 16,
        // padding: dimen.app_padding,

    },
    inputField: {
        fontSize: 16,
        flexGrow: 1,
        // padding: dimen.app_padding,

    },
    dropdownItemContainer: {
        paddingTop: dimen.app_padding,
        paddingBottom: dimen.app_padding,
    },

    crossContain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: dimen.app_padding,
        padding: dimen.app_padding,
        backgroundColor: '#fafafa',
    },
    crossButtonContainer: {
        width: 20,
        height: 20,
    },


});
const alertViewStyle = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center', alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        opacity: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        // backgroundColor: Colors.home_widget_background_color,
        top: 0,
        bottom: 0,
        zIndex: 5,
    },
    itemsContainer: {
        width: deviceWidth - dimen.app_padding * 4,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        borderRadius: 7,
        overflow: 'hidden',
    },
    titleStyle: {
        backgroundColor: Colors.primary_color, fontSize: 18, marginBottom: 0,
        padding: 10, textAlign: 'center', color: Colors.button_text_color,
    },
    messageContainer: {backgroundColor: Colors.home_widget_background_color},
    messageTextStyle: {fontSize: 14, margin: dimen.app_padding, color: Colors.normal_text_color},
    buttonContainerStyle: {
        margin: dimen.app_padding,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },


});
const sortStyles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center', alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        opacity: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        // backgroundColor: Colors.home_widget_background_color,
        top: 0,
        bottom: 0,
        zIndex: 5,
    },

    sortItemStyle: {
        // padding: 10,
        // paddingLeft: 0,
        // backgroundColor:'red',
        fontSize: 16,
        color: Colors.normal_text_color,

    },
    sortItemContainerStyle: {
        // flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 0,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: Colors.border_color,
    },
    itemsContainer: {
        width: deviceWidth - dimen.app_padding * 2,
        // height: deviceWidth,
        backgroundColor: Colors.home_widget_background_color,
        // padding: dimen.app_padding,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        borderRadius: 2,
        // marginTop: 70,
        // marginBottom: 70
    },
    filterTitleStyle: {
        fontSize: 15,
    },
    searchInputContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // flexGrow: 1,
        borderColor: Colors.primary_color,
        // backgroundColor: Colors.app_background_color,
        borderWidth: 1,
        // borderRadius: dimen.login_border_radius,
        paddingRight: dimen.app_padding,
        paddingLeft: dimen.app_padding,
    },

    itemTextStyle: {
        fontSize: 16,
        // padding: dimen.app_padding,

    },
    inputField: {
        fontSize: 16,
        flexGrow: 1,
        // padding: dimen.app_padding,

    },
    dropdownItemContainer: {
        paddingTop: dimen.app_padding,
        paddingBottom: dimen.app_padding,
    },

    crossContain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: dimen.app_padding,
        padding: dimen.app_padding,
        backgroundColor: '#fafafa',
    },
    crossButtonContainer: {
        width: 20,
        height: 20,
    },


});
const customDropDownStyle = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center', alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        opacity: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        // backgroundColor: Colors.home_widget_background_color,
        top: 0,
        bottom: 0,
        zIndex: 5,
    },

    sortItemStyle: {
        // padding: 10,
        // paddingLeft: 0,
        // backgroundColor:'red',
        fontSize: 16,
        color: Colors.normal_text_color,

    },
    sortItemContainerStyle: {
        // flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 0,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: Colors.border_color,
    },
    itemsContainer: {
        width: deviceWidth - dimen.app_padding * 2,
        // height: deviceWidth,
        backgroundColor: Colors.home_widget_background_color,
        // padding: dimen.app_padding,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        borderRadius: 2,
        // marginTop: 70,
        // marginBottom: 70
    },
    searchInputContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // flexGrow: 1,
        borderColor: Colors.primary_color,
        // backgroundColor: Colors.app_background_color,
        borderWidth: 1,
        // borderRadius: dimen.login_border_radius,
        paddingRight: dimen.app_padding,
        paddingLeft: dimen.app_padding,
    },

    itemTextStyle: {
        fontSize: 16,
        // padding: dimen.app_padding,

    },
    inputField: {
        fontSize: 16,
        flexGrow: 1,
        // padding: dimen.app_padding,

    },
    dropdownItemContainer: {
        paddingTop: dimen.app_padding,
        paddingBottom: dimen.app_padding,
    },

    crossContain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: dimen.app_padding,
        padding: dimen.app_padding,
        backgroundColor: '#fafafa',
    },
    crossButtonContainer: {
        width: 20,
        height: 20,
    },
    filterTitleStyle: {
        fontSize: 15,
    },
});

const dropDownHeaderStyle = StyleSheet.create({
    crossContain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: dimen.app_padding,
        padding: dimen.app_padding,
        backgroundColor: '#fafafa',
    },
    crossButtonContainer: {
        width: 20,
        height: 20,
    },
    filterTitleStyle: {
        fontSize: 17,
        color: Colors.primary_color,
        fontWeight: 'bold',
    },

});
