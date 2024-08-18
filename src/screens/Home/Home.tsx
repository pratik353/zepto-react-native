import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  Modal,
  PermissionsAndroid,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {myColors} from '../../utils/Themes/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AppWrapper from '../../components/AppWrapper';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {responsiveWidth} from 'react-native-responsive-dimensions';

import {PanGestureHandler} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
import LinearGradientBg from '../../components/background/LinearGradientBg';

const Home = ({navigation}) => {
  const [userLocation, setUserLocation] = useState<{
    latitude: null | number;
    longitude: null | number;
  }>({
    latitude: null,
    longitude: null,
  });

  const [locationModalVisible, setLocationModalVisible] = useState(false);

  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'location Permission',
          message: 'Zepto needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setLocationModalVisible(false);

        getCurrentLocation();
      } else {
        setLocationModalVisible(true);
        console.log('location permission denied');
      }
    } catch (err) {
      setLocationModalVisible(true);
      console.warn(err);
    }
  };

  const getAddressFromLatLng = async (lat: number, lng: number) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`,
      );
      console.log(response);

      if (response.data.status === 'OK') {
        console.log(response.data.results[0].formatted_address);
        return response.data.results[0].formatted_address;
      } /* else {
      throw new Error('Geocoding API error');
    } */
    } catch (error) {
      console.error('Error getting address:', error);
      return null;
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        if (position) {
          setLocationModalVisible(false);
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log(position);
          // getAddressFromLatLng(
          //   position.coords.latitude,
          //   position.coords.longitude,
          // );
        }
      },
      error => {
        setLocationModalVisible(true);
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <AppWrapper>
      {/* <Text style={{color: myColors.black}}>Home</Text>
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
      </TouchableOpacity> */}
      <StatusBar translucent backgroundColor={myColors.primary} />
      <AppHeader
        userLocation={!!userLocation.latitude && !!userLocation.longitude}
        isLocationEnabled={!locationModalVisible}
        navigation={navigation}
      />
      {/* </LinearGradientBg> */}
      <ScrollView
        contentContainerStyle={{flexGrow: 1, backgroundColor: '#fff'}}>
        <AppBody />
      </ScrollView>
      <AppFooter
        enableLocation={requestLocationPermission}
        locationModalVisible={locationModalVisible}
      />
    </AppWrapper>
  );
};

const AppHeader = ({
  userLocation,
  isLocationEnabled,
  navigation
}: {
  userLocation: boolean;
  isLocationEnabled: boolean;
  navigation: any
}) => {
  return (
    <View
      style={{
        paddingVertical: 10,
        gap: 10,
        backgroundColor: /* userLocation ? myColors.black : */ myColors.primary,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 12,
          gap: 6,
        }}>
        <View>
          <TouchableOpacity activeOpacity={1} onPress={()=>{
            navigation.navigate('Settings')
          }}>
            <Ionicons
              name="person-circle-outline"
              size={45}
              color={/* userLocation ? myColors.lightGray : */ myColors.white}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: /* userLocation ? myColors.lightGray : */ myColors.white,
            }}>
            Delivery in{' '}
            <Text
              style={{
                color:
                  /* userLocation ? myColors.lightGray : */ myColors.violate,
                fontSize: 23,
                fontWeight: 800,
              }}>
              10 Min
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: /* userLocation ? myColors.lightGray : */ myColors.white,
            }}
            numberOfLines={1}>
            {!isLocationEnabled
              ? 'No location enabled'
              : userLocation
                ? `Bavdhan - Vidyan Nagar, Bavdhan jhhhhhhhjhj hhhhh`
                : `Fetching location...`}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: myColors.gray,
          marginHorizontal: 15,
          borderRadius: 10,
          paddingHorizontal: 5,
          backgroundColor: myColors.lightGray,
        }}>
        <Ionicons name="search" size={30} color={myColors.black} />
        <TextInput
          placeholder="Search"
          style={{flex: 1, color: myColors.white, paddingLeft: 10}}
          placeholderTextColor={myColors.black}
        />
      </View>
    </View>
  );
};

const AppBody = () => {
  const banners = [
    'https://blitzindiamedia.com/wp-content/uploads/2023/08/News-Updates.png',
    'https://www.brucira.com/assets/img/work/zepto/zepto-banner.webp',
    'https://shyamfuture.com/wp-content/uploads/2022/09/grocery-delivery-app.png',
    'https://miro.medium.com/v2/resize:fit:1200/1*u0e8qoATjTNOtfsTQYechQ.png',
  ];

  const {width} = useWindowDimensions();

  const flatListRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderBanners = ({item, index}) => {
    return (
      <Image
        resizeMode="cover"
        source={{uri: item}}
        style={{
          marginRight: index == banners.length - 1 ? 20 : 0,
          marginLeft: index < banners.length - 1 ? 20 : 0,
          height: 200,
          width: width - 40,
          borderRadius: 10,
        }}
      />
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scrollToNext();
    }, 3000); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, [currentIndex]);

  const scrollToNext = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= banners.length) {
      nextIndex = 0;
    }

    flatListRef.current.scrollToIndex({
      index: nextIndex,
      animated: true,
    });

    setCurrentIndex(nextIndex);
  };

  const onScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  return (
    <View style={{paddingTop: 0, flex: 1}}>
      <LinearGradientBg flex={1} from_color={myColors.primary} to_color="#fff">
        <FlatList
          ref={flatListRef}
          data={banners}
          renderItem={renderBanners}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          scrollEventThrottle={32}
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          ItemSeparatorComponent={() => <View style={{width: 20}}></View>}
        />
      </LinearGradientBg>
    </View>
  );
};

const AppFooter = ({
  enableLocation,
  locationModalVisible,
}: {
  enableLocation: () => void;
  locationModalVisible: boolean;
}) => {
  return (
    <View>
      <Modal
        visible={locationModalVisible}
        transparent={true}
        animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.1)',
          }}>
          <View
            style={{
              flex: 0.45,
              backgroundColor: myColors.white,
              borderTopEndRadius: 24,
              borderTopStartRadius: 24,
              paddingHorizontal: 4,
              paddingBottom: 30,
              justifyContent: 'space-between',
            }}>
            <View style={{paddingTop: 4}}>
              <View
                style={{alignItems: 'center', marginTop: 15, marginBottom: 8}}>
                <Image
                  source={require('../../assets/images/location-icon.jpg')}
                  style={{width: responsiveWidth(40), height: 120}}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: myColors.black,
                    textAlign: 'center',
                    fontSize: 24,
                    fontWeight: 600,
                  }}>
                  Your device location is off
                </Text>
                <Text
                  style={{
                    color: myColors.gray,
                    textAlign: 'center',
                    fontSize: 16,
                    marginTop: 4,
                  }}>
                  Please enable location permission for better delivery
                  experience
                </Text>
              </View>
            </View>
            <View style={{paddingHorizontal: 20}}>
              <TouchableOpacity onPress={enableLocation} activeOpacity={0.7}>
                <Text
                  style={[
                    styles.button,
                    {
                      backgroundColor: myColors.buttonPrimary,
                      color: myColors.white,
                    },
                  ]}>
                  Continue
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: myColors.lightGray,
                  borderWidth: 1,
                  borderRadius: 12,
                  marginTop: 18,
                }}>
                <AntDesign
                  name="search1"
                  size={16}
                  color={myColors.buttonPrimary}
                />
                <Text
                  style={[
                    styles.button,
                    {
                      backgroundColor: myColors.white,
                      color: myColors.buttonPrimary,
                    },
                  ]}>
                  Search your location
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 18,
    fontWeight: 500,
    textAlign: 'center',
    borderRadius: 12,
  },
  carousel: {
    flexDirection: 'row',
  },
  item: {
    // width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: 20,
    marginHorizontal: 10,
  },
});
