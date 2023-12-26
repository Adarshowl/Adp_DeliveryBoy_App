import React, { memo, useContext, useState } from 'react';
import { Image, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { COLORS } from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ToolBarIcon from '../../utils/ToolBarIcon';
import { STRING } from '../../constants';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { FONTS } from '../../constants/Fonts';
import Feather from 'react-native-vector-icons/Feather'
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';


const CompleteDeliItem = ({
    item,
    onAdd,
    onMinus,
    onDelete,
    onSaveLater,
    fromSave,
    onSaveRemove,

}) => {
    const [count, setCount] = useState(1);
    const [isModalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation('');

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const theme = useContext(themeContext);
    const datetime = moment(item?.created_at).format('DD-MM-YYYY');


    return (
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
            // onPress={() => {
            //   navigation.navigate('MyCollection');
            // }}

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
  );
};

export default memo(CompleteDeliItem);
const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        borderRadius: 10,
        // margin: 2,
        backgroundColor: COLORS.white,
        // marginHorizontal: 10,
        marginVertical: 8,
        borderRadius: 5,
        // paddingVertical:5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 0,
        marginBottom: 15
    },
    itemImage: {
        width: 100,
        height: 100,
        alignItems: 'center',
        borderRadius: 10

    },
    qtyText: {
        fontFamily: FONTS?.regular,
        fontSize: 16,
        color: COLORS.black,
        textAlign: 'center',
        // flex: 0.3,
    },
    image: {
        height: 90,
        width: '28%',
        // margin:6,
        marginTop: 5,
        resizeMode: 'stretch',
        borderRadius: 5,
        // paddingTop:10
        // resizeMode:'contain',
    },
    innnerWrapper: {
        flex: 1,
        marginStart: 10,
        marginTop: 0
    },
    textName: {
        fontFamily: FONTS?.bold,
        fontSize: 16,
        color: COLORS.black,
    },
    discountPrice: {
        // fontFamily: 'OpenSans-SemiBold',
        fontFamily: FONTS?.regular,

        fontSize: 13,
        color: COLORS.black,
    },
    finalPriceText: {
        fontFamily: FONTS?.bold,
        fontSize: 16,
        color: COLORS.colorPrimary,
        marginTop: 3,
    },
});
