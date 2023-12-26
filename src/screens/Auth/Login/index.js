import React, { useContext, useRef, useState } from 'react';
import {
  I18nManager,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';
import { images } from '../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Snackbar from 'react-native-snackbar';
import { FONTS } from '../../../constants/Fonts';
import ApiCall from '../../../network/ApiCall';
import { fetchUserData, fetchUserToken } from '../../../redux/actions';
import { COLORS } from '../../../constants/Colors';
import { API_END_POINTS } from '../../../network/ApiEndPoints';

import { STRING } from '../../../constants';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { CheckBox } from 'react-native-elements';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import GlobalStyle from '../../../styles/GlobalStyle';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanEditText from '../../../utils/EditText/VegUrbanEditText'
import VegUrbanFloatEditText from '../../../utils/EditText/VegUrbanFloatEditText';
import VegUrbanCommonBtn from '../../../utils/VegUrbanCommonBtn';
import OtpInputs from 'react-native-otp-inputs';
import PhoneInput from 'react-native-phone-number-input';
import themeContext from '../../../constants/themeContext';
import '../../../assets/i18n/i18n';
import axios from 'axios';
import {
  ShowConsoleLogMessage,
  ShowToastMessage,
  validateFieldNotEmpty,
} from '../../../utils/Utility';
import { useDispatch } from 'react-redux';


import { useTranslation } from 'react-i18next';
import DeliveryBoyProgressBar from '../../../utils/DeliveryBoyProgressBar';
// import {useDispatch} from 'react-redux';


const Login = ({ navigation }) => {
  const theme = useContext(themeContext);
  const { t, i18n } = useTranslation();
  const [focused, setFocused] = React.useState(false);
  const [focused1, setFocused1] = React.useState(false);

  const error = ""
  const [loading, setLoading] = useState(false)
  const [addressDefault, setAddressDefault] = useState(false);
  const dispatch = useDispatch();

  const getBorderWidth = () => {
    if (error) {
      return 1;
    }
    if (focused) {
      return 0.5;
    } else {
      return 0.2;
    }
  };
  const getBorderWidth1 = () => {
    if (error) {
      return 1;
    }
    if (focused1) {
      return 0.5;
    } else {
      return 0.2;
    }
  };

  const isEmail = (email) => {
    // Regular expression for email validation
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };


  const isPasswordValid = (password) => {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

    const hasLowercase = lowercaseRegex.test(password);
    const hasUppercase = uppercaseRegex.test(password);
    const hasNumber = numberRegex.test(password);
    const hasSpecialCharacter = specialCharacterRegex.test(password);

    // Password is valid if it meets all requirements
    return (
      password.length >= 6 &&
      hasLowercase &&
      hasUppercase &&
      hasNumber &&
      hasSpecialCharacter
    );
  };


  const errorMessage = '';

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [validpwd, setvalidpwd] = useState(true)

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleButtonPress = () => {
    if (isEmail(email) && isPasswordValid(password)) {

      navigation.navigate('MainContainer');
    } else {


      if (!isEmail(email)) {
        Snackbar.show({
          text: 'Invalid Email',
          duration: Snackbar.LENGTH_LONG,
        });
      }
      if (!isPasswordValid(password)) {
        // Show a Snackbar message for an invalid password
        Snackbar.show({
          // text: 'Please enter email and Password',
          duration: Snackbar.LENGTH_LONG, // Use Snackbar.LENGTH_LONG
        });
      }
    }
  };


  const getBorderColor = () => {
    if (error) {
      return COLORS.red;
    }

    if (focused) {
      return COLORS?.white;
    } else {
      return COLORS?.white;
    }
  };
  const getBorderColor1 = () => {
    if (error) {
      return COLORS.red;
    }

    if (focused1) {
      return COLORS?.white;
    } else {
      return COLORS?.white;
    }
  };

  const getBgColor = () => {
    if (error) {
      return COLORS.red;
    }
    if (focused) {
      return COLORS?.backgroundColor;
    } else {
      // return COLORS.lightest_gray1;
      // return COLORS.bg_color;
      return COLORS?.backgroundColor;

    }
  };
  const getBgColor1 = () => {
    if (error) {
      return COLORS.red;
    }
    if (focused1) {
      return COLORS?.backgroundColor;
    } else {
      // return COLORS.lightest_gray1;
      // return COLORS.bg_color;
      return COLORS?.backgroundColor;

    }
  };

  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [show, setShow] = useState(false);


  // const onLoginClick = () => {

  //   const email = 'boy12@gmail.com'; // Set your email value here
  //   const password = '123456';  


  //   if (validateFieldNotEmpty(email)) {
  //     ShowToastMessage('phone is required');
  //   } else if (validateFieldNotEmpty(password)) {
  //     ShowToastMessage('Password is required');
  //   } else {
  //     setLoading(true);
  //     let body = {
  //       email: email,
  //     password: password,
  //     };

  //     ShowConsoleLogMessage(body);
  //     ApiCall('post', body, 'https://masteradmin-zti3.onrender.com/api/admin/delivery-boy/login', {
  //       Accept: 'application/json',
  //       'Content-Type': 'multipart/form-data',
  //       'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzI4NjBjZGU2Y2I2M2QzNTViZGFhNCIsIm5hbWUiOiJNYXN0ZXIgIiwiaWF0IjoxNjk2OTEzMzU2LCJleHAiOjE2OTc1MTgxNTZ9.UebQvMB-sdzVo6LCTKngg0do4KTzrGPgZVVWCIWqGOU'
  //     })
  //       .then(response => {
  //         ShowConsoleLogMessage("login api response -> " + JSON.stringify(response));
  //         if (response?.data?.status == true) {
  //           // AsyncStorage.setItem('userData', String(response?.data?.user?.id));

  //           AsyncStorage.setItem(
  //             'userData',
  //             JSON.stringify(response?.data?.user),
  //           );
  //           setEmail('');
  //           setPassword('');
  //           ShowToastMessage(response?.data?.message);
  //           navigation.navigate('MainContainer');
  //           // getUserProfile(response?.data.user?.id)
  //         } else {
  //           ShowToastMessage(response?.data?.message);
  //         }
  //       })
  //       .catch(error => {
  //         // crashlytics().recordError(error);
  //         ShowToastMessage("api error");
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }
  // };

  const onLoginClick = async () => {
    setLoading(true);
    try {
      const lowerCaseEmail = email.toLowerCase(); 
      if (validateFieldNotEmpty(lowerCaseEmail)) {
        ShowToastMessage('Email is required');
      } else if (validateFieldNotEmpty(password)) {
        ShowToastMessage('Password is required');
      } else {
        const body = {
          email: lowerCaseEmail,
          password: password,
        };
  
        try {
          const response = await ApiCall('post', body, API_END_POINTS.LOGIN, {
            'Content-Type': 'application/json',
          });
  
          if (response.data && response.data.status === true) {
            AsyncStorage.setItem('userData', JSON.stringify(response.data));
            // AsyncStorage.setItem('userToken', response.data.jwtoken);
  
            dispatch(fetchUserData(response.data));
            dispatch(fetchUserToken(response.data.jwtoken));
  
            setEmail('');
            setPassword('');
            ShowToastMessage(response.data.message);
            navigation.navigate('MainContainer');
          } else {
            ShowToastMessage("invalid credentials",
            // response?.data?.message
            );
          }
        } catch (error) {
          // console.error('Error making API call:', error);
          // ShowToastMessage('An error occurred during login.');
        }
      }
    } catch (error) {
      console.error('Error in login process:', error);
      ShowToastMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainer,
        {
          backgroundColor: COLORS?.backgroundColor,
        },
      ]}>

      <DeliveryBoyProgressBar loading={loading} />
      <View style={{
        marginTop: 30
      }}>
        <Image source={images.app_logo} style={styles.app_logo} />

      </View>
      <ScrollView>

        <View
          style={[
            GlobalStyle.loginModalBg,
            {

              backgroundColor: COLORS?.backgroundColor,
            },
          ]}>
          {/* <Ionicons
            name="ios-arrow-back"
            // color={COLORS.black}
            color={theme.colors.textColor}

            size={25}
            style={[
              styles.backIcon,
              {
                opacity: !show ? 1 : 0.0,
                transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
              },
            ]}
            onPress={() => {
              navigation.goBack();
            }}
          /> */}

          <View style={
            {
              marginStart: 15,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10
            }}>
            <Text
              style={[
                styles.heading,
                {
                  marginStart: 10,
                  color: COLORS?.white,
                },
              ]}>
              {!show ? t('Login to') : ' '}
            </Text>
            <Text
              style={[
                styles.heading,
                {
                  color: theme?.colors?.black,
                  marginHorizontal: 10,
                  marginBottom: 30,

                  color: COLORS?.white,
                },
              ]}>
              {!show ? t('Delivery Boy App') : ' '}
            </Text>
          </View>

          {/* </View> */}



          <View

            style={[styles.textView,
            {
              borderColor: getBorderColor1(),
              // flexDirection: getFlexDirection(),
            },
            {
              shadowOffset: {
                width: 3,
                height: 3,
              },
            },
            {
              backgroundColor: getBgColor1(),
              borderWidth: getBorderWidth1(),
              borderRadius: 12,
            },
            ]}

          >
            <FontAwesome
                name={"user-o"}
                size={20}
                color={theme?.colors?.grey}

                // color={theme?.colors?.white}
                style={{
                  paddingLeft:16,

                }} />
            <TextInput
              placeholder="Email"
              placeholderTextColor={COLORS?.white}
              textAlign={I18nManager.isRTL ? 'right' : 'left'}

              value={email}
              onChangeText={v => {
                setEmail(v);
                setIsEmailValid(validateEmail(v)); // Update isEmailValid based on email validity
              }} 
              style={{
                flex: 1,
                paddingLeft: 18,
                color: COLORS?.white,
                fontFamily: FONTS?.regular
              }}
              onFocus={() => {
                setFocused1(true);
              }}
              onBlur={() => {
                setFocused1(false);
              }}
            />
             
          </View>
          {!isEmailValid && (
            <Text style={{
              color: 'red',
              marginStart: 10,
              fontFamily: FONTS?.regular,
              fontSize: 12
            }}>Please Enter Valid Email</Text>
          )}
          <View

            style={[styles.textView,
            {
              borderColor: getBorderColor(),
              // flexDirection: getFlexDirection(),
            },
            {
              shadowOffset: {
                width: 3,
                height: 3,
              },
            },
            {
              backgroundColor: getBgColor(),
              borderWidth: getBorderWidth(),
              borderRadius: 12,
            },
            ]}

          >
            <SimpleLineIcons
              name="lock"
              size={20}
              color={theme?.colors?.grey}
              style={{
                // marginHorizontal: 15,
                paddingLeft: 16,
              }}
            />
            <TextInput
              maxLength={10}
              placeholder={STRING?.pwd}
              secureTextEntry={!showOtp}
              placeholderTextColor={COLORS?.white}
              textAlign={I18nManager.isRTL ? 'right' : 'left'}

              value={password}
              onChangeText={text => {
                setPassword(text);
                // setvalidpwd(isPasswordValid(text)); // Update isEmailValid based on email validity
              }}
              style={{
                flex: 1,
                paddingLeft: 18,
                color: COLORS?.white,
                fontFamily: FONTS?.regular
              }}
              onFocus={() => {
                setFocused(true);
              }}
              onBlur={() => {
                setFocused(false);
              }}
            />
            <TouchableOpacity
              onPress={() => setShowOtp(!showOtp)}
            >
              <Octicons
                name={showOtp ? 'eye' : 'eye-closed'}
                size={20}
                // onPress={() => setShowOtp(!showOtp)}
                // color={COLORS.primary}
                color={theme?.colors?.grey}

                style={{
                  // marginHorizontal: 20,
                  paddingEnd: 5
                }}
              />
            </TouchableOpacity>
          </View>
          {!validpwd && (
            <Text
              numberOfLines={3}
              style={{
                color: 'red',
                marginStart: 10,
                fontFamily: FONTS?.regular,
                fontSize: 13
              }}>Password must contain 8-40 character, 1 uppercase(A-Z) 1 lowercase(e-z),
              1 number(0-9), and a special character except space

            </Text>
          )}

          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setAddressDefault(!addressDefault);
            }}
            style={[
              {
                flex: 1,
                marginHorizontal: 25,
                marginVertical: 30,
                marginBottom: 25,
                alignSelf: 'center',
                marginBottom:40,


              },
              GlobalStyle.flexRowAlignCenter,
            ]}>
            <MaterialCommunityIcons
              name={
                addressDefault ? 'checkbox-marked' : 'checkbox-blank-outline'
              }
              size={22}
              color={theme.colors.colorPrimary}
            />

            <Text
              style={[
                GlobalStyle.addUpSelectionText,
                {
                  color: theme.colors.textColor,
                  fontFamily: FONTS?.bold,
                  // marginBottom:10,
                  marginLeft: 18

                },
              ]}>
              {t('Remember')}
            </Text>
          </TouchableOpacity> */}


          <View style={{
            // justifyContent:'center',
            // alignSelf:'center',
            alignItems: 'center',
            // textAlign:'center'
            marginTop: 50

          }}>
            <VegUrbanCommonBtn
              height={45}
              width={'100%'}
              borderRadius={20}
              textSize={18}
              fontWeight={'bold'}
              text={('Login')}
              borderWidth={1}
              borderColor={COLORS?.white}
              textColor={theme.colors?.btnTextColor}
              backgroundColor={COLORS?.colorPrimary}
              // onPress={() => {
              //   closeSignUpModal();
              // }}
              // onPress={() => {
              //   handleButtonPress()

              // }}
              onPress={() => {
                onLoginClick()
                // if (mobile) {
                // navigation.navigate('MainContainer');
                // } else  {
                //   ShowToastMessage('Please enter mobile number');
                // }
                // languageRestart();
              }}

              textStyle={{
                fontFamily: FONTS?.bold

              }}
            />
          </View>

          {/* <View style={styles.container}>
            <View style={styles.line} />
            <Text

              style={[
                styles.text,
                {
                  alignItems: 'center',
                  textAlign: 'center',

                  fontFamily: FONTS?.bold,
                  color: theme?.colors?.textColor
                },
              ]}>
              {!show ? t('or Continue with') : ' '}
            </Text>
            <View style={styles.line} />
          </View> */}

          {/* <View
            style={{
              paddingVertical: 25,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => ShowToastMessage('FB Login')}
              activeOpacity={0.8}
              style={{
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderWidth: 0.5,
                borderColor: theme?.colors?.bg_color,
                backgroundColor: theme?.colors?.bg_color,
                borderRadius: 15,
                marginHorizontal: 15,
              }}>
              <Image
                source={{
                  uri: 'https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png',
                }}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'cover',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => ShowToastMessage('Google Login')}
              activeOpacity={0.8}
              style={{
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderWidth: 0.5,
                borderColor: theme?.colors?.bg_color,
                backgroundColor: theme?.colors?.bg_color,
                borderRadius: 15,
                marginHorizontal: 15,
              }}>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png',
                }}
                style={{
                  resizeMode: 'center',
                  height: 30,
                  width: 30,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => ShowToastMessage('Apple Login')}
              activeOpacity={0.8}
              style={{
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderWidth: 0.5,
                borderColor: theme?.colors?.bg_color,
                backgroundColor: theme?.colors?.bg_color,
                borderRadius: 15,
                marginHorizontal: 15,
              }}>
              <Image
                source={{
                  uri: 'https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png'
                }}
                style={{
                  height: 30,
                  resizeMode: 'cover',
                  width: 30,
                  tintColor: theme.colors?.white,
                }}
              />
            </TouchableOpacity>

          </View> */}
          <View style={{
            //  marginHorizontal:10,
            marginBottom: 20,
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center'
          }}>

          </View>

        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

