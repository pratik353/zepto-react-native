import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AppWrapper from '../../components/AppWrapper';
import {myColors} from '../../utils/Themes/Colors';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {zeptoLogo} from '../../utils/constants/imageUrls';
import { CommonActions } from '@react-navigation/native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('key')
        .then(result => {
          if (result) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }], // Replace 'HomeScreen' with your target screen
              })
            );
          } else {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }], // Replace 'HomeScreen' with your target screen
              })
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    }, 2000);
  }, []);
  return (
    <AppWrapper>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: myColors.violate,
        }}>
        <StatusBar translucent backgroundColor="transparent" />
        <Image
          style={{width: responsiveWidth(100), height: 80}}
          source={require('../../assets/images/zeptoLogo.png')}
        />
      </View>
    </AppWrapper>
  );
};

export default Splash;

const styles = StyleSheet.create({});
