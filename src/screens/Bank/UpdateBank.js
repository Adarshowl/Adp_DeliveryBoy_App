import React, { useContext, useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Switch,
    Button,
    ScrollView,
    CheckBox,
    I18nManager,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import GlobalStyle from '../../styles/GlobalStyle';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import themeContext from '../../constants/themeContext';
import { FONTS } from '../../constants/Fonts';
import { COLORS } from '../../constants/Colors';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import VegUrbanEditText from '../../utils/EditText/VegUrbanEditText';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { WebView } from 'react-native-webview';
import {
    ShowConsoleLogMessage,
    ShowToastMessage,
    validateFieldNotEmpty,
} from '../../utils/Utility';
import { useDispatch, useSelector } from 'react-redux';

import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserData, fetchUserToken } from '../../redux/actions';

import ApiCall from '../../network/ApiCall';
import { API_END_POINTS } from '../../network/ApiEndPoints';
import DeliveryBoyProgressBar from '../../utils/DeliveryBoyProgressBar';
import { useIsFocused } from '@react-navigation/native';


const UpdateBank = ({route}) => {


    const [show, setShow] = useState(false);
    const theme = useContext(themeContext);
    const isRTL = I18nManager.isRTL;
    const [loading, setLoading] = useState('')

    const error = ""
    const { item } = route.params;
    console.log('Item in Order Screen:', item);
    const id = item?._id;
    const navigation = useNavigation();

    const [BankName, setBankName] = useState('');
    const [name, setHolderName] = useState('');

    const [accountnumber, setaccountnumber] = useState('');
    const [ifsccode, setifsccode] = useState('');
    const [isBankPayment, setBankPayment] = useState(false);
    const [productDescription, setProductDescription] = useState('');
    const [isCashOnDelivery, setIsCashOnDelivery] = useState(false);

    const [focused, setFocused] = React.useState(false);
    const [focused1, setFocused1] = React.useState(false);

    const userToken = useSelector(state => state.state?.userToken);
    const userData = useSelector((state) => state.state?.userData);
    // useEffect(() => {
    //     getPaymentlist();
    // }, []);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            (async () => {
                await AsyncStorage.getItem('userData', (error, value) => {
                    if (error) {
                    } else {
                        if (value !== null) {
                            // setUserData(JSON.parse(value));
                            // getPaymentlist(JSON.parse(value)?.id);
                        } else {
                        }
                    }
                });
            })();
        }
    }, [isFocused]);

   

    useEffect(() => {
        if (item) {
            setHolderName(item?.accountholdername)
            setBankName(item?.bankname);
            setaccountnumber(item?.accountnumber);
            setifsccode(item?.ifsccode + "");

        }
    }, [item]);

    // { use Token } , accountholdername, accountnumber, bankname, ifsccode
    const updtaeBankPayment = () => {
        // console.log("iiiiiiii", bankList[0]?._id)
        setLoading(true);

        try {
            const body =
            {
                updateId: item._id,
                bankname: BankName,
                accountholdername: name,
                accountnumber: accountnumber,
                ifsccode: ifsccode,
            }
            console.log(body)
            console.log("response axios >>> ", JSON.stringify(API_END_POINTS.UPDATE_BANK_LIST));

            ApiCall('post', body, API_END_POINTS.UPDATE_BANK_LIST, {
                'Content-Type': 'application/json',
                'x-access-token': userToken || userData?.remember_token,
            }).then(response => {
                console.log(" add product ", JSON.stringify(response));

                if (response?.statusCode === 200) {
                    // setDashboard(response?.data?.data)

                    navigation.goBack('Bank')
                    ShowToastMessage(response?.data?.success)

                } else if (response?.statusCode === 500) {
                    if (response.data?.message === "Token Mismatch") {
                        Alert.alert(
                            'Session Expired',
                            'Your session has expired due to a security issue. Please log in again to continue using the application.',
                            [
                                {
                                    text: 'OK',
                                    onPress: () => {
                                        clearUserToken();
                                    },
                                },
                            ]
                        );
                    }
                } else {
                }
            })
                .catch(error => {
                    console.log("error axios -> ", error);
                }).finally(() => {
                    setLoading(false);
                });
        } catch (error) {
            ShowToastMessage(` You selected : ${error.message}`);
            setLoading(false);
        }
    };
    const clearUserToken = async () => {
        try {
            await AsyncStorage.clear();
            // await AsyncStorage.removeItem('userToken');
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Auth' }],
                })
            );
        } catch (error) {
            console.error('Error clearing userToken:', error);
        }
    };

    return (

        <View
            style={[
                GlobalStyle.mainContainerBgColor,
                {
                    backgroundColor: theme.colors.bg_color_onBoard,
                    borderRadius: 5,
                    flex: 1

                },
            ]}>
            <DeliveryBoyProgressBar loading={loading} />

            <View
                style={[
                    GlobalStyle.commonToolbarBG,
                    {
                        backgroundColor: theme?.colors.bg_color_onBoard,
                        elevation: 5
                    },
                ]}>
                <Ionicons
                    name="ios-arrow-back"
                    color={theme.colors.white}
                    size={25}
                    style={[
                        styles.backIcon,
                        {
                            opacity: !show ? 1 : 0.0,
                            transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
                            marginStart: 10
                        },
                    ]}
                    onPress={() => {
                        navigation.goBack();
                    }}
                />

                <VegUrbanCommonToolBar
                    title="Update Bank Account"
                    style={{
                        backgroundColor: theme.colors.bg_color_onBoard,
                        marginStart: 10,
                        fontFamily: FONTS?.bold,
                        alinItem: 'center'
                    }}
                    textStyle={{
                        color: theme.colors.white,
                        fontFamily: FONTS?.bold,
                        fontSize: 18,
                        textAlin: 'center'

                    }}
                />

            </View>
            <ScrollView >
                <View style={{
                    marginHorizontal: 15,
                    marginTop: 10,
                    flex: 1,
                    backgroundColor: COLORS?.white
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: FONTS?.bold,
                        color: COLORS?.black,
                        marginBottom: 10
                    }}>Bank Detail Information</Text>


                    {/* <View style={{
                        alinItem: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 12,
                        marginBottom: 12
                    }}>
                        <Text style={{
                            flex: 1,
                            fontSize: 17,
                            color: COLORS?.black,
                            fontFamily: FONTS?.medium,
                            marginLeft: 5
                        }}>Bank Payment</Text>
                        <Switch
                            value={isBankPayment}
                            onValueChange={value => setBankPayment(value)}
                        />
                    </View> */}


                    {/* <View style={{
                        alinItem: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 12,
                        marginBottom: 12,
                        elevation: 8
                    }}>
                        <Text style={{
                            flex: 1,
                            fontSize: 17,
                            color: COLORS?.black,
                            fontFamily: FONTS?.medium,
                            marginLeft: 5
                        }}>Cash Payment</Text>
                        <Switch
                            value={isCashOnDelivery}
                            onValueChange={value => setIsCashOnDelivery(value)}
                        />
                    </View> */}

                    <VegUrbanEditText
                        // placeholder="HDFC"
                        label="Bank Name"
                        value={BankName}

                        style={{
                            color: theme?.colors?.white,
                        }}
                        // keyBoardType={'email-address'}
                        onChangeText={v => setBankName(v)}
                    />
                    <VegUrbanEditText
                        label="Bank Holder Name"
                        value={name}

                        style={{
                            color: theme?.colors?.white,
                        }}
                        // keyBoardType={'number-pad'}
                        onChangeText={v => setHolderName(v)}
                    />
                    <VegUrbanEditText
                        // placeholder="Bank account Name"
                        label="Bank Account Number"
                        value={accountnumber}

                        style={{
                            color: theme?.colors?.white,
                        }}
                        keyBoardType={'number-pad'}
                        onChangeText={v => setaccountnumber(v)}
                    />

                    <VegUrbanEditText
                        placeholder="12903"
                        label="Bank IFS Code"
                        value={ifsccode}

                        style={{
                            color: theme?.colors?.white,
                        }}
                        keyBoardType={'number-pad'}
                        onChangeText={v => setifsccode(v)}
                    />



                    <VegUrbanCommonBtn
                        height={40}
                        width={'100%'}
                        borderRadius={10}
                        textSize={16}
                        marginTop={20}
                        // textColor={COLORS?.white}

                        textColor={COLORS?.white}

                        text={('Save')}
                        backgroundColor={COLORS?.colorPrimary}
                        onPress={() => {
                            updtaeBankPayment();
                        }}
                        textStyle={{
                            fontFamily: FONTS?.bold,

                            // textTransform: 'uppercase',
                        }}
                    />
                </View>
            </ScrollView>

        </View>

    );
};

export default UpdateBank;
const styles = StyleSheet.create({

    textView: {
        // flexDirection: 'row',
        flex: 1,
        // width: '100%',
        // borderWidth: 0.2,
        // alignSelf: 'center',
        // marginVertical: 12,
        // // backgroundColor: theme?.colors?.bg_color,
        // // borderColor: COLORS?.bg_color,
        // // placeholderTextColor:theme?.colors?.textColor,

        // // placeholderTextColor: COLORS.editTextBorder, 
        // paddingHorizontal: 10,
        // height: 42,
        // marginHorizontal: 0,
        // // borderRadius: 10,
        // fontFamily: 'Quicksand-Regular',
        // textAlign: I18nManager.isRTL ? 'right' : 'left',
    }

})