import React, { useContext, useRef, useState, useEffect } from 'react';
import {
    Image,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    I18nManager,
    ScrollView,
    Button
} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign"
import Octicons from 'react-native-vector-icons/Octicons';
import NextTextInput from 'react-native-next-input'
import { FONTS } from '../../constants/Fonts';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import { STRING, images } from '../../constants';
import { COLORS } from '../../constants/Colors';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanEditText from '../../utils/EditText/VegUrbanEditText'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import VegUrbanFloatEditText from '../../utils/EditText/VegUrbanFloatEditText';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import OtpInputs from 'react-native-otp-inputs';
import { ShowToastMessage, validateFieldNotEmpty } from '../../utils/Utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import themeContext from '../../constants/themeContext';
import { useTranslation } from 'react-i18next';
import { color } from 'react-native-elements/dist/helpers';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const AddNewAddress = ({ navigation }) => {

    const theme = useContext(themeContext);
    const [addressDefault, setAddressDefault] = useState(false);

    const { t, i18n } = useTranslation();
    const [showDate, setShowDate] = useState(false);

    const [showOtp, setShowOtp] = useState(false);
    const [isOTPValid, setIsOTPValid] = useState(false);

    const [mobile, setMobile] = useState('');
    const [refer, setRefer] = useState('');
    const [email, setEmail] = useState('');
    // const [focused, setFocused] = useState(false);
    const phoneInput = useRef(null);
    const [mobileNumber, setMobileNumber] = useState('');
    const [focusedInput, setFocusedInput] = useState(-1); // Initialize with an invalid value

    const [show, setShow] = useState(false);
    const [showAfter, setShowAfter] = useState(false);
    const [newPassShow, setNewPassShow] = useState(true);
    const [conPassShow, setConPassShow] = useState(true);
    const [newPass, setNewPass] = useState('');
    const [conPass, setConPass] = useState('');

    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60); // Set the initial timer value
    const [isTimerActive, setIsTimerActive] = useState(true);
    const error = ""
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [ConfirmPwd, setConfirmPwd] = useState('');
    const handleInputFocus = (index) => {
        setFocusedInput(index);
    };

    const [showConfirmOtp, setShowConfirmOtp] = useState(false);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false); // State to control the visibility of the date and time picker

    const showDatePicker = () => {
        setDatePickerVisible(true); // Show the date and time picker when this function is called
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false); // Hide the date and time picker when this function is called
    };

    const handleDateConfirm = (selectedDate) => {
        // Handle the selected date and time
        console.log('Selected Date:', selectedDate);
        hideDatePicker(); // Close the date and time picker
    };
    const [expiryDate, setExpiryDate] = useState('');
    const [isDateValid, setIsDateValid] = useState(true);

    const handleExpiryDateChange = (text) => {
        const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        const isValidFormat = datePattern.test(text);

        if (!isValidFormat) {
            setExpiryDate(text);
            setIsDateValid(false);
            return;
        }
        const [day, month, year] = text.split('/').map((part) => parseInt(part, 10));

        // Validate day, month, and year values here if needed

        // Check if it's a valid date using JavaScript's Date object
        const parsedDate = new Date(year, month - 1, day); // Month is 0-based
        const currentDate = new Date();

        if (parsedDate < currentDate) {
            // Expiry date is earlier than the current date
            setExpiryDate(text);
            setIsDateValid(false);
        } else {
            setExpiryDate(text);
            setIsDateValid(true);
        }
    };

    const handleConfirm = date => {
        setEventDate(moment(date).format('L'));
        if (moment(date).format('L') == moment(new Date()).format('L')) {
            setStartTime(moment(new Date()).format('LT'));
        }
        hideDatePicker();
    };
    // const showDatePicker = () => {
    //     setShowDate(true);
    // };

    // const hideDatePicker = () => {
    //     setShowDate(false);
    // };
    const onSubmitClick = () => {
        handleOTPpassword();
    };
    const handleOTPpassword = () => {
        if (validateFieldNotEmpty(code)) {
            ShowToastMessage('OTP is required');
        } else {
            navigation.navigate('MainContainer')
        }
    };

    const [focused, setFocused] = React.useState(false);
    const [focused2, setFocused2] = React.useState(false);


    const getBorderWidth = () => {
        if (error) {
            return 1;
        }
        if (focused) {
            return 1;
        } else {
            return 0.2;
        }
    };

    const getBorderColor = () => {
        if (error) {
            return COLORS.red;
        }

        if (focused) {
            return theme?.colors?.colorPrimary;
        } else {
            return COLORS.bg_color;
        }
    };

    const getBgColor = () => {
        if (error) {
            return COLORS.red;
        }
        if (focused) {
            return theme?.colors?.bg_color;
        } else {
            // return COLORS.lightest_gray1;
            // return COLORS.bg_color;
            return theme?.colors?.bg_color;

        }
    };
    const getBorderWidth2 = () => {
        if (error) {
            return 1;
        }
        if (focused2) {
            return 1;
        } else {
            return 0.2;
        }
    };

    const getBorderColor2 = () => {
        if (error) {
            return COLORS.red;
        }

        if (focused2) {
            return theme?.colors?.colorPrimary;
        } else {
            return COLORS.bg_color;
        }
    };

    const getBgColor2 = () => {
        if (error) {
            return COLORS.red;
        }
        if (focused2) {
            return theme?.colors?.bg_color;
        } else {
            // return COLORS.lightest_gray1;
            // return COLORS.bg_color;
            return theme?.colors?.bg_color;

        }
    };
    const closeSignUpModal = () => {
        setShow(!show);
    };

    const [rememberMe, setRememberMe] = useState(false);

    const handleRememberMeToggle = () => {
        setRememberMe(!rememberMe);
    };

    return (
        <SafeAreaView
            style={[
                GlobalStyle.mainContainer,
                {
                    backgroundColor: theme?.colors?.colorPrimary,
                },
            ]}>

            <View
                style={[
                    GlobalStyle.commonToolbarBG,
                    {
                        backgroundColor: theme.colors.bg_color_onBoard,
                    },
                ]}>
                <Ionicons
                    name="ios-arrow-back"
                    // color={COLORS.black}
                    color={theme.colors.textColor}

                    size={25}
                    style={[
                        styles.backIcon,
                        {
                            opacity: !show ? 1 : 0.0,
                            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
                            marginStart: 18,
                            marginTop: 10
                        },
                    ]}
                    onPress={() => {
                        navigation.goBack();
                        // ShowToastMessage('Coming Soon!');
                    }}
                />
                {/* <ToolBarIcon
           title={Ionicons}
           iconName={'chevron-back'}
           icSize={20}
           icColor={COLORS.colorPrimary}
           style={{
             backgroundColor: theme?.colors?.toolbar_icon_bg,
             marginEnd: 10,
           }}
           onPress={() => {
             navigation.goBack();
           }}
         /> */}
                <VegUrbanCommonToolBar
                    title="Add New Address"
                    // title={route?.params?.item?.name + ''}

                    style={{
                        backgroundColor: theme.colors.bg_color_onBoard,
                        marginStart: 20

                    }}
                    textStyle={{
                        color: theme.colors.textColor,
                        fontWeight: 'bold',
                        fontSize: 20
                    }}
                />

                {/* <ToolBarIcon
           title={Ionicons}
           iconName={'person'}
           icSize={20}
           icColor={COLORS.colorPrimary}
           style={{
             backgroundColor: theme?.colors?.toolbar_icon_bg,
             marginEnd: 10,
           }}
           onPress={() => {
             navigation.navigate('Profile');
           }}
         /> */}
            </View>
            <ScrollView
                style={[
                    // GlobalStyle.loginModalBg,
                    {

                        backgroundColor: theme.colors?.bg_color_onBoard,
                        flex: 1

                        // backgroundColor: theme?.colors?.bg_color_onBoard,
                    },
                ]}>
                <Image
                    source={images.address}

                    style={styles.app_logo} />
                <View
                    style={[
                        GlobalStyle.loginModalBg,
                        {

                            backgroundColor: theme.colors?.bg_color_onBoard,


                            // backgroundColor: theme?.colors?.bg_color_onBoard,
                        },
                    ]}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={[
                            styles.head,
                            {
                                color: theme?.colors?.colorPrimary,
                                marginTop: 10,
                                textAlign: 'center',
                            },
                        ]}>
                        Address Detail
                    </Text>
                    <View style={styles.divLine} />


                    <View style={{
                        marginTop: 10,

                    }}>

                        <VegUrbanEditText
                            placeholder="Name Address"
                            label="Name Address"
                            iconPosition={'left'}
                            // value={email}
                            style={{
                                color: theme?.colors?.white,
                                fontFamily: FONTS?.regular,

                            }}
                            lableStyle={{
                                    fontFamily: FONTS?.regular,
                            
                            }}
                            textStyle={{
                            }}
                            keyBoardType={'name-pad'}
                        // onChangeText={v => setEmail(v)}
                        />
                        <VegUrbanEditText
                            placeholder="Address Detail"
                            label="Address Detail"
                            // iconPosition={'left'}
                            // value={email}
                            style={{
                                color: theme?.colors?.white,
                                fontFamily: FONTS?.regular,
                            }}
                            textStyle={{
                                // fontFamily: FONTS?.bold,                                
                            }}
                            keyBoardType={'name-pad'}

                        // onChangeText={v => setEmail(v)}
                        />
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                setAddressDefault(!addressDefault);
                            }}
                            style={[
                                {
                                    flex: 1,
                                    // marginHorizontal: 25,
                                    marginVertical: 15,
                                    marginBottom: 25

                                },
                                GlobalStyle.flexRowAlignCenter,
                            ]}>
                            <MaterialCommunityIcons
                                name={
                                    addressDefault ? 'checkbox-marked' : 'checkbox-blank-outline'
                                }
                                size={22}
                                color={theme.colors.colorPrimary}
                            />
                            {/*<MaterialCommunityIcons*/}
                            {/*  name={}*/}
                            {/*  size={22}*/}
                            {/*  color={COLORS.colorPrimary}*/}
                            {/*/>*/}
                            <Text
                                style={[
                                    GlobalStyle.addUpSelectionText,
                                    {
                                        color: theme.colors.textColor,
                                        fontFamily: FONTS?.medium,
                                        // marginBottom:10,
                                        marginLeft: 18

                                    },
                                ]}>
                                {t('Make this as the default address')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View
                    style={{
                        marginHorizontal: 10,
                        marginVertical:10
                    }}
                >
                    <VegUrbanCommonBtn
                        height={45}
                        width={'100%'}
                        borderRadius={20}
                        textSize={16}
                        textColor={theme?.colors?.btnTextColor}
                        text={('Add ')}
                        backgroundColor={theme?.colors?.colorPrimary}
                        onPress={() => {
                            navigation.goBack('Address');
                            ShowToastMessage("Add Address")
                        }}
                        textStyle={{
                            fontFamily: FONTS?.bold,

                        }}
                    />
                </View>
            </ScrollView>



        </SafeAreaView>
    );
};

