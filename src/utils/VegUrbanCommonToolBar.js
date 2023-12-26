import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/Colors';

const VegUrbanCommonToolBar = props => {
  return (
    <View
      style={[
        styles.wrapper,
        {
          ...props?.style,
        },
      ]}>
      <Text
        style={[
          {
            color: COLORS.black,
            // fontFamily: 'OpenSans-Medium',
            fontSize: 18,
            ...props?.textStyle,
          },
        ]}>
        {props.title || ''}
      </Text>
    </View>
  );
};

export default VegUrbanCommonToolBar;

const styles = StyleSheet.create({
  wrapper: {
    height: 56,
    backgroundColor: COLORS.white,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
