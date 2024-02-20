import {View, Text} from 'react-native';
import React from 'react';
import Stack from './src/Shells/ScreenStack';
import {NavigationContainer} from '@react-navigation/native';
import ScreenStack from './src/Shells/ScreenStack';
import HomeScreen from './src/screens/HomeScreen';
const App = () => {
  return (
    <NavigationContainer>
      <ScreenStack />
    </NavigationContainer>
  );
};

export default App;
