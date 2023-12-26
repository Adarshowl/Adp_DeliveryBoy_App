import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { I18nManager, LogBox, Text, View } from 'react-native';
import Splash from './src/screens/Auth/Splash';
import RNRestart from 'react-native-restart';

import AppColors from './src/constants/AppColors';
import Theme from './src/screens/Theme';
import { STRING } from './src/constants';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from './src/constants/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerNav from './src/navigation/DrawerNav';
import './src/assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import configureStore from './src/redux/store/configureStore';

import { Provider } from 'react-redux';

import PendingDelivery from './src/screens/PendingDelivery/Index';
import CancelledDelivery from './src/screens/CancelledDelivery/Index';
import MyCollection from './src/screens/MyCollection/Index';
import CompletedDelivery from './src/screens/CompletedDelivery/Index';
import MyEarning from './src/screens/MyEarning/Index';
import Order from './src/screens/Order';
import PendingDeliveryList from './src/screens/PendingDelivery/PendingDeliveryList';
import ListData from './src/screens/PendingDelivery/ListData';
import AssignedDelivery from './src/screens/PendingDelivery/AssignedDelivery';
import OnTheWayDelivery from './src/screens/PendingDelivery/OnTheWayDelivery';
import RequestToCancel from './src/screens/CancelledDelivery/RequestToCancel';
import Notification from './src/screens/Notification/Index';
import NotificationDetails from './src/screens/Notification/NotificationDetails';
import OrderDetails from './src/screens/Order/OrderDetails';
import Withdrawal from './src/screens/Withdrawal/Index';
import AddBalance from './src/screens/Withdrawal/AddBalance';
import Bank from './src/screens/Bank/Index';
import UpdateBank from './src/screens/Bank/UpdateBank';
import CreateBank from './src/screens/Bank/CreateBank';
import ReturnOrder from './src/screens/ReturnOrder/Index';


const Login = lazy(() => import('./src/screens/Auth/Login'));
const Profile = lazy(() => import('./src/screens/Profile/index'));
const store = configureStore();


LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);
const Stack = createNativeStackNavigator();

export const languageRestart = async () => {
  //changing language based on what was chosen
  //   if (//selected language is LTR) {
  //     if (I18nManager.isRTL) {
  //       await I18nManager.forceRTL(false);
  //     }
  // } else {
  if (!I18nManager.isRTL) {
    await I18nManager.forceRTL(true);
  } else if (I18nManager.isRTL) {
    await I18nManager.forceRTL(false);
  }
  // }
  RNRestart.restart();
};

const Auth = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: I18nManager.isRTL ? 'slide_from_left' : 'slide_from_right',
      }}
      initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
    </Stack.Navigator>
  );
};

const App = () => {
  if (!__DEV__) {
    console.log = () => { };
    console.info = () => { };
    console.warn = () => { };
    console.debug = () => { };
    console.error = () => { };
  }
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    getUserFromStorage();
    const listener = EventRegister.addEventListener(STRING.app_theme, data => {
      setDarkMode(data);
      AsyncStorage.setItem(STRING.app_theme, data + '');
    });
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, [darkMode]);

  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem(STRING.app_theme, (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            if (value == 'true') {
              setDarkMode(true);
            } else {
              setDarkMode(false);
            }
          } else {
          }
        }
      });
      await AsyncStorage.getItem(STRING.app_lang, (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            STRING.APP_LANGUAGE = value;
            changeLanguage(value);
          } else {
            STRING.APP_LANGUAGE = 'en';
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };
  const { t, i18n } = useTranslation();

  const [currentLanguage, setLanguage] = useState('en');
  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };
  return (
    <Provider store={store}>

      <themeContext.Provider value={darkMode ? AppColors.dark : AppColors.light}>
        <Suspense
          fallback={
            <View>
              <Text>Loading...</Text>
            </View>
          }>
          <NavigationContainer
            // theme={STRING.APP_THEME == 'dark' ? AppColors.dark : AppColors.light}>
            theme={darkMode ? AppColors.dark : AppColors.light}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animation: I18nManager.isRTL
                  ? 'slide_from_left'
                  : 'slide_from_right',
                statusBarAnimation: 'slide',
                statusBarColor: darkMode
                  ? AppColors.dark.colors.transparent
                  : AppColors.light.colors.transparent,
                statusBarStyle: 'light',
              }}
            >
              <Stack.Screen name="Auth" component={Auth} />
              {/*<Stack.Screen name="MainContainer" component={BottomTabNav} />*/}
              <Stack.Screen name="MainContainer" component={DrawerNav} />

              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="ReturnOrder" component={ReturnOrder} />

              <Stack.Screen name="PendingDelivery" component={PendingDelivery} />
              <Stack.Screen name="CancelledDelivery" component={CancelledDelivery} />
              <Stack.Screen name="MyCollection" component={MyCollection} />
              <Stack.Screen name="CompletedDelivery" component={CompletedDelivery} />
              <Stack.Screen name="MyEarning" component={MyEarning} />
              <Stack.Screen name="Order" component={Order} />
              <Stack.Screen name="ListData" component={ListData} />
              <Stack.Screen name="Bank" component={Bank} />
              <Stack.Screen name="UpdateBank" component={UpdateBank} />
              <Stack.Screen name="CreateBank" component={CreateBank} />

              <Stack.Screen name="AssignedDelivery" component={AssignedDelivery} />
              {/* <Stack.Screen name="PendingDelivery" component={PendingDelivery} /> */}
              <Stack.Screen name="OnTheWayDelivery" component={OnTheWayDelivery} />


              <Stack.Screen name="PendingDeliveryList" component={PendingDeliveryList} />
              <Stack.Screen name="RequestToCancel" component={RequestToCancel} />
              <Stack.Screen name="Notification" component={Notification} />
              <Stack.Screen name="NotificationDetails" component={NotificationDetails} />
              <Stack.Screen name="OrderDetails" component={OrderDetails} />
              <Stack.Screen name="Withdrawal" component={Withdrawal} />
              <Stack.Screen name="AddBalance" component={AddBalance} />


            </Stack.Navigator>
          </NavigationContainer>
        </Suspense>
      </themeContext.Provider>
    </Provider>

  );
};

export default App;
