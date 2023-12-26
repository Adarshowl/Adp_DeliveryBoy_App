import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/Colors';
import {STRING} from '../constants/String';
import { SIZES} from '../constants/themes';
import {FONTS} from '../constants/Fonts'

const DeliveryBoyProgressBar = ({loading}) => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={true}
            color={COLORS.black}
            size="large"
            style={styles.activityIndicator}
          />
          <Text
            style={[
              FONTS.body3,
              {
                flex: 1,
                marginStart: 25,
                color: COLORS.black,
                // fontFamily:FONTS?.bold,
                fontSize:20
              },
            ]}>
              Please Wait
            {/* {STRING.loading} */}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default DeliveryBoyProgressBar;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000080',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    width: SIZES.width - 60,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 75,
  },
});
