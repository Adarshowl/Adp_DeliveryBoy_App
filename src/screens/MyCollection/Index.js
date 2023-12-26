import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  I18nManager,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
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
import MyCollactionList from './MyCollactionList';
import { CommonActions } from '@react-navigation/native';


const MyCollection = ({ navigation }) => {
  const [amount, setAmount] = useState(100);

  const theme = useContext(themeContext);
  const { t } = useTranslation();
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);


  const [cartData, setCartData] = useState([
    {
      number: '20210345-0483847',
      color: '#D35400',
      status: 'Cash on Delivery',
      price: '$34.70',
      date: '02-05-2023',
      fav: true,
    },
    {
      number: '94949349-67477723',
      fav: true,
      color: '#707B7C',
      status: 'Paypal',
      price: '$60.70',
      date: '01-06-2023',
    },
  ]);


  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
          flex: 1
        },
      ]}>
      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme.colors.bg_color_onBoard,
            elevation:0
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
          title="Collection"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 15,
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
          // flex: 0,
        }}
      >
        <View style={styles.container}>
          <View style={styles.statusContainer}>
            <View style={[styles?.filed,{
              backgroundColor:COLORS?.dashBoard
            }]}>

              <Text style={styles.statusText1}>Today</Text>
              <Text style={[styles.statusText1, {
                fontSize: 20,
                marginTop:10
              }]}>$0.000</Text>
              <Text style={styles.normalLeft1}>16 oct,2023</Text>

            </View>

            <View style={[styles?.filed,{
              backgroundColor:theme?.colors?.bg_color
            }]}>
              <Text style={styles.statusText}>Yesterday</Text>
              <Text style={[styles.statusText, {
                fontSize: 20,
                marginTop:10

              }]}>$0.000</Text>
              <Text style={styles.normalLeft}>16 oct,2023</Text>


            </View>

          </View>

        </View>


        <FlatList
          style={{
            paddingStart: 5,
            paddingEnd: 5,

          }}
          ListHeaderComponent={() => {
            return <View style={{}} />;
          }}
          ListHeaderComponentStyle={{
            paddingTop: 5,
          }}
          showsVerticalScrollIndicator={false}
          data={cartData}
          renderItem={({ item, index }) => (
            <MyCollactionList
              item={item}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    marginHorizontal:10,
    marginVertical:10,
    marginTop:30
  },
  statusContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
    flex: 1
  },

  statusText: {
    // textAlign: 'center',
    fontSize: 12,
    fontFamily: FONTS?.bold,
    marginTop: 5,
    marginLeft: 8,
    color: COLORS?.black
  },
  statusText1: {
    // textAlign: 'center',
    fontSize: 12,
    fontFamily: FONTS?.bold,
    marginTop: 5,
    marginLeft: 8,
    color: COLORS?.white
  },
  filed: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    width: '100%',
    height: 100,
    // alignSelf: 'center',
    // justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
    paddingHorizontal:10,
    paddingVertical:10

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
    marginLeft:8
  },
  normalLeft1: {
    fontSize: 14,
    fontFamily: FONTS?.regular,
    color: COLORS?.white,
    marginLeft:8
  },
  produst: {
    fontSize: 16,
    fontFamily: FONTS?.bold,
    color: COLORS?.black
  }
});

export default MyCollection;
