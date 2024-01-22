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
import React, {useContext, useEffect, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import {CommonActions, useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ShowToastMessage} from '../../utils/Utility';
import {fetchUserData, fetchUserToken} from '../../redux/actions';

import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import themeContext from '../../constants/themeContext';
import {useTranslation} from 'react-i18next';
import {FONTS} from '../../constants/Fonts';
import MyEarningItem from './MyEarningItem';
import DeliveryBoyProgressBar from '../../utils/DeliveryBoyProgressBar';
import {useDispatch, useSelector} from 'react-redux';

const Withdrawal = ({navigation}) => {
  const [amount, setAmount] = useState(100);

  const theme = useContext(themeContext);
  const {t} = useTranslation();
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);

  const userToken = useSelector(state => state.state?.userToken);
  const userData = useSelector(state => state.state?.userData);
  const dispatch = useDispatch();

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
              getBankList(JSON.parse(value)?.id);
              // getbalance
              getbalance(JSON.parse(value)?.id);
            } else {
            }
          }
        });
      })();
    }
  }, [isFocused]);

  const [dashboard, setAllDashboard] = useState('');

  const [today, setTodayData] = useState({});
  const [balance, setBalance] = useState({});

  const [loading, setLoading] = useState('');
  console.log('balance', balance);
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
            let tmp = JSON.parse(value);
            // setUserData(tmp?.data);
            // ShowConsoleLogMessage("data for te",(fetchUserData(JSON.parse(value.name))))
            dispatch(fetchUserData(tmp?.data));
            dispatch(fetchUserToken(tmp?.jwtoken));
            // getDriverProfile(tmp?.id)
          } else {
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE' + err);
    }
  };

  const [bankListData, setBankListData] = useState([]);
  const [showAddBtn, setShowAddBtn] = useState(false);

  const getBankList = () => {
    setLoading(true);
    try {
      console.log(
        'response axios >>> ',
        JSON.stringify(API_END_POINTS.BANK_LIST),
      );

      ApiCall('get', null, API_END_POINTS.BANK_LIST, {
        'x-access-token': userToken || userData?.remember_token,
      })
        .then(response => {
          console.log('bnak ist: ', response);

          if (response?.statusCode === 200) {
            console.log('bnak ist: ', response?.data?.data?.length);
            setBankListData(response?.data?.data);
            setShowAddBtn(response?.data?.data?.length != 0);
          } else if (response?.statusCode === 500) {
          } else {
            setShowEmpty(true);
            setLoading(true);
            setShowAddBtn(false);
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
      ShowToastMessage(`You selected : ${error.message}`);
      setLoading(false);
    }
  };

  const getAllShop = () => {
    setLoading(true);
    try {
      console.log(
        'response axios >>> ',
        JSON.stringify(API_END_POINTS.WITHDRAWAL_LIST),
      );

      ApiCall('get', null, API_END_POINTS.WITHDRAWAL_LIST, {
        'x-access-token': userToken || userData?.remember_token,
      })
        .then(response => {
          if (response?.statusCode === 200) {
            console.log(
              'Response WITHDRAWAL_LIST: ',
              JSON.stringify(response.data),
            );
            setAllDashboard(response?.data?.data);
            setTodayData(response?.data?.additionalInfo);
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
            setLoading(false);
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
      ShowToastMessage(`You selected : ${error.message}`);
      setLoading(false);
    }
  };

  const getbalance = () => {
    setLoading(true);
    try {
      console.log(
        'response axios >>> ',
        JSON.stringify(API_END_POINTS.BALANCE_WITHDRAWAL_LIST),
      );

      ApiCall('get', null, API_END_POINTS.BALANCE_WITHDRAWAL_LIST, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      })
        .then(response => {
          if (response?.statusCode === 200) {
            // console.log("Response WITHDRAWAL_LIST: ", JSON.stringify(response.data));
            setBalance(response?.data?.data);
            if (response.data?.length !== 0) {
              setShowEmpty(true);
            }
          } else if (response?.statusCode === 500) {
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
          routes: [{name: 'Auth'}],
        }),
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
              transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
              marginStart: 10,
            },
          ]}
          onPress={() => {
            navigation.goBack();
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alinItem: 'center',
            flex: 1,
          }}>
          <VegUrbanCommonToolBar
            title="Withdrawal"
            style={{
              backgroundColor: theme.colors.bg_color_onBoard,
              marginStart: 10,
              fontFamily: FONTS?.bold,
              // alinItem: 'center'
            }}
            textStyle={{
              color: theme.colors.white,
              fontFamily: FONTS?.bold,
              fontSize: 18,
              // textAlin: 'center'
            }}
          />

          {bankListData?.length > 0 && (
            <View
              style={{
                // marginTop: 10,
                marginEnd: 15,
                justifyContent: 'flex-end',
                marginBottom: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddBalance');
                }}>
                <Image
                  source={{
                    uri: 'data:image/png;base64,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',
                  }}
                  style={{
                    width: 35,
                    height: 35,
                    resizeMode: 'center',
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}>
        <View style={styles.container}>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles?.filed,
                {
                  backgroundColor: COLORS?.earning,

                  // backgroundColor: '#40B873'
                },
              ]}>
              <Text style={styles.statusText1}>Total Withdrawal</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 5,
                }}>
                <Text
                  style={[
                    styles.statusText1,
                    {
                      fontSize: 18,
                      marginTop: 13,
                    },
                  ]}>
                  {today?.totalWithdrawalCount || 0}
                </Text>

                <Text
                  style={[
                    styles.statusText1,
                    {
                      fontSize: 18,
                      marginTop: 13,
                      marginEnd: 10,
                    },
                  ]}>
                  ${today?.totalWithdrawalAmount || 0}
                </Text>
              </View>
              {/* <Text style={styles.normalLeft1}>16 oct,2023</Text> */}
            </View>

            <View
              style={[
                styles?.filed,
                {
                  backgroundColor: '#F49127',
                },
              ]}>
              <Text style={styles.statusText1}>Pending Withdrawal</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 5,
                }}>
                <Text
                  style={[
                    styles.statusText1,
                    {
                      fontSize: 18,
                      marginTop: 13,
                    },
                  ]}>
                  {today?.totalPendingPaymentCount || 0}
                </Text>

                <Text
                  style={[
                    styles.statusText1,
                    {
                      fontSize: 18,
                      marginTop: 13,
                      marginEnd: 10,
                    },
                  ]}>
                  ${today?.totalPendingPaymentAmount || 0}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.statusContainer}>
            <View
              style={[
                styles?.filed,
                {
                  backgroundColor: '#40B873',

                  // backgroundColor: "#FC4D31"
                },
              ]}>
              <Text style={styles.statusText1}>Approved Withdrawal</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 5,
                }}>
                <Text
                  style={[
                    styles.statusText1,
                    {
                      fontSize: 18,
                      marginTop: 13,
                    },
                  ]}>
                  {today?.totalApprovedWithdrawalCount || 0}
                </Text>

                <Text
                  style={[
                    styles.statusText1,
                    {
                      fontSize: 18,
                      marginTop: 13,
                      marginEnd: 10,
                    },
                  ]}>
                  ${today?.totalApprovedWithdrawalAmount || 0}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles?.filed,
                {
                  // backgroundColor: COLORS?.earning
                  backgroundColor: '#FC4D31',
                },
              ]}>
              <Text style={styles.statusText1}>Rejected Withdrawal</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 5,
                }}>
                <Text
                  style={[
                    styles.statusText1,
                    {
                      fontSize: 18,
                      marginTop: 13,
                    },
                  ]}>
                  {today?.totalRejectedRequestCount || 0}
                </Text>

                <Text
                  style={[
                    styles.statusText1,
                    {
                      fontSize: 18,
                      marginTop: 13,
                      marginEnd: 10,
                    },
                  ]}>
                  ${today?.totalRejectedWithdrawalAmount || 0}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* <View style={{
          justifyContent: 'center',
          flex: 1,
          alinItem: 'center',
          marginHorizontal: 40
        }}>
          <VegUrbanCommonBtn
            height={30}
            width={'10%'}
            borderRadius={100}
            textSize={16}
            textColor={COLORS?.white}
            iconPosition={'left'}
            // text={('Add')}
            backgroundColor={COLORS?.red}
            // onPress={onCancel}
            //     onCancelClick(item)

            onPress={() => {
              navigation.navigate('AddBalance')
            }

            }

            textStyle={{
              fontFamily: FONTS?.bold,

            }}
          />
        </View> */}

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 20,
          }}>
          <View
            style={[
              // styles?.filed,
              {
                // backgroundColor: COLORS?.earning
                flex: 1,
                borderRadius: 5,
                // borderWidth: 1,
                width: '50%',
                alignItems: 'center',
                // height: 40,
                // alignSelf: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                marginHorizontal: 3,
                paddingHorizontal: 5,
                paddingVertical: 6,
                backgroundColor: COLORS?.colorPrimary,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <Text
              style={[
                styles.statusText1,
                {
                  // alinSelf: 'center',
                  marginTop: 0,
                  color: COLORS?.white,
                },
              ]}>
              Total Balance
            </Text>
            <View
              style={{
                // flexDirection: 'row',
                // justifyContent: 'space-between',
                // marginHorizontal: 5,
                alinItem:'center'
              }}>
              <Text
              numberOfLines={1}
                style={[
                  styles.statusText1,
                  {
                    fontSize: 16,
                    marginTop: 5,
                    color: COLORS?.white,
                  },
                ]}>
                ${balance?.accountbalance || 0}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flez: 1,
          }}>
          {!showAddBtn ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 20,
              }}>
              <VegUrbanCommonBtn
                height={40}
                width={'100%'}
                borderRadius={100}
                marginTop={25}
                textSize={16}
                textColor={COLORS?.white}
                text={'Add Bank Account'}
                backgroundColor={COLORS?.black}
                // onPress={onCancel}
                //     onCancelClick(item)

                onPress={() => {
                  navigation.navigate('CreateBank');
                }}
                textStyle={{
                  fontFamily: FONTS?.bold,
                }}
              />
            </View>
          ) : (
            <FlatList
              style={{
                paddingStart: 5,
                paddingEnd: 5,
              }}
              ListHeaderComponent={() => {
                return <View style={{}} />;
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
                        // fontFamily:FONTS?.bold ,
                        color: COLORS?.black,
                      }}>
                      No Withdrawal found !
                    </Text>
                  </View>
                )
              }
              ListHeaderComponentStyle={{
                paddingTop: 5,
              }}
              showsVerticalScrollIndicator={false}
              data={dashboard}
              renderItem={({item, index}) => <MyEarningItem item={item} />}
            />
          )}
        </View>
        {/*
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
                <Text style={{
                  fontSize: 20, marginTop: 50,
                  // fontFamily:FONTS?.bold ,
                  color: COLORS?.black
                }}
                >No Withdrawal found !
                </Text>
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
        </View> */}
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
    marginTop: 30,
  },
  statusContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 6,
    flex: 1,
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
    color: COLORS?.black,
  },
  statusText1: {
    // textAlign: 'center',
    fontSize: 14,
    fontFamily: FONTS?.bold,
    marginTop: 5,
    marginLeft: 8,
    color: COLORS?.white,
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
    marginHorizontal: 3,
    // paddingHorizontal: 5,
    paddingVertical: 10,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    alignSelf: 'center',
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
    paddingVertical: 5,
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
    textAlign: 'right',
  },
  normalLeft: {
    fontSize: 14,
    fontFamily: FONTS?.regular,
    color: COLORS?.black,
    marginLeft: 8,
  },
  normalLeft1: {
    fontSize: 14,
    fontFamily: FONTS?.regular,
    color: COLORS?.white,
    marginLeft: 8,
  },
  produst: {
    fontSize: 16,
    fontFamily: FONTS?.bold,
    color: COLORS?.black,
  },
});

export default Withdrawal;
