import React from 'react';
import {Image, ImageBackground, SafeAreaView, Text, StatusBar, View} from 'react-native';
import Colors from '../Styles/Colors';
import dimen from '../Styles/Dimen';

const MyBackgroundImage = (props) => {
    return (
        <View style={[{flex: 1, backgroundColor: Colors.home_background_color},
            (props.isBottom !== undefined && props.isBottom === false) ? {marginBottom: 0} : {marginBottom: dimen.bottom_margin_for_bottom_menu - 6},
        ]}>
            {/*<View style={[{flex: 1, backgroundColor:Colors.home_background_color},]}>*/}
            {props.children}
            {/*</View>*/}
        </View>
    );
};
export default MyBackgroundImage;


{/*<ImageBackground source={require('../Asset/background.png')} style={{flex:1,width: '100%', height: '100%'}}>*/
}
{/*    {props.children}*/
}
{/*</ImageBackground>*/
}

{/*<View style={{flex: 1, backgroundColor: Colors.home_background_color}}>*/
}
{/*    <View style={[{flex: 1, backgroundColor: Colors.home_background_color},*/
}
{/*        (props.isBottom !== undefined && props.isBottom === false) ? {marginBottom: 0} : {marginBottom: dimen.bottom_margin_for_bottom_menu}]}>*/
}
{/*        {props.children}*/
}
{/*    </View>*/
}
{/*</View>*/
}
