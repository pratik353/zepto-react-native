/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import LotsOfStyles from './src/components/LotsOfStyle';
import {NavigationContainer} from '@react-navigation/native';
import AppRouter from './src/router/AppRouter';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <AppRouter />
    </NavigationContainer>
  );
}

export default App;