export default Login;

const styles = StyleSheet.create({
  backIcon: {
    marginTop: 15,
    marginStart: 15,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  heading: {
    // fontFamily: 'OpenSans-Regular',

    fontFamily: FONTS?.bold,
    // textAlign: 'center',
    fontSize: 30,
    color: COLORS.black,
    // marginTop: 5,

  },
  heading11: {
    fontFamily: FONTS?.regular,

    // fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.gray,
    // fontWeight:'bold',
    marginTop: 8,
  },
  error: {
    color: COLORS.red,
    paddingTop: 4,
    fontSize: 13,
    fontFamily: FONTS?.bold,

    // fontFamily: 'Quicksand-Regular',
  },
  head: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  app_logo: {
    height: 110,
    resizeMode: 'stretch',
    alignSelf: 'center',
    width: '25%',
    // marginTop: 30,
    // // resizeMode: 'cover',
    // marginBottom: 30,
    // borderRadius: 100,
    // padding: 50,
    // margin: 20
  },
  forgot_text: {
    fontSize: 14,
    fontFamily: FONTS?.regular,

    // fontFamily: 'OpenSans-Medium',
    color: COLORS.gray,
    marginBottom: 20,
    marginEnd: 30,
    marginTop: 10

    // marginVertical: 25,
    // flexDirection:'flex-end'
    // textDecorationLine: 'underline',

  },
  resendWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  resendWrapperText: {
    fontFamily: 'OpenSans-Medium',
    color: COLORS.colorPrimary,
    marginStart: 5,
  },
  msg_privacy_terms: {
    color: COLORS.black,
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    flex: 1,
  },
  checkboxContainer: {
    // backgroundColor: 'transparent', // Remove the default background color
    borderWidth: 0, // Remove the border
    padding: 0, // Remove padding
    height: 20,
    width: 10,
    borderColor: COLORS?.black, // Line color


  },
  containerRemember: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Center items vertically
    marginVertical: 5,
    marginLeft: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    alignSelf: 'center',

  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 40,
    marginBottom: 20,
    marginTop: 20,
    // textAlign:'center'

  },
  line: {
    flex: 1,
    height: 0.5,
    backgroundColor: COLORS?.gray,
    alignItems: 'center',
    marginTop: 5
  },
  text: {
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.black,
    // marginTop: 10,  },
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    // borderWidth: 0.2,
    alignSelf: 'center',
    marginVertical: 12,
    // backgroundColor: theme?.colors?.bg_color,
    // borderColor: COLORS?.bg_color,
    // placeholderTextColor:theme?.colors?.textColor,

    // placeholderTextColor: COLORS.editTextBorder,
    paddingHorizontal: 10,
    height: 55,
    marginHorizontal: 0,
    // borderRadius: 10,
    fontFamily: 'Quicksand-Regular',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  }
});
