import React, { memo, useContext, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  I18nManager
} from 'react-native';
import { COLORS } from '../../constants/Colors';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';

import { STRING } from '../../constants';
import GlobalStyle from '../../styles/GlobalStyle';
import DateItem from './DateItem';
import TimeItem from './TimeItem';
import PaymentItem from './PaymentItem';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FONTS } from '../../constants/Fonts';

import { ShowToastMessage } from '../../utils/Utility';

import themeContext from '../../constants/themeContext';
import { useNavigation } from '@react-navigation/native';

const Payment = ({ }) => {
  navigation = useNavigation()
  const [show, setShow] = useState(false);

  const theme = useContext(themeContext);
  const { t, i18n } = useTranslation();

  const [date, setData] = useState([
    {
      dayName: 'Mon',
      date: '25',
      monthName: 'Apr',
      selected: true,
    },
    {
      dayName: 'Tue',
      date: '26',
      selected: false,
      monthName: 'Apr',
    },
    {
      dayName: 'Wed',
      selected: false,
      date: '27',
      monthName: 'Apr',
    },
    {
      selected: false,
      dayName: 'Thu',
      date: '28',
      monthName: 'Apr',
    },
    {
      selected: false,
      dayName: 'Fri',
      date: '29',
      monthName: 'Apr',
    },
  ]);

  const [time, setTime] = useState([
    {
      title: '9 Am to 12 Pm',
      selected: true,
    },
    {
      title: '12 Pm to 3 Pm',
      selected: false,
    },
    {
      title: '3 Pm to 6 Pm',
      selected: false,
    },
  ]);
  const [payData, setPayData] = useState([
    {
      image: "https://static.vecteezy.com/system/resources/thumbnails/000/512/317/small/235_-_2_-_Wallet.jpg",
      name: 'Wallet',
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/174/174861.png",
      name: 'Paypal',
    },
    {
      image: 'https://cdn-icons-png.flaticon.com/128/5968/5968630.png',
      // image:"data:image/png;base64,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",
      // 'https://play-lh.googleusercontent.com/HArtbyi53u0jnqhnnxkQnMx9dHOERNcprZyKnInd2nrfM7Wd9ivMNTiz7IJP6-mSpwk',
      name: 'Apple Pay',
    },

    {
      image: "https://assets.stickpng.com/images/5847f9cbcef1014c0b5e48c8.png",
      // 'https://play-lh.googleusercontent.com/HArtbyi53u0jnqhnnxkQnMx9dHOERNcprZyKnInd2nrfM7Wd9ivMNTiz7IJP6-mSpwk',
      name: 'Google Pay',
    },


  ]);

  const onDateClick = idx => {
    let a = date.map((item, index) => {
      let temp = Object.assign({}, item);
      if (index == idx) {
        temp.selected = !temp.selected;
      } else {
        temp.selected = false;
      }
      // ShowToastMessage('HI CLIXK' + temp.fav);

      return temp;
    });

    setData(a);
  };

  // const onDateClick = (idx) => {
  //   const updatedData = data.map((item, index) => ({
  //     ...item,
  //     selected: index === idx, // Toggle the selected state for the clicked item
  //   }));

  //   setData(updatedData);
  // };
  const onTimeClick = idx => {
    let a = time.map((item, index) => {
      let temp = Object.assign({}, item);
      if (index == idx) {
        temp.selected = !temp.selected;
      } else {
        temp.selected = false;
      }
      // ShowToastMessage('HI CLIXK' + temp.fav);

      return temp;
    });

    setTime(a);
  };

  const onPaymentClick = idx => {
    let a = payData.map((item, index) => {
      let temp = Object.assign({}, item);
      if (index == idx) {
        temp.selected = !temp.selected;
      } else {
        temp.selected = false;
      }
      // ShowToastMessage('HI CLIXK' + temp.fav);

      return temp;
    });

    setPayData(a);
  };
  return (
    <View
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}
      showsVerticalScrollIndicator={false}>
      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme.colors.bg_color_onBoard,
          },
        ]}>
        {/* <Image source={images.app_logo} style={GlobalStyle.toolbarAppIcon} /> */}
        <Ionicons
          name="ios-arrow-back"
          // color={COLORS.black}
          color={theme.colors.textColor}

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
            // ShowToastMessage('Coming Soon!');
          }}
        />
        {/* <ToolBarIcon
          title={Ionicons}
          iconName={'chevron-back'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            backgroundColor: theme?.colors?.toolbar_icon_bg,
            marginEnd: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        /> */}
        <VegUrbanCommonToolBar
          title="Payment Methods"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10

          }}
          textStyle={{
            color: theme.colors.textColor,
            fontFamily: FONTS?.bold,
            fontSize: 20
          }}
        />

        <Ionicons
          name="scan-sharp"
          // color={COLORS.black}
          color={theme.colors.textColor}

          size={25}
          style={[
            styles.backIcon,
            {
              opacity: !show ? 1 : 0.0,
              marginEnd:15
            },
          ]}
          onPress={() => {
            ShowToastMessage("Cooming Soon")
            // navigation.goBack();
            // ShowToastMessage('Coming Soon!');
          }}
        />
        
      </View>

      <ScrollView
        contentContainerStyle={{
          backgroundColor: theme?.colors?.bg_color_onBoard,
        }}>
      

        <View
          style={{
            backgroundColor: theme?.colors?.bg_color_onBoard,

            marginTop: 5,
          }}>
          <Text
            style={[
              styles.prefDeliText,
              {
                marginStart: 15,
                marginTop: 15,
                color: theme?.colors?.colorPrimary,
              },
            ]}>
            {STRING.payment_method}
          </Text>
          <FlatList
            style={{
              paddingStart: 10,
              paddingEnd: 5,
            }}
            ListHeaderComponent={() => {
              return <View style={{}} />;
            }}
            ListHeaderComponentStyle={{
              paddingTop: 15,
            }}
            ListFooterComponent={() => {
              return <View style={{}} />;
            }}
            ListFooterComponentStyle={{
              paddingBottom: 15,
            }}
            showsVerticalScrollIndicator={false}
            data={payData}
            renderItem={({ item, index }) => (
              <PaymentItem
                onItemClick={() => {
                  onPaymentClick(index);
                }}
                item={item}
              />
            )}
          />



        </View>
        <View style={{ 
          alignItems: 'center',
          marginHorizontal:22,
          marginVertical:10
           }}>

          <VegUrbanCommonBtn
            height={40}
            width={'100%'}
            borderRadius={15}
            textSize={16}
            fontWeight={'bold'}
            // marginTop={0}
            text={t('Add New Card')}
            textColor={theme.colors?.textColor}
            backgroundColor={theme.colors?.colorimageback}
            onPress={() => {
              navigation.navigate('AddNewCard')
            }}
            textStyle={{
              fontFamily: FONTS?.bold
            }}
          />
        </View>

      </ScrollView>
      <View style={{
        alignItems: 'center',
        marginTop: 10,
        marginBottom:10

      }}>
        <VegUrbanCommonBtn
          height={40}
          width={'90%'}
          borderRadius={20}
          textSize={18}
          text={('Confirm Payment')}
          textColor={theme.colors?.btnTextColor}
          backgroundColor={theme.colors?.colorPrimary}
          onPress={() => {
            // closeSignUpModal();
            navigation.navigate('ConfirmPayment')
          }}
          textStyle={{
            fontFamily: FONTS?.bold,
            // textAlign:'center',
            // alinItem:'center'
          }}
        />
      </View>
    </View>
  );
};
export default memo(Payment);

// export default Payment;
const styles = StyleSheet.create({
  prefDeliText: {
    fontFamily: FONTS?.medium,
    fontSize: 17,
    color: COLORS.colorPrimary,
    marginStart: 15,
    marginTop: 8,
  },
  divLine: {
    height: 0.5,
    width: '95%',
    backgroundColor: COLORS.gray,
    alignSelf: 'center',
    marginVertical: 5,
  },
});
