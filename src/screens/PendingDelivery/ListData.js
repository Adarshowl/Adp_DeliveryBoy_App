import React, { useState } from 'react';
import { View, Text, Button,StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AssignedDelivery from './AssignedDelivery';
import PickedList from './PickedList';
import OnTheWayDelivery from './OnTheWayDelivery';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { COLORS } from '../../constants/Colors';
import themeContext from '../../constants/themeContext';
import {FONTS} from '../../constants/Fonts'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useContext } from 'react';

const Tab = createBottomTabNavigator();

const ListData = () => {

  const theme = useContext(themeContext);


  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: COLORS?.white,
        minHeight: 60,
        paddingTop: 15,
        paddingBottom: 18,
        borderTopWidth: 0,
      },
      tabBarItemStyle: {},
    }}
    >
      <Tab.Screen name="AssignedDelivery" component={AssignedDelivery} 
       options={{
        unmountOnBlur: true,
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              alignItems: 'center',
            }}>
          <FontAwesome5
          name={'running'} size={20} 
          color={
            focused ? COLORS?.assigned : COLORS?.black

          }            />
    
            <Text
                style={[
                  styles.text,
                  {
                    color: focused
                      ? COLORS?.assigned 
                      : COLORS?.black ,
                      // fontFamily:FONTS?.bold
                      marginTop:5
                  },
                ]}>
                  Assigned
              </Text>
           
          </View>
        ),
      }}
      />
      <Tab.Screen name="PickedList" component={PickedList}
       options={{
        unmountOnBlur: true,
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              alignItems: 'center',
            }}>
          <MaterialIcons
          name={'wheelchair-pickup'} size={20} 
          color={
            focused ? COLORS?.picked : COLORS?.black
          }            />
    
            <Text
                style={[
                  styles.text,
                  {
                    color: focused
                    ? COLORS?.picked 
                    : COLORS?.black ,
                      // fontFamily:FONTS?.bold
                      marginTop:5
                  },
                ]}>
                  Pickedup
              </Text>
           
          </View>
        ),
      }}
      />
      {/* <Tab.Screen name="OnTheWayDelivery" component={OnTheWayDelivery}
       options={{
        tabBarLabel: 'On the Way',
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialIcons name={focused ? 'hourglass-empty' : 'hourglass-empty'} size={size} color={color} />
        ),
      }}
      /> */}
       <Tab.Screen
        name="OnTheWayDelivery"
        component={OnTheWayDelivery}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
              }}>
            <MaterialIcons
            name={'hourglass-empty'} size={20} 
            color={
              focused ? COLORS?.ontheway : COLORS?.black
            }            />
      
              <Text
                  style={[
                    styles.text,
                    {
                      color: focused
                      ? COLORS?.ontheway 
                      : COLORS?.black ,
                        // fontFamily:FONTS?.bold
                        marginTop:5
                    },
                  ]}>
                    On The Way
                </Text>
             
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default ListData;
const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    marginTop: 2,
    fontFamily:FONTS?.bold
  },
});