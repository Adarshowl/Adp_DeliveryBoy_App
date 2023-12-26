import React, { useContext, useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import { COLORS } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts'
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import ApiCall from '../../network/ApiCall';
import { fetchUserData, fetchUserToken } from '../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import themeContext from '../../constants/themeContext';
import icons from '../../constants/icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { API_END_POINTS } from '../../network/ApiEndPoints';
import moment from 'moment';
import {
  ShowConsoleLogMessage,
  ShowToastMessage,
  validateFieldNotEmpty,
} from '../../utils/Utility';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import DeliveryBoyProgressBar from '../../utils/DeliveryBoyProgressBar';

const NotificationDetails = ({ navigation, route }) => {
  const [data, setData] = useState({});
  const userData = useSelector((state) => state.state?.userData);
  const userToken = useSelector(state => state.state?.userToken);
  const [showEmpty, setShowEmpty] = useState(false)
  const theme = useContext(themeContext);




  // useEffect(() => {
  //   let {item} = route?.params;
  //   // setData(item);
  // }, []);
  const { item } = route?.params;

  console.log("iddddddddd", item?._id)


  useEffect(() => {
    getAllShop();
  }, []);

  const [dashboard, setDashboard] = useState('');
  const [loading, setLoading] = useState('')
  // console.log("completed", dashboard)

  const getAllShop = () => {

    setLoading(true);
    try {
      console.log("response axios >>> ", JSON.stringify(API_END_POINTS.NOTIFICATION_GET));

      ApiCall('get', null, API_END_POINTS.NOTIFICATION_VIEW + item?._id, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      }).then(response => {
        if (response?.statusCode === 200) {
          // console.log(" notifcation: View ", JSON.stringify(response.data));
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
      })
        .catch(error => {
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


  const handleCatDeleteIconClick = (item) => {
    console.log("iiiiiiii", item?._id)
    setLoading(true);
    try {
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.CLEAR_NOTIFICATION));

      ApiCall('get', null, API_END_POINTS.CLEAR_NOTIFICATION + item?._id, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      }).then(response => {
        if (response?.statusCode === 200) {
          // console.log(" notifcation: View ", JSON.stringify(response.data));
          // setDashboard(response?.data?.data)
          navigation.goBack('Notification')
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
      ShowToastMessage(` You selected : ${error.message}`);
      setLoading(false);
    }
  };


  // const createdAt = dashboard?.createdAt; 
  // const dateObj = new Date(createdAt);
  // const date = dateObj.toISOString().split('T')[0]; 
  // const time = dateObj.toTimeString().split(' ')[0]; 
  // const formattedDateTime = `${date} ${time}`;

  return (
    <View style={[GlobalStyle.mainContainer]}>
      <DeliveryBoyProgressBar loading={loading} />

      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            //   backgroundColor: theme.colors.bg_color_onBoard,
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
              marginStart: 10
            },
          ]}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <VegUrbanCommonToolBar
          title="Notification Detail"
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
          flexGrow: 1,
          backgroundColor: COLORS.white,

        }}>
        <View
          style={{
            backgroundColor: COLORS.white,
            // margin: 15,
            borderRadius: 10,
            elevation: 10,
            paddingHorizontal:10,
            marginHorizontal:15,
            marginTop:10,
            paddingVertical:15,
            // flex:1

          }}>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles?.item}>
            <Ionicons
              name={'notifications'}
              style={{
                padding: 12,
                height: 50,
                borderRadius: 50,
                backgroundColor: COLORS.backgroundColor,
              }}
              size={25}
              color={COLORS.white}
            />
            <View
              style={{
                marginStart: 10,
                flex: 1,
              }}>
              <Text style={styles.title} numberOfLines={2}>
                {item?.module}
              </Text>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // width:'85%'

              }}>
                <Text
                  style={[styles.desc,{
                    maxWidth:'90%',
                    marginTop:5
                  }]} numberOfLines={3}>
                  {item?.message}
                </Text>
                {/* <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.deleteButton}
                  onPress={() => {
                    handleCatDeleteIconClick(item);
                  }}>
                  <MaterialCommunityIcons name={'delete'} color={COLORS.black} size={25} />
                </TouchableOpacity> */}
              </View>
            </View>

          </TouchableOpacity>
          {/* <Text
            numberOfLines={2}
            style={styles.details}>{item?.message}</Text> */}
          {item?.image ? ( 
          <Image
            source={{ uri: item?.image }}
            style={styles?.Image}
          />
        ) : null} 

          {/* {dashboard?.message ? (
            <Text style={styles.details}>{dashboard?.message}</Text>
          ) : null} */}
          <Text
            style={[
              styles.desc,
              {
                position: 'absolute',
                right: 8,
                top: 10,
                fontSize: 12,
              },
            ]}
            numberOfLines={2}>
            {/* {formattedDateTime} */}
            {moment(dashboard?.created_at).format('LLL')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationDetails;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  Image:{
    height: 150,
    width: '100%',
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 15,
  },

  createProfile: {
    fontSize: 18,
    fontFamily: FONTS.regular,
    color: COLORS.white,
    lineHeight: 24,
  },
  actionHeader: {
    height: 56,
    backgroundColor: COLORS.primary,
  },

  item: {
    padding: 10,
    flexDirection: 'row',
    marginTop: 5
  },
  deleteButton: {
    // backgroundColor: '#FFCACA',
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: 50,
    // margin: 10,
    marginEnd: 10,
    // marginTop:0
    // marginLeft:30
  },
  title: {
    fontSize: 15,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
  desc: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.grey,
  },
  details: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.grey,
    marginHorizontal: 15,
    paddingBottom: 10,
    marginTop: 10
  },
});
