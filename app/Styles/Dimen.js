import {Dimensions} from 'react-native';
const dimen={
    home_item_padding:5,
    small_padding:10,
    app_padding:15,
    login_border_radius:5,
    signup_margin:27,
    buttonfont:15,
    textinputfontsize:14, //50

    bottom_user_padding:30,
    bottom_margin_for_bottom_menu:66,
    bottom_tab_height:66,
    border_radius:10,

    login_input_margin:10,
    login_input_text_font:14,
    login_input_border_radius_font:25,

    carouselContainerWidth:deviceWidth,


}
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

export default dimen;