export default AddNewAddress;

const styles = StyleSheet.create({
    backIcon: {
        // marginTop: 18,
        marginStart: 15,
        paddingVertical: 5,
        borderRadius: 100,
        alignSelf: 'flex-start',
    },
    divLine: {
        height: 0.5,
        width: '95%',
        backgroundColor: COLORS.gray,
        alignSelf: 'center',
        marginVertical: 5,
        marginTop: 10
    },
    head: {
        // marginTop: 15,
        paddingVertical: 5,
        fontFamily: FONTS?.bold,
        // textAlign: 'center',
        fontSize: 20,
        color: COLORS.black,
        // marginTop: 8,
        // marginBottom: 8,
        // marginBottom: 20
        // marginLeft: 20
    },
    resend: {
        marginTop: 15,
        paddingVertical: 5,
        fontFamily: 'OpenSans-Mulish',
        textAlign: 'center',
        fontSize: 22,
        color: COLORS.black,
        marginTop: 20,
        // marginBottom: 8,
        // marginBottom: 20
    },
    txt: {
        marginTop: 10,
        paddingVertical: 20,
        fontFamily: 'OpenSans-Mulish',
        // textAlign: 'center',
        fontSize: 18,
        color: COLORS.black,
        // marginTop: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        // marginBottom: 20
    },
    heading: {
        fontFamily: 'OpenSans-Mulish',
        // textAlign: 'center',
        fontSize: 20,
        color: COLORS.gray,
        marginTop: 8,
        marginBottom: 8,
        // fontWeight: 'bold',
        marginBottom: 20
    },
    app_logo: {
        height: 320,
        resizeMode: 'cover',
        // alignSelf: 'center',
        width: '100%',
        // marginTop: 30,
        // marginBottom: 20

    },
    forgot_text: {
        fontSize: 14,
        fontFamily: 'OpenSans-Regular',
        color: COLORS.black,
        marginVertical: 25,
        textDecorationLine: 'underline',
    },
    resendWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
    },
    resendWrapperText: {
        fontFamily: 'OpenSans-Medium',
        color: COLORS.colorPrimary,
        marginStart: 5,
    },
    msg_privacy_terms: {
        color: COLORS.black,
        fontFamily: 'OpenSans-Regular',
        fontSize: 14,
        flex: 1,
    },
    textBox: {
        // borderWidth:0.2,
        width: '20%',
        height: 50,
        marginHorizontal: 4,
        borderRadius: 10,
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 18
    },
    textBoxes: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },

    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    // textBox: {
    //   width: 50, // Adjust the width as needed
    //   height: 50, // Adjust the height as needed
    //   borderWidth: 1,
    //   borderColor: 'gray',
    //   textAlign: 'center',
    //   fontSize: 20,
    // },

    textView: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        width: '90%',

        // borderWidth: 0.2,
        // alignSelf: 'center',
        marginVertical: 12,
        // backgroundColor: theme?.colors?.bg_color,
        // borderColor: COLORS?.bg_color,
        // placeholderTextColor:theme?.colors?.textColor,

        // placeholderTextColor: COLORS.editTextBorder,
        paddingHorizontal: 10,
        height: 55,
        // marginHorizontal: 0,
        // borderRadius: 10,
        fontFamily: 'Quicksand-Regular',
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    }
});
