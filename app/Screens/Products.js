import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import MyBackgroundImage from '../Components/MyBackgroundImage';
import TopBar from '../Components/TopBar';
import Colors from '../Styles/Colors';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import dimen from '../Styles/Dimen';
import {ProductCard} from '../Components/ProductCard';
import {EmptyList, Loader} from '../Components/Loader';
import {console_log, errorAlert, getDataWithoutToken, isNetConnected, saveObject} from '../Classes/auth';
import {MyUrls} from '../Classes/MyUrls';
import {Keys} from '../Classes/Keys';


export const Products = ({navigation}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts()
    }, []);

    const getAllProducts = () => {
        isNetConnected()
            .then(res => {
                getDataWithoutToken(MyUrls.get_all_products_url, 'GET', '', setIsLoading)
                    .then(res => {
                        if (res.data){
                            setProducts(res.data)
                            saveObject(Keys.delivery_charges_key,res.delivery_charges).then().catch()
                        }
                    })
                    .catch(err => errorAlert(err));

            })
            .catch(err => errorAlert(err));
    };


    const productPress = (item) => {
        navigation.navigate('ProductDetails', {product: item});
    };


    return (
        <MyBackgroundImage isBottom={true}>
            <TopBar title={'Products'}/>

            <View style={{flex: 1, justifyContent: 'flex-start',}}>

                <FlatList
                    style={{flex: 1, marginTop:0,paddingTop:0,paddingBottom:10}}
                    data={products}
                    keyExtractor={(item, index) => item.id.toString()}
                    numColumns={1}
                    bounces={false}
                    renderItem={({item, index}) => (
                        <ProductCard data={item}
                                     onPress={productPress}
                        />
                    )}

                    // ListEmptyComponent={
                    //     <EmptyList text={'List empty.'}/>
                    // }
                />


            </View>
            <Loader loading={isLoading}/>
        </MyBackgroundImage>
    );

};


const styles = StyleSheet.create({
    searchTextContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.search_background_color,
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    searchInputStyle: {
        flex: 1,
        fontSize: 14,
        padding: 5,
        backgroundColor: Colors.home_widget_background_color,
        margin: 10,
        marginLeft: dimen.app_padding,
        marginRight: dimen.app_padding,
        borderRadius: 20,
        paddingLeft: 10,
    },
    searchArrowStyle: {
        width: 15,
        height: 20,
        // backgroundColor:'red'
    },
    searchAZ: {
        width: 20,
        height: 26,
        marginRight: dimen.app_padding,
    },

    addNewAppointmentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.app_background_color,
        // backgroundColor:'red',
        margin: dimen.app_padding,
        marginTop: 0,
        marginRight: dimen.app_padding * 2,
        marginLeft: dimen.app_padding * 2,
        borderRadius: dimen.app_padding * 2,
        padding: 10,
        borderColor: Colors.primary_color,
        borderWidth: 1,

    },
    addNewAppText: {
        fontSize: 16,
        color: Colors.primary_color,
    },

});
