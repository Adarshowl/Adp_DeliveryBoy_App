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
import {
  ShowConsoleLogMessage,
  ShowToastMessage,
  validateFieldNotEmpty,
} from '../../utils/Utility';
import { fetchUserData, fetchUserToken } from '../../redux/actions';

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
import { useDispatch,useSelector } from 'react-redux';


const MyEarning = ({ navigation }) => {
  const [amount, setAmount] = useState(100);

  const theme = useContext(themeContext);
  const { t } = useTranslation();
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false)

  const userToken = useSelector(state => state.state?.userToken);
  const userData = useSelector((state) => state.state?.userData);
  const dispatch = useDispatch()

  useEffect(() => {
    getAllShop();
  }, []);

  const [dashboard, setAllDashboard] = useState('');
  const [todaydashboard, setTodayDashboard] = useState('');

  const [today, setTodayData] = useState({});
  const [loading, setLoading] = useState('')
  // console.log("pending", dashboard)
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

  const getAllShop = () => {
    setLoading(true);
    try {
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.delivery_boy_earning_list));

      ApiCall('get', null, API_END_POINTS.delivery_boy_earning_list, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      }).then(response => {
      
        if (response?.statusCode === 200) {
          console.log("Response data: ", JSON.stringify(response.data));
          setTodayData(response?.data)
          setAllDashboard(response?.data?.allData)
          setTodayDashboard(response?.data?.todayData)
          if (response?.data?.length !== 0) {
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
          title="My Earning"
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
              backgroundColor: COLORS?.earning
            }]}>

              <Text style={styles.statusText1}>Today Earning</Text>
              <Text style={[styles.statusText1, {
                fontSize: 20,
                marginTop: 13
              }]}>${today?.todayEarning || 0}</Text>
              {/* <Text style={styles.normalLeft1}>16 oct,2023</Text> */}

            </View>

            <View style={[styles?.filed, {
              backgroundColor: theme?.colors?.grey
            }]}>

              <Text style={styles.statusText1}>All Earnings</Text>
              <Text style={[styles.statusText1, {
                fontSize: 20,
                marginTop: 13

              }]}>${today?.totalEarning || 0}</Text>
              {/* <Text style={styles.normalLeft}>16 oct,2023</Text> */}


            </View>

          </View>

        </View>
        {/* {today?.todayEarning !== 0 && (
          <View style={{
            flez: 1,
            // marginLeft: 20
          }}>
            {todaydashboard.length !== 0 && (

              <Text style={{
                fontSize: 15,
                color: COLORS?.black,
                fontFamily: FONTS?.bold,
                marginLeft: 22
              }}>Today Earning</Text>
            )}

            <FlatList
              style={{
                paddingStart: 5,
                paddingEnd: 5,

              }}
              ListHeaderComponent={() => {
                return <View style={{}} />;
              }}
              ListEmptyComponent={() => !showEmpty ? null : (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <Text style={{ fontSize: 20, marginTop: 50 }}>No data found !</Text>
                </View>

              )}
              ListHeaderComponentStyle={{
                paddingTop: 5,
              }}
              showsVerticalScrollIndicator={false}
              data={todaydashboard}
              renderItem={({ item, index }) => (
                <MyEarningItem
                  item={item}
                />
              )}
            />
          </View>
        )} */}

        {today?.totalEarning !== 0 && (

          <View style={{
            // flez: 1,
          }}>
           
            <FlatList
              style={{
                paddingStart: 5,
                paddingEnd: 5,

              }}
              ListHeaderComponent={() => {
                return <View style={{}} />;
              }}
              ListEmptyComponent={() => !showEmpty ? null : (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <Text style={{ fontSize: 20, marginTop: 50 }}>No data found !</Text>
                </View>

              )}
              ListHeaderComponentStyle={{
                paddingTop: 5,
              }}
              showsVerticalScrollIndicator={false}
              data={dashboard}
              renderItem={({ item, index }) => (
                <MyEarningItem
                  item={item}
                />
              )}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    marginTop: 30
  },
  statusContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
    flex: 1
  },
  scrollContainer: {
    // flexGrow: 1,
  },
  statusText: {
    // textAlign: 'center',
    fontSize: 18,
    fontFamily: FONTS?.bold,
    marginTop: 5,
    marginLeft: 8,
    color: COLORS?.black
  },
  statusText1: {
    // textAlign: 'center',
    fontSize: 18,
    fontFamily: FONTS?.bold,
    marginTop: 5,
    marginLeft: 8,
    color: COLORS?.white
  },
  filed: {
    flex: 1,
    borderRadius: 5,
    // borderWidth: 1,
    width: '100%',
    height: 100,
    // alignSelf: 'center',
    // justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 10

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

export default MyEarning;
