import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {myColors} from '../../utils/Themes/Colors';

const Categories = () => {
  return (
    <View
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight,
      }}>
      <Text
        /* style={{
          color: myColors.black,
          fontSize: 20,
        }} */
        className="text-xl"
        >
        Categories
      </Text>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({});
