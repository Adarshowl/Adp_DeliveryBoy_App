import {
  FlatList,
  I18nManager,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import GlobalStyle from "../../styles/GlobalStyle";
import { STRING } from "../../constants";
import VegUrbanCommonToolBar from "../../utils/VegUrbanCommonToolBar";
import ToolBarIcon from "../../utils/ToolBarIcon";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../constants/Colors";
import VegUrbanFloatEditText from "../../utils/EditText/VegUrbanFloatEditText";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import VegUrbanCommonBtn from "../../utils/VegUrbanCommonBtn";
import { ShowToastMessage } from "../../utils/Utility";
import themeContext from "../../constants/themeContext";
import { useTranslation } from "react-i18next";
// import RNRestart from 'react-native-restart';

const AddressAddUpdate = ({navigation}) => {
  const theme = useContext(themeContext);
  const {t} = useTranslation();

  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [landMark, setLandMark] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [city, setCity] = useState(t('select_city'));
  const [area, setArea] = useState(t('select_area'));
  const [addressDefault, setAddressDefault] = useState(false);

  const [addressType, setAddressType] = useState([
    {
      selected: false,
      name: t('home'),
    },
    {
      selected: false,
      name: t('office'),
    },
    {
      selected: false,
      name: t('other'),
    },
  ]);

  const onItemClick = idx => {
    let a = addressType.map((item, index) => {
      let temp = Object.assign({}, item);
      if (index == idx) {
        temp.selected = !temp.selected;
      } else {
        temp.selected = false;
      }
      return temp;
    });

    setAddressType(a);
  };

  const [cityName, setCityName] = useState([
    {city: 'Indore', area: 'bicholi'},
    {city: 'Dewas', area: 'Rm Nagar'},
  ]);

  const [showCityAreaModal, setShowCityAreaModal] = useState(false);
  const [showCity, setShowCity] = useState(true);

  const closeCityAreaModal = () => {
    setShowCityAreaModal(!showCityAreaModal);
  };
  const renderCityAreaItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (showCity) {
            setCity(item?.city);
          } else {
            setArea(item?.area);
          }
          closeCityAreaModal();
        }}
        activeOpacity={0.8}
        style={{
          minHeight: 35,
          width: '90%',
          backgroundColor: theme.colors.toolbar_icon_bg,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          borderRadius: 5,
          marginVertical: 5,
        }}>
        <Text
          style={{
            fontFamily: 'OpenSans-Regular',
            fontSize: 16,
            color: theme.colors.white,

            paddingVertical: 3,
          }}>
          {showCity ? item?.city : item?.area}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderCityAreaModal = () => {
    return (
      <Modal
        visible={showCityAreaModal}
        onRequestClose={() => {
          closeCityAreaModal();
        }}
        style={{
          flexGrow: 1,
        }}
        transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.bg_color,
            margin: 5,
            borderRadius: 10,
          }}>
          {showCity ? (
            <>
              <View style={GlobalStyle.flexRowAlignCenter}>
                <View
                  style={[
                    styles.inputWrapper,
                    {
                      width: '63%',
                      backgroundColor: theme?.colors?.toolbar_icon_bg,
                    },
                  ]}>
                  <Ionicons
                    name={'search'}
                    size={20}
                    color={theme.colors.colorPrimary}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      {
                        textAlign: I18nManager.isRTL ? 'right' : 'left',
                        color: theme.colors.white,
                      },
                    ]}
                    placeholder={STRING.search}
                    placeholderTextColor={theme.colors.white}
                  />
                </View>

                <VegUrbanCommonBtn
                  height={45}
                  width={100}
                  borderRadius={2}
                  textSize={17}
                  textColor={theme.colors.btnTextColor}
                  text={STRING.search}
                  backgroundColor={theme.colors.colorPrimary}
                  onPress={() => {
                    ShowToastMessage('Search');
                    closeCityAreaModal();
                  }}
                  textStyle={{
                    fontFamily: 'OpenSans-Medium',
                  }}
                />
              </View>
              <FlatList data={cityName} renderItem={renderCityAreaItem} />
            </>
          ) : (
            <>
              <View style={GlobalStyle.flexRowAlignCenter}>
                <View
                  style={[
                    styles.inputWrapper,
                    {
                      width: '63%',
                      backgroundColor: theme?.colors?.toolbar_icon_bg,
                    },
                  ]}>
                  <Ionicons
                    name={'search'}
                    size={20}
                    color={theme.colors.colorPrimary}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      {
                        textAlign: I18nManager.isRTL ? 'right' : 'left',
                        color: theme.colors.white,
                      },
                    ]}
                    placeholder={STRING.search}
                    placeholderTextColor={theme.colors.white}
                  />
                </View>

                <VegUrbanCommonBtn
                  height={45}
                  width={100}
                  borderRadius={2}
                  textSize={17}
                  textColor={theme.colors.btnTextColor}
                  text={STRING.search}
                  backgroundColor={theme.colors.colorPrimary}
                  onPress={() => {
                    ShowToastMessage('Search');
                    closeCityAreaModal();
                  }}
                  textStyle={{
                    fontFamily: 'OpenSans-Medium',
                  }}
                />
              </View>
              <FlatList data={cityName} renderItem={renderCityAreaItem} />
            </>
          )}
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme.colors.bg_color_onBoard,
        },
      ]}>
      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme.colors.bg_color_onBoard,
          },
        ]}>
        <ToolBarIcon
          title={Ionicons}
          iconName={'chevron-back'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            backgroundColor: theme.colors.toolbar_icon_bg,
            marginEnd: 10,
          }}
          onPress={() => {
            // RNRestart.restart();
            navigation.goBack();
          }}
        />
        <VegUrbanCommonToolBar
          title={t('address_details')}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
          }}
        />
      </View>
      <ScrollView>
        <View
          style={[
            GlobalStyle.addUpdateBG,
            {
              backgroundColor: theme.colors.bg_color_onBoard,
            },
          ]}>
          {/* <View style={GlobalStyle.marginTop} /> */}
          <VegUrbanFloatEditText
            label={t('name')}
            style={{
              marginTop: 5,
            }}
            value={name}
            onChangeText={value => {
              setName(value);
            }}
            error={''}
          />
          {/* <View style={GlobalStyle.marginTop} /> */}
          <VegUrbanFloatEditText
            label={t('mobile')}
            style={{
              marginTop: 5,
            }}
            value={mobile}
            onChangeText={value => {
              setMobile(value);
            }}
            keyBoardType={'number-pad'}
            error={''}
          />
          <View style={GlobalStyle.marginTop} />

          <VegUrbanFloatEditText
            label={t('address')}
            style={{
              marginTop: 5,
            }}
            value={address}
            onChangeText={value => {
              setAddress(value);
            }}
            error={''}
          />
          <View style={GlobalStyle.marginTop} />

          <VegUrbanFloatEditText
            label={t('landmark')}
            style={{
              marginTop: 5,
            }}
            value={landMark}
            onChangeText={value => {
              setLandMark(value);
            }}
            error={''}
          />
          <View style={GlobalStyle.marginTop} />

          <VegUrbanFloatEditText
            label={t('pincode')}
            style={{
              marginTop: 5,
            }}
            keyBoardType={'number-pad'}
            value={pinCode}
            onChangeText={value => {
              setPinCode(value);
            }}
            error={''}
          />
          <View style={GlobalStyle.marginTop} />

          <View
            style={[
              {
                justifyContent: 'space-between',
                paddingHorizontal: 5,
              },
              GlobalStyle.flexRowAlignCenter,
            ]}>
            <View
              style={{
                width: '48%',
                paddingVertical: 15,
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (!showCity) {
                    setShowCity(true);
                  }
                  closeCityAreaModal();
                }}
                style={[
                  GlobalStyle.flexRowAlignCenter,
                  GlobalStyle.flexRowJustifyBtwn,
                ]}>
                <View>
                  {city == 'Select City' ? null : (
                    <Text
                      style={{
                        fontFamily: 'OpenSans-Medium',
                        paddingEnd: 5,
                        marginStart: 5,
                        fontSize: 12,
                        color: theme.colors.gray,
                      }}
                      numberOfLines={2}>
                      {t('select_city')}
                    </Text>
                  )}
                  <Text
                    style={{
                      fontFamily: 'OpenSans-Regular',
                      paddingEnd: 5,
                      marginStart: 5,
                      fontSize: 15,
                      color: theme.colors.white,
                    }}
                    numberOfLines={2}>
                    {city}
                  </Text>
                </View>
                <FontAwesome
                  name={'caret-down'}
                  size={15}
                  style={{
                    marginEnd: 10,
                  }}
                  color={COLORS.grey}
                />
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 15,
                  borderBottomWidth: 1.5,
                  borderBottomColor: theme.colors.colorPrimary,
                }}
              />
            </View>
            {/*<VegUrbanFloatEditText*/}
            {/*  label={STRING.select_area}*/}
            {/*  style={{*/}
            {/*    marginTop: 5,*/}
            {/*  }}*/}
            {/*  value={area}*/}
            {/*  onChangeText={value => {*/}
            {/*    setArea(value);*/}
            {/*  }}*/}
            {/*  icon={*/}
            {/*    <FontAwesome*/}
            {/*      name={'caret-down'}*/}
            {/*      size={15}*/}
            {/*      style={{*/}
            {/*        marginEnd: 5,*/}
            {/*      }}*/}
            {/*      color={COLORS.grey}*/}
            {/*    />*/}
            {/*  }*/}
            {/*  iconPosition={'right'}*/}
            {/*  boxWidth={'48%'}*/}
            {/*  error={''}*/}
            {/*/>*/}
            <View
              style={{
                marginStart: 10,
                width: '48%',
                paddingVertical: 5,
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (city != 'Select City') {
                    setShowCity(false);
                    closeCityAreaModal();
                  }
                }}
                style={[
                  GlobalStyle.flexRowAlignCenter,
                  GlobalStyle.flexRowJustifyBtwn,
                ]}>
                <View>
                  {area == t('select_area') ? null : (
                    <Text
                      style={{
                        fontFamily: 'OpenSans-Medium',
                        paddingEnd: 5,
                        marginStart: 5,
                        fontSize: 12,
                        color: theme.colors.gray,
                      }}
                      numberOfLines={2}>
                      {t('select_area')}
                    </Text>
                  )}
                  <Text
                    style={{
                      fontFamily: 'OpenSans-Regular',
                      paddingEnd: 5,
                      marginStart: 5,
                      fontSize: 15,
                      color: theme.colors.white,
                    }}
                    numberOfLines={2}>
                    {area}
                  </Text>
                </View>
                <FontAwesome
                  name={'caret-down'}
                  size={15}
                  style={{
                    marginEnd: 10,
                  }}
                  color={COLORS.grey}
                />
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1.5,
                  marginTop: 15,
                  borderBottomColor: theme.colors.colorPrimary,
                }}
              />
            </View>
          </View>
          <View
            style={[
              {
                marginVertical: 15,
                marginHorizontal: 10,
              },
              GlobalStyle.flexRowAlignCenter,
            ]}>
            <FlatList
              data={addressType}
              horizontal={true}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      onItemClick(index);
                    }}
                    style={[
                      {
                        flexGrow: 1,
                        marginStart: index == 0 ? 0 : 20,
                      },
                      GlobalStyle.flexRowAlignCenter,
                    ]}>
                    <MaterialCommunityIcons
                      name={
                        item?.selected ? 'circle-slice-8' : 'circle-outline'
                      }
                      size={22}
                      color={theme.colors.colorPrimary}
                    />
                    <Text
                      style={[
                        GlobalStyle.addUpSelectionText,
                        {
                          color: theme.colors.white,
                        },
                      ]}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setAddressDefault(!addressDefault);
            }}
            style={[
              {
                flex: 1,
                marginHorizontal: 10,
                marginVertical: 15,
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
                },
              ]}>
              {t('set_as_default_address')}
            </Text>
          </TouchableOpacity>

          <VegUrbanCommonBtn
            height={50}
            width={'100%'}
            borderRadius={2}
            textSize={17}
            marginTop={10}
            textColor={theme.colors.btnTextColor}
            text={t('add_new_address') + ' / ' + t('update')}
            backgroundColor={theme.colors.colorPrimary}
            onPress={() => {
              ShowToastMessage('Address add / update success');
              navigation.goBack();
            }}
            textStyle={{
              fontFamily: 'OpenSans-Medium',
            }}
          />
          <View style={GlobalStyle.marginBottom} />
        </View>
      </ScrollView>
      {renderCityAreaModal()}
    </SafeAreaView>
  );
};

export default AddressAddUpdate;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  input: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    paddingStart: 5,
    marginStart: 5,
    flex: 1,
  },
});
