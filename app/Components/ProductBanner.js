import React from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    Platform,
    TouchableOpacity, ScrollView, Dimensions,
    View,
} from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import AppText from './AppText';
import dimen from '../Styles/Dimen';
import Colors from '../Styles/Colors';
import MyImageButton, {MyImage} from './MyImageButton';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
export default class ProductBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            // entries: [{'id': '1', 'title': 'first'}, {'id': '2', 'title': 'second'}, {'id': '3', 'title': 'third'}],
            entries: props.images,
            activeSlide: 0,
        });
        this._carousel = null;
        this.width = dimen.carouselContainerWidth;
    }

    _renderItem({item, index}) {
        return (
            <View style={styles.slide}>
                <MyImage
                    // source={require('../Asset/car.png')}
                    source={{uri:item.product_image}}
                    imageContainerStyle={styles.bannerImageStyle}/>
            </View>
        );
    }

    get pagination() {
        const {entries, activeSlide} = this.state;
        return (
            <Pagination
                dotsLength={entries.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.dotContainerStyle}
                dotStyle={styles.activeDotStyle}
                inactiveDotStyle={styles.inactiveDotStyle}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <Carousel
                        ref={(c) => {
                            this._carousel = c;
                        }}
                        data={this.state.entries}
                        renderItem={this._renderItem}
                        autoplay={true}
                        sliderWidth={viewportWidth - (dimen.app_padding * 2)}
                        itemWidth={viewportWidth - (dimen.app_padding * 2)}
                        // slideStyle={{width: viewportWidth - (dimen.app_padding * 2),}}
                        onSnapToItem={(index) => this.setState({activeSlide: index})}
                    />
                </View>
                {this.pagination}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // overflow: 'hidden',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        // borderRadius: 10,

    },
    container: {
        flex: 1,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.home_widget_background_color,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.light_border_color,
        marginBottom: dimen.app_padding,

    },
    slide: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        // backgroundColor: 'yellow',
    },
    bannerImageStyle: {
        // flex:1,
        width: '100%',
        resizeMode: 'contain',

        // backgroundColor: 'red',
    },

    dotContainerStyle: {
        width: '100%',
        paddingVertical: 5,
        // position: 'absolute',
        bottom: 5,
        // backgroundColor: 'red',
    },
    activeDotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        // marginHorizontal: 8,
        backgroundColor: Colors.primary_color,
    },
    inactiveDotStyle: {
        // Define styles for inactive dots here
        width: 10,
        height: 10,
        borderRadius: 5,
    },

});
