import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  I18nManager,
  Alert
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import React, { useContext, useEffect, useState } from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import { useIsFocused } from '@react-navigation/native';

import { CommonActions } from '@react-navigation/native';
import ApiCall from '../../network/ApiCall';
import { API_END_POINTS } from '../../network/ApiEndPoints';
import { SIZES, STRING } from '../../constants';
import { COLORS } from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ToolBarIcon from '../../utils/ToolBarIcon';
import TabOfferScreen from '../Flash/TabOfferScreen';
import '../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeContext from '../../constants/themeContext';
import { FONTS } from '../../constants/Fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, fetchUserToken } from '../../redux/actions';
import {
  ShowConsoleLogMessage,
  ShowToastMessage,
  validateFieldNotEmpty,
} from '../../utils/Utility';
import DeliveryBoyProgressBar from '../../utils/DeliveryBoyProgressBar';

const Home = ({ navigation }) => {
  const theme = useContext(themeContext);
  const { t, i18n } = useTranslation();

  const onLocationBarClick = () => {
    navigation.navigate('DeliveryAddress');
  };

  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(async () => {
      await getUserFromStorage();
    }, 0);
  }, []);
  const [userData1, setUserData] = useState({});
  const [loading, setLoading] = useState(false)

  const isFocused = useIsFocused();

  const userToken = useSelector(state => state.state?.userToken);
  const userData = useSelector((state) => state.state?.userData);
  // console.log("userdata profile", userToken)


  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem('userData', (error, value) => {
        // console.log(value, '------------------');
        if (error) {
        } else {
          if (value !== null) {
            let tmp = JSON.parse(value)
            setUserData(tmp?.data);
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

  // useEffect(() => {
  //   const cancelToken = axios.CancelToken.source();
  //   axios
  //     .get('https://fakestoreapi.com/products', {
  //       cancelToken: cancelToken.token,
  //     })
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(err => {
  //       if (axios.isCancel(err)) {
  //         console.log('err -> ', err.toString());
  //       } else {
  //         console.log('err -> ', err);
  //       }
  //     });
  //   return () => {
  //     cancelToken.cancel();
  //   };
  // }, [count]);

  // useEffect(() => {
  //   getAllShop();
  // }, []);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        await AsyncStorage.getItem('userData', (error, value) => {
          if (error) {
          } else {
            if (value !== null) {
              // setUserData(JSON.parse(value));
              getAllShop(JSON.parse(value)?.id); 
            } else {
            }
          }
        });
      })();
    }
  }, [isFocused]);


  const [dashboard, setDashboard] = useState('');
  const [showEmpty, setShowEmpty] = useState(false)

  // console.log("dddd", dashboard)
  const getAllShop = () => {
    setLoading(true);
    try {
      ApiCall('get', null, API_END_POINTS.DASHBOARD, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      })
        .then((response) => {
          if (response?.statusCode === 200) {
            // console.log("Response data: ", JSON.stringify(response.data));
            setDashboard(response?.data)

            if (response.data?.length === 0) {
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
        .catch((error) => {
          setShowEmpty(true);
          console.log("Error with Axios request: ", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      ShowToastMessage(`You selected: ${error.message}`);
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

  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        await AsyncStorage.getItem('userData', (error, value) => {
          if (error) {
          } else {
            if (value !== null) {
              // setUserData(JSON.parse(value));
              fetchNotificationCount(JSON.parse(value)?.id); // for now using static
            } else {
            }
          }
        });
      })();
    }
  }, [isFocused]);

  const fetchNotificationCount = async () => {
    // try {
    //   const response = await fetch(
    //     API_END_POINTS.API_GET_NOTIFICATION_COUNT + userData.id,
    //   );
    //   const data = await response.json();
    //
    //   console.log('Notification Count Response:', data);
    //
    //   if (data?.data === true) {
    //     const count = data.count || 0;
    //     setNotificationCount(count);
    //   } else {
    //     setNotificationCount(0);
    //   }
    // } catch (error) {
    //   console.error('Error fetching notification count:', error);
    //   setNotificationCount(0);
    // }
    ApiCall('get', null, API_END_POINTS.NOTIFICATION_GET, {
      'Content-Type': 'application/json',
      'x-access-token': userToken || userData?.remember_token,
    }).then(response => {
      // console.log('Notification Count Response:', response?.data);
      if (response?.statusCode === 200) {
        console.log('Notification Count Response:', response?.data);

        setNotificationCount(response?.data?.data?.length);
      } else {
        setNotificationCount(0);
      }
    })
      .catch(err => {
        console.log('ERROR in login api => ', err);
        ShowToastMessage('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [CartDesign, setCartDesign] = useState([
    {
      status: true,
      success: 'Data found',
      completedCount: 4,
      pendingCount: 1,
      totalCollection: 170,
      perOrderEarning: 45,
      assignedCount: 0,
      pickupCount: 0,
      onTheWayCount: 1,
      cencelledDeliveryCount: 2,

    }
  ])


  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          // backgroundColor: theme.colors.bg_color,
          backgroundColor: COLORS?.backgroundColor,
        },
      ]}>
      <DeliveryBoyProgressBar loading={loading} />

      <View
        style={[
          // GlobalStyle.commonToolbarBG,
          {
            // backgroundColor: theme.colors.bg_color_onBoard,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // marginTop: 10,
            // marginBottom:5
            marginVertical: 15
          },
        ]}>


        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <ToolBarIcon
            title={Ionicons}
            iconName={'reorder-three-outline'}
            icSize={23}
            icColor={theme?.colors?.colorPrimary}
            style={{
              backgroundColor: theme.colors.toolbar_icon_bg,
              marginEnd: 10,
            }}
            onPress={() => {
              navigation.openDrawer();
            }}
          />


          <View style={{
            // marginTop: 3,
            marginStart: 10
          }}>
            <Text
              style={{
                fontSize: 20,
                color: COLORS?.white,
                // fontWeight: 'bold',
                fontFamily: FONTS?.bold
              }}
            >
              Dashboard
            </Text>
          </View>

        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Notification');
          }}>
          {/* Replace with your notification icon component */}
          <Ionicons
            name={'notifications'}
            style={{
              paddingRight: 20,
              borderRadius: 50,
            }}
            size={23}
            color={COLORS.white}
          // onPress={() => {
          //   navigation.navigate('Notification');
          // }}
          />

          {notificationCount > 0 ? (
            <Text
              style={{
                fontSize: 12,
                backgroundColor: COLORS?.ontheway,
                textAlign: 'center',
                color: COLORS?.white,
                position: 'absolute',
                right: 18,
                top: -5,
                paddingHorizontal: 3,
                borderRadius: 5,
                paddingVertical: 0
              }}>
              {notificationCount}
            </Text>
          ) : null}
        </TouchableOpacity>

      </View>

      <ScrollView
        // nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}>

        <View style={{
          flex: 1,
          marginHorizontal: 20
          // backgroundColor: theme.colors.bg_color_onBoard,
        }}>
          <View style={{
            flex: 1
          }}></View>
          <View style={{
            flexDirection: 'row',
            flex: 1,
            marginVertical: 10
          }}>
            <TouchableOpacity style={[styles?.dashbox, {
              backgroundColor: COLORS?.completedelivery
            }]}
              activeOpacity={0.8}

              onPress={() => {
                navigation.navigate('CompletedDelivery');
              }}
            >
              <MaterialCommunityIcons
                name="truck-fast-outline"
                size={50}
                color={COLORS?.white}
                style={{}}
              />
              {/* <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/1670/1670915.png"
                }}
                style={styles?.image}
              /> */}
              <Text style={[styles?.text, {
              }]}>Completed Delivery</Text>
              <Text style={[styles?.price, {
              }]}>

                {dashboard?.completedCount || 0}
              </Text>

            </TouchableOpacity>
            <TouchableOpacity style={[styles?.dashbox, {
              backgroundColor: COLORS?.ontheway
            }]}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('PendingDeliveryList');
              }}
            >
              {/* <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/992/992700.png"
                }}
                style={styles?.image}
              /> */}
              <AntDesign
                name="clockcircleo"
                size={43}
                color={COLORS?.white}
                style={{ marginTop: 5 }}
              />

              <Text style={[styles?.text, {

                marginTop: 15
              }]}>Pending Delivery</Text>

              <Text style={[styles?.price, {

              }]}>
                {dashboard?.pendingCount || 0}

              </Text>
            </TouchableOpacity>
          </View>

          <View style={{
            flexDirection: 'row',
            flex: 1,
            marginVertical: 10
          }}>

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.navigate('MyEarning');
              }}

              style={[styles?.dashbox, {
                backgroundColor: COLORS?.Tcollection
              }]}>

              {/* <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/11482/11482445.png"
                }}
                style={styles?.image}
              /> */}
              <MaterialCommunityIcons
                name="truck-outline"
                size={50}
                color={COLORS?.white}
                style={{}}
              />
              <Text style={[styles?.text, {
              }]}>Total Collected</Text>

              <Text style={[styles?.price, {
              }]}>

                ${dashboard?.totalCollection || 0}
              </Text>

            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}

              onPress={() => {
                navigation.navigate('MyEarning');
              }}
              style={[styles?.dashbox, {
                backgroundColor: COLORS?.assigned
              }]}>
              <FontAwesome
                name='dollar'
                size={40}
                color={COLORS?.white}
                style={{ marginTop: 5 }}

              />
              <Text style={[styles?.text, {
                marginTop: 18
              }]}>
                Earnings
              </Text>
              <Text style={[styles?.price, {
              }]}>

                ${dashboard?.perOrderEarning || 0}/Order
              </Text>

            </TouchableOpacity>
          </View>

        </View>

        <View style={[GlobalStyle.flexRowAlignCenter, {
          alignItems: 'center',
          marginTop: 20,
          flex: 1,
          backgroundColor: theme?.colors?.bg_color_onBoard
        }]}>

        </View>

        <TabOfferScreen />

        {/* <View style={GlobalStyle.paddingVertical10} /> */}
      </ScrollView>

    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  dashbox: {
    width: '50%',
    height: 150,
    borderWidth: 1,
    marginHorizontal: 10,
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center'
  },
  image: {
    width: 45,
    height: 45,
    alignItems: 'center',
    resizeMode: 'center',
    marginBottom: 10
  },
  text: {
    fontFamily: FONTS?.regular,
    fontSize: 12,
    color: COLORS?.white,
    marginBottom: 5,
    marginTop: 8

  },
  price: {
    fontFamily: FONTS?.bold,
    fontSize: 18,
    color: COLORS?.white,


  }

});
