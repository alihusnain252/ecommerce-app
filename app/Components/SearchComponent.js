import {View, StyleSheet, TouchableWithoutFeedback,FlatList} from 'react-native';
import {MyImage} from './MyImageButton';
import {TextInput} from 'react-native-gesture-handler';
import MyStrings from '../Classes/MyStrings';
import Colors from '../Styles/Colors';
import React, {useEffect, useState} from 'react';
import dimen from '../Styles/Dimen';
import {console_log} from '../Classes/auth';
import AppText from './AppText';

const data=[{'id':1,},{'id':2,},{'id':3,},{'id':4,},{'id':5,}]

const SearchField = (props) => {
    const [searchText, setSearchText] = useState('');
    const searchPress = () => {
        props.naviParam.navigate('SearchResults');

    };
    useEffect(() => {
    });
    return (
        <View style={{justifyContent:'flex-start',alignItems:'flex-start'}}>
            <View style={styles.searchContainer}>
                <View style={styles.halfView}/>
                <TouchableWithoutFeedback onPress={searchPress}>
                    <View style={styles.searchbarContainer}>
                        <MyImage source={require('../Asset/search.png')}
                                 imageContainerStyle={styles.searchIcon}/>
                        <TextInput onChangeText={(searchText) => setSearchText({searchText})}
                                   value={searchText}
                                   editable={false}
                                   placeholder={MyStrings.searchFieldPlaceHolder}
                                   placeholderTextColor={Colors.light_border_color}
                                   autoCapitalize='none'
                                   style={styles.searchField}/>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            {false && <View style={styles.searchResultsContainer}>
                <FlatList
                    data={data}
                    renderItem={({item}) => (
                        <AppText style={{margin: 20}}>Search Result</AppText>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
            }
        </View>
    );
};

const SearchList = (props) => {
    const [searchText, setSearchText] = useState('');
    const searchPress = () => {

    };

    return (
        <View style={styles.searchContainer}>
            <View style={styles.halfView}/>
            <TouchableWithoutFeedback style={styles.searchbarContainer} onPress={searchPress}>
                <MyImage source={require('../Asset/search.png')}
                         imageContainerStyle={styles.searchIcon}/>
                <TextInput onChangeText={(searchText) => setSearchText({searchText})}
                           value={searchText}
                           placeholder={MyStrings.searchFieldPlaceHolder}
                           placeholderTextColor={Colors.light_border_color}
                           autoCapitalize='none'
                           style={styles.searchField}/>
            </TouchableWithoutFeedback>

        </View>
    );
};
export default SearchField;


const styles = StyleSheet.create({
    //search bar
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchbarContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: dimen.app_padding * 3,
        marginRight: dimen.app_padding * 3,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.light_border_color,
        backgroundColor: Colors.home_widget_background_color,
    },
    searchIcon: {
        width: 12,
        height: 12,
        margin: 5,
        marginLeft: 15,
    },
    searchField: {
        fontSize: 13,
        padding: 5,
        flexGrow: 1,
        color: Colors.light_border_color,
    },
    halfView: {
        height: 18,
        width: '100%',
        backgroundColor: Colors.primary_color,
        position: 'absolute',
        top: 0, left: 0, right: 0,

    },

    searchResultsContainer:{
        top: 40,
        left: 40,
        right: 40,
        zIndex: 1,
        position: 'absolute',
        backgroundColor: 'yellow',
    },

});
