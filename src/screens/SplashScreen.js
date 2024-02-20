import {View, Text, ImageComponent} from 'react-native';
import React, {useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './LoginScreen';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    handlesplash();
  }, []);

  const handlesplash = async () => {
    const res = await AsyncStorage.getItem('userinfo');

    if (res) {
      navigation.replace('HomeScreen');
    } else {
      navigation.replace('LoginScreen');
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <MaterialCommunityIcons
        name={'hospital-marker'}
        size={90}
        color={'aqua'}
      />

      <Text
        style={{
          color: 'white',
          fontSize: 15,
          fontWeight: '900',
          textAlign: 'center',
          marginVertical: 10,
        }}>
        Bringing Peace of Mind to Every Journey
      </Text>
    </View>
  );
};

export default SplashScreen;
