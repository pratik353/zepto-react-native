import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Dimensions, StatusBar, Text, View} from 'react-native';
import Home from '../../screens/Home/Home';
import Cart from '../../screens/Cart/Cart';
import Categories from '../../screens/Categories/Categories';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {myColors} from '../../utils/Themes/Colors';

const {width, height} = Dimensions.get('window');

const statusBarHeight = StatusBar.currentHeight || 0;

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <View
      style={{
        width,
        height: height + statusBarHeight,
      }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 80,
          },
        }}>
        <Tab.Screen
          name="Zepto"
          options={{
            tabBarIcon: ({focused}) => (
              <TabIconAndLabel
                focused={focused}
                iconName={'home'}
                label={'Zepto'}
              />
            ),
            tabBarLabel: () => null,
          }}
          component={Home}
        />
        <Tab.Screen
          name="Categories"
          options={{
            tabBarIcon: ({focused}) => (
              <TabIconAndLabel
                focused={focused}
                iconName={'rocket'}
                label={'Categories'}
              />
            ),
            tabBarLabel: () => null, // Hide the default label to avoid duplication
          }}
          component={Categories}
        />
        <Tab.Screen
          name="Cart"
          options={{
            tabBarIcon: ({focused}) => (
              <TabIconAndLabel
                focused={focused}
                iconName={'cart'}
                label={'Cart'}
              />
            ),
            tabBarLabel: () => null,
          }}
          component={Cart}
        />
      </Tab.Navigator>
    </View>
  );
};

const TabIconAndLabel = ({
  focused,
  label,
  iconName,
}: {
  focused: boolean;
  label: string;
  iconName: string;
}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Ionicons
        name={iconName}
        color={focused ? myColors.violate : myColors.black}
        size={24}
      />
      <Text
        style={{
          color: focused ? myColors.violate : myColors.black,
          marginTop: 4, // Adjust this value to fine-tune the spacing
          fontSize: 16, // You can also adjust the text size if needed
        }}>
        {label}
      </Text>
    </View>
  );
};

export default TabsNavigator;
