import * as React from 'react';
import {
    View, TouchableOpacity, Text,
    StyleSheet,
} from 'react-native';
import Tab from './Tab';

import Colors from '../Styles/Colors';
import dimen from '../Styles/Dimen';

const S = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: Colors.border_color,
        // borderTopWidth: 0.5,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: dimen.bottom_tab_height,
        // elevation: 3,
        // shadowColor: "black",
        // shadowRadius:5,
        // shadowOffset:{width:5,height:5},

        backgroundColor: Colors.bottom_bar_background_color,
        // backgroundColor: Colors.primary_color,
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
    },
});

// transparent color. rgba(52, 52, 52, 0.8)


export default class TabBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {routes, index: activeRouteIndex} = this.props.state;
        return (
            <View style={[S.container]}>

                {routes.map((route, routeIndex) => {
                    const isRouteActive = routeIndex === activeRouteIndex;
                    const onPress = () => {
                        const event = this.props.navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });
                        if (!isRouteActive && !event.defaultPrevented) {
                            this.props.navigation.navigate(route.name);
                        }
                    };
                    return (
                        <Tab key={routeIndex}
                             id={routeIndex}
                             onPress={onPress}
                             focused={isRouteActive}
                        />

                    );
                })}
            </View>
        );

    }


}

