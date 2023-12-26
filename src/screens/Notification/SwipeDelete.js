import React, { useContext, useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-swipeable';
import { COLORS } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts'
import Ionicons from 'react-native-vector-icons/Ionicons';
import icons from '../../constants/icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment';
import ApiCall from '../../network/ApiCall';
import { useSelector } from 'react-redux';

import {
  ShowConsoleLogMessage,
  ShowToastMessage,
  validateFieldNotEmpty,
} from '../../utils/Utility';
import { API_END_POINTS } from '../../network/ApiEndPoints';


const SwipeDelete = ({ item, navigation, onDelete }) => {

  const userData = useSelector((state) => state.state?.userData);
  const userToken = useSelector(state => state.state?.userToken);

  const [loading, setLoading] = useState('')

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

  const createdAt = item?.createdAt;
  const dateObj = new Date(createdAt);
  const date = dateObj.toISOString().split('T')[0];
  const time = dateObj.toTimeString().split(' ')[0];
  const formattedDateTime = `${date} ${time}`;

  // console.log("iiitem", item)
  const renderRightActions = () => (
    <TouchableOpacity
      // activeOpacity={0.8}
      style={styles.deleteButton}
      onPress={() => {
        onDelete();
      }}>
      {/*<MaterialCommunityIcons name={'delete'} color={COLORS.white} size={25} />*/}
      <Image
        source={icons.delete_icon}
        resizeMode={'cover'}
        style={{
          height: 25,
          tintColor: COLORS.black,
        }}
      />
    </TouchableOpacity>
  );

  const rightButtons = [
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.deleteButton}
      onPress={() => {
        onDelete(item);
      }}>
      <MaterialCommunityIcons name={'delete'} color={COLORS.white} size={25} />
    </TouchableOpacity>
  ];

  return (
    <View style={{
      marginHorizontal: 10,
      // marginTop: 5,
      borderRadius: 15,
      backgroundColor: COLORS?.white,
      marginVertical: 8,
      elevation:5
    }}>
      <Swipeable
        // friction={5}
        style={{
          backgroundColor: 'white'
        }}
        containerStyle={{
          // marginHorizontal: 10,
          // marginTop: 5,
          // borderRadius: 10,
          // backgroundColor: COLORS?.white,
          // marginVertical: 5
        }}
        childrenContainerStyle={{
          borderRadius: 10,
          // backgroundColor: 'white',
        }}
        rightButtons={rightButtons}
      >

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate('NotificationDetails', { item: item });
          }}
          style={styles.item}>
          <Ionicons
            name={'notifications'}
            style={{
              padding: 15,
              borderRadius: 50,
              backgroundColor: COLORS.backgroundColor,
            }}
            size={20}
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
            <Text
              style={styles.desc} numberOfLines={2}>
              {item?.message}
            </Text>
          </View>
        </TouchableOpacity>
        <Text
          style={[
            styles.desc,
            {
              position: 'absolute',
              right: 10,
              top: 5,
              fontSize: 12,
              color: COLORS?.grey,
            },
          ]}
          numberOfLines={2}>
          {formattedDateTime}
          {/* {moment(item?.created_at).format('LLL')} */}
        </Text>
      </Swipeable>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginVertical: 0,
    marginHorizontal: 5
  },
  title: {
    fontSize: 15,
    fontFamily: FONTS?.bold,
    color: COLORS.black,
  },
  desc: {
    fontSize: 13,
    fontFamily: FONTS?.regular,
    color: COLORS.grey,
    maxwidth: '50%',
    marginTop: 3,
  },
  deleteButton: {
    backgroundColor: COLORS?.colorPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    // margin: 20,
    height: 50,
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 12,
    marginTop: 20
  },

  deleteText: {
    color: 'white',
    size: 16,
  },
});

export default SwipeDelete;
