/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import AppRouter from './src/router/AppRouter';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      {/* <GestureHandlerRootView style={{flex: 1}}> */}
        <AppRouter />
      {/* </GestureHandlerRootView> */}
    </NavigationContainer>
  );
}

export default App;
