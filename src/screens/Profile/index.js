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
  FlatList,
  Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import { fetchUserData, fetchUserToken } from '../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import { CommonActions } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import ApiCall from '../../network/ApiCall';
import { API_END_POINTS } from '../../network/ApiEndPoints';
import DatePicker from 'react-native-datepicker'
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Snackbar from 'react-native-snackbar';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SIZES } from '../../constants';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign'
import icons from '../../constants/icons';
import { requestExternalWritePermission } from '../../utils/RequestUserPermission';
import { Picker } from '@react-native-picker/picker';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
// import Fontisto from 'react-native-vector-icons/Fontisto'
import { images } from '../../constants';
import { COLORS } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts'
import { STRING } from '../../constants';
import Octicons from 'react-native-vector-icons/Octicons';
import { CheckBox } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Zocial from 'react-native-vector-icons/Zocial'
import GlobalStyle from '../../styles/GlobalStyle';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanEditText from '../../utils/EditText/VegUrbanEditText'
import VegUrbanFloatEditText from '../../utils/EditText/VegUrbanFloatEditText';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import OtpInputs from 'react-native-otp-inputs';
import PhoneInput from 'react-native-phone-number-input';
import { ShowToastMessage } from '../../utils/Utility';
import themeContext from '../../constants/themeContext';
import '../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  ShowConsoleLogMessage,
  validateFieldNotEmpty,
} from '../../utils/Utility';
import DeliveryBoyProgressBar from '../../utils/DeliveryBoyProgressBar';

