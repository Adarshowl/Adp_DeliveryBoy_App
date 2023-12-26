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
  import { useSelector } from 'react-redux';
  import GlobalStyle from '../../styles/GlobalStyle';
  import { images, STRING } from '../../constants';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
  import ToolBarIcon from '../../utils/ToolBarIcon';
  import ApiCall from '../../network/ApiCall';
  import { API_END_POINTS } from '../../network/ApiEndPoints';
  import Octicons from 'react-native-vector-icons/Octicons'
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import { CommonActions } from '@react-navigation/native';
  
  import { COLORS } from '../../constants/Colors';
  import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import themeContext from '../../constants/themeContext';
  import { useTranslation } from 'react-i18next';
  import { FONTS } from '../../constants/Fonts';
  import { Picker } from '@react-native-picker/picker'; // Import the Picker component
  import {
    ShowConsoleLogMessage,
    ShowToastMessage,
    validateFieldNotEmpty,
  } from '../../utils/Utility';
  import DeliveryBoyProgressBar from '../../utils/DeliveryBoyProgressBar';
import ReturnOrderList from './ReturnOrderList';
  
  
  const ReturnOrder = ({ navigation }) => {
    const [amount, setAmount] = useState(100);
  
    const theme = useContext(themeContext);
    const { t } = useTranslation();
    const [count, setCount] = useState(1);
    const [show, setShow] = useState(false);
  
  
    const userToken = useSelector(state => state.state?.userToken);
    const userData = useSelector((state) => state.state?.userData);
  
    const [showEmpty, setShowEmpty] = useState(false)
  
    useEffect(() => {
      getAllShop();
    }, []);
  
    const [dashboard, setDashboard] = useState('');
    const [loading, setLoading] = useState('')
    // console.log("pending", dashboard)
  
    const getAllShop = () => {
      setLoading(true);
      try {
        console.log("response axios >>> ", JSON.stringify(API_END_POINTS.RETURN_ORDER_DELIVERY));
  
        ApiCall('get', null, API_END_POINTS.RETURN_ORDER_DELIVERY, {
          'Content-Type': 'application/json',
          'x-access-token': userToken || userData?.remember_token,
        }).then(response => {
          // console.log("response pending >>> ", JSON.stringify(response));
          if (response?.statusCode === 200) {
            console.log("return order data : ", JSON.stringify(response.data));
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
          setShowEmpty(false)
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
            title="Return Order"
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
          {/* 
         <View style={{
          flexDirection:'row',
          justifyContent:'space-between',
          marginHorizontal:20
         }}>
         <View style={{
            marginTop:10,
            borderRadius:3,
            borderWidth:0.2,
            width:'43%',
            paddingVertical:0,
            height:40,
            alinItem:'center',
            justifyContent:'center'
            
              }}>
            <Picker
              selectedValue={selectedOption}
              onValueChange={(itemValue, itemIndex) => setSelectedOption(itemValue)}
            >
              {options.map((option) => (
                <Picker.Item key={option} label={option} value={option}
                style={{
                  fontSize:13,
                  fontFamily:FONTS?.regular
                }}
                />
              ))}
            </Picker>
          </View>
          <View style={{
            marginTop:10,
            borderRadius:3,
            borderWidth:0.2,
            width:'43%',
            paddingVertical:0,
            height:40,
            alinItem:'center',
            justifyContent:'center'
            
              }}>
            <Picker
            contentContainerStyle={{
              flex:1,
              width:100,
              justifyContent:'flex-start',
  
            }}
              selectedValue={selectedCOD}
              onValueChange={(itemValue, itemIndex) => setSelectedCOD(itemValue)}
            >
              {optioncod.map((option) => (
                <Picker.Item key={option} label={option} value={option}
                style={{
                  fontSize:13,
                  fontFamily:FONTS?.regular
                }}
                />
              ))}
            </Picker>
          </View>
         </View> */}
  
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
              <ReturnOrderList
                item={item}
              />
            )}
          />
  
  
        </ScrollView>
  
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
  
  });
  
  export default ReturnOrder;
  