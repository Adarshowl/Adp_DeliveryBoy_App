import {
  Alert,
  FlatList,
  I18nManager,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { CommonActions } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import themeContext from '../../constants/themeContext';
import { useTranslation } from 'react-i18next';
import { FONTS } from '../../constants/Fonts';
import ApiCall from '../../network/ApiCall';
import { API_END_POINTS } from '../../network/ApiEndPoints';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ShowToastMessage } from '../../utils/Utility';
import DeliveryBoyProgressBar from '../../utils/DeliveryBoyProgressBar';

const PickedList = ({ navigation }) => {
  const theme = useContext(themeContext);
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const userToken = useSelector(state => state.state?.userToken);
  const [showEmpty, setShowEmpty] = useState(false);
  const userData = useSelector(state => state.state?.userData);

  useEffect(() => {
    getAllShop();
  }, []);

  const [dashboard, setDashboard] = useState('');
  const [loading, setLoading] = useState('');

  const getAllShop = () => {
    setLoading(true);
    try {
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.PICKEDUP_order_list));

      ApiCall('get', null, API_END_POINTS.PICKEDUP_order_list, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      })
        .then(response => {
          if (response?.statusCode === 200) {
            console.log('Response data: ', JSON.stringify(response.data));
            setDashboard(response?.data?.data);

            if (response.data?.length !== 0) {
              setShowEmpty(true);
            }
          } else if (response?.statusCode === 500) {
            if (response.data?.message === 'Token Mismatch') {
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
                ],
              );
            }
          } else {
            setShowEmpty(true);
          }
        })
        .catch(error => {
          setShowEmpty(true);
          console.log('error axios -> ', error);
        })
        .finally(() => {
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
        }),
      );
    } catch (error) {
      console.error('Error clearing userToken:', error);
    }
  };

  const handleMarkAsDelivered = item => {
    console.log('item', item);
    Alert.alert(
      'Confirmation',
      'Are you sure to mark this as On The Way ?',
      [
        {
          text: 'Close',
          onPress: () => console.log('Cancel Pressed'),
          style: 'Close', // onPress: () => {
          //   onCancelClick(item)
          //   console.log('Cancel Pressed')
          // }
        },
        {
          text: 'Confirm',

          onPress: () => {
            onLoginClick(item); // Pass 'item' to 'onLoginClick'
          },
        },
      ],
      { cancelable: false },
    );
  };

  const handleCancel = item => {
    console.log('item', item);
    Alert.alert(
      'Confirmation',
      'Are you sure you want to cancel delivery ?',
      [
        {
          text: 'Close',
          onPress: () => console.log('Cancel Pressed'),
          style: 'Close', // onPress: () => {
          //   onCancelClick(item)
          //   console.log('Cancel Pressed')
          // }
        },
        {
          text: 'Cancel',

          onPress: () => {
            onCancelClick(item); // Pass 'item' to 'onLoginClick'
          },
        },
      ],
      { cancelable: false },
    );
  };

  const onLoginClick = item => {
    setLoading(true);
    try {
      const body = {
        orderId: item?.orderId?._id,
        delivery_status: 'On The Way',
      };
      // console.log("gggggggg", body);
      ApiCall('post', body, API_END_POINTS.orderstatusupdate, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      })
        .then(response => {
          // console.log("response axios >>> ", JSON.stringify(response));
          if (response?.data?.status == true) {
            navigation.navigate('OnTheWayDelivery');
            ShowToastMessage('your order on the way ', response?.data?.message);

            // getUserProfile(response?.data.user?.id)
          } else {
            setLoading(false);
            ShowToastMessage(response?.data?.message);
          }
        })
        .catch(error => {
          console.log('error axios -> ', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      ShowToastMessage(` You selected : ${error.message}`);
      setLoading(false);
    }
  };

  const onCancelClick = item => {
    setLoading(true);
    try {
      const body = {
        requestId: item?._id,
      };
      console.log('gggggggg', body);
      ApiCall('post', body, API_END_POINTS.request_to_cancel_order, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      })
        .then(response => {
          console.log('request cancel ', JSON.stringify(response));
          if (response?.data?.status == true) {
            navigation.navigate('MainContainer');
            ShowToastMessage(response?.data?.success);

            // getUserProfile(response?.data.user?.id)
          } else {
            setLoading(false);
            ShowToastMessage(response?.data?.success);
          }
        })
        .catch(error => {
          console.log('error axios -> ', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      ShowToastMessage(` You selected : ${error.message}`);
      setLoading(false);
    }
  };

  const pendingRenderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate('Order', { item });
        }}
        style={{
          flex: 1,
          marginHorizontal: 12,
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
          {/* <View
            // activeOpacity={0.8}
            style={[
              styles.wrapper,
              {
                // backgroundColor: '#F2F3F4',
                elevation: 2,
                backgroundColor: theme?.colors?.bg_color_onBoard,
              },
            ]}>

          </View> */}
          <View
            style={[
              GlobalStyle.flexRowAlignCenter,
              {
                paddingVertical: 5,
                alignItems: 'center',
                // backgroundColor:'#373a43'
              },
            ]}>
            <View style={styles.innnerWrapper}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={[
                    styles.discountPrice,
                    {
                      // color: COLORS?.black,
                      fontFamily: FONTS?.bold,
                      color: COLORS?.picked,
                      // color: theme?.colors?.,
                      marginRight: 5,
                      fontSize: 15,
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
                      color: COLORS?.picked,
                    },
                  ]}
                  numberOfLines={1}>
                  ${item?.orderId?.totalamount}
                </Text>
              </View>
              <View
                style={[
                  {
                    flexWrap: 'wrap',
                    paddingVertical: 2,
                  },
                  // GlobalStyle.flexRowAlignCenter,
                ]}>
                <Text
                  style={[
                    styles.discountPrice,
                    {
                      color: theme?.colors?.white,
                      // marginTop:5
                    },
                  ]}>
                  {moment(item?.createdAt).format('DD-MM-YYYY')} :{' '}
                  {moment(item?.createdAt).format('LT')}
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
                      marginTop: 2,
                    },
                  ]}>
                  {item?.orderId?.payment_mode == "Cod" ? "COD" : item?.orderId?.payment_mode}
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
                      color: theme?.colors?.colorPrimary,
                      marginTop: 2,
                    },
                  ]}>
                  {item?.orderId?.is_cancelled === 'Active'
                    ? 'Cancelled'
                    : item?.orderId?.delivery_status}
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

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      styles.discountPrice,
                      {
                        alignSelf: 'flex-start',
                        color: theme?.colors?.colorPrimary,
                        marginTop: 5,
                      },
                    ]}>
                    {item?.orderId?.payment_status}
                  </Text>

                  <View
                    style={{
                      backgroundColor: COLORS?.picked,
                      borderRadius: 50,
                      width: 15,
                      height: 15,
                      marginLeft: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 4,
                    }}>
                    <AntDesign
                      name="check"
                      size={10}
                      style={{
                        fontFamily: FONTS?.bold,
                      }}
                      color={COLORS?.white}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {item?.orderId?.is_cancelled !== 'Active' && (
          <View
            style={[
              styles.buttonContainer,
              {
                flex: 1,
                // backgroundColor: theme?.colors?.bg
              },
            ]}>
            <VegUrbanCommonBtn
              height={45}
              width={'49%'}
              borderRadius={5}
              textSize={12}
              textColor={COLORS?.white}
              iconPosition={'left'}
              text={'Cancel Delivery'}
              icon={
                <MaterialIcons
                  name={'event-note'}
                  size={18}
                  color={COLORS?.white}
                  style={{
                    // marginHorizontal: 20,
                    marginEnd: 10,
                  }}
                />
              }
              backgroundColor={COLORS?.red}
              // onPress={onCancel}
              //     onCancelClick(item)

              onPress={() => handleCancel(item)}
              textStyle={{
                fontFamily: FONTS?.bold,
              }}
            />
            <VegUrbanCommonBtn
              height={45}
              width={'49%'}
              borderRadius={5}
              textSize={12}
              textColor={theme.colors?.textColor}
              iconPosition={'left'}
              text={'Mark as On The Way'}
              icon={
                <Feather
                  name={'check-circle'}
                  size={18}
                  color={COLORS?.picked}
                  style={{
                    // marginHorizontal: 20,
                    marginEnd: 10,
                  }}
                />
              }
              backgroundColor={theme?.colors?.bg}
              onPress={() => handleMarkAsDelivered(item)}
              style={{}}
              textStyle={{
                fontFamily: FONTS?.bold,
              }}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
          flex: 1,
        },
      ]}>
      <DeliveryBoyProgressBar loading={loading} />

      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme.colors.bg_color_onBoard,
            elevation: 0,
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
              marginStart: 10,
            },
          ]}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <VegUrbanCommonToolBar
          title="Picked Delivery"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 15,
            fontFamily: FONTS?.bold,
          }}
          textStyle={{
            color: theme.colors.white,
            fontFamily: FONTS?.bold,
            fontSize: 18,
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          flex: 0,
        }}>
        {dashboard.length !== 0 && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginStart: 10,
              marginBottom: 10,
            }}>
            <View
              style={{
                backgroundColor: theme?.colors?.bg,
                width: 50,
                height: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/10030/10030788.png',
                }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                }}
              />
            </View>
            <Text
              style={[
                styles?.title,
                {
                  color: COLORS?.picked,
                },
              ]}>
              Pickedup
            </Text>
          </View>
        )}

        <FlatList
          style={{
            paddingStart: 5,
            paddingEnd: 5,
          }}
          ListEmptyComponent={() =>
            !showEmpty ? null : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 50,
                    color: COLORS.black,
                  }}>
                  No data found !
                </Text>
              </View>
            )
          }
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

export default PickedList;

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
  title: {
    fontSize: 18,
    fontFamily: FONTS?.bold,
    color: COLORS?.black,
    marginStart: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    marginBottom: 15,
  },
  itemImage: {
    width: 100,
    height: 100,
    alignItems: 'center',
    borderRadius: 10,
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
    marginTop: 0,
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
