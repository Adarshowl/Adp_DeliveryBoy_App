import React, { memo, useContext, useState } from 'react';
import { Image, StyleSheet, Text, View, ImageBackground ,TouchableOpacity} from 'react-native';
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


const MyCollactionList = ({
  item,  
}) => {
  const [count, setCount] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
const navigation = useNavigation('')
  const theme = useContext(themeContext);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate('Order')
      }}
      style={[
        styles.wrapper,
        {
          // backgroundColor: '#F2F3F4',
        //   elevation: 5,
        //   backgroundColor: theme?.colors?.bg
          // backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      <View
        style={[GlobalStyle.flexRowAlignCenter, {
          paddingVertical: 5,
          alignItems: 'center',
          // backgroundColor:'#373a43'
        //   backgroundColor: theme?.colors?.bg

        }]}
      >
       
        <View style={styles.innnerWrapper}>

        <View
            style={[
              {
                flexWrap: 'wrap',
                // marginTop: 5
              },
              // GlobalStyle.flexRowAlignCenter,
            ]}>
            
    
           <Text
              style={[
                styles.textName,
                {
                  alignSelf: 'flex-start',
                  color: theme?.colors?.white,
                },
              ]}
              numberOfLines={1}>
              {item?.number}
            </Text>
          
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
             <Text
              style={[
                styles.textName,
                {
                  color: theme?.colors?.white,
                  marginTop:3
                },
              ]}>
            {item?.date}
            </Text>
            <Text
              style={[
                styles.textName,
                {
                  alignSelf: 'flex-start',
                  color:COLORS?.black,
                  fontFamily:FONTS?.bold
                 
                },
              ]}
              numberOfLines={1}>
              {item?.price}
            </Text>

          </View>
        
         
        
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(MyCollactionList);
const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    borderRadius: 10,
    // margin: 2,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth:0.2
    // paddingVertical:5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    alignItems: 'center',
    borderRadius: 10

  },
  innnerWrapper: {
    flex: 1,
    marginStart: 10,
    marginTop: 0
  },
  textName: {
    fontFamily: FONTS?.regular,
    fontSize: 14,
    color: COLORS.black,
  },
  
});
