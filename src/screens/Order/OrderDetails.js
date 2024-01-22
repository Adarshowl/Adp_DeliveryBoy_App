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
import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalStyle from '../../styles/GlobalStyle';
import { images, STRING } from '../../constants';
import moment from 'moment';
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
import { API_END_POINTS,IMAGE_BASE_URL } from '../../network/ApiEndPoints';
import {
  ShowConsoleLogMessage,
  ShowToastMessage,
  validateFieldNotEmpty,
} from '../../utils/Utility';
import DeliveryBoyProgressBar from '../../utils/DeliveryBoyProgressBar';
import { useSelector } from 'react-redux';
import { CommonActions } from '@react-navigation/native';


const OrderDetails = ({ navigation, route }) => {
  const [amount, setAmount] = useState(100);
  const userToken = useSelector(state => state.state?.userToken);
  const userData = useSelector((state) => state.state?.userData);

  const theme = useContext(themeContext);
  const { t } = useTranslation();
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);
  const { item } = route.params;
  // console.log('Item in Order Screen:', item);
  const id = item?._id;

  useEffect(() => {
    getAllShop();
  }, []);

  const [dashboard, setDashboard] = useState('');
  const [showEmpty, setShowEmpty] = useState(false)
  const [address, setAddressData] = useState({})

  const [OrderProduct, setOrderProduct] = useState([{}])

  console.log(" Product", dashboard)
  const [loading, setLoading] = useState('')

  const getAllShop = () => {
    setLoading(true);
    try {

      console.log("response axios >>> ", JSON.stringify(API_END_POINTS.ORDER_DETAILS + id));

      ApiCall('get', null, API_END_POINTS.ORDER_DETAILS + id, {
        'Content-Type': 'application/json',
        'x-access-token': userToken || userData?.remember_token,
      }).then(response => {
        // console.log(response?.data?.data)

        if (response?.statusCode === 200) {
          // console.log("Response data: ", JSON.stringify(response?.data?.data));
          setDashboard(response?.data?.data)
          setOrderProduct(response?.data?.orderProducts)
          setAddressData(response?.data?.addressData)

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





  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
          flex: 1,
          // backgroundColor:'red'
        },
      ]}>
      <DeliveryBoyProgressBar loading={loading} />

      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme.colors.bg_color_onBoard,
            elevation: 0,
            // flex:1
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
              marginStart: 15
            },
          ]}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <VegUrbanCommonToolBar
          title="Order Details"
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
        contentContainerStyle={{
          flexGrow: 1
        }}
      >
        {/* <FlatList
          data={dashboard}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <OrderDetails item={item} />
          )}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Text style={{ fontSize: 20, marginTop: 50 }}>No data found!</Text>
            </View>
          )}
        /> */}


        <View style={{
          // flexGrow: 1,

          flex: 1,
          // marginHorizontal: 12,
          // backgroundColor:'red'
        }}>
          <View
            style={styles.container}
          >
            <View
              style={styles.statusContainer}
            >
              <View>
                <View style={styles?.filed}>
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/128/4604/4604415.png"
                    }}
                    style={styles?.image}
                  />
                </View>

                <Text style={[styles.statusText, {
                }]}>Order Placed</Text>
              </View>

              <View>
                <View style={styles?.filed}>
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/128/4052/4052096.png"
                    }}
                    style={styles?.image}
                  />
                </View>

                <Text style={styles.statusText}>Confirmed</Text>
              </View>

              <View>
                <View style={styles?.filed}>
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/128/2769/2769339.png"
                    }}
                    style={styles?.image}
                  />
                </View>

                <Text style={styles.statusText}>On Delivery</Text>
              </View>

              <View>
                <View style={styles?.filed}>
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/128/8307/8307819.png"
                    }}
                    style={styles?.image}
                  />
                </View>

                <Text style={styles.statusText}>Delivered</Text>
              </View>
            </View>

            {/* Additional order details can be displayed here */}
            {/* For example, order ID, customer information, items, etc. */}
          </View>



          <View style={{
            flexDirection: 'row',
            alinItem: 'center',
            alignSelf: 'center'
          }}>
            <Image
              source={{
                // uri: "https://cdn-icons-png.flaticon.com/128/4436/4436481.png"
                uri: "https://s3.amazonaws.com/freestock-prod/450/freestock_565312816.jpg"

              }}
              style={{
                width: 20,
                height: 20,
                borderRadius: 20,
              }}
            />

            <View
              style={{
                width: '18%',
                height: 5,
                backgroundColor: COLORS?.grey,
                alignSelf: 'center',

              }}
            />



            <Image
              source={{
                // uri: "https://cdn-icons-png.flaticon.com/128/4436/4436481.png"
                uri: "https://s3.amazonaws.com/freestock-prod/450/freestock_565312816.jpg"

              }}
              style={{
                width: 20,
                height: 20,
                borderRadius: 20,
              }}
            />
            <View
              style={{
                width: '18%',
                height: 5,
                backgroundColor: COLORS?.grey,
                alignSelf: 'center',

              }}
            />

            <Image
              source={{
                // uri: "https://cdn-icons-png.flaticon.com/128/4436/4436481.png"
                uri: "https://s3.amazonaws.com/freestock-prod/450/freestock_565312816.jpg"

              }}
              style={{
                width: 20,
                height: 20,
                borderRadius: 20,
              }}
            />
            <View
              style={{
                width: '18%',
                height: 5,
                backgroundColor: COLORS?.grey,
                alignSelf: 'center',

              }}
            />
            <Image
              source={{
                // uri: "https://cdn-icons-png.flaticon.com/128/4436/4436481.png"
                uri: "https://s3.amazonaws.com/freestock-prod/450/freestock_565312816.jpg"

              }}
              style={{
                width: 20,
                height: 20,
                borderRadius: 20,
              }}
            />

           
          </View>


          {/* Order Details box */}

          <View style={styles?.detailsView}>
            <View style={styles?.viewtext}>
              <View style={{}}>
                <Text style={styles?.ordertext}>Order Code</Text>
                <Text style={[styles?.normalLeft, {
                  color: COLORS?.red,
                  fontFamily: FONTS?.bold

                }]}>{dashboard?.orderId?.order_id}</Text>
              </View>
              <View style={{
                maxWidth: '51%'
              }}>
                <Text style={styles?.ordertext}>User Name</Text>
                <Text
                  numberOfLines={2}
                  style={[styles?.normaltext, {
                    // width:'80%'

                  }]}>{address?.userId?.name}</Text>
              </View>
            </View>

            <View style={styles?.viewtext}>
              <View style={{
                justifyContent: 'flex-end'
              }}>
                <Text style={styles?.ordertext}>Date & Time</Text>
                <Text style={styles?.normalLeft}>
                  {/* {address?.createdAt} */}
                  {moment(address?.createdAt).format('DD-MM-YYYY')} :

                  {moment(address?.createdAt).format('LT')}

                </Text>
              </View>
              <View style={{

              }}>
                <Text style={styles?.ordertext}>Payment Method</Text>
                <Text style={styles?.normaltext}>
                {dashboard?.orderId?.payment_mode ==="Cod" ? "COD" : dashboard?.orderId?.payment_mode}

                  {/* {dashboard?.orderId?.payment_mode} */}
                  </Text>
              </View>
            </View>


            <View style={styles?.viewtext}>
              <View>
                <Text style={styles?.ordertext}>Payment Status</Text>
                <Text style={styles?.normalLeft}>
                {dashboard?.orderId?.payment_status}
                                  </Text>
              </View>
              <View>
                <Text style={styles?.ordertext}>Delivery Status</Text>
                <Text
                  style={[
                    styles.normaltext,
                    {
                      color: item?.orderId?.is_cancelled === 'Active' ? 'red' : 'black',
                      fontFamily: FONTS?.bold
                    }
                  ]}                 >
                  {item?.orderId?.is_cancelled === 'Active' ? 'Cancelled' : item?.orderId?.delivery_status}

                  {/* {dashboard?.orderId?.delivery_status} */}
                </Text>
              </View>
            </View>


            <View style={styles?.viewtext}>
              <View style={{
                maxWidth: '65%'
              }}>

                <Text style={styles?.ordertext}>Shipping Address</Text>
                <Text style={styles?.normalLeft}>Name: {address?.name}</Text>
                <Text style={styles?.normalLeft}>Email: {address?.email}</Text>

                <Text style={styles?.normalLeft}>Address: {address?.address}</Text>
                <Text style={styles?.normalLeft}>Address Type: {address?.addressType}</Text>
                {/* <Text style={styles?.normalLeft}>City: {address?.city}</Text> */}

              </View>
              <View>
                <Text style={styles?.ordertext}>Total Amount</Text>
                <Text style={[styles?.normaltext, {
                  color: COLORS?.red,
                  fontFamily: FONTS?.bold,
                  // marginTop: 25

                }]}>
                  ${dashboard?.orderId?.amount || 0}
                </Text>
              </View>
            </View>
          </View>


          <View style={{
            // alinItem: 'center',
            // alignSelf: 'center',
            marginTop: 20,
            // justifyContent: 'center',
            marginBottom: 0
          }}>
            <Text style={styles?.produst}>Ordered Product</Text>
          </View>

          <View style={styles?.detailsView1}>
            <FlatList
              data={OrderProduct}
              // keyExtractor={(item) => item._id.toString()}
              renderItem={({ item }) => (
                <View style={{
                  flex: 1
                }}>
                  <View style={{
                    flexDirection: 'row',
                    //  justifyContent: 'space-between',
                    alinItem: 'center',
                    //  paddingVertical: 5,
                    //  paddingHorizontal:10,

                  }}>
                    <View>
                      <Image
                        source={{

                          uri:IMAGE_BASE_URL + item?.product_id?.thumbnail_image ||item?.product_id?.product_images[0]
                        }}
                        style={{
                          width: 68,
                          height: 60,
                          borderRadius: 10
                          // flex:1
                        }}
                      />
                      <View style={{
                        justifyContent: 'center',
                        // alignContent:'flex-end'
                        alinItem: 'center',
                        alignSelf: 'center'
                      }}>

                        <Text style={styles?.ordertext}></Text>
                        <Text style={[styles?.ordertext, {
                          color: COLORS?.red,
                          marginTop: -10,


                        }]}>
                          ${item?.amount || 0}
                        </Text>
                      </View>
                    </View>

                    <View>
                      <View style={{
                        marginLeft: 15,
                        // flexDirection:'row',
                      }}>
                        <Text style={styles?.normalLeft}>{item?.product_id?.description}</Text>
                        <Text style={[styles?.ordertext, {
                          marginTop: 2
                        }]}>{dashboard?.orderId?.quantity} x item</Text>
                        <Text style={styles?.normalLeft}>Prpduct : {item?.product_id?.product_name}</Text>
                        <Text style={styles?.normalLeft}>Category : {item?.product_id?.category}</Text>

                        <Text style={styles?.normalLeft}>Weight : {item?.product_id?.weight}kg</Text>
                        <Text style={styles?.normalLeft}>Size : {item?.size}</Text>

                        <View style={{
                          flexDirection: 'row',
                          flex: 1
                        }}>
                          <Text style={styles?.normalLeft}>Color</Text>
                          <View
                            style={{
                              backgroundColor: item?.color,
                              width: 15,
                              height: 15,
                              borderRadius: 20,
                              marginVertical: 3,
                              marginHorizontal: 5
                            }}
                          >
                          </View>
                        </View>


                        {/* <Image
                    source={{
                      uri:item?.product_id?.product_images[0]
                    }}
                    style={{
                      width:60,
                      height:60,
                      flex:1
                    }}
                    /> */}
                      </View>


                    </View>
                  </View>
                </View>
              )}
            />

          </View>


          <View style={{

            justifyContent: 'flex-end'
          }}>
            <View style={styles?.totalView}>
              <View style={styles?.viewtext}>

                <Text style={styles?.ordertext}>SUB TOTAL</Text>
                {/* <Text style={styles?.normalLeft}>paid</Text> */}
                <Text style={styles?.ordertext}>
                  ${dashboard?.orderId?.totalamount || 0}
                </Text>

              </View>

              {/* <View style={styles?.viewtext}>

                <Text style={styles?.ordertext}>TAX</Text>
                <Text style={styles?.ordertext}>$0.00</Text>

              </View> */}

              <View style={styles?.viewtext}>

                <Text style={styles?.ordertext}>Delivery Comission</Text>
                <Text style={styles?.ordertext}>${dashboard?.delivery_commission}</Text>

              </View>
              <View style={styles?.viewtext}>

                <Text style={styles?.ordertext}>Shipping Cost</Text>
                <Text style={styles?.ordertext}>$0.00</Text>

              </View>
              {/* <View style={styles?.viewtext}>

                <Text style={styles?.ordertext}>DISCOUNT</Text>
                <Text style={styles?.ordertext}>$0.00</Text>

              </View> */}
              <View
                style={{
                  borderWidth: 0.2,
                  width: '100%',
                  color: COLORS?.gray,
                  marginVertical: 8,
                  height: 0
                }}
              />

              <View style={styles?.viewtext}>

                <Text style={styles?.ordertext}>GRAND TOTAL</Text>
                <Text style={styles?.ordertext}>
                  ${dashboard?.orderId?.totalamount || 0}
                </Text>

              </View>
            </View>
          </View>

        </View>


        <View
          style={{ marginBottom: 10, flex: 1 }}
        />

      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

  },

  totalView: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 0.2,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 30,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
    flex: 1
  },
  statusIcon: {
    width: 30,
    height: 30,
  },
  statusText: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: FONTS?.bold,
    marginTop: 5,
    color: COLORS?.black
  },
  filed: {
    borderRadius: 5,
    borderWidth: 1,
    width: 50,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',

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
  detailsView1: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 0.2,
    paddingHorizontal: 20,
    paddingVertical: 15,
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
    fontSize: 12,
    fontFamily: FONTS?.regular,
    color: COLORS?.black,
    textAlign: 'left',
    marginTop: 2

  },
  produst: {
    fontSize: 16,
    fontFamily: FONTS?.bold,
    color: COLORS?.black,
    textAlign: 'center'

  }
});

export default OrderDetails;
