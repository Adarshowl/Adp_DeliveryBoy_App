import React, { memo, useContext, useState } from 'react';
import { Image, StyleSheet, Text, View, ImageBackground, Alert } from 'react-native';
import { COLORS } from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ToolBarIcon from '../../utils/ToolBarIcon';
import { STRING } from '../../constants';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { FONTS } from '../../constants/Fonts';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';


const PendingDelivItem = ({
  item,
  onAdd,
  onMinus,
  onDelete,
  onSaveLater,
  fromSave,
  onMarkAsDelivered,
  onSaveRemove,
}) => {
  const [count, setCount] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation('')

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const theme = useContext(themeContext);




  return (
    <View style={{
      flex: 1,
      marginHorizontal: 10,
      marginTop: 10
    }}>
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
            source={{ uri: item?.image }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 50
            }}
          />

        </View>
        <Text style={[styles?.title, {
          color: item?.color
        }]}>{item?.status}</Text>
      </View> */}
      <View
        // activeOpacity={0.8}
        style={[
          styles.wrapper,
          {

          },
        ]}>

        <View
          style={[GlobalStyle.flexRowAlignCenter, {
            // paddingVertical: 5,
            alignItems: 'center',
            // backgroundColor:'#373a43'

          }]}
        >

          <View style={styles.innnerWrapper}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-start',
                    color: COLORS?.black,
                  },
                ]}
                numberOfLines={1}>
                {item?.name}
              </Text>
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-start',
                    color: item?.color,

                  },
                ]}
                numberOfLines={1}>
                {item?.price}
              </Text>

            </View>
            <View
              style={[
                {
                  flexWrap: 'wrap',
                  marginTop: 5
                },
                // GlobalStyle.flexRowAlignCenter,
              ]}>

              <Text
                style={[
                  styles.discountPrice,
                  {
                    // color: COLORS?.black,
                    color: item?.color,
                    // color: theme?.colors?.,
                    marginRight: 5,
                    marginBottom:5

                  },
                ]}>
                {item?.number}
              </Text>


              <Text
                style={[
                  styles.discountPrice,
                  {
                    color: COLORS?.black,

                  },
                ]}>
                {item?.date}
              </Text>

              <Text
                style={[
                  styles.finalPriceText,
                  {
                    color: COLORS?.black,
                  },
                ]}>
                Payment status
              </Text>

              <Text
                style={[
                  styles.discountPrice,
                  {
                    alignSelf: 'flex-start',
                    color: COLORS?.black,

                    // color: theme?.colors?.colorPrimary,
                    marginTop: 3
                  },
                ]}>
                {item?.payStstua}
              </Text>


            </View>

            

          </View>
        </View>

      </View>
      <View style={[styles.buttonContainer, {
        flex: 1
        // backgroundColor: theme?.colors?.bg
        // marginEnd:20,
      }]}>
        <VegUrbanCommonBtn
          height={45}
          width={'49%'}
          // paddingHorizontal={20}
          borderRadius={5}
          textSize={12}
          iconPosition={'left'}
          textColor={theme.colors?.textColor}
          text={('View Detail')}
          icon={
            <MaterialIcons

              name={"event-note"}
              size={18}
              color={theme?.colors?.textColor}
              style={{
                // marginHorizontal: 20,
                marginEnd: 10
              }} />
          }
          borderWidth={2}
          backgroundColor={theme?.colors?.colorimageback}
          // onPress={onCancel}
          onPress={() => {
            navigation.navigate('Order', { item }); 
          }}
          textStyle={{
            fontFamily: FONTS?.bold,
          }}
        />
        <VegUrbanCommonBtn
          height={45}
          width={'49%'}
          borderRadius={5}
          textSize={12}
          textColor={theme.colors?.textColor}
          iconPosition={'left'}
          text={('Mark as Delivered')}
          icon={
            <Feather
              name={"check-circle"}
              size={18}
              color={item?.color}
              style={{
                // marginHorizontal: 20,
                marginEnd: 10
              }} />
          }
          backgroundColor={theme?.colors?.bg}

          onPress={onMarkAsDelivered} // Show the alert when the button is pressed

          style={{

          }}
          textStyle={{
            fontFamily: FONTS?.bold,
          }}
        />
      </View>
    </View>
  );
};

export default memo(PendingDelivItem);
const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    borderRadius: 10,
    // margin: 2,
    backgroundColor: COLORS.white,
    // marginHorizontal: ,
    marginVertical: 8,
    borderRadius: 5,
    borderWidth: 0.2
    // paddingVertical:5
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS?.bold,
    color: COLORS?.black,
    marginStart: 12
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 0,
    justifyContent: 'space-between'

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
    marginBottom:3
  },
  finalPriceText: {
    fontFamily: FONTS?.bold,
    fontSize: 16,
    color: COLORS.colorPrimary,
    // marginBottom:3

    // marginTop: 3,
  },
});
