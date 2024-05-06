import * as React from "react"
import {
    View,
    StyleSheet,
} from "react-native"
import Colors from "../Styles/Colors";
import dimen from "../Styles/Dimen";
import TabVendor from './TabVendor';

const S = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderColor: Colors.bottom_menu_border,
        borderTopWidth:2,
        position: 'absolute',
        bottom: 0,
        width: "100%",
        height: dimen.bottom_tab_height,
        elevation: 20,
        backgroundColor: Colors.home_widget_background_color,
        justifyContent: 'space-evenly',
        alignItems: 'stretch'
    },

    tabButton: {flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'red'}
});
// transparent color. rgba(52, 52, 52, 0.8)
export default class TabBarVendor extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {
            renderIcon,
            getLabelText,
            activeTintColor,
            inactiveTintColor,
            onTabPress,
            onTabLongPress,
            getAccessibilityLabel,
            navigation,
        } = this.props;
        const {routes, index: activeRouteIndex} = navigation.state;

        return (
            <View style={[S.container]}>

                {routes.map((route, routeIndex) => {
                    const isRouteActive = routeIndex === activeRouteIndex;
                    const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
                    return (

                        <TabVendor key={routeIndex}
                             id={routeIndex}
                             onPress={() => onTabPress({route})}
                             accessibilityLable={getAccessibilityLabel({route})}
                             focused={isRouteActive}
                             // currentid={this.idd}
                        />

                    );
                })}
            </View>
        );

    }


}
