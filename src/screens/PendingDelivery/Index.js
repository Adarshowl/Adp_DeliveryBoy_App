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
import AntDesign from 'react-native-vector-icons/AntDesign';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import themeContext from '../../constants/themeContext';
import { useTranslation } from 'react-i18next';
import { FONTS } from '../../constants/Fonts';
import PendingDelivItem from './PendingDelivItem';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import ApiCall from '../../network/ApiCall';
import { API_END_POINTS } from '../../network/ApiEndPoints';
import {
  ShowConsoleLogMessage,
  ShowToastMessage,
  validateFieldNotEmpty,
} from '../../utils/Utility';
import DeliveryBoyProgressBar from '../../utils/DeliveryBoyProgressBar';
import { useSelector } from 'react-redux';

const PendingDelivery = ({ navigation }) => {
  const [amount, setAmount] = useState(100);
  const userToken = useSelector(state => state.state?.userToken);
  const [showEmpty, setShowEmpty] = useState(false)

  const userData = useSelector((state) => state.state?.userData);  

  useEffect(() => {
    getAssignedDelivery();
    // getPickedUpDelivery();
    // getOnTheWayDelivery()
  }, []);

  const [Assigned, setAssigned] = useState('');
  const [loading, setLoading] = useState('')
  console.log("assigned", setAssigned)

  const getAssignedDelivery = () => {
    setLoading(true);
    try {
      console.log("response axios >>> ", JSON.stringify(API_END_POINTS.ASSIGNED_DELIVERY));

      ApiCall('get', null, API_END_POINTS.ASSIGNED_DELIVERY, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      }).then(response => {
        console.log("response axios >>> ", JSON.stringify(response));
        if (response?.data?.status == true) {

          setAssigned(response?.data?.data)
          // if (response?.data?.data?.length == 0) { setShowEmpty(true) }
          // console.log("response  ", JSON.stringify(response?.data?.data));
        } else {
          setShowEmpty(true)
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


  const handleMarkAsDelivered = (itemToDeliver) => {
    Alert.alert(
      'Confirmation',
      'Are you sure to mark this as delivered?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            const updatedCartData = cartData.map((item) => {
              if (item === itemToDeliver) {
                if (item.status === 'Assigned') {
                  item.status = 'Picked';
                } else if (item.status === 'Picked') {
                  item.status = 'On the Way';
                }
              }
              return item;
            });
            setCartData(updatedCartData);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const theme = useContext(themeContext);
  const { t } = useTranslation();
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [statusText, setStatusText] = useState('On the Way');


  const [cartData, setCartData] = useState([
    {
      image: 'https://cdn-icons-png.flaticon.com/128/763/763965.png',
      name: 'Order Code',
      number: '20210345-0483847',
      color: '#D35400',
      status: 'On the Way',
      payStstua: 'Online',
      color: '#EC1D39',

      price: '$34.70',
      date: '02-05-2023',
      fav: true,
    },
    {
      image: 'https://cdn-icons-png.flaticon.com/128/10030/10030788.png',

      name: 'Order Code',
      number: '94949349-67477723',
      fav: true,
      color: '#707B7C',
      status: 'Picked',
      color: '#EC871D',

      price: '$60.70',
      payStstua: 'Cash On Delivery',
      date: '01-06-2023',
    },
    {
      image: 'https://cdn-icons-png.flaticon.com/128/8901/8901370.png',

      name: 'Order Code',
      number: '8982398-3747837',
      fav: true,
      number: '346456-908989',
      payStstua: 'Phone Pay',
      color: '#5666D7',
      status: 'Assigned',
      price: '$29.70',
      date: '09-06-2023',
    },
  ]);

  const tabsData = [
    {
      title: 'On the Way',
      data: cartData.filter((item) => item.status === 'On the Way'),
    },
    {
      title: 'Picked',
      data: cartData.filter((item) => item.status === 'Picked'),
    },
    {
      title: 'Assigned',
      data: cartData.filter((item) => item.status === 'Assigned'),
    },
  ];



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
          title="Pending Delivery"
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
        {/* <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginStart: 10,
          marginBottom: 10
        }}>
          <View style={{
            backgroundColor: theme?.colors?.bg,
            width: 50,
            height: 50,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center'

          }}>
            <Image
              // source={{ uri: item?.image }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 50
              }}
            />

          </View>
          <Text style={[styles?.title, {
            // color: item?.color
          }]}>{statusText}</Text>
        </View> */}

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginStart: 15,
          marginBottom: -10

        }}>
          <View>
            {activeTab === 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  backgroundColor: theme?.colors?.bg,
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center'

                }}>
                  <FontAwesome5
                    name="running"
                    size={22}
                    color={activeTab === 0 ? COLORS.red : COLORS.black}
                    style={{
                      // paddingHorizontal: 10,
                    }}
                  />
                </View>
                <Text style={{ marginLeft: 10, fontSize: 16, color: COLORS.red, fontFamily: FONTS?.regular }}>On the Way</Text>
              </View>
            )}
          </View>
          <View>
            {activeTab === 1 && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  backgroundColor: theme?.colors?.bg,
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center'

                }}>
                  <MaterialIcons
                    name="wheelchair-pickup"
                    size={22}
                    color={activeTab === 1 ? '#EC871D' : COLORS.black}
                    style={{
                      marginStart: 8,
                      // paddingHorizontal: 20,
                    }}
                  />
                </View>
                <Text style={{ marginLeft: 10, fontSize: 16, color: '#EC871D', fontFamily: FONTS?.regular, }}>Picked</Text>
              </View>
            )}
          </View>
          <View>
            {activeTab === 2 && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  backgroundColor: theme?.colors?.bg,
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center'

                }}>
                  <MaterialIcons
                    name="hourglass-empty"
                    size={22}
                    color={activeTab === 2 ? '#5666D7' : COLORS.black}
                    style={{
                      // paddingHorizontal: 70,
                    }}
                  />
                </View>
                <Text style={{ marginLeft: 5, fontSize: 16, color: '#5666D7', fontFamily: FONTS?.regular }}>Assigned</Text>
              </View>
            )}
          </View>
        </View>

        <FlatList
          style={{
            paddingStart: 5,
            paddingEnd: 5,
          }}
          ListEmptyComponent={() => {
            return (
              <Text style={{
                fontSize: 20,
                justifyContent: 'center',
                flex: 1,
                alignSelf: 'center',
                marginTop: '30%',
                color: COLORS?.black,
                fontFamily: FONTS?.regular
              }}>No data found</Text>
            );
          }}
          ListHeaderComponent={() => {
            return <View style={{}} />;
          }}
          ListHeaderComponentStyle={{
            paddingTop: 5,
          }}
          showsVerticalScrollIndicator={false}
          data={Assigned}
          // data={tabsData[activeTab].data} // Use the data of the active tab
          renderItem={({ item, index }) => (
            <PendingDelivItem
              fromSave={true}
              item={item}
              onAdd={() => {
                onAddClick(index);
              }}
              onMinus={() => {
                onMinusClick(index);
              }}
              onDelete={() => {
                onDeleteClick(item.name);
              }}
              onSaveLater={() => {
                onSaveLaterClick(item.name);
              }}
              onMarkAsDelivered={() => handleMarkAsDelivered(item)}
            />


          )}
        />
        <View
          style={{
            marginBottom: 10
          }}
        />

      </ScrollView>



      <View style={{
        backgroundColor: theme?.colors?.bg,
        paddingVertical: 5
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',

          paddingHorizontal: 0,
          alignItems: 'center',
          marginTop: 5
        }}>
          <FontAwesome5 name="running" size={22} color={activeTab === 0 ? COLORS.red : COLORS.black}
            style={{
              // paddingHorizontal:10
            }}
          />
          <MaterialIcons name="wheelchair-pickup" size={22} color={activeTab === 1 ? '#EC871D' : COLORS.black}
            style={{
              marginStart: 8
              // paddingHorizontal:20
            }}
          />
          <MaterialIcons name="hourglass-empty" size={22} color={activeTab === 2 ? '#5666D7' : COLORS.black}
            style={{

              // paddingHorizontal:70
            }}
          />
        </View>
        <SegmentedControlTab
          values={[
            'On the Way',
            'Picked',
            'Assigned'
          ]}
          selectedIndex={activeTab}
          onTabPress={(index) => {
            setActiveTab(index);
            setStatusText(['On the Way', 'Picked', 'Assigned'][index]);
          }}
          // onTabPress={(index) => setActiveTab(index)}
          tabsContainerStyle={{

            marginHorizontal: 0,
            paddingHorizontal: 0,
            backgroundColor: theme?.colors?.bg
          }}
          tabStyle={{
            borderColor: COLORS.transparent,
            backgroundColor: theme?.colors?.bg
          }}
          activeTabStyle={{
            borderColor: COLORS.transparent,
            backgroundColor: theme?.colors?.bg
          }}
          tabTextStyle={{
            color: COLORS.black,
            fontSize: 14,
            fontFamily: FONTS?.regular
          }}
          activeTabTextStyle={{
            color: COLORS.black,
            fontSize: 16,
            fontFamily: FONTS?.bold
          }}
        />

      </View>



    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: FONTS?.bold,
    color: COLORS?.black,
    marginStart: 12
  },
});

export default PendingDelivery;
