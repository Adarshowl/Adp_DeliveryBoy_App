import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { lazy, useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { icons, STRING } from '../constants';
import Home from '../screens/Home';
import themeContext from '../constants/themeContext';
import Ionicons from "react-native-vector-icons/Ionicons";
import Profile from '../screens/Profile';
import { FONTS } from '../constants/Fonts';
import CompletedDelivery from '../screens/CompletedDelivery/Index';
import MyEarning from '../screens/MyEarning/Index';
import Withdrawal from '../screens/Withdrawal/Index';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'

const Tab = createBottomTabNavigator();
const BottomTabNav = () => {
  const theme = useContext(themeContext);


  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: theme?.colors.bg_color_onBoard,
        height: 60,
        paddingTop: 15,
        paddingBottom: 18,
        paddingLeft:5,
        // paddingRight:5
        // borderTopWidth: 0,
      },
      tabBarItemStyle: {},
    }}
    // initialRouteName="Home"
    style={{
      flex: 1,
      alignItems: 'center',
    }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                marginLeft: 5

                // flexGrow: 1,
                // marginLeft: 5

              }}>
              <MaterialCommunityIcons
                name={'view-dashboard-outline'} size={25}
                color={
                  focused ? theme?.colors.colorPrimary : theme?.colors.grey
                } />

              <Text
                style={[
                  styles.text,
                  {
                    color: focused
                      ? theme?.colors.colorPrimary
                      : theme?.colors.textColor,
                    // fontFamily:FONTS?.bold
                    // marginTop: 5
                  },
                ]}>
                Dashboard
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CompletedDelivery"
        component={CompletedDelivery}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                marginLeft: 5

                // flexGrow: 1,                // marginLeft: 5

              }}>
              <MaterialCommunityIcons

                name="truck-minus-outline"
                size={25}
                color={
                  focused ? theme?.colors.colorPrimary : theme?.colors.grey
                }
              />
              <Text
                numberOfLines={1}

                style={[
                  styles.text,
                  {
                    color: focused
                      ? theme?.colors.colorPrimary
                      : theme?.colors.textColor,
                  },
                ]}>
                My Delivery
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MyEarning"
        component={MyEarning}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                marginLeft: 5

                // flexGrow: 1,
              }}>
              {/* <FontAwesome name={'dollar'} size={20} color={theme?.colors?.grey} /> */}
              <Feather
                name="dollar-sign"
                // name={focused ? 'dollar-sign' : 'dollar-sign'}
                size={25}
                color={
                  focused ? theme?.colors.colorPrimary : theme?.colors.grey
                }
              />
              <Text
                numberOfLines={1}
                style={[
                  styles.text,
                  {
                    color: focused
                      ? theme?.colors.colorPrimary
                      : theme?.colors.textColor,
                  },
                ]}>
                My Earning
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Withdrawal"
        component={Withdrawal}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                marginLeft: 5

                // flexGrow: 1,
                // marginLeft: 10

              }}>
              <Ionicons
                // name={focused ? 'wallet' : 'wallet-outline'}
                name="wallet-outline"
                size={25}
                color={
                  focused ? theme?.colors.colorPrimary : theme?.colors.grey
                }

              />
              <Text
                numberOfLines={1}
                style={[
                  styles.text,
                  {
                    color: focused
                      ? theme?.colors.colorPrimary
                      : theme?.colors.textColor,
                  },
                ]}>
                Withdrawal
              </Text>
            </View>
          ),
        }}
      />

      {/* <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
              }}>
              <AntDesign
                name="user"
                // name={focused ? 'heart' : 'hearto'}
                size={22}
                color={
                  focused ? theme?.colors.colorPrimary : theme?.colors.grey
                }
              />
              <Text
                style={[
                  styles.text,
                  {
                    color: focused
                      ? theme?.colors.colorPrimary
                      : theme?.colors.textColor,
                  },
                ]}>
                Profile
              </Text>
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',

                // flexGrow: 1,
                // marginLeft: 5
                marginEnd:10

              }}>
              <AntDesign
                // name={focused ? 'wallet' : 'wallet-outline'}
                name="user"
                size={25}
                color={
                  focused ? theme?.colors.colorPrimary : theme?.colors.grey
                }

              />
              <Text
                numberOfLines={1}
                style={[
                  styles.text,
                  {
                    color: focused
                      ? theme?.colors.colorPrimary
                      : theme?.colors.textColor,
                  },
                ]}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNav;

const styles = StyleSheet.create({
  text: {
    fontSize: 11,
    marginTop: 3,
    fontFamily: FONTS?.regular,
  },
});