const Profile = ({ navigation }) => {
  const theme = useContext(themeContext);
  const { t, i18n } = useTranslation();
  const [date, setDate] = useState('')

  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [show, setShow] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const currentDate = new Date();
  // const [userData, setUserData] = useState({});

  // const userData = useSelector(state => state.state?.userData);
  const userToken = useSelector((state) => state.state?.userToken);
  const userData = useSelector((state) => state.state?.userData);  // console.log(userData)
  console.log("token", userData?.remember_token)


  const convertImageToBase64 = (imageUri) => {
    // console.log(imageUri)
    return new Promise((resolve, reject) => {
      RNFetchBlob.fs.readFile(imageUri, 'base64')
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const [isModalVisible, setModalVisible] = useState(false);

  const genderOptions = [
    { label: 'Other', value: 'Other' },
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];

  const handleGenderChange = (value) => {
    setSelectedGender(value);
    toggleModal();
  };
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setSelectedDate(date);
    hideDatePicker();
  };
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const [selectedGender, setSelectedGender] = useState('Other'); // State variable to store the selected gender

  const [dashboard, setDashBoard] = useState('');
  // console.log("dddd", dashboard?.phone)
  // useEffect(() => {
  //   getAllShop();
  // }, []);

  // const getAllShop = () => {
  //   setLoading(true);
  //   try {

  //     ApiCall('get', null, API_END_POINTS.GET_PROFILE_LIST, {
  //       'Content-Type': 'application/json',
  //       'x-access-token': userData?.jwtoken
  //     }).then(response => {
  //       // console.log("response axios >>> ", JSON.stringify(response));
  //       setDashBoard(response?.data?.data[0])


  //     }).catch(error => {
  //       console.log("error axios -> ", error);
  //     }).finally(() => {
  //       setLoading(false);
  //     });
  //   } catch (error) {
  //     ShowToastMessage(` You selected : ${error.message}`);
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   setTimeout(async () => {
  //     await getUserFromStorage();
  //   }, 0);
  // }, []);

  // const getUserFromStorage = async () => {
  //   try {
  //     await AsyncStorage.getItem('userData', (error, value) => {
  //       // console.log(value, '------------------');
  //       if (error) {
  //       } else {
  //         if (value !== null) {
  //           let tmp = JSON.parse(value)
  //           setUserData(tmp?.data);
  //           // console.log(fetchUserData(JSON.parse(value)))
  //           dispatch(fetchUserData(tmp))
  //           dispatch(fetchUserToken(tmp?.jwtoken))
  //           // getDriverProfile(tmp?.id)
  //         } else {
  //         }
  //       }
  //     });
  //   } catch (err) {
  //     console.log('ERROR IN GETTING USER FROM STORAGE' + err);
  //   }
  // };

  useEffect(() => {
    if (userData) {
      setUserName(userData.name);
      setAddress(userData.address);
      setPhone(String(userData.phone));
      setImage(userData.image);
    }
  }, [userData]);

  const [name, setUserName] = useState("");
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');


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

  const dispatch = useDispatch()


  useEffect(() => {

    let permission = requestExternalWritePermission();
    setHavePermission(permission);
    setImage(userData?.data?.image)

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



  const [havePermission, setHavePermission] = useState(false);


  // const openImagePicker = () => {
  //   try {
  //     ImagePicker.openPicker({
  //       multiple: false,
  //       cropping: true,
  //     }).then(images => {
  //       // Convert the selected image to base64
  //       RNFetchBlob.fs.readFile(images.path, 'base64')
  //         .then((data) => {
  //           // Set the base64 image in your state
  //           setImage(`data:image/jpeg;base64,${data}`);
  //         })
  //         .catch((error) => {
  //           ShowConsoleLogMessage('Error converting image to base64: ' + error);
  //         });
  //     });
  //   } catch (error) {
  //     ShowConsoleLogMessage('Image picker error => ' + JSON.stringify(error));
  //   }
  // };

  const openImagePicker = () => {
    try {
      ImagePicker.openPicker({
        multiple: false,
        cropping: true,
        freeStyleCropEnabled: true,
        compressImageQuality: 0.4,
        forceJpg: true,
        includeBase64: true,
      }).then(images => {

        setImage('data:image/jpeg;base64,' + images.data);
        // setImage(images.data);
      });
    } catch (error) {
      ShowConsoleLogMessage('Image picker error => ' + JSON.stringify(error));
    }
  };
  const uploadPhotos = async () => {
    setLoading(true);


    try {

      const body = {
        name: name,
        phone: phone,
        address: address,
        image: image
      };

      // Make sure API_END_POINTS.UPDATE_PROFILE is correctly defined
      ShowConsoleLogMessage(API_END_POINTS.PROFILE_UPDATE);
      console.log("body", body);

      try {
        const response = await ApiCall('post', body, API_END_POINTS.PROFILE_UPDATE, {
          'Content-Type': 'application/json',
          'x-access-token': userToken || userData?.remember_token,
        });

        ShowConsoleLogMessage("update profile response -> " + JSON.stringify(response));

        if (response.data && response.data.status === true) {
          await AsyncStorage.setItem('userData', JSON.stringify(response?.data));

          ShowToastMessage(response?.data?.success);

          const updatedData = response?.data?.data;
          setUserName(updatedData?.name);
          setPhone(updatedData?.phone);
          setAddress(updatedData?.address);
          setImage(updatedData?.image);

          dispatch(fetchUserData(updatedData));
          navigation.goBack('MainContainer');
          // getUserProfile();
          // setUserName(updatedData?.name);
          // setAddress(updatedData?.address);
          // setPhoneNo(updatedData?.seller_phone);
          // setImage(updatedData?.image);
          // dispatch(fetchUserData(response?.data));

          // ShowToastMessage(response?.data?.message);

          // navigation.goBack('Profile');
          ShowToastMessage('Profile Updated successful')


          getUserProfile();
        } else {
          // ShowToastMessage(response?.data?.message);
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
        }
      } catch (error) {
        console.error('Error making API call:', error);
        // ShowToastMessage('An error occurred during profile update.');
      }
    } catch (error) {
      ShowToastMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  const uploadPhotos11 = async () => {
    setLoading(true);
    const params = new FormData();
    params.append('name', name);
    params.append('address', address + '');
    params.append('phone', phone + '');
    if (phone.length !== 10) {
      // Check if the phone number is not 10 digits
      setLoading(false);
      ShowToastMessage('Mobile number must be 10 digits');
      return; // Don't proceed with the API call
    }
    if (image == null) {
      params.append('image', '');
    } else if (image != 'null') {
      params.append('image', image);
    } else {
      params.append('image', '');
    }

    try {
      const response = await ApiCall('post', params, API_END_POINTS.PROFILE_UPDATE, {
        'Content-Type': 'multipart/form-data',
        'x-access-token': userToken || userData?.remember_token,
      });

      // if (response?.data?.status === true) {
      //   await AsyncStorage.setItem('userData', JSON.stringify(response?.data));

      //   ShowToastMessage(response?.data?.success);

      //   const updatedData = response?.data?.data;
      //   setUserName(updatedData?.name);
      //   setPhone(updatedData?.phone);
      //   setAddress(updatedData?.address);
      //   setImage(updatedData?.image);

      //   dispatch(fetchUserData(updatedData));
      //   navigation.goBack('MainContainer');
      // } else {
      //   // navigation.goBack('MainContainer');
      //   if (response?.data?.message === "Token Mismatch") {
      //     clearUserToken();
      //   }

      //   ShowToastMessage('profile not update', response?.data?.message);

      //   // Handle API response errors
      // }


      if (response?.statusCode === 200) {
        // console.log("Response data: ", JSON.stringify(response.data));
        await AsyncStorage.setItem('userData', JSON.stringify(response?.data));

        ShowToastMessage(response?.data?.success);

        const updatedData = response?.data?.data;
        setUserName(updatedData?.name);
        setPhone(updatedData?.phone);
        setAddress(updatedData?.address);
        setImage(updatedData?.image);

        dispatch(fetchUserData(updatedData));
        navigation.goBack('MainContainer');

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
    } catch (error) {
      console.log('API Error: ' + JSON.stringify(error));
      // Handle API call error
    } finally {
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
                      fontFamily: FONTS?.bold
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
                  <Ionicons name={'camera'} color={COLORS.black} size={30} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.pickerStyle}
                  onPress={() => {
                    // setShowCameraModal(false);
                    openImagePicker();
                    setShowCameraModal(false);
                  }}>
                  <Foundation name={'photo'} color={COLORS.black} size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const handlePhoneChange = (text) => {
    if (text.length < 10) {
      setErrorMessage('Mobile number requires 10 digits');
    } else {
      setErrorMessage('');
    }
    setPhone(text);
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainer,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      <DeliveryBoyProgressBar loading={loading} />

      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme.colors.bg_color_onBoard,
            elevation: 0,
            alignItems: 'center'
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
              marginStart: 10,
              marginTop: 15
            },
          ]}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <VegUrbanCommonToolBar
          title="Manage Account"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 15,
            fontFamily: FONTS?.bold
          }}
          textStyle={{
            color: theme.colors.white,
            fontFamily: FONTS?.bold,
            fontSize: 18
          }}
        />

      </View>
      <ScrollView>

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

          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              // flexDirection: 'row',
              width: 120,
              marginVertical: 10,
            }}>
            {image ? (
              <ImageBackground
                style={{
                  height: 140,
                  width: 140,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}
              // source={icons.profile_placeholder}
              >
                <Image
                  source={{ uri: image }}
                  style={{
                    height: 100,
                    width: 100,
                    // resizeMode: 'center',
                    borderRadius: 100,
                    alignSelf: 'center',
                  }}
                  PlaceholderContent={
                    <ActivityIndicator
                      color={COLORS.primary}
                      size={'small'}
                    />
                  }
                />
              </ImageBackground>
            ) : (
              <ImageBackground
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                  borderWidth: 0.2,
                  borderColor: COLORS?.gray,
                  // backgroundColor: theme?.colors?.bg
                }}
              // source={icons.profile_placeholder}
              >
                <Image
                  // source={icons.img_place}
                  source={{
                    uri: userData?.image
                    // uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHL03nqSptOCTMXb8ym6QffVTfjk2C14HS-w&usqp=CAU'
                  }}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 100,
                    alignSelf: 'center',
                    // backgroundColor:COLORS?.bg
                  }}
                />
              </ImageBackground>
            )}

            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 10,
                right: 5,
                padding: -6,
                borderRadius: 50,
              }}
              onPress={() => {
                setShowCameraModal(true);
              }}>
              <Image
                source={icons.imagePicker}
                style={{
                  height: 25,
                  width: 25,
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={{
            marginHorizontal: 16
          }}>
            <VegUrbanEditText
              // placeholder={userData?.name}
              label="Name"
              iconPosition={'left'}
              value={name}
              style={{
                color: theme?.colors?.textColor,
                fontFamily: FONTS?.regular

              }}
              keyBoardType={'ascii-capable-number-pad'}
              onChangeText={text => setUserName(text)}
            />
            <VegUrbanEditText
              // placeholder={userData?.address}
              label="Address"
              iconPosition={'left'}
              value={address}
              style={{
                color: theme?.colors?.textColor,
                fontFamily: FONTS?.regular

              }}
              keyBoardType={'name-pad'}
              onChangeText={text => setAddress(text)}
            />
            <VegUrbanEditText
              placeholder={userData?.email}
              label={STRING.email}
              iconPosition={'right'}
              value={userData?.email}
              editable={false}
              style={{
                color: theme?.colors?.textColor,
                fontFamily: FONTS?.regular

              }}
              icon={
                <Fontisto name={"email"}
                  size={20}
                  color={theme?.colors?.grey}
                  style={{
                    paddingEnd: 5
                  }} />

              }
              keyBoardType={'email-address'}
              onChangeText={v => {
                setEmail(v);
                setIsEmailValid(validateEmail(v));
              }} />
            {!isEmailValid && (
              <Text style={{
                color: 'red',
                marginStart: 10,
                fontFamily: FONTS?.regular,
                fontSize: 12
              }}>Please Enter Valid Email</Text>
            )}
            <VegUrbanEditText
              label="Phone"
              maxLength={10}
              iconPosition={'right'}
              value={phone}
              icon={
                <Feather name={"phone"}
                  size={20}
                  color={theme?.colors?.grey}
                  style={{
                    paddingEnd: 5
                  }} />

              }
              style={{
                color: theme?.colors?.textColor,
                fontFamily: FONTS?.regular
              }}
              // maxLength={10}
              keyBoardType={'numeric'}
              // onChangeText={text => {
              //   setPhone(text);
              //   setErrorMessage(handlePhoneChange(text));
              // }}
              onChangeText={text => handlePhoneChange(text)}

            // onChangeText={text => setPhone(text)}
            />
            {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}

            {/* {errorMessage ? (
              <Text style={{
                color: 'red',
                marginStart: 10,
                fontFamily: FONTS?.regular,
                fontSize: 12
              }}>{errorMessage}</Text>
            ) : null} */}
          </View>



          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={toggleModal}
          >
            <View style={styles.modalContainer}>
              <View style={[styles.modalContent, {
                backgroundColor: theme?.colors?.bg
              }]}>
                <FlatList
                  data={genderOptions}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => handleGenderChange(item.value)}
                    >
                      <Text style={[styles.modalText, {
                        color: theme?.colors?.white
                      }]}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.value}
                />
              </View>
            </View>
          </Modal>



        </View>
        {renderCameraModal()}

      </ScrollView>
      <View style={{
        // justifyContent:'center',
        // alignSelf:'center',
        alignItems: 'center',
        marginVertical: 5,
        marginBottom: 80,
        // textAlign:'center'
      }}>
        <VegUrbanCommonBtn
          height={45}
          width={'90%'}
          borderRadius={20}
          textSize={14}
          text={('Update Profile')}
          textColor={COLORS?.white}
          backgroundColor={COLORS?.ontheway}
          onPress={() => {
            // getProfileUpdate();
            uploadPhotos()
          }}
          textStyle={{
            fontFamily: FONTS?.bold
          }}

        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  backIcon: {
    // marginTop: 15,
    marginStart: 15,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  pickerStyle: {
    borderWidth: 1.5,
    borderColor: COLORS.black,
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
    // textAlign: 'center',
    fontSize: 20,
    color: COLORS.black,
    // marginTop: 8,
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
    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.gray,
    // fontWeight:'bold',
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
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginLeft: 10,
    marginBottom: 20,
    marginHorizontal: 10


  },
  label: {

    fontSize: 16,
    color: COLORS?.black

  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    height: 20,
    width: 10,
    flex: 1

  },
  openButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  openButtonText: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 5,
    marginHorizontal: 28,
    marginBottom: 38,
    borderRadius: 10,
    paddingHorizontal: 10

  },
  modalItem: {
    padding: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: 'gray',
  },
  modalText: {
    fontSize: 14,
    fontFamily: FONTS?.regular
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

  selectedGenderText: {
    marginTop: 20,
    fontSize: 18,
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
    width: '91%',
    // borderWidth: 0.2,
    alignSelf: 'center',
    marginVertical: 10,
    paddingHorizontal: 0,
    height: 55,
    // marginHorizontal: 60,
    borderRadius: 12,
    fontFamily: FONTS?.regular,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  picker: {
    // height: 55,
    width: '100%',
  },

});
