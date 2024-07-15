import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {myColors} from '../../utils/Themes/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Home = ({navigation}) => {
  return (
    <View style={{top: 100}}>
      <Text style={{color: myColors.black}}>Home</Text>
      <TouchableOpacity
        onPress={async () => {
          try {
            await GoogleSignin.signOut();
            AsyncStorage.removeItem('key');
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Login'}], // Replace 'HomeScreen' with your target screen
              }),
            );
          } catch (error) {
            console.error(error);
          }
        }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
