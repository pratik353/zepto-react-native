import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {myColors} from '../../utils/Themes/Colors';

const Cart = () => {
  return (
    <View
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight,
      }}>
      <Text
        style={{
          color: myColors.black,
          fontSize: 20,
        }}>
        Cart
      </Text>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({});
