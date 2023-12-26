import React, { useContext, useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  I18nManager,
  ImageBackground,
  Alert
} from 'react-native';
import { COLORS } from '../../constants/Colors';
import { SIZES, STRING } from '../../constants';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ShowConsoleLogMessage,
  ShowToastMessage,
  validateFieldNotEmpty,
} from '../../utils/Utility';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import ApiCall from '../../network/ApiCall';
import { CommonActions } from '@react-navigation/native';

import { API_END_POINTS } from '../../network/ApiEndPoints';
import { useDispatch, useSelector } from 'react-redux';

import GlobalStyle from '../../styles/GlobalStyle';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import themeContext from '../../constants/themeContext';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { FONTS } from '../../constants/Fonts';
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native';
import DeliveryBoyProgressBar from '../../utils/DeliveryBoyProgressBar';


const TabOfferScreen = () => {
  const [fav, setFav] = useState(false);
  const [show, setShow] = useState(false);
  const theme = useContext(themeContext);
  const isRTL = I18nManager.isRTL;

  // const item = route.params.item;
  const navigation = useNavigation();
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   setTimeout(async () => {
  //      getAllShop();
  //   }, 0);
  // }, []);
  // useEffect(() => {
  //   getAllShop();
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

  const userToken = useSelector(state => state.state?.userToken);

  const userData = useSelector((state) => state.state?.userData);

  const getAllShop = () => {
    setLoading(true);
    try {

      ApiCall('get', null, API_END_POINTS.DASHBOARD, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      }).then(response => {
        if (response?.statusCode === 200) {
          console.log("Response data: ", JSON.stringify(response.data));
          setDashboard(response?.data)
          setLoading(true)
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

  return (
    <SafeAreaView style={[
      GlobalStyle.mainContainerBgColor,
      {
        backgroundColor: COLORS?.white,
        // borderRadius: 5,
        flex: 1,
      },
    ]}>
      <DeliveryBoyProgressBar loading={loading} />

      <ScrollView>
        <View
          style={[
            // GlobalStyle.mainContainerBgColor,
            {
              backgroundColor: COLORS?.ontheway,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 15,

            },
          ]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('CancelledDelivery')
            }}
            style={{
              flexDirection: 'row'
            }}>
            <MaterialCommunityIcons
              name="book-cancel-outline"
              color={COLORS?.white}
              size={35}
            />
            <Text
              style={[
                styles.itemName,
                {
                  color: COLORS?.white,

                  marginTop: 10,
                  fontFamily: FONTS?.bold,
                  marginLeft: 20,
                  fontSize: 16
                },
              ]}
              numberOfLines={1}>

              Cancelled Delivery
            </Text>

          </TouchableOpacity>

          <Text
            style={[
              styles.itemName,
              {
                color: COLORS?.white,
                marginTop: 10,
                fontFamily: FONTS?.bold,
                fontSize: 16


              },
            ]}
            numberOfLines={1}>
            {dashboard?.cencelledDeliveryCount || 0}

          </Text>

        </View>


        <View
          style={[
            styles.Wrapper,
            {
              backgroundColor: theme.colors.bg_color_onBoard,
              // paddingHorizontal: 10,
              // height: 220,
            },
          ]}
        >
          <View>
            <TouchableOpacity
              style={[
                styles.itemWrapper,
                {
                  backgroundColor: theme.colors.bg_color_onBoard,
                },
              ]}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('ListData')
                // navigation.navigate('ProductDetail', { item, isFavorite: !item.fav, data });
              }}>
              <ImageBackground

                style={[styles.itemImage, {
                  // backgroundColor:"#F2F4F4",
                  backgroundColor: COLORS?.assigned,
                  alignItems: 'center',
                  justifyContent: 'center',
                }]}
              >
                {/* <Image
                  style={styles?.image}

                  // style={styles.itemImage}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/128/8901/8901370.png"
                  }}
                /> */}
                <MaterialIcons
                  name={'hourglass-empty'} size={30}
                  color={
                    COLORS?.white
                  } />
              </ImageBackground>
            </TouchableOpacity>


            <Text
              style={[
                styles.itemName,
                {
                  color: COLORS?.assigned,
                  marginTop: 10,
                  fontFamily: FONTS?.bold

                },
              ]}
              numberOfLines={1}>
              Assigned({dashboard?.assignedCount || 0})

            </Text>
          </View>
          <View style={{

          }}>
            <TouchableOpacity
              style={[
                styles.itemWrapper,
                {
                  // backgroundColor: theme.colors.mainContainerBgColor,
                  marginLeft:10
                },
              ]}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('ListData')
                // navigation.navigate('ProductDetail', { item, isFavorite: !item.fav, data });
              }}>
              <ImageBackground

                style={[styles.itemImage, {
                  // backgroundColor:"#F2F4F4",
                  backgroundColor: COLORS?.picked,
                  alignItems: 'center',
                  // alignSelf: 'center',
                  justifyContent: 'center',
                }]}
              >
                {/* <Image
                  style={styles?.image}

                  // style={styles.itemImage}
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/10030/10030788.png'
                  }}
                /> */}
                <MaterialIcons
                  name={'wheelchair-pickup'} size={40}
                  color={COLORS?.white}
                />
              </ImageBackground>
            </TouchableOpacity>

            <Text
              style={[
                styles.itemName,
                {
                  color: COLORS?.picked,
                  marginTop: 10,
                  marginLeft:10,
                  fontFamily: FONTS?.bold,
                  textAlign: 'center'

                },
              ]}
              numberOfLines={1}>
              Picked({dashboard?.pickupCount || 0})

            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={[
                styles.itemWrapper,
                {
                  // backgroundColor: theme.colors.mainContainerBgColor,
                },
              ]}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('ListData')
                // navigation.navigate('ProductDetail', { item, isFavorite: !item.fav, data });
              }}>
              <ImageBackground
                style={[styles.itemImage, {
                  // backgroundColor:"#F2F4F4",
                  backgroundColor: COLORS?.ontheway,
                  alignItems: 'center',
                  // alignSelf: 'center',
                  justifyContent: 'center',
                }]}
              >
                {/* <Image
                  style={styles?.image}
                  // style={styles.itemImage}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/128/763/763965.png"

                    // uri: "https://cdn-icons-png.flaticon.com/128/8901/8901370.png"
                  }}
                /> */}

                <FontAwesome5
                  name={'running'} size={30}
                  color={
                    COLORS?.white

                  } />
              </ImageBackground>
            </TouchableOpacity>

            <Text
              style={[
                styles.itemName,
                {
                  color: COLORS?.ontheway,
                  marginTop: 10,

                  fontFamily: FONTS?.bold,

                },
              ]}
              numberOfLines={1}>
              On The Way({dashboard?.onTheWayCount || 0})
            </Text>

          </View>

        </View>
        <View style={{
          height: 200,
          flex: 1
        }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default TabOfferScreen;

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    // paddingHorizontal: 8,
    alignItems: 'center'
    // borderRadius: 5,
    // width:100,
    // height:100,
    // borderRadius:50,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 100,
    alignItems: 'center',
  },
  Wrapper: {
    marginTop: 40,
    flex: 1,
    // margin: 5,
    // paddingBottom: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
    // resizeMode: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',
    // marginBottom: 10

  },
  itemName: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12.5,
    color: COLORS.black,
    marginTop: 2,

  },
  itemPrice: {
    fontSize: 16,
    fontFamily: FONTS?.regular

    // color: COLORS.grey,
    // textAlign: 'center',
    // marginTop: 5,

  },
  itemOriPrice: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    textDecorationLine: 'line-through',
    color: COLORS.gray,
    marginStart: 5,
  },
  offerText: {
    // fontFamily: 'OpenSans-SemiBold',
    //   fontSize: 12,
    //   color: COLORS.bitter_sweet,
    //   backgroundColor: COLORS.pale_pink,
    //   position: 'absolute',
    //   left: 0,
    //   top: 0,
    //   padding: 5,
    //   paddingHorizontal: 10,
    //   borderTopRightRadius: 10, // Always apply this radius
    //   borderBottomRightRadius: 10, // Always apply this radius
    //   borderTopLeftRadius: isRTL ? 0 : 10, // Apply only in LTR mode
    //   borderBottomLeftRadius: isRTL ? 0 : 10, 
  },
});
