import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    I18nManager,
    View,
    Alert
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import { images, STRING } from '../../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {
    ShowConsoleLogMessage,
    ShowToastMessage,
    validateFieldNotEmpty,
} from '../../utils/Utility';
import { fetchUserData, fetchUserToken } from '../../redux/actions';
import VegUrbanEditText from '../../utils/EditText/VegUrbanEditText'
import ApiCall from '../../network/ApiCall';
import { API_END_POINTS } from '../../network/ApiEndPoints';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Octicons from 'react-native-vector-icons/Octicons'
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import themeContext from '../../constants/themeContext';
import { useTranslation } from 'react-i18next';
import { FONTS } from '../../constants/Fonts';
import MyEarningItem from './MyEarningItem';
import DeliveryBoyProgressBar from '../../utils/DeliveryBoyProgressBar';
import { useDispatch, useSelector } from 'react-redux';


const AddBalance = ({ navigation }) => {

    const theme = useContext(themeContext);
    const { t } = useTranslation();
    const [count, setCount] = useState(1);
    const [show, setShow] = useState(false);
    const [showEmpty, setShowEmpty] = useState(false)
    const [amount, setAmount] = useState('')
    const [message, setMessage] = useState('')

    const userToken = useSelector(state => state.state?.userToken);
    const userData = useSelector((state) => state.state?.userData);
    const dispatch = useDispatch();



    useEffect(() => {
        getAllShop();
        getBankBalance();
    }, []);

    const [bankData, setBankData] = useState({});
    const [todaydashboard, setTodayDashboard] = useState('');

    const [today, setTodayData] = useState({});
    const [loading, setLoading] = useState('')
    console.log("bank data", bankData)
    useEffect(() => {
        setTimeout(async () => {
            await getUserFromStorage();
        }, 0);
    }, []);

    const getUserFromStorage = async () => {
        try {
            await AsyncStorage.getItem('userData', (error, value) => {
                // console.log(value, '------------------');
                if (error) {
                } else {
                    if (value !== null) {
                        let tmp = JSON.parse(value)
                        // setUserData(tmp?.data);
                        // ShowConsoleLogMessage("data for te",(fetchUserData(JSON.parse(value.name))))
                        dispatch(fetchUserData(tmp?.data))
                        dispatch(fetchUserToken(tmp?.jwtoken))
                        // getDriverProfile(tmp?.id)
                    } else {
                    }
                }
            });
        } catch (err) {
            console.log('ERROR IN GETTING USER FROM STORAGE' + err);
        }
    };
    const getBankBalance = () => {
        setLoading(true);
        try {
            console.log("response axios >>> ", JSON.stringify(API_END_POINTS.BANK_LIST));

            ApiCall('get', null, API_END_POINTS.BANK_LIST, {
                'x-access-token': userToken || userData?.remember_token,
            }).then(response => {

                if (response?.statusCode === 200) {
                    console.log("Response bank LIST: ", JSON.stringify(response?.data));
                    setBankData(response?.data?.data)
                    if (response.data?.length !== 0) {
                        setShowEmpty(true);
                    }
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
                    setShowEmpty(true);
                    setLoading(false)
                }
            })
                .catch(error => {
                    setShowEmpty(true)
                    console.log("error axios -> ", error);
                }).finally(() => {
                    setLoading(false);
                });
        } catch (error) {
            ShowToastMessage(`You selected : ${error.message}`);
            setLoading(false);
        }
    };
    const getAllShop = () => {
        setLoading(true);
        try {
            console.log("response axios >>> ", JSON.stringify(API_END_POINTS.BALANCE_WITHDRAWAL_LIST));

            ApiCall('get', null, API_END_POINTS.BALANCE_WITHDRAWAL_LIST, {
                'Content-Type': 'application/json',
                'x-access-token': userToken || userData?.remember_token,
            }).then(response => {

                if (response?.statusCode === 200) {
                    // console.log("Response WITHDRAWAL_LIST: ", JSON.stringify(response.data));
                    setTodayData(response?.data?.data)
                    if (response.data?.length !== 0) {
                        setShowEmpty(true);
                    }
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
                    setShowEmpty(true);
                }
            })
                .catch(error => {
                    setShowEmpty(true)
                    console.log("error axios -> ", error);
                }).finally(() => {
                    setLoading(false);
                });
        } catch (error) {
            ShowToastMessage(`You selected : ${error.message}`);
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


    const commissionPercentage = today?.admin_cammission;
    const totalAmount = today?.accountbalance;
    const calculatedAmount = totalAmount - (totalAmount * commissionPercentage / 100);

    console.log("calculatedAmount", calculatedAmount)
    console.log("calculatedAmount", totalAmount)

    const onLoginClick = () => {
        setLoading(true);
        try {
            if (bankData?.length === 0) {
                ShowToastMessage("Please add a bank account first."); // Show message for empty data
                setLoading(false);
                return; // Return to avoid further execution
            }
            if (!amount) {
                ShowToastMessage('Please enter an amount');
                setLoading(false);
                return;
            }

            if (!message) {
                ShowToastMessage('Please enter Message');
                setLoading(false);
                return;
            }
            if (/^\d+\.\d+$/.test(amount)) {
                ShowToastMessage('Decimal values are not allowed');
                setLoading(false);
                return;
              }
            const enteredAmount = parseInt(amount);
            if (isNaN(enteredAmount) || enteredAmount <= 0) {
                ShowToastMessage('Amount must be at least 1');
                setLoading(false);
                return;
            }

            if (parseFloat(amount) > calculatedAmount) {
                ShowToastMessage(`Please enter an amount equal to or less than the Total Amount $(${calculatedAmount}).`);
                setLoading(false);
                return; // Exit the function if the entered amount is greater than the calculated amount
            }

            const body = {
                total_amount: totalAmount,
                request_amount: amount,
                description: message,
            };

            ApiCall('post', body, API_END_POINTS.ADD_WITHDRAWAL, {
                'Content-Type': 'application/json',
                'x-access-token': userToken || userData?.remember_token,
            }).then(response => {
                console.log("response axios >>> ", JSON.stringify(response));
                if (response?.data?.status == true) {
                    navigation.goBack('Withdrawal');
                    ShowToastMessage("Add withdrawal", response?.data?.success);
                } else {
                    setLoading(false);
                    ShowToastMessage("Withdrawal request already in process.", response?.data?.errors);
                }
            }).catch(error => {
                console.log("error axios -> ", error);
                ShowToastMessage("Add", response?.data?.errors);

            }).finally(() => {
                setLoading(false);
            });
        } catch (error) {
            // ShowToastMessage("Withdrawal request already in process.", response?.data?.errors);
            setLoading(false);
        }
    };

    return (
        <SafeAreaView
            style={[
                GlobalStyle.mainContainerBgColor,
                {
                    backgroundColor: theme?.colors?.bg_color_onBoard,
                    flex: 1
                },
            ]}>
            <DeliveryBoyProgressBar loading={loading} />

            <View
                style={[
                    GlobalStyle.commonToolbarBG,
                    {
                        backgroundColor: theme.colors.bg_color_onBoard,
                        elevation: 0
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
                    title="Send Withdraw Request"
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
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={true}
                showsHorizontalScrollIndicator={true}
            >
                <View style={styles.container}>

                    <View style={styles.statusContainer}>
                        <View style={[styles?.filed, {
                            backgroundColor: '#40B873'
                        }]}>

                            <Text style={styles.statusText1}>Total Balance</Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginHorizontal: 5
                            }}>
                                <Text style={[styles.statusText1, {
                                    fontSize: 23,
                                    marginTop: 8,
                                    marginEnd: 10
                                }]}>
                                    ${today?.accountbalance}
                                </Text>
                            </View>
                            {/* <Text style={styles.normalLeft1}>16 oct,2023</Text> */}

                        </View>
                        <View style={[styles?.filed, {
                            backgroundColor: '#F49127'
                        }]}>

                            <Text style={styles.statusText1}>Admin Commission</Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginHorizontal: 5
                            }}>
                                <Text style={[styles.statusText1, {
                                    fontSize: 23,
                                    marginTop: 8,
                                    marginEnd: 10
                                }]}>

                                    {today?.admin_cammission}%
                                </Text>
                            </View>


                        </View>
                    </View>


                    {/* <View style={{
                        marginBottom: 20,
                        marginHorizontal: 10

                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={styles?.statusText}>Total Balance</Text>
                            <Text style={styles?.statusText}>
                                ${today?.accountbalance}
                            </Text>

                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={styles?.statusText}>Admin Commission</Text>
                            <Text style={styles?.statusText}>
                                {today?.admin_cammission}%
                            </Text>
                        </View>
                    </View> */}
                    <View style={{
                        flex: 1,
                        marginHorizontal: 15,
                        marginTop: 50,
                        marginBottom: 30

                    }}>

                        <VegUrbanEditText

                            placeholder="Enter Amount"
                            label="Amount"
                            value={amount}
                            iconPosition={'left'}
                            keyBoardType={'number-pad'}
                            icon={
                                <FontAwesome
                                    name={"dollar"}
                                    size={16}
                                    color={COLORS.grey}
                                    style={{
                                        marginHorizontal: 15
                                    }} />
                                // <Octicons
                                //   name={'check-circle'}
                                //   size={20}
                                //   style={{
                                //     marginHorizontal: 10,
                                //   }}
                                // />
                            }
                            style={{
                                color: theme?.colors?.textColor,
                                fontFamily: FONTS?.regular,

                            }}
                            onChangeText={v => setAmount(v)}
                        />

                        <VegUrbanEditText
                            placeholder="Enter message"
                            label="Message"
                            multiline={true}
                            value={message}
                            // numberOfLines={4}
                            maxLength={500}
                            style={{
                                color: theme?.colors?.textColor,
                                fontFamily: FONTS?.regular,
                            }}
                            onChangeText={(v) => setMessage(v)}
                        />
                    </View>

                </View>
                <View style={{
                    justifyContent: 'center',
                    flex: 1,
                    alinItem: 'center',
                    marginHorizontal: 20,

                }}>
                    <VegUrbanCommonBtn
                        height={45}
                        width={'100%'}
                        borderRadius={10}
                        textSize={16}
                        textColor={COLORS?.white}
                        iconPosition={'left'}
                        text={('Add Request')}
                        backgroundColor={COLORS?.ontheway}
                        // onPress={onCancel}
                        //     onCancelClick(item)

                        onPress={() => onLoginClick()}

                        textStyle={{
                            fontFamily: FONTS?.bold,

                        }}
                    />
                </View>


            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10,
        marginHorizontal: 13,
        marginVertical: 10,
        marginTop: 30
    },
    statusContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 6,
        flex: 1
    },
    scrollContainer: {
        // flexGrow: 1,
    },
    statusText: {
        // textAlign: 'center',
        fontSize: 16,
        fontFamily: FONTS?.bold,
        marginTop: 5,
        marginLeft: 8,
        color: COLORS?.black,

    },
    statusText1: {
        // textAlign: 'center',
        fontSize: 16,
        fontFamily: FONTS?.bold,
        marginTop: 5,
        marginLeft: 8,
        color: COLORS?.white,
    },
    filed: {
        flex: 1,
        borderRadius: 5,
        // borderWidth: 1,
        width: '100%',
        height: 80,
        // alignSelf: 'center',
        // justifyContent: 'center',
        borderRadius: 8,
        marginHorizontal: 3,
        // paddingHorizontal: 5,
        // paddingVertical: 10

    },
    image: {
        width: 30,
        height: 30,
        resizeMode: 'cover',
        alignSelf: 'center'
    },
    detailsView: {
        flex: 1,
        marginHorizontal: 20,
        borderRadius: 10,
        borderWidth: 0.2,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginTop: 30,
    },
    viewtext: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alinItem: 'center',
        paddingVertical: 5

    },
    ordertext: {
        fontFamily: FONTS?.bold,
        fontSize: 14,
        color: COLORS?.black,

    },
    normaltext: {
        fontSize: 12,
        fontFamily: FONTS?.regular,
        color: COLORS?.black,
        textAlign: 'right'
    },
    normalLeft: {
        fontSize: 14,
        fontFamily: FONTS?.regular,
        color: COLORS?.black,
        marginLeft: 8
    },
    normalLeft1: {
        fontSize: 14,
        fontFamily: FONTS?.regular,
        color: COLORS?.white,
        marginLeft: 8
    },
    produst: {
        fontSize: 16,
        fontFamily: FONTS?.bold,
        color: COLORS?.black
    }
});

export default AddBalance;
