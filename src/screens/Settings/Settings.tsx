import {View, Text, StatusBar, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {myColors} from '../../utils/Themes/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Settings = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
      }}>
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
        <Text>{GoogleSignin.getCurrentUser()?.user.name}</Text>
        <Text>{GoogleSignin.getCurrentUser()?.user.email}</Text>
        <Image
          source={{
            uri: GoogleSignin.getCurrentUser()?.user.photo || '',
          }}
          className="h-[40] w-[40] rounded"
        />
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
