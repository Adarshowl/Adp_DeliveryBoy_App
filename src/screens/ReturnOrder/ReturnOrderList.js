import React, { memo, useContext, useState } from 'react';
import { Image, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { COLORS } from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ToolBarIcon from '../../utils/ToolBarIcon';
import { STRING } from '../../constants';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { FONTS } from '../../constants/Fonts';
import Feather from 'react-native-vector-icons/Feather'
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';


const ReturnOrderList = ({
    item,
    onAdd,
    onMinus,
    onDelete,
    onSaveLater,
    fromSave,
    onSaveRemove,

}) => {
    const [count, setCount] = useState(1);
    const [isModalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation('');

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const theme = useContext(themeContext);
    const datetime = item?.createdAt
    const dateObj = new Date(datetime);
    const date = dateObj.toISOString().split('T')[0];
    const time = dateObj.toTimeString().split(' ')[0];
    const formattedDateTime = `${date} ${time}`;

    //   console.log('item',item)

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
                                        color: COLORS?.green,
                                        // color: theme?.colors?.,
                                        marginRight: 5,
                                        marginBottom: 2,
                                    },
                                ]}>
                                {item?.orderId?.order_id}
                            </Text>
                            <Text
                                style={[
                                    styles.textName,
                                    {
                                        alignSelf: 'flex-start',
                                        color: COLORS?.green,
                                        fontFamily: FONTS?.bold

                                    },
                                ]}
                                numberOfLines={1}>
                                ${item?.orderId?.totalamount}
                            </Text>

                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>

                            <Text
                                style={[
                                    styles.discountPrice,
                                    {
                                        // color: COLORS?.black,
                                        fontFamily: FONTS?.medium,
                                        color: COLORS?.black,
                                        // color: theme?.colors?.,
                                        marginRight: 5,
                                        marginBottom: 2,
                                    },
                                ]}>
                                Date & Time
                            </Text>
                            <Text
                                style={[
                                    styles.discountPrice,
                                    {
                                        color: theme?.colors?.white,
                                    },
                                ]}>
                                {/* {item?.orderId?.created_at} */}
                                {formattedDateTime}
                                {/* {moment(item?.created_at).format('DD-MM-YYYY')}, {moment(item?.created_at).format('LT')} */}

                            </Text>

                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Text
                                style={[
                                    styles.discountPrice,
                                    {
                                        // color: COLORS?.black,
                                        fontFamily: FONTS?.medium,
                                        color: COLORS?.black,
                                        // color: theme?.colors?.,
                                        // marginRight: 5,
                                        marginBottom: 2,
                                    },
                                ]}>
                                Delivery Status
                            </Text>
                            <Text
                                style={[
                                    styles.discountPrice,
                                    {
                                        // color: COLORS?.black,
                                        fontFamily: FONTS?.bold,
                                        color: COLORS?.black,
                                        // color: theme?.colors?.,
                                        // marginRight: 5,
                                        marginBottom: 2,
                                    },
                                ]}
                                numberOfLines={1}>
                                {item?.orderId?.delivery_status}
                            </Text>

                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Text
                                style={[
                                    styles.discountPrice,
                                    {
                                        // color: COLORS?.black,
                                        fontFamily: FONTS?.medium,
                                        color: COLORS?.black,
                                        // color: theme?.colors?.,
                                        // marginRight: 5,
                                        marginBottom: 2,
                                    },
                                ]}>
                                Order Return
                            </Text>

                            {/* <Text
                                style={[
                                    styles.textName,
                                    {
                                        alignSelf: 'flex-start',
                                        color: COLORS?.black,
                                        fontFamily: FONTS?.regular

                                    },
                                ]}
                                numberOfLines={1}>
                                {item?.orderId?.is_return}
                            </Text> */}
                            {item?.orderId?.return_status === 'Accepted' ? (

                                <Text
                                    style={[
                                        styles.discountPrice,
                                        {
                                            // color: COLORS?.black,
                                            fontFamily: FONTS?.bold,
                                            color: item?.orderId?.return_status === 'Rejected' ? '#FF0000' : '#4DB857',                                            // color: theme?.colors?.,
                                            marginBottom: 2,
                                            // marginRight: 5,
                                            alignItems: 'flex-end',
                                            marginEnd: 0

                                        },
                                    ]}
                                >
                                    {item?.orderId?.return_status}
                                </Text>
                            ) :
                                <Text

                                    style={[
                                        styles.discountPrice,
                                        {
                                            // color: COLORS?.black,
                                            fontFamily: FONTS?.bold,
                                            color: item?.orderId?.return_status === 'Rejected' ? '#FF0000' : COLORS?.picked, marginRight: 5,
                                            marginBottom: 2,
                                            alignItems: 'flex-end',
                                            marginEnd: 0

                                        },
                                    ]}
                                >
                                    {item?.orderId?.return_status || 'Pending'}
                                </Text>
                            }

                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <Text
                                style={[
                                    styles.discountPrice,
                                    {
                                        // color: COLORS?.black,
                                        fontFamily: FONTS?.medium,
                                        color: COLORS?.black,
                                        marginBottom: 2,
                                    },
                                ]}
                            >
                                Order Refund
                            </Text>
                            {item?.orderId?.refund_status === 'Accepted' ? (

                                <Text

                                    style={[
                                        styles.discountPrice,
                                        {
                                            // color: COLORS?.black,
                                            fontFamily: FONTS?.bold,
                                            color: item?.orderId?.refund_status === 'Rejected' ? '#FF0000' : '#4DB857', marginBottom: 2,
                                            marginBottom: 2,
                                            alignItems: 'flex-end'

                                        },
                                    ]}
                                >{item?.orderId?.refund_status}
                                </Text>
                            ) :
                                <Text
                                    style={[
                                        styles.discountPrice,
                                        {
                                            color: item?.orderId?.refund_status === 'Rejected' ? '#FF0000' : COLORS?.picked,
                                            fontFamily: FONTS?.bold,
                                            marginBottom: 2,
                                            alignItems: 'flex-end'

                                        },
                                    ]}>
                                    {item?.orderId?.refund_status || 'Pending'}
                                </Text>
                            }

                        </View>


                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>

                            <Text
                                style={[
                                    styles.discountPrice,
                                    {
                                        // color: COLORS?.black,
                                        fontFamily: FONTS?.medium,
                                        color: COLORS?.black,
                                        // color: theme?.colors?.,
                                        marginRight: 5,
                                        marginBottom: 2,
                                    },
                                ]}>
                                Payment status
                            </Text>


                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                // marginTop: 5
                            }}>
                                <Text
                                    style={[
                                        styles.discountPrice,
                                        {
                                            alignSelf: 'flex-start',
                                            color: theme?.colors?.colorPrimary,
                                            // marginTop: 3
                                        },
                                    ]}>
                                    {item?.orderId?.payment_status}
                                </Text>
                                <View style={{
                                    backgroundColor: COLORS?.green,
                                    borderRadius: 50,
                                    width: 15,
                                    height: 15,
                                    marginLeft: 15,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // marginTop: 4
                                }}>
                                    <AntDesign
                                        name='check'
                                        size={10}
                                        style={{
                                            fontFamily: FONTS?.bold
                                        }}
                                        color={COLORS?.white}
                                    />
                                </View>

                            </View>
                        </View>

                    </View>

                </View>

            </View>
            <View style={[styles.buttonContainer, {
                flex: 1
                // backgroundColor: theme?.colors?.bg
            }]}>
                <VegUrbanCommonBtn
                    height={45}
                    width={'49%'}
                    borderRadius={5}
                    textSize={12}
                    textColor={theme.colors?.textColor}
                    iconPosition={'left'}
                    text={('View Detail')}
                    icon={
                        <MaterialIcons

                            name={"event-note"}
                            size={18}
                            color={theme?.colors?.grey}
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
                    height={45}
                    width={'49%'}
                    borderRadius={5}
                    textSize={13}
                    textColor={COLORS?.white}
                    text={('Cancelled Deliverd')}
                    backgroundColor={COLORS?.ontheway}
                    iconPosition={'left'}
                    icon={
                        <Feather

                            name={"check"}
                            size={18}
                            color={COLORS?.white}
                            style={{
                                // marginHorizontal: 20,
                                marginEnd: 10
                            }} />
                    }
                    // onPress={onConfirm}
                    onPress={() => {
                        // navigation.navigate('Checkout');
                    }}
                    textStyle={{
                        fontFamily: FONTS?.bold,
                    }}
                />
            </View>
        </View>
    );
};

export default memo(ReturnOrderList);
const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        borderRadius: 10,
        // margin: 2,
        backgroundColor: COLORS.white,
        // marginHorizontal: 10,
        marginVertical: 8,
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

        fontSize: 13,
        color: COLORS.black,
    },
    finalPriceText: {
        fontFamily: FONTS?.bold,
        fontSize: 16,
        color: COLORS.colorPrimary,
        marginTop: 3,
    },
});
