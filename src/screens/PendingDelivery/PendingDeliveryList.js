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
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { images, STRING } from '../../constants';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import themeContext from '../../constants/themeContext';
import { useTranslation } from 'react-i18next';
import { FONTS } from '../../constants/Fonts';
import ApiCall from '../../network/ApiCall';
import { API_END_POINTS } from '../../network/ApiEndPoints';
import { Picker } from '@react-native-picker/picker'; // Import the Picker component
import { useSelector } from 'react-redux';
import {
    ShowConsoleLogMessage,
    ShowToastMessage,
    validateFieldNotEmpty,
} from '../../utils/Utility';
import DeliveryBoyProgressBar from '../../utils/DeliveryBoyProgressBar';
import { CommonActions } from '@react-navigation/native';


const PendingDeliveryList = ({ navigation }) => {

    const theme = useContext(themeContext);
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    const userToken = useSelector(state => state.state?.userToken);
    const userData = useSelector((state) => state.state?.userData);

    const [showEmpty, setShowEmpty] = useState(false)

    useEffect(() => {
        getAllShop();
    }, []);

    const [dashboard, setDashboard] = useState('');
    const [loading, setLoading] = useState('')
    // console.log("pending show list ", dashboard)

    const getAllShop = () => {
        setLoading(true);
        try {
            // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.PendingDeliveryList));

            ApiCall('get', null, API_END_POINTS.PendingDeliveryList, {
                'Content-Type': 'application/json',
                'x-access-token': userToken || userData?.remember_token,
            }).then(response => {
                console.log("response pending >>> ", JSON.stringify(response));
                if (response?.statusCode === 200) {
                    // console.log("Response data: ", JSON.stringify(response.data));
                    setDashboard(response?.data?.data)

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


            }).catch(error => {
                setShowEmpty(true)
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


    const handleMarkAsDelivered = (item) => {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to cancelling delivery?',
            [
                {
                    text: 'Close',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'Close',
                },
                {
                    text: 'Cancel Delivery',
                    onPress: () => {
                        onCancelClick(item)
                    },
                    style: styles?.alertText,

                },
            ],
            { cancelable: false }
        );
    };

    const onCancelClick = (item) => {
        console.log("id cancel delivery", item?._id)
        setLoading(true);
        try {

            const body = {
                requestId: item?._id,
            };
            console.log("gggggggg", body);
            ApiCall('post', body, API_END_POINTS.request_to_cancel_order, {
                'Content-Type': 'application/json',
                'x-access-token': userToken || userData?.remember_token,

            }).then(response => {
                console.log("request cancel ", JSON.stringify(response));
                if (response?.data?.status == true) {

                    navigation.navigate('MainContainer');
                    ShowToastMessage(response?.data?.success);

                    // getUserProfile(response?.data.user?.id)
                } else {
                    setLoading(false)
                    ShowToastMessage(response?.data?.success);
                }

            }).catch(error => {
                console.log("error axios -> ", error);
            }).finally(() => {
                setLoading(false);
            });
        } catch (error) {
            ShowToastMessage(` You selected : ${error.message}`);
            setLoading(false);
        }
    };


    const pendingRenderItem = ({ item }) => {

        return (
            <View style={{
                flex: 1,
                marginHorizontal: 12
            }}>
                <View
                    // activeOpacity={0.8}
                    style={[
                        styles.wrapper,
                        {
                            // backgroundColor: '#F2F3F4',
                            elevation: 2,
                            backgroundColor: theme?.colors?.bg_color_onBoard,
                        },
                    ]}>
                    <View
                        style={[GlobalStyle.flexRowAlignCenter, {
                            paddingVertical: 5,
                            alignItems: 'center',
                            // backgroundColor:'#373a43'

                        }]}
                    >

                        <View style={styles.innnerWrapper}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Text
                                    style={[
                                        styles.discountPrice,
                                        {
                                            // color: COLORS?.black,
                                            fontFamily: FONTS?.bold,
                                            color: COLORS?.assigned,
                                            // color: theme?.colors?.,
                                            marginRight: 5,
                                            fontSize: 15,
                                            marginBottom: 2

                                        },
                                    ]}>
                                    {item?.orderId?.order_id}
                                </Text>
                                <Text
                                    style={[
                                        styles.textName,
                                        {
                                            // alignSelf: 'flex-start',
                                            color: COLORS?.assigned,

                                        },
                                    ]}
                                    numberOfLines={1}>
                                    ${item?.orderId?.amount}
                                </Text>

                            </View>
                            <View
                                style={[
                                    {
                                        flexWrap: 'wrap',
                                        paddingVertical: 2
                                    },
                                    // GlobalStyle.flexRowAlignCenter,
                                ]}>

                                {/* <Text
                                    style={[
                                        styles.discountPrice,
                                        {
                                            // color: COLORS?.black,
                                            fontFamily: FONTS?.bold,
                                            color: COLORS?.assigned,
                                            // color: theme?.colors?.,
                                            marginRight: 5
                                        },
                                    ]}>
                                    {item?.orderId?.order_id}
                                </Text> */}


                                <Text
                                    style={[
                                        styles.discountPrice,
                                        {
                                            color: theme?.colors?.white,
                                            // marginTop:5
                                        },
                                    ]}>
                                    {moment(item?.createdAt).format('DD-MM-YYYY')} : {moment(item?.createdAt).format('LT')}

                                </Text>


                                <Text
                                    style={[
                                        styles.finalPriceText,
                                        {
                                            color: theme?.colors?.white,
                                        },
                                    ]}>
                                    Payment Mode
                                </Text>

                                <Text
                                    style={[
                                        styles.discountPrice,
                                        {
                                            alignSelf: 'flex-start',
                                            color: theme?.colors?.colorPrimary,
                                            marginTop: 2
                                        },
                                    ]}>
                                    {item?.orderId?.payment_mode}
                                </Text>

                                <Text
                                    style={[
                                        styles.finalPriceText,
                                        {
                                            color: theme?.colors?.white,
                                        },
                                    ]}>
                                    Delivery Status
                                </Text>

                                <Text
                                    style={[
                                        styles.discountPrice,
                                        {
                                            alignSelf: 'flex-start',
                                            // color: theme?.colors?.colorPrimary,
                                            marginTop: 2,
                                            color: item?.orderId?.is_cancelled === 'Active' ? 'red' : theme?.colors?.colorPrimary,
                                            fontFamily: FONTS?.regular
                                        },
                                    ]}>
                                    {item?.orderId?.is_cancelled === 'Active' ? 'Cancelled' : item?.orderId?.delivery_status}
                                </Text>

                                <Text
                                    style={[
                                        styles.finalPriceText,
                                        {
                                            color: theme?.colors?.white,
                                        },
                                    ]}>
                                    Payment status
                                </Text>



                            </View>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Text
                                        style={[
                                            styles.discountPrice,
                                            {
                                                alignSelf: 'flex-start',
                                                color: theme?.colors?.colorPrimary,
                                                marginTop: 5
                                            },
                                        ]}>
                                        {item?.orderId?.payment_status}
                                    </Text>

                                    {/* <View style={{
                                        backgroundColor: COLORS?.assigned,
                                        borderRadius: 50,
                                        width: 15,
                                        height: 15,
                                        marginLeft: 15,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: 4
                                    }}>
                                        <AntDesign
                                            name='check'
                                            size={10}
                                            style={{
                                                fontFamily: FONTS?.bold
                                            }}
                                            color={COLORS?.white}
                                        />
                                    </View> */}
                                </View>
                                {/* 
                                <VegUrbanCommonBtn
                                    height={35}
                                    width={'39%'}
                                    borderRadius={10}
                                    textSize={12}
                                    textColor={COLORS?.white}
                                    iconPosition={'left'}
                                    text={('View Detail')}
                                    icon={
                                        <MaterialIcons

                                            name={"event-note"}
                                            size={18}
                                            color={COLORS?.white}
                                            style={{
                                                // marginHorizontal: 20,
                                                marginEnd: 10
                                            }} />
                                    }
                                    backgroundColor={COLORS?.backgroundColor}
                                    // onPress={onCancel}
                                    onPress={() => {
                                        navigation.navigate('Order', { item });
                                    }}
                                    textStyle={{
                                        fontFamily: FONTS?.bold,
                                    }}
                                /> */}
                            </View>

                        </View>
                    </View>

                </View>
                <View style={[styles.buttonContainer, {
                    flex: 1
                    // backgroundColor: theme?.colors?.bg
                }]}>
                    <VegUrbanCommonBtn
                        height={40}
                        width={'49%'}
                        borderRadius={5}
                        textSize={13}
                        textColor={COLORS?.black}
                        iconPosition={'left'}
                        text={('View Detail')}
                        icon={
                            <MaterialIcons

                                name={"event-note"}
                                size={18}
                                color={COLORS?.black}
                                style={{
                                    // marginHorizontal: 20,
                                    marginEnd: 10
                                }} />
                        }
                        backgroundColor={theme?.colors?.colorimageback}
                        // onPress={onCancel}
                        onPress={() => {
                            navigation.navigate('Order', { item });
                        }}
                        textStyle={{
                            fontFamily: FONTS?.bold,
                        }}
                    />
                    <VegUrbanCommonBtn
                        height={40}
                        width={'49%'}
                        borderRadius={5}
                        textSize={13}
                        textColor={theme.colors?.btnTextColor}
                        text={('Cancel Delivery')}
                        backgroundColor={COLORS?.ontheway}
                        iconPosition={'left'}
                        icon={
                            <Feather

                                name={"check"}
                                size={18}
                                color={theme?.colors?.btnTextColor}
                                style={{
                                    // marginHorizontal: 20,
                                    marginEnd: 10
                                }} />
                        }
                        // onPress={onConfirm}
                        onPress={() => {
                            handleMarkAsDelivered(item)
                        }}
                        textStyle={{
                            fontFamily: FONTS?.bold,
                        }}
                    />
                </View>
            </View>
        )
    }



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
                    title="Pending Delivery"
                    style={{
                        backgroundColor: theme.colors.bg_color_onBoard,
                        marginStart: 15,
                        fontFamily: FONTS?.bold
                    }}
                    textStyle={{
                        color: theme.colors.white,
                        fontFamily: FONTS?.bold,
                        fontSize: 18
                    }}
                />

            </View>
            <ScrollView
                contentContainerStyle={{
                    flex: 0,
                }}
            >
                <FlatList
                    style={{
                        paddingStart: 5,
                        paddingEnd: 5,

                    }}
                    ListEmptyComponent={() => !showEmpty ? null : (
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <Text style={{
                                fontSize: 20,
                                marginTop: 50,
                                color: COLORS.black,
                            }}>No data found !</Text>
                        </View>

                    )}
                    ListHeaderComponent={() => {
                        return <View style={{}} />;
                    }}
                    ListHeaderComponentStyle={{
                        paddingTop: 5,
                    }}
                    showsVerticalScrollIndicator={false}
                    data={dashboard}
                    renderItem={pendingRenderItem}
                />


            </ScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        borderRadius: 10,
        // margin: 2,
        backgroundColor: COLORS.white,
        // marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 5,
        // paddingVertical:5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 0,
        marginBottom: 15
    },
    itemImage: {
        width: 100,
        height: 100,
        alignItems: 'center',
        borderRadius: 10

    },
    alertText: {
        color: 'red', // Set the text color to red
    },
    qtyText: {
        fontFamily: FONTS?.regular,
        fontSize: 16,
        color: COLORS.black,
        textAlign: 'center',
        // flex: 0.3,
    },
    image: {
        height: 90,
        width: '28%',
        // margin:6,
        marginTop: 5,
        resizeMode: 'stretch',
        borderRadius: 5,
        // paddingTop:10
        // resizeMode:'contain',
    },
    innnerWrapper: {
        flex: 1,
        marginStart: 10,
        marginTop: 0
    },
    textName: {
        fontFamily: FONTS?.bold,
        fontSize: 16,
        color: COLORS.black,
    },
    discountPrice: {
        // fontFamily: 'OpenSans-SemiBold',
        fontFamily: FONTS?.regular,

        fontSize: 12,
        color: COLORS.black,
    },
    finalPriceText: {
        fontFamily: FONTS?.bold,
        fontSize: 15,
        color: COLORS.colorPrimary,
        // marginTop: 3,
    },
});

export default PendingDeliveryList;
