import React, { useContext } from 'react';
import { Text, TextInput, View } from 'react-native';
import { COLORS } from '../../constants/Colors';
import styles from './styles';
import themeContext from '../../constants/themeContext';
import { FONTS } from '../../constants/Fonts'


const VegUrbanEditText = ({
  onChangeText,
  iconPosition,
  icon,
  style,
  value,
  label = '',
  error,
  star,
  keyBoardType,
  maxLength,
  secureTextEntry,
  backgroundColor,
  borderWidth,
  borderRadius,
  borderColor,
  borderBottomWidth,
  borderBottomColor,
  placeholder,
  height,
  ...props
}) => {
  const [focused, setFocused] = React.useState(false);
  const theme = useContext(themeContext);

  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === 'left') {
        return 'row';
      } else if (iconPosition === 'right') {
        return 'row-reverse';
      }
    }
  };
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

  const getBorderColor = () => {
    if (error) {
      return COLORS.red;
    }

    if (focused) {
      return COLORS?.black;
    } else {
      return COLORS.black;
    }
  };

  const getBgColor = () => {
    if (error) {
      return COLORS.red;
    }
    if (focused) {
      return COLORS?.white;
    } else {
      // return COLORS.lightest_gray1;
      // return COLORS.bg_color;
      return COLORS?.white;

    }
  };
  const getShadowColor = () => {
    if (error) {
      return COLORS.red;
    }

    if (focused) {
      return COLORS.grey;
    } else {
      // return COLORS.transparent;
      return COLORS.grey;
    }
  };


  return (
    <View
      style={[styles.inputContainer]}

    >
      {label && (
        <Text style={[styles.label, {
          color: COLORS?.ontheway,
          marginLeft: 5,
          marginTop: 4,
          fontFamily: FONTS?.bold,

        }]}>
          {label}
          {star}
        </Text>
      )}
      <View
        style={[
          styles.wrapper,
          {
            alignItems: icon ? 'center' : 'baseline',
          },
          {
            // paddingVertical: 10,
            // paddingHorizontal: 2,
            height:55,
            marginVertical: 8,

            // marginHorizontal:10,

          },
          {
            borderColor: getBorderColor(),
            flexDirection: getFlexDirection(),
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
            borderRadius: 8,
            minHeight: height || 50,

            // elevation: getElevation(),
          },
        ]}>
        <View>{icon && icon}</View>
        <TextInput
          autoCapitalize="none"
          // style={{
          //   color:theme?.colors?.textColor,
          // }}
          textStyle={{
            fontFamily: FONTS?.regular,
          }}
          style={[styles.textInput, style]}
          onChangeText={onChangeText}
          placeholderTextColor={theme?.colors?.textColor}
          value={value}
          placeholder={placeholder}
          keyboardType={keyBoardType}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          {...props}
        />
      </View>
    </View>
  );
};

export default VegUrbanEditText;
