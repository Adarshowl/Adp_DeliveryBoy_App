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
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { ShowToastMessage } from '../../utils/Utility';
import DeliveryBoyProgressBar from '../../utils/DeliveryBoyProgressBar';

const OnTheWayDelivery = ({ navigation }) => {
  const theme = useContext(themeContext);
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const userToken = useSelector(state => state.state?.userToken);
  const userData = useSelector(state => state.state?.userData);

  const [showEmpty, setShowEmpty] = useState(false);

  useEffect(() => {
    getAllShop();
  }, []);

  const [dashboard, setDashboard] = useState('');
  const [loading, setLoading] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Select Status');

  // const statusOptions = selectedStatus === 'Paid' ? ['Unpaid'] : ['Paid', 'Unpaid'];

  const statusOptions = ['Paid', 'UnPaid'];
  console.log(userToken);

  const getAllShop = () => {
    setLoading(true);
    try {
      console.log(
        'response axios >>> ',
        JSON.stringify(API_END_POINTS.ON_The_Way_OrderList),
      );

      ApiCall('get', null, API_END_POINTS.ON_The_Way_OrderList, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      })
        .then(response => {
          console.log('response on the way >>> ', JSON.stringify(response));
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
          // console.log("error axios -> ", error);
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
    // console.log("item", item?._id)
    Alert.alert(
      'Confirmation',
      'Are you sure you want to complete delivery ?',
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

  const [buttonClicked, setButtonClicked] = useState(false);

  const [selectedOption, setSelectedOption] = useState('Select Status');

  const options = ['Select Status', 'Paid', 'UnPaid'];

  const updateStatus = item => {
    setLoading(true);
    try {
      if (selectedOption !== 'UnPaid' && selectedOption !== 'Paid') {
        ShowToastMessage(
          "Please select 'Paid' or 'UnPaid' before updating the order status.",
        );
        setLoading(false);
        return null;
      }
      const body = {
        orderId: item?.orderId?._id,

        payment_status: selectedOption,
      };
      console.log('gggggggg', body);
      ApiCall('post', body, API_END_POINTS.orderstatusupdate, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      })
        .then(response => {
          console.log('response axios >>> ', JSON.stringify(response));
          if (response?.data?.status == true) {
            // navigation.goBack('OnTheWayDelivery');
            getAllShop();
            ShowToastMessage(response?.data?.success);
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

  const onLoginClick = item => {
    setLoading(true);

    console.log('button', buttonClicked);

    try {
      if (!buttonClicked || item?.orderId?.payment_status === 'Paid') {
        const selectedOption =
          item?.orderId?.payment_status === 'Paid' ? 'Paid' : '';

        if (selectedOption === 'Paid') {
          const body = {
            orderId: item?.orderId?._id,
            delivery_status: 'Delivered',
          };

          console.log('Request Body: ', body);

          ApiCall('post', body, API_END_POINTS.orderstatusupdate, {
            'Content-Type': 'application/json',
            'x-access-token': userToken || userData?.remember_token,
          })
            .then(response => {
              console.log('Response from API: ', response);

              if (response?.data?.status === true) {
                navigation.navigate('MainContainer');
                ShowToastMessage('Order Completed', response?.data?.success);
              } else {
                ShowToastMessage('Error updating order status');
              }
            })
            .catch(error => {
              console.log('API Error: ', error);
              ShowToastMessage('Error occurred while updating order status');
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          ShowToastMessage(
            'Please select Payment Status before updating the order',
          );
          setLoading(false);
        }
      } else {
        ShowToastMessage(
          'Please select Paid before updating the order status.',
        );
        setLoading(false);
      }
    } catch (error) {
      ShowToastMessage(`Error: ${error.message}`);
      setLoading(false);
    }
  };

  // const onLoginClick = (item) => {
  //   console.log("status",item?.orderId?.payment_status)

  //   setLoading(true);
  //   try {

  //     if (!buttonClicked || item?.orderId?.payment_status === 'Paid' ) {
  //       ShowToastMessage("Please select Payment Status before updating the order status.");
  //       setLoading(false);
  //       return;
  //     }
  //     if (selectedOption === 'UnPaid') {
  //       ShowToastMessage("Please select 'Paid' before updating the order status.");
  //       setLoading(false);
  //       return null;
  //     }

  //     const body = {
  //       orderId: item?.orderId?._id,
  //       delivery_status: 'Delivered',
  //     };
  //     console.log("gggggggg", body);
  //     ApiCall('post', body, API_END_POINTS.orderstatusupdate, {
  //       'Content-Type': 'application/json',
  //       'x-access-token': userToken || userData?.remember_token,
  //     }).then(response => {
  //       console.log("response axios >>> ", JSON.stringify(response));
  //       if (response?.data?.status == true) {

  //         navigation.navigate('MainContainer');
  //         ShowToastMessage("Order Complete", response?.data?.success);

  //         // getUserProfile(response?.data.user?.id)
  //       } else {
  //         setLoading(false)
  //         ShowToastMessage("error");
  //       }

  //     }).catch(error => {
  //       console.log("error axios -> ", error);
  //     }).finally(() => {
  //       setLoading(false);
  //     });
  //   } catch (error) {
  //     ShowToastMessage(` You selected : ${error.message}`);
  //     setLoading(false);
  //   }
  // };

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
    // console.log("item", item?._id)
    console.log('item', item);

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
              flex: 1,
            },
          ]}>
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
                      color: COLORS?.ontheway,
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
                      color: COLORS?.ontheway,
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
                    marginTop: 5,
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
                    {item?.orderId?.payment_mode == "Cod" ? "COD" : item?.orderId?.payment_mode}
                  </Text>

                  <View
                    style={{
                      backgroundColor: COLORS?.ontheway,
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

              <View
                style={
                  {
                    // flexDirection: 'row',
                    // justifyContent: 'space-between',
                    // marginHorizontal: 20,
                    // flex:1
                  }
                }>
                {item?.orderId?.payment_status === 'UnPaid' && (
                  <View>
                    <View
                      style={[
                        {
                          flex: 1,
                          marginTop: 10,
                          borderRadius: 3,
                          borderWidth: 0.2,
                          width: '100%',
                        },
                      ]}>
                      <Picker
                        selectedValue={selectedOption}
                        onValueChange={(itemValue, itemIndex) =>
                          setSelectedOption(itemValue)
                        }
                        style={[
                          styles.picker,
                          {
                            color: theme?.colors?.textColor,
                          },
                        ]}>
                        {options.map(option => (
                          <Picker.Item
                            key={option}
                            label={option}
                            value={option}
                            style={{
                              fontSize: 13,
                              fontFamily: FONTS?.regular,
                            }}
                          />
                        ))}
                      </Picker>
                    </View>
                    <View
                      style={{
                        marginTop: 12,
                        flex: 1,
                        alignItems: 'center',
                      }}>
                      <VegUrbanCommonBtn
                        height={40}
                        width={'70%'}
                        borderRadius={5}
                        textSize={12}
                        textColor={COLORS?.black}
                        text={'Update'}
                        backgroundColor={theme?.colors?.bg}
                        onPress={() => {
                          setButtonClicked(true);
                          updateStatus(item);
                        }}
                        // onPress={() =>
                        //   setButtonClicked(true)

                        //   updateStatus(item)}
                        style={{
                          marginTop: 10,
                        }}
                        textStyle={{
                          fontFamily: FONTS?.bold,
                          justifyContent: 'center',
                        }}
                      />
                    </View>
                  </View>
                )}

                {/* <TouchableOpacity
                    onPress={() => {
                      updateStatus(item)
                      // if (selectedOption === 'Paid') {
                      //   ShowToastMessage("Payment Status Paid")
                      // } else if (selectedOption === 'Unpaid') {
                      //   ShowToastMessage("Payment Status UnPaid")
                      // }
                    }}
                    style={{  }}
                  >
                    <Text>Update</Text>
                  </TouchableOpacity> */}

                {/* <VegUrbanCommonBtn
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

        {item?.orderId?.is_cancelled !== 'Active' && (
          <View
            style={[
              styles.buttonContainer,
              {
                // flex: 1
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
              text={'Mark as Delivered'}
              icon={
                <Feather
                  name={'check-circle'}
                  size={18}
                  color={COLORS?.ontheway}
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
          title="On The Way Delivery"
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
                  uri: 'https://cdn-icons-png.flaticon.com/128/8901/8901370.png',
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
                  color: COLORS?.ontheway,
                },
              ]}>
              On The Way
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
  title: {
    fontSize: 18,
    fontFamily: FONTS?.bold,
    color: COLORS?.black,
    marginStart: 12,
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

export default OnTheWayDelivery;
