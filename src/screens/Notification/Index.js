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
import { CommonActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { images, STRING } from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
import { fetchUserData, fetchUserToken } from '../../redux/actions';

import { API_END_POINTS } from '../../network/ApiEndPoints';
import { Picker } from '@react-native-picker/picker'; // Import the Picker component
import { useSelector } from 'react-redux';
import {
  ShowConsoleLogMessage,
  ShowToastMessage,
  validateFieldNotEmpty,
} from '../../utils/Utility';
import DeliveryBoyProgressBar from '../../utils/DeliveryBoyProgressBar';
import SwipeDelete from './SwipeDelete';

const Notification = ({ navigation }) => {
  const [amount, setAmount] = useState(100);
  const userData = useSelector((state) => state.state?.userData);

  const theme = useContext(themeContext);
  const { t } = useTranslation();
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);
  const userToken = useSelector(state => state.state?.userToken);
  const [showEmpty, setShowEmpty] = useState(false)
  const dispatch = useDispatch()

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



  useEffect(() => {
    getAllShop();
  }, []);

  const [dashboard, setDashboard] = useState('');
  const [loading, setLoading] = useState('')
  // console.log("completed", dashboard)

  const getAllShop = () => {
    setLoading(true);
    try {
      // console.log("response axios >>> ", JSON.stringify(API_END_POINTS.NOTIFICATION_GET));

      ApiCall('get', null, API_END_POINTS.NOTIFICATION_GET, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      }).then(response => {
        if (response?.statusCode === 200) {
          // console.log(" notifcation: ", JSON.stringify(response.data));
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

  const [saveLaterData, setSaveLaterData] = useState([]);

  const [selectedOption, setSelectedOption] = useState('All');

  const options = ['All', 'Today', 'This Week', 'This Month'];

  const [selectedCOD, setSelectedCOD] = useState('All');

  const optioncod = ['All', 'COD', 'NON-COD'];


  const handleCatDeleteIconClick = id => {
    console.log("iiiiiiii", id)
    setLoading(true);
    try {
      console.log("response axios >>> ", JSON.stringify(API_END_POINTS.CLEAR_NOTIFICATION));

      ApiCall('get', null, API_END_POINTS.CLEAR_NOTIFICATION + id, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      }).then(response => {
        ShowConsoleLogMessage(
          'response of delete api -> ' + JSON.stringify(response),
        );
        if (response?.data?.status === true) {
          ShowToastMessage(response?.data?.success);
          navigation.goBack('Notification')

          const filteredData = dashboard.filter(item => item._id !== id);
          setDashboard(filteredData);
        } else {
          ShowToastMessage(response?.data?.success);
        }
      })
        .catch(error => {
          setLoading(false)
          console.log("error axios -> ", error);
        }).finally(() => {
          setLoading(false);
        });
    } catch (error) {
      ShowToastMessage(` You selected : ${error.message}`);
      setLoading(false);
    }
  };



  const onCatRemoveClick = id => {
    dashboard.forEach((item, index) => {
      let temp = Object.assign({}, item);
      if (id == temp._id) {
        handleCatDeleteIconClick(temp._id);
      } else {
      }
    });
    const filteredData = dashboard.filter(entry => entry._id !== id);
    setDashboard(filteredData);
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          flex: 1
        },
      ]}>
      <DeliveryBoyProgressBar loading={loading} />

      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
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
          title="Notifications"
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
          flex: 1,
          backgroundColor: theme.colors.bg_color_onBoard,

          

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
          renderItem={({ item, index }) => (
            <SwipeDelete
              item={item}
              navigation={navigation}
              onDelete={() => {
                onCatRemoveClick(item?._id);
              }}
            />
          )}
        />


      </ScrollView>

    </SafeAreaView>
  );
};
export default Notification;

const styles = StyleSheet.create({

});

