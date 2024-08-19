import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

import React, {useState} from 'react';
import AppWrapper from '../../components/AppWrapper';
import {myColors} from '../../utils/Themes/Colors';
import {responsiveWidth} from 'react-native-responsive-dimensions';

import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Login = ({navigation}) => {
  const [termsChecked, setTermsChecked] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Somewhere in your code
  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log({userInfo, error: undefined});
      if (userInfo) {
        await AsyncStorage.setItem('key', JSON.stringify(userInfo));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Home'}], // Replace 'HomeScreen' with your target screen
          }),
        );
      }
    } catch (error) {
      console.log(error);
      // if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          console.log('cancel');
          // user cancelled the login flow
          break;
        case statusCodes.IN_PROGRESS:
          console.log('in progress');

          // operation (eg. sign in) already in progress
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // play services not available or outdated
          console.log('not available');

          break;
        default:
          console.log('try again later');
        // some other error happened
      }
    }
  };

  const enableBiometricAuth = () => {
    const rnBiometrics = new ReactNativeBiometrics();
    rnBiometrics
      .isSensorAvailable()
      .then(resultObject => {
        const {available, biometryType} = resultObject;

        console.log('resultObject', resultObject);

        if (available && biometryType === BiometryTypes.TouchID) {
          Alert.alert(
            'TouchID',
            'Would you like to enable TouchID authentication for the next time?',
            [
              {
                text: 'Yes please',
                onPress: async () => {
                  Alert.alert(
                    'Success!',
                    'TouchID authentication enabled successfully!',
                  );
                },
              },
              {text: 'Cancel', style: 'cancel'},
            ],
          );
        } else if (available && biometryType === BiometryTypes.FaceID) {
          Alert.alert(
            'FaceID',
            'Would you like to enable FaceID authentication for the next time?',
            [
              {
                text: 'Yes please',
                onPress: async () => {
                  Alert.alert(
                    'Success!',
                    'FaceID authentication enabled successfully!',
                  );
                },
              },
              {text: 'Cancel', style: 'cancel'},
            ],
          );
        } else if (available && biometryType === BiometryTypes.Biometrics) {
          Alert.alert(
            'Device Supported Biometrics',
            'Biometrics authentication is supported.',
          );
        } else {
          Alert.alert(
            'Biometrics not supported',
            'This device does not support biometric authentication.',
          );
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert(
          'Error',
          'An error occurred while checking biometrics availability.',
        );
      });
  };

  const handleBiometricAuth = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const {success, error} = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate to continue',
        // cancelButtonText:'Cancel'
      });

      if (success) {
        Alert.alert('Success', 'Biometric authentication successful');
        return true;
      } else {
        Alert.alert('Authentication failed', 'Biometric authentication failed');
        return false;
      }
    } catch (error) {
      console.error('[handleBiometricAuth] Error:', error);
      Alert.alert('Error', 'Biometric authentication failed from device');
      return false;
    }
  };

  return (
    <AppWrapper>
      <View style={{flex: 1, backgroundColor: myColors.violate}}>
        <StatusBar translucent backgroundColor={myColors.violate} />
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
          }}>
          <Image
            source={require('../../assets/images/zeptoLogo.png')}
            style={{
              width: responsiveWidth(70),
              height: 100,
              top: 80,
            }}
          />
          <Text
            style={{
              color: myColors.white,
              fontSize: 36,
              fontWeight: 700,
              paddingLeft: 40,
              letterSpacing: 0.5,
              width: '60%',
              top: 80,
            }}>
            Groceries delivered in 10 minutes
          </Text>
          <KeyboardAvoidingView
            style={{
              width: '90%',
              height: '100%',
              flex: 2,
              marginHorizontal: 'auto',
              top: 120,
            }}>
            <TextInput
              style={[
                styles.textInput,
                {backgroundColor: 'white', paddingHorizontal: 20},
              ]}
              placeholder="Enter Phone Number"
              placeholderTextColor={myColors.gray}
              keyboardType="numeric"
            />
            <TouchableOpacity activeOpacity={0.7}>
              <Text
                style={[styles.button, {marginTop: 24, color: myColors.white}]}>
                Continue
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 600,
                marginTop: 10,
                textAlign: 'center',
                color: myColors.white,
              }}>
              OR
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.button,
                {
                  backgroundColor: myColors.white,
                  padding: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  marginTop: 10,
                },
              ]}
              onPress={() => {
                if (!termsChecked)
                  return Alert.alert('Please accept terms and condition');
                _signIn();
              }}>
              <AntDesign name="google" size={20} color={myColors.violate} />
              <Text style={{color: myColors.violate}}>SignIn with Google</Text>
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <CheckBox
                disabled={false}
                value={termsChecked}
                onValueChange={newValue => setTermsChecked(newValue)}
              />
              <Text
                style={{
                  color: myColors.white,
                  textAlign: 'center',
                  // marginTop: 6,
                }}>
                *I accept the terms & privacy policy
              </Text>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </AppWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 100,
    color: myColors.black,
  },
  button: {
    borderRadius: 100,
    paddingVertical: 12,
    backgroundColor: myColors.buttonPrimary,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 500,
  },
});
