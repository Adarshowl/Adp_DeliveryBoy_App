import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import images from "../../../constants/images";
import GlobalStyle from "../../../styles/GlobalStyle";
import { COLORS } from "../../../constants/Colors";
import FastImage from "react-native-fast-image";
import { STRING } from "../../../constants";
import { useDispatch } from "react-redux";
import { fetchUserData, fetchUserToken } from "../../../redux/actions";
// import FastImage from 'react-native-fast-image';
const Splash = ({ navigation }) => {

  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(async () => {
      await getUserFromStorage();
    }, 2000);
  }, []);

  const getUserFromStorage = async () => {
    try {

      await AsyncStorage.getItem("userData", (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            
            // console.log("vallllllll",(JSON.parse(value)?.data))
            // dispatch(fetchUserData(JSON.parse(value)))
            dispatch(fetchUserData(JSON.parse(value)?.data));
            dispatch(fetchUserToken(JSON.parse(value)?.jwtoken));
            navigation.replace('MainContainer');

          } else {
            navigation.replace('Login');
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  return (
    <View style={[GlobalStyle.mainContainerBgColor, styles.background]}>
      <FastImage style={styles.image} source={images.splash} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  background: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
