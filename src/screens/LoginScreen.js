import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './HomeScreen';

const LoginScreen = ({navigation}) => {
  const [buttonloading, SetbuttonLoading] = useState(false);

  signOut = async () => {
    try {
      const r = await GoogleSignin.signOut();
      console.log(r);
    } catch (error) {
      console.error('signouterror', error);
    }
  };

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const gogglesignIn = async () => {
    SetbuttonLoading(true);

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      await AsyncStorage.setItem('userinfo', JSON.stringify(userInfo));
      navigation.replace('HomeScreen');
      SetbuttonLoading(false);
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('cancelusererror', error);
        SetbuttonLoading(false);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('progresserror', error);
        SetbuttonLoading(false);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('notavilable', error);
        SetbuttonLoading(false);
      } else {
        // some other error happened
        console.log(error);
        SetbuttonLoading(false);
      }
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={gogglesignIn}
        // onPress={signOut}
        style={{
          backgroundColor: 'black',
          height: 56,
          width: '100%',
          justifyContent: 'center',

          borderColor: 'aqua',
          borderWidth: 2,
          borderBottomWidth: 7,
          borderRadius: 10,
        }}>
        {buttonloading ? (
          <View>
            <ActivityIndicator color={'white'} size={20} />
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <AntDesign
              name={'google'}
              size={20}
              color={'white'}
              style={{paddingLeft: 30, paddingRight: 35}}
            />

            <Text style={{fontSize: 20, color: 'white', fontWeight: '600'}}>
              Login With Google
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
