import React, { useContext, useRef, useState, useEffect } from 'react';
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
  TextInput,
  ImageBackground,
  ActivityIndicator,
  PermissionsAndroid,

} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Snackbar from 'react-native-snackbar';
import { FONTS } from '../../../constants/Fonts';

import { SIZES } from '../../../constants';
import ImagePicker from 'react-native-image-crop-picker';

import icons from '../../../constants/icons';
import { requestExternalWritePermission } from '../../../utils/RequestUserPermission';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
// import Fontisto from 'react-native-vector-icons/Fontisto'
import { images } from '../../../constants';
import { COLORS } from '../../../constants/Colors';
import { STRING } from '../../../constants';
import Octicons from 'react-native-vector-icons/Octicons';
import { CheckBox } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Zocial from 'react-native-vector-icons/Zocial'
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
import { ShowToastMessage } from '../../../utils/Utility';
import themeContext from '../../../constants/themeContext';
import '../../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
// import {useDispatch} from 'react-redux';
import {
  ShowConsoleLogMessage,
  validateFieldNotEmpty,
} from '../../../utils/Utility';

const SignUp = ({ navigation }) => {
  const theme = useContext(themeContext);
  const { t, i18n } = useTranslation();

  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [refer, setRefer] = useState('');
  const [terms, setTerms] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPwd, setConfirmPwd] = useState('');
  const [addressDefault, setAddressDefault] = useState(false);
  const [username, setUserName] = useState("")

  const [code, setCode] = useState('');
  // const [focused, setFocused] = useState(false);
  const phoneInput = useRef(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [showConfirmOtp, setShowConfirmOtp] = useState(false);

  // const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showAfter, setShowAfter] = useState(false);
  const [focused, setFocused] = React.useState(false);
  const [focused2, setFocused2] = React.useState(false);

  const error = ""

  const getBorderWidth = () => {
    if (error) {
      return 1;
    }
    if (focused) {
      return 1;
    } else {
      return 0.2;
    }
  };

  const getBorderColor = () => {
    if (error) {
      return COLORS.red;
    }

    if (focused) {
      return theme?.colors?.colorPrimary;
    } else {
      return COLORS.bg_color;
    }
  };

  const getBgColor = () => {
    if (error) {
      return COLORS.red;
    }
    if (focused) {
      return theme?.colors?.bg;

      // return theme?.colors?.bg_color;
    } else {
      // return COLORS.lightest_gray1;
      // return COLORS.bg_color;
      return theme?.colors?.bg;

    }
  };
  const getBorderWidth2 = () => {
    if (error) {
      return 1;
    }
    if (focused2) {
      return 1;
    } else {
      return 0.2;
    }
  };

  const getBorderColor2 = () => {
    if (error) {
      return COLORS.red;
    }

    if (focused2) {
      return theme?.colors?.colorPrimary;
    } else {
      return COLORS.bg_color;
    }
  };

  const getBgColor2 = () => {
    if (error) {
      return COLORS.red;
    }
    if (focused2) {
      return theme?.colors?.bg;
    } else {
      // return COLORS.lightest_gray1;
      // return COLORS.bg_color;
      return theme?.colors?.bg;

    }
  };
  const closeSignUpModal = () => {
    setShow(!show);
  };


  const isEmailValid = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const isPasswordValid = (password) => {

    return password.length >= 6;
  };
  const isUsernameValid = (username) => {

    return username.length >= 6;
  };

  const handleButtonPress = () => {
    if (isEmailValid(email) && isPasswordValid(password) && isUsernameValid(username)) {
      if (password === ConfirmPwd) {
        // Passwords match and meet the minimum length requirement (6 characters)
        // Proceed to the next step or action, e.g., navigate to 'MainContainer'
        navigation.navigate('MainContainer');
      } else {
        // Passwords do not match
        Snackbar.show({
          text: 'Passwords do not match',
          duration: Snackbar.LENGTH_LONG,
        });
      }
    } else {
      if (!isEmailValid(email)) {
        Snackbar.show({
          text: 'Invalid Email',
          duration: Snackbar.LENGTH_LONG,
        });
      }
      if (!isPasswordValid(password)) {
        Snackbar.show({
          text: 'Invalid Password',
          duration: Snackbar.LENGTH_LONG,
        });
      }
      if (!isUsernameValid(username)) {
        Snackbar.show({
          text: 'Invalid username',
          duration: Snackbar.LENGTH_LONG,
        });
      }
    }
  };
  // const handleButtonPress = () => {
  //   if (isEmailValid(email)) {
  //     navigation.navigate('MainContainer')
  //     // Email is valid, proceed to the next step or action
  //     // For example, navigate to 'ForgotPageNext'
  //   } else {
  //     // Email is not valid, show an error message
  //     ShowToastMessage('Invalid Email', 'Please enter a valid email address.');
  //   }
  // };
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeToggle = () => {
    setRememberMe(!rememberMe);
  };
  const [showCameraModal, setShowCameraModal] = useState(false);

  const openImageCamera = () => {
    ImagePicker.openCamera({
      multiple: false,
      cropping: true,
    }).then(images => {
      // const updatedUserData = { ...userData, profile_img: images.path };
      // setUserData(updatedUserData);
      setImage(images.path);
      setShowCameraModal(false);
    });
  };
  const [loading, setLoading] = useState(false)

  // const dispatch = useDispatch()
  // const userData = useSelector(state => state.state?.userData);

  useEffect(() => {
    let permission = requestExternalWritePermission();
    setHavePermission(permission);
    // setImage(icons.img_place)

    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs camera permission',
            },
          );
          // If WRITE_EXTERNAL_STORAGE Permission is granted
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
          alert('Write permission err', err);
        }
        return false;
      } else {
        return true;
      }
    };
    requestCameraPermission()
  }, []);


  useEffect(() => {
    // getUserFromStorage();
    // setTimeout(async () => {
    //   await getUserFromStorage();
    // }, 0); 
  }, []);
  // const [userData, setUserData] = useState({});
  const [havePermission, setHavePermission] = useState(false);

  const openImagePicker = () => {
    try {
      ImagePicker.openPicker({
        multiple: false,
        cropping: true,
      }).then(images => {
        setImage(images.path);
      });
    } catch (error) {
      ShowConsoleLogMessage('Image picker error => ' + JSON.stringify(error));
    }
  };
  const [image, setImage] = useState(null);
  const renderCameraModal = () => {
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={showCameraModal}
        onRequestClose={() => {
          setShowCameraModal(false);
        }}
        style={{
          flexGrow: 1,
        }}>
        <View
          style={{
            backgroundColor: '#00000090',
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setShowCameraModal(false);
            }}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          />
          <View
            style={{
              maxHeight: SIZES.height * 0.7,
              backgroundColor: COLORS.white,
            }}>
            <View style={styles.activityIndicatorWrapper}>
              <View
                style={[
                  GlobalStyle.flexRowAlignCenter,
                  GlobalStyle.paddingVertical10,
                  GlobalStyle.paddingHorizontal15,
                ]}>
                <Text
                  style={[
                    styles.label,
                    {
                      marginTop: 0,
                      flex: 1,
                    },
                  ]}>
                  Choose file
                </Text>
                <Ionicons
                  name={'close'}
                  color={COLORS.black}
                  size={25}
                  onPress={() => setShowCameraModal(false)}
                />
              </View>
              <View
                style={{
                  height: 0.5,
                  width: '100%',
                  backgroundColor: COLORS?.gray,
                }}
              />

              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  marginVertical: 25,
                }}>
                <TouchableOpacity
                  style={styles.pickerStyle}
                  onPress={() => {
                    setShowCameraModal(false);
                    if (havePermission) {
                      openImageCamera();
                    } else {
                      ShowToastMessage('Please provide camera permission');
                    }
                  }}>
                  <Ionicons name={'camera'} color={COLORS.primary} size={30} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.pickerStyle}
                  onPress={() => {
                    // setShowCameraModal(false);
                    openImagePicker();
                    setShowCameraModal(false);
                  }}>
                  <Foundation name={'photo'} color={COLORS.primary} size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };


  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainer,
        {
          // backgroundColor: theme?.colors?.colorPrimary,
        },
      ]}>
      <ScrollView>
        {/* <Ionicons
        name="ios-arrow-back"
        color={COLORS.white}
        size={25}
        style={[
          styles.backIcon,
          {
            opacity: !show ? 1 : 0.0,
            transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
          },
        ]}
        onPress={() => {
          navigation.goBack();
          // ShowToastMessage('Coming Soon!');
        }}
      /> */}
        {/* <Image source={images.app_logo} style={styles.app_logo} /> */}
        <View
          style={[
            GlobalStyle.loginModalBg,
            {
              // alignItems: 'center',
              // paddingHorizontal: 15,
              backgroundColor: theme.colors?.bg_color_onBoard,

            },
          ]}>
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
              },
            ]}
            onPress={() => {
              navigation.goBack();
              // ShowToastMessage('Coming Soon!');
            }}
          />

          <Text
            style={[
              styles.heading,
              {
                marginTop: 15,
                color: theme.colors.textColor,
                marginBottom: 40,
                fontFamily: FONTS?.bold
              },
            ]}>
            {!show ? t('Fill Your Profile') : ' '}
          </Text>

          <VegUrbanEditText
            placeholder={STRING.username}
            // label={STRING.email}
            iconPosition={'left'}
            value={username}
            icon={
              <FontAwesome name={"user-o"}
                size={20}
                color={theme?.colors?.grey}
                style={{
                  marginHorizontal: 15
                }} />
              // <Octicons
              //   name={'check-circle'}
              //   size={20}
              //   style={{
              //     marginHorizontal: 10,
              //   }}
              // />
            }
            style={{
              color: theme?.colors?.white

            }}
            keyBoardType={'email-address'}
            onChangeText={v => setUserName(v)}
          />
          <VegUrbanEditText
            placeholder={STRING.email}
            // label={STRING.email}
            iconPosition={'left'}
            value={email}
            style={{
              color: theme?.colors?.white

            }}
            icon={
              <Fontisto name={"email"} size={20}
                color={theme?.colors?.grey}

                // color={COLORS.primary}
                style={{
                  marginHorizontal: 15
                }} />
              // <Octicons
              //   name={'check-circle'}
              //   size={20}
              //   style={{
              //     marginHorizontal: 10,
              //   }}
              // />
            }
            keyBoardType={'email-address'}
            onChangeText={v => setEmail(v)}
          />
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
              // elevation: getElevation(),
            },
            ]}

          >
            {/* Left side lock icon */}
            <SimpleLineIcons
              name="lock"
              size={20}
              color={theme?.colors?.grey}
              style={{
                paddingLeft: 16,

              }}
            />
            {/* TextInput */}
            <TextInput
              placeholderTextColor={theme?.colors?.textColor}
              textAlign={I18nManager.isRTL ? 'right' : 'left'}

              placeholder={STRING?.pwd}
              secureTextEntry={!showOtp}
              value={password}
              onChangeText={(v) => setPassword(v)}
              style={{
                flex: 1,
                paddingLeft: 18,
                color: theme?.colors?.textColor,
                fontFamily:FONTS?.regular


              }}
              onFocus={() => {
                setFocused(true);
              }}
              onBlur={() => {
                setFocused(false);
              }}
            />
            {/* Right side eye icon */}
            <TouchableOpacity
              onPress={() => setShowOtp(!showOtp)}
            >
              <Octicons
                name={showOtp ? 'eye' : 'eye-closed'}
                size={20}
                // onPress={() => setShowOtp(!showOtp)}
                color={theme?.colors?.grey}
                style={{
                  paddingEnd: 5
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[styles.textView,
            {
              borderColor: getBorderColor2(),
              // flexDirection: getFlexDirection(),
            },
            {
              shadowOffset: {
                width: 3,
                height: 3,
              },
            },
            {
              backgroundColor: getBgColor2(),
              borderWidth: getBorderWidth2(),

              borderRadius: 12,
              // elevation: getElevation(),
            },
            ]}

          >
            {/* Left side lock icon */}
            <SimpleLineIcons
              name="lock"
              size={20}
              color={theme?.colors?.grey}
              style={{
                paddingLeft: 16,

              }}
            />
            {/* TextInput */}
            <TextInput
              textAlign={I18nManager.isRTL ? 'right' : 'left'}

              placeholder={STRING?.ConfirmPwd}
              secureTextEntry={!showConfirmOtp}
              value={ConfirmPwd}
              placeholderTextColor={theme?.colors?.textColor}

              onChangeText={(v) => setConfirmPwd(v)}
              style={{
                flex: 1,
                paddingLeft: 18,
                color: theme?.colors?.textColor,
                fontFamily:FONTS?.regular


              }}
              onFocus={() => {
                setFocused2(true);
              }}
              onBlur={() => {
                setFocused2(false);
              }}
            />
            {/* Right side eye icon */}
            <TouchableOpacity
              onPress={() => setShowConfirmOtp(!showConfirmOtp)}
            >
              <Octicons
                name={showConfirmOtp ? 'eye' : 'eye-closed'}
                size={20}
                // onPress={() => setShowConfirmOtp(!showConfirmOtp)}
                color={theme?.colors?.grey}
                style={{
                  paddingEnd: 5
                }}
              />
            </TouchableOpacity>
          </View>


          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setAddressDefault(!addressDefault);
            }}
            style={[
              {
                flex: 1,
                marginHorizontal: 25,
                marginVertical: 15,
                marginBottom: 25,
                alinSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center'

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
            {/*<MaterialCommunityIcons*/}
            {/*  name={}*/}
            {/*  size={22}*/}
            {/*  color={COLORS.colorPrimary}*/}
            {/*/>*/}
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
          </TouchableOpacity>
          {/* <Text
          onPress={() => navigation.navigate('ForgotPassword')}
          style={[
            styles.forgot_text,
            {
              color: theme.colors?.textColor,
              // textAlign: 'right',
              // color: "#4B97F2",
              fontWeight: '700'

            },
          ]}>
          {t('Remember Me')}
        </Text> */}

          <View style={{
            // justifyContent:'center',
            // alignSelf:'center',
            alignItems: 'center',
            // textAlign:'center'

          }}>
            <VegUrbanCommonBtn
              height={45}
              width={'100%'}
              borderRadius={20}
              textSize={18}
              fontWeight={'bold'}
              text={('Sign Up')}
              textColor={theme.colors?.btnTextColor}
              backgroundColor={theme.colors?.colorPrimary}
              // onPress={() => {
              //   // closeSignUpModal();
              //   navigation.navigate('MainContainer')
              // }}
              onPress={() => {
                handleButtonPress()
                // navigation.navigate('ForgotPageNext');
              }}
              textStyle={{
                fontFamily: FONTS?.bold
              }}
            />
          </View>
          <View style={{
            //  marginHorizontal:10,
            marginBottom: 20,
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center'
          }}>
            <Text
              style={[
                styles.head,
                {
                  marginLeft: 5,
                  color: theme?.colors?.textColor,
                  fontFamily: FONTS?.regular
                },
              ]}>
              {!show ? t('Already have an account?') : ' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
            >
              <Text

                style={[
                  styles.head,
                  {
                    color: COLORS?.black,
                    marginLeft: 5,
                    fontFamily: FONTS?.bold,
                    color: theme.colors?.textColor,

                  },
                ]}>
                {!show ? t('Sign in') : ' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.line} />
            <Text
              //  style={styles.text}
              style={[
                styles.text,
                {
                  color: theme.colors?.textColor,
                  fontFamily: FONTS?.bold,
                  fontSize: 16,
                  textAlign: 'center',
                },
              ]}>OR</Text>
            <View style={styles.line} />
          </View>
          <Text
            style={[
              styles.head,
              {
                marginLeft: 5,
                fontFamily:FONTS?.regular,
                color: theme?.colors?.textColor
              },
            ]}>
            {!show ? t('Sign Up with social networks') : ' '}
          </Text>
          <View
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
          </View>
          {/* <VegUrbanCommonBtn
          height={50}
          width={'97%'}
          borderRadius={5}
          borderWidth={1}
          marginTop={5}
          borderColor={COLORS.colorPrimary}
          textSize={16}
          textColor={theme.colors?.textColor}
          text={t('continue_as_guest')}
          backgroundColor={theme.colors?.transparent}
          onPress={() => {
            navigation.navigate('MainContainer');
            // languageRestart();
          }}
          textStyle={{
            fontFamily: 'OpenSans-Medium',
            color: COLORS.colorPrimary,
          }}
        /> */}
        </View>
        {renderCameraModal()}

      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  backIcon: {
    // marginTop: 15,
    marginStart: 15,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  pickerStyle: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    height: 60,
    width: 60,
    // flex: 1,
    marginHorizontal: 25,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  heading: {
    textAlign: 'center',
    fontSize: 27,
    color: COLORS.black,
    marginTop: 8,
  },
  heading11: {
    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.gray,
    // fontWeight:'bold',
    marginTop: 8,
  },
  head: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  app_logo: {
    height: 105,
    // resizeMode: 'center',
    alignSelf: 'center',
    width: '25%',
    // marginTop: 30,
    resizeMode: 'cover',
    marginBottom: 30,
    borderRadius: 100,
    padding: 50,
    margin: 20
  },
  forgot_text: {
    fontSize: 14,
    fontFamily: 'OpenSans-Medium',
    color: COLORS.black,
    marginBottom: 30,
    marginStart: 30,
    marginTop: 10
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
  containerRemember: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Center items vertically
    marginVertical: 5,
    marginLeft: 10,
    marginBottom: 20,
    marginHorizontal: 10


  },
  label: {
    // flex: 1, // Expands to fill available space
    // paddingLeft: 10, // Add left padding to the label
    fontSize: 16,
  },
  checkboxContainer: {
    backgroundColor: 'transparent', // Remove the default background color
    borderWidth: 0, // Remove the border
    padding: 0, // Remove padding
    height: 20,
    width: 10,

  },
  container: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Center items vertically
    marginHorizontal: 40,
    marginBottom: 20,
    marginTop: 20
  },
  line: {
    flex: 1, // To make the line expand and fill available space
    height: 0.5, // Adjust the height of the line as needed
    backgroundColor: COLORS?.gray, // Line color
  },
  text: {
    paddingHorizontal: 10, // Add horizontal padding to the text
    fontWeight: 'bold',
    fontSize: 19,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#00000080',
  },
  activityIndicatorWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: 'center',
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
